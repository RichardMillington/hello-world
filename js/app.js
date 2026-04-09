let weights = {};
criteria.forEach(c => weights[c.key] = 5);
let selected = new Set();
let currentFilter = "all";
let stakesExpanded = true;
let userPrefs = {};

function sColor(s){return s>=8?'var(--green)':s>=6?'var(--amber)':'var(--red)'}
function fBadge(v){
  if(v===true)return'<span class="badge badge-yes">Yes</span>';
  if(v===false)return'<span class="badge badge-no">No</span>';
  return'<span class="badge badge-partial">Partial</span>';
}
function weightedScore(p){
  let tw=0,ts=0;
  criteria.forEach(c=>{tw+=weights[c.key];ts+=p[c.key]*weights[c.key]});
  return tw>0?(ts/tw).toFixed(1):0;
}
function uxBadges(arr){return arr.map(a=>`<span class="ux-badge ux-${a.type}">${a.label}</span>`).join("")}
function catBadge(p){
  if(p.category==="established")return'<span class="cat-label cat-established">Established</span>';
  if(p.category==="opensource")return'<span class="cat-label cat-opensource">Open Source</span>';
  if(p.category==="creator")return'<span class="cat-label cat-creator">Creator / Membership</span>';
  return'<span class="cat-label cat-newgen">New Generation</span>';
}
function verdictLine(p){
  return`<div class="verdict-line"><span class="verdict-dot ${p.verdictType}"></span>${p.verdict}</div>`;
}

const momentumLabels={
  'rapid-rising':'Rapidly Rising',
  'rising':'Rising',
  'steady':'Stable',
  'declining':'Declining',
  'rapid-declining':'Rapidly Declining'
};
function momentumTag(p){
  const m=p.momentum||'steady';
  const label=momentumLabels[m]||'Stable';
  return`<span class="momentum-tag momentum-${m}">${label}</span>`;
}

// --- FILTER PILLS WITH COUNTS ---
function renderPills(){
  const cats=[
    {key:"all",label:"All",count:platforms.length},
    {key:"established",label:"Established",count:platforms.filter(p=>p.category==="established").length},
    {key:"newgen",label:"New Generation",count:platforms.filter(p=>p.category==="newgen").length},
    {key:"creator",label:"Creator / Membership",count:platforms.filter(p=>p.category==="creator").length},
    {key:"opensource",label:"Open Source",count:platforms.filter(p=>p.category==="opensource").length}
  ];
  document.getElementById("filterPills").innerHTML=cats.map(c=>
    `<button class="pill ${currentFilter===c.key?'active':''}" data-cat="${c.key}">${c.label} (${c.count})</button>`
  ).join("");
  document.querySelectorAll(".pill").forEach(b=>b.addEventListener("click",()=>{
    currentFilter=b.dataset.cat;
    renderPills();renderOverview();
  }));
}

// --- WEIGHTS ---
const weightHints={
  easeOfUse:{
    0:"Not important",
    1:"Barely matters",2:"Barely matters",
    3:"Minor factor",4:"Minor factor",
    5:"Moderate priority — we'd like a reasonable setup",
    6:"Important — we need something our team can manage without devs",
    7:"High priority — non-technical admins must be able to run it day-to-day",
    8:"Very high — must be intuitive out of the box with minimal training",
    9:"Critical — ease of use is a dealbreaker for us",
    10:"Our top priority — we'll sacrifice features for simplicity"
  },
  qualityOfFeatures:{
    0:"Not important",
    1:"Barely matters",2:"Barely matters",
    3:"Minor factor — basic features are fine",4:"Minor factor",
    5:"Moderate — we need solid core features that work well",
    6:"Important — feature polish and depth matter to us",
    7:"High priority — we need best-in-class execution, not just checkboxes",
    8:"Very high — poorly implemented features are worse than missing ones",
    9:"Critical — we'd rather have fewer features done excellently",
    10:"Our top priority — quality of execution is everything"
  },
  integrations:{
    0:"Not important — standalone is fine",
    1:"Barely matters",2:"Barely matters",
    3:"Minor — maybe one or two connections",4:"Minor factor",
    5:"Moderate — needs to connect to our main tools (CRM, support)",
    6:"Important — deep integration with our existing stack matters",
    7:"High priority — bi-directional data flow with CRM/support tools essential",
    8:"Very high — community must be deeply embedded in our tech ecosystem",
    9:"Critical — data must flow seamlessly across our entire stack",
    10:"Our top priority — integration depth trumps everything else"
  },
  dataPrivacySecurity:{
    0:"Not important",
    1:"Barely matters",2:"Barely matters",
    3:"Minor — basic security is sufficient",4:"Minor factor",
    5:"Moderate — standard enterprise security (SSO, encryption)",
    6:"Important — we're in a regulated industry or handle sensitive data",
    7:"High priority — GDPR compliance, data residency, audit trails needed",
    8:"Very high — strict security requirements from our compliance team",
    9:"Critical — healthcare, finance, or government-level requirements",
    10:"Our top priority — security and privacy override all other factors"
  },
  servicesSupport:{
    0:"Not important — we're self-sufficient",
    1:"Barely matters",2:"Barely matters",
    3:"Minor — documentation is enough",4:"Minor factor",
    5:"Moderate — we'd like responsive support when we need it",
    6:"Important — dedicated account manager or CSM preferred",
    7:"High priority — we need proactive guidance, not just reactive support",
    8:"Very high — strategic partnership with the vendor matters enormously",
    9:"Critical — implementation support and ongoing strategic advice essential",
    10:"Our top priority — vendor relationship and service quality above all"
  },
  reportsAnalytics:{
    0:"Not important",
    1:"Barely matters",2:"Barely matters",
    3:"Minor — basic metrics are fine",4:"Minor factor",
    5:"Moderate — we need standard engagement and activity dashboards",
    6:"Important — leadership requires regular community ROI reporting",
    7:"High priority — we need to prove business impact with data",
    8:"Very high — advanced analytics, custom reports, and API data access needed",
    9:"Critical — case deflection metrics, revenue attribution required",
    10:"Our top priority — data and reporting drive all our decisions"
  }
};

