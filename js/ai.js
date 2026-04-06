// --- AI RECOMMENDATION ENGINE ---

// File upload handling
const dropzone=document.getElementById("aiDropzone");
dropzone?.addEventListener("dragover",e=>{e.preventDefault();dropzone.classList.add("dragover")});
dropzone?.addEventListener("dragleave",()=>dropzone.classList.remove("dragover"));
dropzone?.addEventListener("drop",e=>{
  e.preventDefault();dropzone.classList.remove("dragover");
  const file=e.dataTransfer.files[0];
  if(file)readFile(file);
});

function handleFileUpload(e){
  const file=e.target.files[0];
  if(file)readFile(file);
}

async function readFile(file){
  const ext=file.name.split('.').pop().toLowerCase();
  const statusEl=dropzone.querySelector(".drop-text");
  statusEl.textContent=`Reading ${file.name}...`;

  try{
    let text='';
    if(ext==='pdf'){
      text=await readPdf(file);
    }else if(ext==='pptx'){
      text=await readPptx(file);
    }else{
      text=await readAsText(file);
    }
    document.getElementById("aiInput").value=text;
    statusEl.textContent=`Loaded: ${file.name} (${text.length.toLocaleString()} characters)`;
  }catch(err){
    statusEl.textContent=`Error reading ${file.name}: ${err.message}`;
  }
}

function readAsText(file){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=e=>resolve(e.target.result);
    reader.onerror=()=>reject(new Error('Could not read file'));
    reader.readAsText(file);
  });
}

async function readPdf(file){
  const arrayBuffer=await file.arrayBuffer();
  const pdf=await pdfjsLib.getDocument({data:arrayBuffer}).promise;
  const pages=[];
  for(let i=1;i<=pdf.numPages;i++){
    const page=await pdf.getPage(i);
    const content=await page.getTextContent();
    const text=content.items.map(item=>item.str).join(' ');
    if(text.trim())pages.push(text);
  }
  return pages.join('\n\n');
}

async function readPptx(file){
  // PPTX is a ZIP of XML files. Use JSZip-like approach with browser APIs.
  const arrayBuffer=await file.arrayBuffer();
  const blob=new Blob([arrayBuffer],{type:'application/zip'});

  // Try using the browser's native decompression if available
  // Fall back to extracting text from the raw XML
  try{
    const zip=await loadPptxAsZip(arrayBuffer);
    return zip;
  }catch(e){
    // Fallback: read as text and extract readable content
    const text=new TextDecoder('utf-8',{fatal:false}).decode(arrayBuffer);
    const readable=text.replace(/<[^>]+>/g,' ').replace(/[^\x20-\x7E\n\r]/g,'').replace(/\s+/g,' ').trim();
    return readable||'Could not extract text from PPTX. Please copy-paste the content instead.';
  }
}

async function loadPptxAsZip(arrayBuffer){
  // Minimal PPTX parser: PPTX is a ZIP containing slide XML files
  // We look for ppt/slides/slide*.xml and extract text nodes
  const bytes=new Uint8Array(arrayBuffer);

  // Find local file headers in the ZIP and extract slide XML content
  const slides=[];
  const decoder=new TextDecoder('utf-8',{fatal:false});

  // Simple approach: decode the whole thing and regex out text from XML
  const fullText=decoder.decode(bytes);

  // Extract content from <a:t> tags (PowerPoint text runs)
  const textRuns=fullText.match(/<a:t>([^<]*)<\/a:t>/g);
  if(textRuns&&textRuns.length>0){
    const texts=textRuns.map(t=>t.replace(/<\/?a:t>/g,''));
    // Group by rough slide boundaries
    let result=texts.join(' ');
    // Clean up
    result=result.replace(/\s+/g,' ').trim();
    return result;
  }
  throw new Error('No text content found');
}

// Build platform summary for the prompt
function buildPlatformSummary(){
  return platforms.map(p=>{
    const feats=Object.entries(p.communityFeatures).map(([k,v])=>`${k}: ${v===true?'Yes':v===false?'No':'Partial'}`).join(", ");
    return`**${p.name}** (${p.catLabel}): ${p.tagline}. Pricing: ${p.pricing}. Target: ${p.target}. UX: ${p.uxApproach.map(a=>a.label).join(", ")}. Verdict: ${p.verdict}. Key features: ${feats}. Integrations: ${p.keyIntegrations.join(", ")}. Strengths: ${p.strengths.join("; ")}. Considerations: ${p.considerations.join("; ")}.`;
  }).join("\n\n");
}

// Set this to your deployed Cloudflare Worker URL to enable proxy mode (no API key needed for visitors)
const AI_PROXY_URL = ''; // e.g. 'https://feverbee-ai-recommend.your-account.workers.dev/recommend'

