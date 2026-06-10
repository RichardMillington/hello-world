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
    return`**${p.name}** (${p.catLabel}): ${p.tagline}. Pricing: ${p.pricing}. Target: ${p.target}. UX: ${p.uxApproach.map(a=>a.label).join(", ")}. Verdict: ${p.verdict}. Momentum: ${p.momentum}. Key features: ${feats}. Integrations: ${p.keyIntegrations.join(", ")}. Strengths: ${p.strengths.join("; ")}. Considerations: ${p.considerations.join("; ")}. Editorial: ${p.editorial}`;
  }).join("\n\n");
}

// Build survey feedback summary for the prompt
function buildSurveySummary(){
  if(typeof surveyData==='undefined') return '';
  return Object.entries(surveyData).map(([id,d])=>{
    const scores=Object.entries(d.scores).map(([k,v])=>`${k}: ${v}/5`).join(", ");
    const topComments=d.feedback.slice(0,5).map((c,i)=>`  "${c.substring(0,200)}"`).join("\n");
    return`**${d.name}** (${d.n} respondents, overall: ${d.overall}/10)\nScores: ${scores}\nSample user feedback:\n${topComments}`;
  }).join("\n\n");
}

function buildDetailedScores(){
  if(typeof feverbeeJustifications==='undefined')return'';
  return feverbeeJustifications.map(j=>`${j.platform} - ${j.feature} (${j.score}/10): ${j.justification}`).join("\n");
}

const AI_PROXY_URL = 'https://feverbee-ai-recommend.richard-708.workers.dev/';

// Conversation memory: [{q, a}] pairs from this session
let conversationHistory = [];
const MAX_HISTORY_PAIRS = 4; // keep last 4 Q&A pairs to control token usage

function clearConversation(){
  conversationHistory = [];
  document.getElementById("aiResults").innerHTML = '';
  const ta = document.getElementById("aiInput");
  ta.value = '';
  ta.placeholder = "e.g. Which platform is best for a 50K member support community? Does Discourse support SAML SSO? How hard is it to migrate from Khoros to Gainsight?";
}

function buildConversationContext(newQuestion){
  if(conversationHistory.length === 0) return newQuestion;
  const recent = conversationHistory.slice(-MAX_HISTORY_PAIRS);
  const convo = recent.map(p => `USER ASKED: ${p.q}\n\nYOU ANSWERED: ${p.a}`).join('\n\n---\n\n');
  return `CONVERSATION SO FAR:\n\n${convo}\n\n---\n\nNEW QUESTION (answer this in context of the conversation above): ${newQuestion}`;
}

function formatAnswerHtml(text){
  return text
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\n\n/g,'</p><p>')
    .replace(/\n/g,'<br>');
}