function getWeightHint(key,val){
  return weightHints[key]?.[val]||"";
}

function renderWeights(){
  document.getElementById("weightGrid").innerHTML=criteria.map(c=>{
    const v=weights[c.key];
    return`<div class="weight-item">
      <label>${c.label}</label>
      <div class="slider-row">
        <input type="range" min="0" max="10" value="${v}" oninput="weights['${c.key}']=+this.value;this.parentElement.querySelector('.wval').textContent=this.value;this.closest('.weight-item').querySelector('.weight-hint').textContent=getWeightHint('${c.key}',+this.value);renderOverview()">
        <span class="wval">${v}</span>
      </div>
      <div class="weight-hint">${getWeightHint(c.key,v)}</div>
    </div>`;
  }).join("");
}
function resetWeights(){
  criteria.forEach(c=>weights[c.key]=5);
  renderWeights();renderOverview();
}

// --- CARD CLICK ---
function cardClick(id,e){
  // Don't open profile if clicking compare button
  if(e.target.closest('.compare-check'))return;
  showProfile(id);
}

// --- COMPARE BAR ---
function toggleCompare(id,e){
  if(selected.has(id))selected.delete(id);else{if(selected.size>=4)return;selected.add(id)}
  renderOverview();updateCompareBar();
}
function updateCompareBar(){
  const bar=document.getElementById("compareBar");
  const names=document.getElementById("barNames");
  if(selected.size>=2){
    bar.classList.add("show");
    names.innerHTML=[...selected].map(id=>{const p=platforms.find(x=>x.id===id);return`<span class="bar-name">${p.name}</span>`}).join("");
  }else{
    bar.classList.remove("show");
  }
}