async function runAiAnalysis(){
  const input=document.getElementById("aiInput").value.trim();
  const apiKey=document.getElementById("aiApiKey").value.trim();
  const resultsDiv=document.getElementById("aiResults");

  if(!input){resultsDiv.innerHTML='<div class="ai-error">Please describe your requirements or upload a document first.</div>';return}
  if(!apiKey&&!AI_PROXY_URL){resultsDiv.innerHTML='<div class="ai-error">This feature requires a backend connection. Please <a href="mailto:richard@feverbee.com?subject=Platform%20Recommendation%20Request" style="color:var(--red);font-weight:600">email us your requirements</a> and we\'ll send you a personalised recommendation.</div>';return}

  const btn=document.getElementById("aiSubmitBtn");
  btn.disabled=true;
  resultsDiv.innerHTML='<div class="ai-loading"><span class="spinner"></span>Analysing your requirements against 10 community platforms...</div>';

  const systemPrompt=`You are a FeverBee community platform analyst. You have deep knowledge of enterprise community platforms. Given a user's requirements, recommend the best platforms from the following options and explain trade-offs.

Here are the 10 platforms in our comparison tool:
${buildPlatformSummary()}

The 6 evaluation criteria are: Ease of Setup & Use, Quality of Features, Integrations, Data Privacy & Security, Services & Support, Reports & Analytics. Each is scored 0-10.

Respond in this exact JSON format:
{
  "recommendations": [
    {"id": "platform_id", "rank": 1, "fitScore": "92%", "reasoning": "Why this platform fits their needs"},
    {"id": "platform_id", "rank": 2, "fitScore": "78%", "reasoning": "Why this is the runner-up"},
    {"id": "platform_id", "rank": 3, "fitScore": "65%", "reasoning": "Why this is worth considering"}
  ],
  "tradeoffs": [
    "Trade-off 1: choosing X over Y means you gain... but lose...",
    "Trade-off 2: ...",
    "Trade-off 3: ..."
  ],
  "suggestedWeights": {
    "easeOfUse": 5,
    "qualityOfFeatures": 7,
    "integrations": 8,
    "dataPrivacySecurity": 5,
    "servicesSupport": 6,
    "reportsAnalytics": 4
  },
  "weightReasoning": "Brief explanation of why these weights suit their requirements",
  "summary": "A 2-3 sentence overall recommendation"
}

Use the exact platform IDs: khoros, gainsight, higherlogic, salesforce, verint, bettermode, bevy, hivebrite, discourse, flarum. Return ONLY valid JSON.`;

  try{
    let resp;
    if(AI_PROXY_URL){
      // Use backend proxy (no API key needed)
      resp=await fetch(AI_PROXY_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({requirements:input,systemPrompt:systemPrompt})
      });
    }else{
      // Direct API call (requires user API key)
      resp=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "x-api-key":apiKey,
          "anthropic-version":"2023-06-01",
          "anthropic-dangerous-direct-browser-access":"true"
        },
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:2000,
          system:systemPrompt,
          messages:[{role:"user",content:`Here are my community platform requirements:\n\n${input}`}]
        })
      });
    }

    if(!resp.ok){
      const err=await resp.json().catch(()=>({}));
      throw new Error(err.error?.message||`API error: ${resp.status}`);
    }

    const data=await resp.json();
    const text=data.content[0].text;

    // Parse JSON from response (handle markdown code blocks)
    const jsonMatch=text.match(/\{[\s\S]*\}/);
    if(!jsonMatch)throw new Error("Could not parse AI response");
    const result=JSON.parse(jsonMatch[0]);

    renderAiResults(result);
  }catch(err){
    resultsDiv.innerHTML=`<div class="ai-error">Error: ${err.message}</div>`;
  }finally{
    btn.disabled=false;
  }
}

function renderAiResults(result){
  const div=document.getElementById("aiResults");

  const recCards=result.recommendations.map((r,i)=>{
    const p=platforms.find(x=>x.id===r.id);
    if(!p)return"";
    return`<div class="ai-rec-card ${i===0?'top-pick':''}">
      <div class="rec-rank">${i===0?'Top recommendation':'#'+(i+1)+' Alternative'}</div>
      <h5>${p.name}</h5>
      <div class="rec-why">${r.reasoning}</div>
      <div class="rec-fit">Fit score: ${r.fitScore}</div>
    </div>`;
  }).join("");

  const tradeoffs=result.tradeoffs.map(t=>`<div class="ai-tradeoff-item">${t}</div>`).join("");

  const weightBars=criteria.map(c=>{
    const v=result.suggestedWeights[c.key]||5;
    return`<div class="score-row"><span class="slbl">${c.label}</span><div class="sbar"><div class="sfill" style="width:${(v/10)*100}%"></div></div><span class="sval">${v}</span></div>`;
  }).join("");

  div.innerHTML=`
    <div class="ai-results">
      <h4>AI Recommendation</h4>
      <p style="font-size:.88rem;color:var(--text-sec);margin-bottom:1rem">${result.summary}</p>
      <div class="ai-rec-cards">${recCards}</div>
      <div class="ai-tradeoffs">
        <h5>Key Trade-offs to Consider</h5>
        ${tradeoffs}
      </div>
      <div class="ai-weights-rec">
        <h5>Suggested Criteria Weights for Your Needs</h5>
        <p style="font-size:.85rem;color:var(--text-sec);margin-bottom:.5rem">${result.weightReasoning}</p>
        ${weightBars}
        <button class="ai-apply-btn" onclick="applyAiWeights(${JSON.stringify(result.suggestedWeights).replace(/"/g,'&quot;')})">Apply these weights &amp; select recommended platforms</button>
      </div>
    </div>`;
}

function applyAiWeights(w){
  criteria.forEach(c=>{if(w[c.key]!=null)weights[c.key]=w[c.key]});
  renderWeights();

  // Auto-select recommended platforms
  const resultsDiv=document.getElementById("aiResults");
  const recCards=resultsDiv.querySelectorAll(".ai-rec-card h5");
  selected.clear();
  recCards.forEach(h=>{
    const name=h.textContent;
    const p=platforms.find(x=>x.name===name);
    if(p)selected.add(p.id);
  });

  renderOverview();
  updateCompareBar();

  // Scroll to platform grid
  document.getElementById("platformGrid").scrollIntoView({behavior:"smooth",block:"start"});
}