function renderConversation(){
  const resultsDiv = document.getElementById("aiResults");
  const items = conversationHistory.map((pair,i) => {
    const isLast = i === conversationHistory.length - 1;
    return `<div style="margin-top:1rem">
      <div style="font-size:.82rem;color:var(--text-dim);padding:.5rem .85rem;background:var(--bg);border:1px solid var(--border);border-radius:8px"><strong style="color:var(--text-sec)">You asked:</strong> ${pair.q.length>200?pair.q.slice(0,200)+'…':pair.q}</div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:1.5rem;margin-top:.5rem">
        <div style="display:flex;align-items:center;gap:.4rem;margin-bottom:.75rem;font-size:.78rem;color:var(--amber);font-weight:600"><span style="font-size:.9rem">&#9733;</span> FeverBee Analysis</div>
        <div style="font-size:.88rem;color:var(--text-sec);line-height:1.7"><p>${formatAnswerHtml(pair.a)}</p></div>
        ${isLast ? renderLeadCta(pair.q) : ''}
      </div>
    </div>`;
  }).join('');

  const followUpHint = `<div style="display:flex;justify-content:space-between;align-items:center;margin-top:.75rem;font-size:.78rem;color:var(--text-dim)">
    <span>Ask a follow-up question above &mdash; the conversation continues from here.</span>
    <button onclick="clearConversation()" style="background:none;border:1px solid var(--border);border-radius:6px;padding:.3rem .7rem;font-size:.75rem;color:var(--text-dim);cursor:pointer;font-family:inherit">Start new conversation</button>
  </div>`;

  resultsDiv.innerHTML = items + followUpHint;
  resultsDiv.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function renderLeadCta(lastQuestion){
  const subject = encodeURIComponent('Community platform help');
  const body = encodeURIComponent(`Hi Richard,\n\nI was using the FeverBee platform comparison tool and asked: "${lastQuestion.slice(0,300)}"\n\nI'd like to talk about how FeverBee could help us.\n\nThanks`);
  return `<div style="margin-top:1.25rem;padding-top:1rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap">
    <div style="font-size:.82rem;color:var(--text-sec);flex:1;min-width:240px">Need hands-on help? FeverBee helps organisations select, configure, and optimise community platforms.</div>
    <a href="mailto:richard@feverbee.com?subject=${subject}&body=${body}" style="display:inline-block;padding:.55rem 1.2rem;background:var(--amber);color:#000;border-radius:8px;font-size:.82rem;font-weight:700;text-decoration:none;white-space:nowrap">Talk to FeverBee &rarr;</a>
  </div>`;
}

async function runAiAnalysis(){
  const input=document.getElementById("aiInput").value.trim();
  const apiKey=document.getElementById("aiApiKey").value.trim();
  const resultsDiv=document.getElementById("aiResults");

  if(!input){resultsDiv.innerHTML='<div class="ai-error">Please enter your question or describe your requirements.</div>';return}
  if(!apiKey&&!AI_PROXY_URL){resultsDiv.innerHTML='<div class="ai-error">This feature requires a backend connection. Please <a href="mailto:richard@feverbee.com?subject=Platform%20Question" style="color:var(--red);font-weight:600">email us your question</a> and we\'ll respond directly.</div>';return}

  const btn=document.getElementById("aiSubmitBtn");
  btn.disabled=true;
  resultsDiv.innerHTML='<div class="ai-loading"><span class="spinner"></span>Analysing against FeverBee\'s platform data...</div>';

  const surveySummary=buildSurveySummary();
  const detailedScores=buildDetailedScores();

  const systemPrompt=`You are a FeverBee community platform analyst. You answer questions about enterprise community platforms with authority and specificity, drawing on FeverBee's detailed analysis of 14 platforms.

You can answer ANY question about community platforms: comparisons, specific feature questions, migration advice, recommendations, pricing, AI capabilities, use case fit, etc.

PLATFORM DATA:
${buildPlatformSummary()}

DETAILED FEATURE SCORES AND JUSTIFICATIONS (from FeverBee's analysis):
${detailedScores}

MIGRATION DIFFICULTY (1=Easy to 5=Very Difficult):
${typeof migrationDifficulty!=='undefined'?Object.entries(migrationDifficulty).map(([from,tos])=>`From ${from}: ${Object.entries(tos).map(([k,v])=>k.replace('to_','')+':'+v).join(', ')}`).join('\n'):''}

${surveySummary ? `USER SURVEY DATA (FeverBee 2024 Enterprise Community Platform Survey, 166 respondents):
${surveySummary}
` : ''}
INSTRUCTIONS:
- Answer in clear, direct prose. Use short paragraphs.
- Be opinionated. FeverBee gives honest recommendations, not diplomatic non-answers.
- Reference specific scores and justifications when relevant.
- If comparing platforms, highlight the 3-4 differences that actually matter for the decision.
- If recommending, give a clear first choice with reasoning, then alternatives.
- If the question is about a specific feature, cite the detailed justification data.
- Keep responses concise (200-400 words). Don't pad.
- Use FeverBee's voice: professional, direct, consultancy-level insight.
- Never recommend Khoros for new implementations. Strongly recommend migrating off it.
- Be honest about Salesforce's stagnating community development.
- Format with **bold** for platform names and key points. Use line breaks between paragraphs.
- If a conversation history is provided, answer the new question in the context of that conversation. Don't repeat information you already gave unless asked.
- When it fits naturally, close with one short sentence noting that FeverBee helps organisations select, configure, and optimise community platforms. Keep it to a single sentence, helpful in tone, never salesy. Skip it if it would feel forced.`;

  // Include conversation history so follow-up questions work
  const fullInput=buildConversationContext(input);

  try{
    let resp;
    if(AI_PROXY_URL){
      // Use backend proxy (no API key needed). `question` is the raw new
      // question, logged server-side for market intelligence.
      resp=await fetch(AI_PROXY_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({requirements:fullInput,systemPrompt:systemPrompt,question:input})
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
          messages:[{role:"user",content:fullInput}]
        })
      });
    }

    if(!resp.ok){
      const err=await resp.json().catch(()=>({}));
      if(resp.status===429){
        throw new Error(err.error||"You've reached the rate limit for AI questions. Please try again in an hour, or email richard@feverbee.com with your question and we'll respond directly.");
      }
      throw new Error(err.error?.message||err.error||`Something went wrong (${resp.status}). Please try again.`);
    }

    const data=await resp.json();
    const text=data.content?.[0]?.text||data.error?.message||'No response received';

    // Try to parse as JSON (recommendation format) or render as prose
    let jsonMatch=text.match(/\{[\s\S]*\}/);
    let parsed=null;
    try{if(jsonMatch)parsed=JSON.parse(jsonMatch[0])}catch(e){}

    if(parsed&&parsed.recommendations){
      renderAiResults(parsed);
    }else{
      // Store in conversation history and render the full thread
      conversationHistory.push({q:input,a:text});
      renderConversation();
      // Clear the input and switch to follow-up mode
      const ta=document.getElementById("aiInput");
      ta.value='';
      ta.placeholder="Ask a follow-up question...";
    }
  }catch(err){
    resultsDiv.innerHTML=`<div class="ai-error">Error: ${err.message}</div>`;
  }finally{
    btn.disabled=false;
    btn.innerHTML='Get Answer &rarr;';
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