// --- OVERVIEW ---
function renderOverview(){
  const grid=document.getElementById("platformGrid");
  const q=document.getElementById("searchInput").value.toLowerCase();
  const sortBy=document.getElementById("sortSelect").value;
  const list=platforms
    .filter(p=>{
      if(currentFilter!=="all"&&p.category!==currentFilter)return false;
      if(q)return p.name.toLowerCase().includes(q)||p.tagline.toLowerCase().includes(q);
      return true;
    })
    .map(p=>({...p,ws:+weightedScore(p)}));

  // Sort
  if(sortBy==="alpha")list.sort((a,b)=>a.name.localeCompare(b.name));
  else if(sortBy==="score")list.sort((a,b)=>b.ws-a.ws);
  else list.sort((a,b)=>(b[sortBy]||0)-(a[sortBy]||0));

  grid.innerHTML=list.map((p,i)=>{
    const sel=selected.has(p.id);
    const rank=sortBy==="score"||sortBy==="alpha"?null:null; // rank only for score sort
    const showRank=sortBy!=="alpha";
    const bars=criteria.map(c=>{
      const pct=(p[c.key]/10)*100;
      return`<div class="score-row"><span class="slbl">${c.label}</span><div class="sbar"><div class="sfill" style="width:${pct}%;background:${sColor(p[c.key])}"></div></div><span class="sval">${p[c.key]}</span></div>`;
    }).join("");
    const domain=p.website?new URL(p.website).hostname:'';
    return`<div class="pcard" onclick="cardClick('${p.id}',event)" style="cursor:pointer">
      ${showRank?`<span class="rank-badge">#${i+1}</span>`:''}
      <label class="compare-check ${sel?'active':''}" onclick="event.preventDefault();event.stopPropagation();toggleCompare('${p.id}',event)"><input type="checkbox" ${sel?'checked':''}>${sel?'\u2713 Compare':'+ Compare'}</label>
      <div style="margin-bottom:.5rem">${momentumTag(p)}</div>
      <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.4rem">
        ${domain?`<div class="platform-logo"><img src="https://logo.clearbit.com/${domain}" alt="" onerror="this.src='https://www.google.com/s2/favicons?domain=${domain}&sz=64'"></div>`:''}
        <h3 style="margin:0">${p.name}</h3>
      </div>
      <div class="tagline">${p.tagline}</div>
      <div class="card-cat">${catBadge(p)} ${uxBadges(p.uxApproach)}</div>
      ${bars}
      <div class="overall"><span class="olbl">Weighted Score</span><span class="oval">${p.ws} <span style="font-size:.7rem;font-weight:400;color:var(--text-dim)">/ 10</span></span></div>
      ${verdictLine(p)}
      <div class="pmeta"><strong>${p.pricing}</strong></div>
    </div>`;
  }).join("");
}

// --- TABLE STAKES ---
function renderStakes(){
  const area=document.getElementById("stakesArea");
  if(!stakesExpanded){
    area.innerHTML=`<div class="stakes-compact">All platforms include: ${tableStakes.join(", ")}. <span class="stakes-expand" onclick="stakesExpanded=true;renderStakes()">Show as grid &darr;</span></div>`;
  }else{
    area.innerHTML=`<div class="stakes-grid">${tableStakes.map(s=>`<div class="stake-item"><span class="si-icon">\u2713</span>${s}</div>`).join("")}</div><div style="margin-bottom:1rem"><span class="stakes-expand" onclick="stakesExpanded=false;renderStakes()">Collapse &uarr;</span></div>`;
  }

  document.getElementById("diffCards").innerHTML=differentiators.map(d=>{
    const pref=userPrefs[d.id]||{};
    const options=d.options.map(o=>{
      const isSel=pref.optionId===o.id;
      return`<div class="diff-option ${isSel?'selected':''}" onclick="selectDiffOption('${d.id}','${o.id}')">
        <div class="opt-radio"></div>
        <div>
          <div class="opt-label">${o.label}</div>
          <div class="opt-tags">${o.detail}<br>${o.tags.map(t=>`<span class="diff-tag">${t}</span>`).join(" ")}</div>
        </div>
      </div>`;
    }).join("");
    // Only show importance if selection is a positive preference (not "none", "notneeded", "saas", "free")
    const selectedOpt=d.options.find(o=>o.id===pref.optionId);
    const isNeutralChoice=selectedOpt&&(selectedOpt.id==='none'||selectedOpt.id==='notneeded'||selectedOpt.id==='saas'||selectedOpt.id==='free');
    const impBtns=(pref.optionId&&!isNeutralChoice)?`<div class="diff-importance">
      <span style="font-size:.75rem;color:var(--text-dim);margin-right:.25rem">How important is this to your decision?</span>
      <button class="imp-btn ${pref.importance==='must'?'active':''}" onclick="setDiffImportance('${d.id}','must')">Must-have</button>
      <button class="imp-btn ${pref.importance==='nice'?'active-nice':''}" onclick="setDiffImportance('${d.id}','nice')">Nice-to-have</button>
      <button class="imp-btn ${pref.importance==='not'?'active-not':''}" onclick="setDiffImportance('${d.id}','not')">Not important</button>
    </div>`:'';
    return`<div class="diff-card"><h4>${d.title}</h4><p>${d.desc}</p><div class="diff-options">${options}</div>${impBtns}</div>`;
  }).join("");

  renderPrefsSummary();
}

function selectDiffOption(diffId,optId){
  if(!userPrefs[diffId])userPrefs[diffId]={};
  userPrefs[diffId].optionId=optId;
  if(!userPrefs[diffId].importance)userPrefs[diffId].importance='nice';
  renderStakes();
}

function setDiffImportance(diffId,imp){
  if(!userPrefs[diffId])return;
  userPrefs[diffId].importance=imp;
  renderStakes();
}

function renderPrefsSummary(){
  const div=document.getElementById("prefsSummary");
  const prefs=Object.entries(userPrefs).filter(([,v])=>v.optionId);
  if(prefs.length===0){div.innerHTML='';return}

  // Calculate which platforms match the most preferences
  const scores={};
  platforms.forEach(p=>scores[p.id]=0);

  prefs.forEach(([diffId,pref])=>{
    const diff=differentiators.find(d=>d.id===diffId);
    const opt=diff?.options.find(o=>o.id===pref.optionId);
    if(!opt)return;
    const weight=pref.importance==='must'?3:pref.importance==='nice'?1:0;
    opt.tags.forEach(tag=>{
      platforms.forEach(p=>{
        if(tag===p.name||p.name.includes(tag)||tag.includes(p.name))scores[p.id]+=weight;
      });
    });
  });

  const ranked=platforms.map(p=>({...p,prefScore:scores[p.id]})).filter(p=>p.prefScore>0).sort((a,b)=>b.prefScore-a.prefScore);
  const mustHaves=prefs.filter(([,v])=>v.importance==='must').length;
  const niceToHaves=prefs.filter(([,v])=>v.importance==='nice').length;

  if(ranked.length===0){div.innerHTML='';return}

  div.innerHTML=`<div class="diff-your-prefs" style="margin-top:1.5rem">
    <strong>Platforms that match your preferences</strong> (${mustHaves} must-have${mustHaves!==1?'s':''}, ${niceToHaves} nice-to-have${niceToHaves!==1?'s':''}), ranked by how many of your selections they appear in:
    <div style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem">
      ${ranked.slice(0,5).map((p,i)=>`<span style="display:inline-flex;align-items:center;gap:.35rem;padding:.3rem .7rem;border-radius:6px;font-size:.84rem;font-weight:600;${i===0?'background:var(--amber);color:#000':'background:var(--border);color:var(--text)'}">${i===0?'\u2605 ':''} ${p.name}</span>`).join("")}
    </div>
    <div style="margin-top:.75rem"><button class="ai-apply-btn" onclick="autoSelectFromPrefs()">Compare these platforms side by side &rarr;</button></div>
  </div>`;
}

function autoSelectFromPrefs(){
  const scores={};
  platforms.forEach(p=>scores[p.id]=0);
  Object.entries(userPrefs).forEach(([diffId,pref])=>{
    const diff=differentiators.find(d=>d.id===diffId);
    const opt=diff?.options.find(o=>o.id===pref.optionId);
    if(!opt)return;
    const weight=pref.importance==='must'?3:pref.importance==='nice'?1:0;
    opt.tags.forEach(tag=>{
      platforms.forEach(p=>{
        if(tag===p.name||p.name.includes(tag)||tag.includes(p.name))scores[p.id]+=weight;
      });
    });
  });
  const ranked=platforms.map(p=>({...p,prefScore:scores[p.id]})).sort((a,b)=>b.prefScore-a.prefScore);
  selected.clear();
  ranked.slice(0,3).forEach(p=>selected.add(p.id));
  switchTab('compare');
  updateCompareBar();
}

// --- PROFILE PAGE (two-column with sidebar) ---
function showProfile(id){
  const p=platforms.find(x=>x.id===id);
  const pp=document.getElementById("profilePage");
  const feats=Object.entries(p.communityFeatures).map(([k,v])=>{
    const cls=v===true?"yes":v===false?"no":"partial";
    const icon=v===true?"\u2713":v===false?"\u2717":"\u25CB";
    return`<div class="fi ${cls}">${icon} ${k}</div>`;
  }).join("");

  // Accordion for execution
  const execItems=p.execution?Object.entries(p.execution).map(([k,v],i)=>
    `<div class="exec-item"><div class="exec-header" onclick="this.querySelector('.exec-chev').classList.toggle('open');this.nextElementSibling.classList.toggle('open')">${k}<span class="exec-chev">\u25BC</span></div><div class="exec-body">${v}</div></div>`
  ).join(""):"";

  const news=p.recentNews.map(n=>`<div class="news-item"><div class="news-date">${n.date}</div><div class="news-text">${n.text}</div></div>`).join("");
  const integ=p.keyIntegrations.map(i=>`<li>${i}</li>`).join("");
  const pros=p.strengths.map(s=>`<li>${s}</li>`).join("");
  const cons=p.considerations.map(s=>`<li>${s}</li>`).join("");
  const examples=p.examples.map(e=>{
    const domain=e.url?new URL(e.url).hostname:'';
    const favicon=domain?`<img class="example-favicon" src="https://www.google.com/s2/favicons?domain=${domain}&sz=32" alt="" onerror="this.style.display='none'">`:'';
    return`<div class="example-item">${favicon}<div class="example-info"><div class="example-name">${e.url?`<a href="${e.url}" target="_blank" rel="noopener">${e.name} &rarr;</a>`:e.name}</div><div class="example-desc">${e.desc}</div></div></div>`;
  }).join("");
  const scoreBars=criteria.map(c=>{
    const pct=(p[c.key]/10)*100;
    const explainer=p.scoreExplainers?.[c.key]||'';
    return`<div style="margin-bottom:.5rem"><div class="score-row"><span class="slbl">${c.label}</span><div class="sbar"><div class="sfill" style="width:${pct}%;background:${sColor(p[c.key])}"></div></div><span class="sval">${p[c.key]}</span></div>${explainer?`<div style="font-size:.7rem;color:var(--text-dim);margin-top:.15rem;padding-left:.25rem;line-height:1.4">${explainer}</div>`:''}</div>`;
  }).join("");

  const isPlaceholder=p.editorial.startsWith("[");

  pp.innerHTML=`
    <button class="profile-back" onclick="hideProfile()">&larr; Back to all platforms</button>
    <div class="profile-hero">
      <div style="margin-bottom:.6rem">${momentumTag(p)}</div>
      <h2>${p.name}</h2>
      <div style="margin:.4rem 0 .6rem">${catBadge(p)} ${uxBadges(p.uxApproach)}</div>
      <div class="p-tagline">${p.tagline}</div>
      <div class="p-meta"><strong>Pricing:</strong> ${p.pricing} &middot; <strong>Target:</strong> ${p.target}${p.website?` &middot; <a href="${p.website}" target="_blank" rel="noopener">${p.website.replace('https://','').replace('www.','').replace(/\/$/,'')}</a>`:''}</div>
      ${verdictLine(p)}
    </div>
    <div class="profile-layout">
      <div class="profile-main">
        <div class="profile-section">
          <h4>How It Works</h4>
          <p style="font-size:.85rem;color:var(--text-dim);margin-bottom:.5rem">Click each topic to expand.</p>
          ${execItems}
        </div>
        <div class="profile-section strengths-section">
          <h4>Strengths</h4>
          <ul>${pros}</ul>
        </div>
        <div class="profile-section considerations-section">
          <h4>Considerations</h4>
          <ul>${cons}</ul>
        </div>
        <div class="profile-section">
          <h4>Example Communities</h4>
          ${examples}
        </div>
        <div class="profile-section">
          <h4>Feature Checklist</h4>
          <div class="feat-grid">${feats}</div>
        </div>
        <div class="profile-section">
          <h4>Recent News &amp; Updates</h4>
          ${news}
        </div>
        ${!isPlaceholder?`<div class="profile-section"><div class="editorial-box"><h4>FeverBee Editorial</h4><p>${p.editorial}</p></div></div>`:''}
      </div>
      <div class="profile-sidebar">
        <div class="sidebar-card">
          <h4>Scores</h4>
          ${scoreBars}
          <div style="margin-top:.6rem"><div style="font-size:.78rem;color:var(--text-dim);margin-bottom:.15rem">Weighted Score</div><div style="font-size:1.5rem;font-weight:800;color:var(--amber)">${weightedScore(p)} <span style="font-size:.75rem;font-weight:400;color:var(--text-dim)">/ 10</span></div></div>
        </div>
        <div class="sidebar-card">
          <h4>Key Info</h4>
          <div class="sidebar-stat"><span class="stat-label">Pricing</span><span class="stat-val" style="font-size:.8rem">${p.pricing}</span></div>
          <div class="sidebar-stat"><span class="stat-label">Target</span><span class="stat-val">${p.target}</span></div>
          ${p.website?`<div style="margin-top:.5rem"><a class="sidebar-link" href="${p.website}" target="_blank" rel="noopener">Visit website &rarr;</a></div>`:''}
        </div>
        <div class="sidebar-card">
          <h4>Key Integrations</h4>
          <ul style="list-style:none;padding:0">${p.keyIntegrations.slice(0,6).map(i=>`<li style="font-size:.84rem;padding:.15rem 0;color:var(--text-sec)">${i}</li>`).join("")}</ul>
        </div>
        <div class="sidebar-card compare-with">
          <h4>Compare with...</h4>
          <select id="compareWithSelect">
            ${platforms.filter(x=>x.id!==p.id).map(x=>`<option value="${x.id}">${x.name}</option>`).join("")}
          </select>
          <button class="compare-with-btn" onclick="compareWith('${p.id}')">Compare side by side &rarr;</button>
        </div>
        <div class="cta-box" style="margin:0;border-radius:var(--radius)">
          <h3 style="font-size:.95rem">Need help deciding?</h3>
          <p style="font-size:.82rem">1-hour session with a FeverBee community strategist. We'll review your requirements and give an honest recommendation.</p>
          <a class="cta-btn" style="font-size:.85rem;padding:.6rem 1.25rem" href="mailto:richard@feverbee.com?subject=Platform%20Consultation%20-%20${encodeURIComponent(p.name)}&body=Hi%20Richard%2C%0A%0AI'm%20considering%20${encodeURIComponent(p.name)}%20and%20would%20like%20to%20book%20a%201-hour%20consultation%20(%24325).%0A%0AOrganisation%3A%20%0AKey%20requirements%3A%20%0A%0AThanks">Book consultation — $325</a>
        </div>
      </div>
    </div>`;

  document.querySelectorAll(".tab-panel").forEach(t=>t.classList.remove("active"));
  document.querySelector(".tab-bar").style.display="none";
  document.getElementById("compareBar").classList.remove("show");
  pp.classList.add("active");
  pp.scrollIntoView({behavior:'smooth',block:'start'});
  updateHash('platform/'+id);
}

function compareWith(currentId){
  const otherId=document.getElementById('compareWithSelect').value;
  selected.clear();
  selected.add(currentId);
  selected.add(otherId);
  switchTab('compare');
  updateHash('compare/'+currentId+','+otherId);
}

function hideProfile(){
  document.getElementById("profilePage").classList.remove("active");
  const activeTab=document.querySelector(".tab-btn.active");
  if(activeTab)switchTab(activeTab.dataset.tab);
  else switchTab("overview");
}

// --- COMPARE ---
function renderComparePicker(){
  const picker=document.getElementById("comparePlatformPicker");
  if(!picker)return;
  picker.innerHTML=`<div class="picker-hint">Select 2&ndash;4 platforms to compare:</div><div class="platform-picker">${platforms.map(p=>{
    const picked=selected.has(p.id);
    return`<button class="picker-chip ${picked?'picked':''}" onclick="toggleCompareChip('${p.id}')">${p.name}</button>`;
  }).join("")}</div>`;
}

function toggleCompareChip(id){
  if(selected.has(id)){selected.delete(id)}
  else{if(selected.size>=4)return;selected.add(id)}
  renderComparePicker();
  renderCompare();
  updateCompareBar();
}

function renderCompare(){
  renderComparePicker();
  const ct=document.getElementById("compareContent");
  const summaryDiv=document.getElementById("compareSummary");
  if(selected.size<2){ct.innerHTML='<div class="empty-cmp"><h3>Select at least 2 platforms above</h3><p>Click platform names to add or remove them from the comparison.</p></div>';summaryDiv.innerHTML='';return}
  const picks=platforms.filter(p=>selected.has(p.id));

  // AI comparison summary
  const pickIds=[...selected].sort().join(',');
  const prevIds=summaryDiv.dataset.pickIds||'';
  if(pickIds!==prevIds){
    summaryDiv.dataset.pickIds=pickIds;
    summaryDiv.innerHTML=`<div class="ai-compare-summary">
      <h4>Quick Comparison Summary</h4>
      <div class="summary-text">${generateLocalSummary(picks)}</div>
      <div style="margin-top:.75rem">
        <button class="summary-gen-btn" onclick="generateAiSummary()">Generate detailed AI analysis</button>
        <span style="font-size:.72rem;color:var(--text-dim);margin-left:.5rem">Powered by Claude</span>
      </div>
    </div>`;
  }
  const diffOnly=document.getElementById("diffToggle")?.checked||false;
  const hdr=picks.map(p=>`<th>${p.name}</th>`).join("");
  let rows="";

  rows+=`<tr style="background:var(--card)"><td style="font-weight:700">Weighted Score</td>${picks.map(p=>{const ws=weightedScore(p);return`<td style="font-weight:800;font-size:1rem;color:var(--amber)">${ws} <span style="font-size:.7rem;font-weight:400;color:var(--text-dim)">/ 10</span></td>`}).join("")}</tr>`;
  rows+=`<tr style="background:var(--card)"><td>FeverBee Verdict</td>${picks.map(p=>`<td style="font-size:.82rem;font-style:italic;color:var(--text-sec)">${p.verdict}</td>`).join("")}</tr>`;
  rows+=`<tr style="background:var(--card)"><td>Category</td>${picks.map(p=>`<td>${catBadge(p)}</td>`).join("")}</tr>`;
  rows+=`<tr style="background:var(--card)"><td>UX Approach</td>${picks.map(p=>`<td>${uxBadges(p.uxApproach)}</td>`).join("")}</tr>`;

  rows+=`<tr class="sec-row"><td colspan="${picks.length+1}">Buzz Report Criteria (out of 10)</td></tr>`;
  criteria.forEach(c=>{
    const vals=picks.map(p=>p[c.key]);
    const allSame=vals.every(v=>v===vals[0]);
    const best=Math.max(...vals);
    if(diffOnly&&allSame)return;
    rows+=`<tr class="${allSame?'same-row':''}"><td>${c.label}</td>${picks.map(p=>{
      const v=p[c.key];const isBest=v===best&&picks.filter(pp=>pp[c.key]===best).length<picks.length;
      const explainer=p.scoreExplainers?.[c.key]||'';
      return`<td class="${isBest?'winner':''}"><div class="cbar-cell"><div class="cmbar"><div class="cmfill" style="width:${(v/10)*100}%;background:${sColor(v)}"></div></div><span style="font-weight:700;color:var(--text)">${v}</span></div>${explainer?`<div style="font-size:.72rem;color:var(--text-dim);margin-top:.3rem;line-height:1.4;text-align:left">${explainer}</div>`:''}</td>`;
    }).join("")}</tr>`;
  });

  const execKeys=["Discussions","Q&A","Ideation","Knowledge Base","Content Format","AI Approach","Events","Mobile","Unique Features"];
  rows+=`<tr class="sec-row"><td colspan="${picks.length+1}">How They Execute</td></tr>`;
  execKeys.forEach(k=>{
    const vals=picks.map(p=>p.execution?.[k]||"N/A");
    const allSame=vals.every(v=>v===vals[0]);
    if(diffOnly&&allSame)return;
    rows+=`<tr class="${allSame?'same-row':''}"><td>${k}</td>${picks.map(p=>`<td class="exec-cell">${p.execution?.[k]||"N/A"}</td>`).join("")}</tr>`;
  });

  const allKeys=[...new Set(picks.flatMap(p=>Object.keys(p.communityFeatures)))];
  const diffFeats=allKeys.filter(k=>{const vals=picks.map(p=>p.communityFeatures[k]!=null?p.communityFeatures[k]:false);return!vals.every(v=>v===vals[0])});
  const featsToShow=diffOnly?diffFeats:allKeys;
  if(featsToShow.length>0){
    rows+=`<tr class="sec-row"><td colspan="${picks.length+1}">${diffOnly?'Features That Differ':'All Features'}</td></tr>`;
    featsToShow.forEach(k=>{
      const vals=picks.map(p=>p.communityFeatures[k]!=null?p.communityFeatures[k]:false);
      const allSame=vals.every(v=>v===vals[0]);
      rows+=`<tr class="${allSame?'same-row':''}"><td>${k}</td>${picks.map(p=>`<td>${fBadge(p.communityFeatures[k]!=null?p.communityFeatures[k]:false)}</td>`).join("")}</tr>`;
    });
  }

  rows+=`<tr class="sec-row"><td colspan="${picks.length+1}">Pricing &amp; Market</td></tr>`;
  rows+=`<tr><td>Pricing</td>${picks.map(p=>`<td style="font-size:.82rem;font-weight:600">${p.pricing}</td>`).join("")}</tr>`;
  rows+=`<tr><td>Target Market</td>${picks.map(p=>`<td style="font-size:.84rem">${p.target}</td>`).join("")}</tr>`;
  rows+=`<tr><td>Example Communities</td>${picks.map(p=>`<td style="font-size:.82rem;text-align:left">${p.examples.map(e=>e.url?`<a href="${e.url}" target="_blank" rel="noopener">${e.name}</a>`:e.name).join("<br>")}</td>`).join("")}</tr>`;

  ct.innerHTML=`<div class="ctable-wrap"><table class="ctable"><thead><tr><th>Criteria</th>${hdr}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

// --- LOCAL COMPARISON SUMMARY ---
function generateLocalSummary(picks){
  if(picks.length<2)return'';
  const lines=[];

  // UX approach differences
  const uxTypes=picks.map(p=>({name:p.name,ux:p.uxApproach.map(a=>a.label).join(' + ')}));
  const uxSame=uxTypes.every(u=>u.ux===uxTypes[0].ux);
  if(!uxSame){
    lines.push(`<strong>UX approach:</strong> ${uxTypes.map(u=>`${u.name} uses a ${u.ux} approach`).join(', while ')}. This is a fundamental difference in how members will experience the community.`);
  }

  // Score comparison - find biggest gaps
  const gaps=[];
  criteria.forEach(c=>{
    const vals=picks.map(p=>({name:p.name,val:p[c.key]}));
    const max=Math.max(...vals.map(v=>v.val));
    const min=Math.min(...vals.map(v=>v.val));
    if(max-min>=1.5){
      const best=vals.find(v=>v.val===max);
      const worst=vals.find(v=>v.val===min);
      gaps.push({label:c.label,best:best.name,worst:worst.name,gap:max-min,bestVal:max,worstVal:min});
    }
  });
  if(gaps.length>0){
    const topGap=gaps.sort((a,b)=>b.gap-a.gap)[0];
    lines.push(`<strong>Biggest scoring gap:</strong> ${topGap.label} — ${topGap.best} scores ${topGap.bestVal} vs ${topGap.worst} at ${topGap.worstVal}. A ${topGap.gap}-point difference.`);
  }

  // Pricing comparison
  const prices=picks.map(p=>`${p.name}: ${p.pricing}`);
  lines.push(`<strong>Pricing:</strong> ${prices.join(' vs ')}.`);

  // Category differences
  const cats=[...new Set(picks.map(p=>p.catLabel))];
  if(cats.length>1){
    lines.push(`<strong>Different categories:</strong> You're comparing across ${cats.join(' and ')} — these serve different markets and use cases.`);
  }

  // Verdicts
  lines.push(`<strong>FeverBee verdicts:</strong> ${picks.map(p=>`${p.name} — ${p.verdict}`).join('. ')}.`);

  return lines.join('<br><br>');
}

async function generateAiSummary(){
  const picks=platforms.filter(p=>selected.has(p.id));
  const summaryDiv=document.getElementById("compareSummary");
  const apiKey=document.getElementById("aiApiKey")?.value?.trim()||'';

  if(!apiKey&&!AI_PROXY_URL){
    summaryDiv.querySelector('.summary-text').innerHTML=generateLocalSummary(picks)+`<br><br><em style="color:var(--text-dim)">For a more detailed AI analysis, <a href="mailto:richard@feverbee.com?subject=Platform%20Comparison%20Request" style="color:var(--amber)">contact FeverBee</a> or configure the AI backend.</em>`;
    return;
  }

  const btn=summaryDiv.querySelector('.summary-gen-btn');
  btn.disabled=true;btn.textContent='Analysing...';

  const platformSummaries=picks.map(p=>{
    return`${p.name}: ${p.tagline}. Pricing: ${p.pricing}. Target: ${p.target}. UX: ${p.uxApproach.map(a=>a.label).join(', ')}. Verdict: ${p.verdict}. Strengths: ${p.strengths.join('; ')}. Considerations: ${p.considerations.join('; ')}.`;
  }).join('\n\n');

  const prompt=`Compare these community platforms in 150-200 words. Be specific and opinionated — what are the 3-4 key differences that would actually affect someone's decision? Don't just list features. Explain the trade-offs in plain English.

${platformSummaries}

Write in a direct, consultancy tone. No bullet points — flowing paragraphs. Start with the single most important difference.`;

  try{
    let resp;
    if(AI_PROXY_URL){
      resp=await fetch(AI_PROXY_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requirements:prompt,systemPrompt:"You are a FeverBee community platform analyst. Write concise, opinionated comparison summaries. No JSON — just plain text paragraphs."})});
    }else{
      resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,messages:[{role:"user",content:prompt}]})});
    }
    const data=await resp.json();
    const text=data.content?.[0]?.text||data.error?.message||'Could not generate summary';
    summaryDiv.querySelector('.summary-text').innerHTML=text.replace(/\n\n/g,'<br><br>');
    btn.textContent='Regenerate analysis';btn.disabled=false;
  }catch(e){
    summaryDiv.querySelector('.summary-text').innerHTML+=`<br><br><em style="color:var(--red)">Error: ${e.message}</em>`;
    btn.textContent='Try again';btn.disabled=false;
  }
}

// --- NAVIGATION ---
function switchTab(tab){
  document.getElementById("profilePage").classList.remove("active");
  // Keep tab-bar hidden (pathway cards replace it) but update internal state
  document.querySelectorAll(".tab-btn").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
  document.querySelectorAll(".tab-panel").forEach(p=>p.classList.toggle("active",p.id==="panel-"+tab));
  // Sync pathway cards
  document.querySelectorAll('.pathway-card').forEach(c=>{
    c.classList.toggle('pw-active',c.dataset.tab===tab);
  });
  if(tab==="compare"){renderCompare();document.getElementById("compareBar").classList.remove("show")}
  else if(tab==="stakes"){renderStakes();document.getElementById("compareBar").classList.remove("show")}
  else{updateCompareBar()}
  // Scroll to the content, not the very top of the page
  const panel=document.getElementById("panel-"+tab);
  if(panel)panel.scrollIntoView({behavior:'smooth',block:'start'});
  if(tab==='compare'&&selected.size>=2)updateHash('compare/'+[...selected].join(','));
  else updateHash(tab);
}

document.querySelectorAll(".tab-btn").forEach(b=>b.addEventListener("click",()=>switchTab(b.dataset.tab)));
document.getElementById("searchInput").addEventListener("input",renderOverview);

// Back to top
window.addEventListener("scroll",()=>{
  document.getElementById("backToTop").classList.toggle("show",window.scrollY>400);
});

// Requirements form
function submitReq(e){
  e.preventDefault();
  const form=document.getElementById("reqForm");
  const data=new FormData(form);
  const name=data.get("name"),email=data.get("email"),org=data.get("org"),reqs=data.get("requirements");
  const subject=encodeURIComponent("Platform Recommendation Request from "+name);
  const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\nOrganisation: ${org}\n\nRequirements:\n${reqs}`);
  window.location.href=`mailto:richard@feverbee.com?subject=${subject}&body=${body}`;
  form.style.display="none";
  document.getElementById("reqSuccess").style.display="block";
}

// --- PDF EXPORT ---
function exportPdf(){
  const el=document.getElementById("compareContent");
  if(!el||!el.innerHTML.trim())return;
  const opt={
    margin:[10,10,10,10],
    filename:'FeverBee-Platform-Comparison.pdf',
    image:{type:'jpeg',quality:0.95},
    html2canvas:{scale:2,useCORS:true,backgroundColor:'#0D0D0D'},
    jsPDF:{unit:'mm',format:'a3',orientation:'landscape'}
  };
  // Wrap with title
  const wrapper=document.createElement("div");
  wrapper.style.cssText="padding:20px;font-family:Montserrat,sans-serif;background:#0D0D0D;color:#fff";
  wrapper.innerHTML=`<div style="text-align:center;margin-bottom:16px"><div style="font-size:11px;font-weight:700;letter-spacing:1px;color:#999;text-transform:uppercase;margin-bottom:4px">FEVERBEE</div><h2 style="font-size:18px;font-weight:600;color:#fff;margin:0 0 4px">Community Platform Comparison</h2><p style="font-size:12px;color:#999;margin:0">Generated ${new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})} &middot; feverbee.com</p></div>`+el.innerHTML;
  document.body.appendChild(wrapper);
  html2pdf().set(opt).from(wrapper).save().then(()=>document.body.removeChild(wrapper));
}


// --- PATHWAY CARDS ---
document.querySelectorAll('.pathway-card').forEach(card=>{
  card.addEventListener('click',()=>{
    document.querySelectorAll('.pathway-card').forEach(c=>c.classList.remove('pw-active'));
    card.classList.add('pw-active');
    const tab=card.dataset.tab;
    if(tab)switchTab(tab);
  });
});

// --- QUICK PICKS ---
function renderQuickPicks(){
  const scored=platforms.map(p=>({...p,ws:+weightedScore(p)}));
  const topRated=scored.sort((a,b)=>b.ws-a.ws)[0];
  const easiest=platforms.slice().sort((a,b)=>b.easeOfUse-a.easeOfUse)[0];
  const bestInt=platforms.slice().sort((a,b)=>b.integrations-a.integrations)[0];
  const rising=platforms.filter(p=>p.verdictType==='rising').sort((a,b)=>+weightedScore(b)-+weightedScore(a))[0];
  const picks=[
    {label:'Highest Rated',name:topRated?.name,color:'#E8A020',id:topRated?.id},
    {label:'Easiest to Use',name:easiest?.name,color:'#2D8659',id:easiest?.id},
    {label:'Best Integrations',name:bestInt?.name,color:'#6C5CE7',id:bestInt?.id},
    {label:'Most Momentum',name:rising?.name,color:'#E8A020',id:rising?.id}
  ];
  const el=document.getElementById('quickPicks');
  if(el)el.innerHTML=picks.map(p=>
    `<div class="quick-pick" onclick="showProfile('${p.id}')"><div class="qp-label" style="color:${p.color}">${p.label}</div><div class="qp-name">${p.name}</div></div>`
  ).join('');
}

// --- URL ROUTING ---
function updateHash(hash){
  history.replaceState(null,null,'#'+hash);
}
function handleHash(){
  const hash=location.hash.slice(1);
  if(!hash)return;
  if(hash.startsWith('platform/')){
    const id=hash.split('/')[1];
    if(platforms.find(p=>p.id===id))showProfile(id);
  }else if(hash.startsWith('compare/')){
    const ids=hash.split('/')[1].split(',');
    selected.clear();
    ids.forEach(id=>{if(platforms.find(p=>p.id===id))selected.add(id)});
    switchTab('compare');
  }else if(hash==='stakes'||hash==='compare'||hash==='overview'){
    switchTab(hash);
  }
}
window.addEventListener('hashchange',handleHash);

// Init
renderPills();
renderWeights();
renderOverview();
renderQuickPicks();
updateCompareBar();
// Handle initial hash - try immediately and retry if platforms aren't ready
handleHash();
if(location.hash)window.addEventListener('load',handleHash);
