/* Systemic Hypertension Lab application controller. */
(() => {
  "use strict";
  const content = window.HypertensionContent;
  if (!content) throw new Error("HypertensionContent failed to load.");

  const KEYS = {
    visited:"hypertension-lab-visited-v1",bookmarks:"hypertension-lab-bookmarks-v1",
    rate:"hypertension-lab-rate-v1",theme:"hypertension-lab-theme-v1",quiz:"hypertension-lab-quiz-v1"
  };
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const storage={get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};
  const readJSON=(k,f)=>{try{return JSON.parse(storage.get(k))??f}catch{return f}}, writeJSON=(k,v)=>storage.set(k,JSON.stringify(v));
  const allItems=content.navGroups.flatMap(g=>g.items);
  const els={
    nav:$("#course-nav"),app:$("#app-content"),currentLabel:$("#current-section-label"),sidebar:$("#sidebar"),scrim:$("#sidebar-scrim"),menu:$("#menu-button"),closeSidebar:$("#sidebar-close"),
    progressLabel:$("#progress-label"),progressBar:$("#progress-bar"),resetProgress:$("#reset-progress"),clearBookmarks:$("#clear-bookmarks"),search:$("#site-search"),searchResults:$("#search-results"),
    voiceStatus:$("#voice-status"),speechRate:$("#speech-rate"),stopSpeech:$("#stop-speech"),print:$("#print-button"),theme:$("#theme-toggle"),bookmarksButton:$("#bookmarks-button"),
    bookmarkDialog:$("#bookmark-dialog"),bookmarkList:$("#bookmark-list"),closeBookmarks:$("#close-bookmarks"),toast:$("#toast")
  };
  const state={
    route:"overview",visited:new Set(readJSON(KEYS.visited,["overview"])),bookmarks:readJSON(KEYS.bookmarks,[]),voices:[],voice:null,speechUnit:null,speechButton:null,
    flashcards:[...content.flashcards],flashFilter:"All",caseIndex:0,quiz:Object.assign({index:0,score:0,answered:false,finished:false,selected:null},readJSON(KEYS.quiz,{}))
  };

  function buildNav(){
    els.nav.innerHTML=content.navGroups.map(group=>`<div class="nav-group"><div class="nav-group-title">${group.title}</div>${group.items.map(item=>`<button class="nav-link" type="button" data-route="${item.id}"><span class="nav-index">${String(allItems.indexOf(item)+1).padStart(2,"0")}</span><span>${item.label}</span><span class="nav-mark" aria-hidden="true"></span></button>`).join("")}</div>`).join("");
  }
  function routeFromHash(){const id=location.hash.replace(/^#/,"");return content.modules[id]?id:"overview"}
  function navigate(route,replace=false){if(!content.modules[route])route="overview";if(replace){history.replaceState(null,"",`#${route}`);render(route)}else if(location.hash!==`#${route}`)location.hash=route;else render(route)}
  function moduleNav(route){
    const i=allItems.findIndex(x=>x.id===route),prev=allItems[i-1],next=allItems[i+1];
    return `<nav class="module-nav" aria-label="Module navigation">${prev?`<button class="secondary-button" data-route="${prev.id}"><small>Previous</small><strong>← ${prev.label}</strong></button>`:"<span></span>"}${next?`<button class="secondary-button" data-route="${next.id}"><small>Next</small><strong>${next.label} →</strong></button>`:"<span></span>"}</nav>`;
  }
  function render(route){
    cancelSpeech();state.route=route;state.visited.add(route);writeJSON(KEYS.visited,[...state.visited]);
    const m=content.modules[route];
    els.app.innerHTML=`<article class="module" data-module="${route}"><header class="module-header"><div><p class="eyebrow">${m.kicker}</p><h1>${m.title}</h1><p class="module-lead">${m.lead}</p></div><div class="module-tools"><button class="icon-button bookmark-module ${state.bookmarks.includes(route)?"active":""}" type="button" aria-label="Bookmark this module" title="Bookmark">★</button></div></header>${m.html}${moduleNav(route)}</article>`;
    els.currentLabel.textContent=m.title;document.title=`${m.title} | Hypertension Lab`;state.visited.add(route);updateNav();addSpeechButtons();initRoute(route);closeSidebar();
    requestAnimationFrame(()=>{window.scrollTo({top:0,behavior:"instant"});$("#main-content").focus({preventScroll:true})});
  }
  function updateNav(){
    $$(".nav-link",els.nav).forEach(btn=>{btn.classList.toggle("active",btn.dataset.route===state.route);btn.classList.toggle("visited",state.visited.has(btn.dataset.route));btn.setAttribute("aria-current",btn.dataset.route===state.route?"page":"false")});
    const count=state.visited.size,total=allItems.length;els.progressLabel.textContent=`${count} / ${total}`;els.progressBar.style.width=`${Math.min(100,count/total*100)}%`;
  }
  function openSidebar(){els.sidebar.classList.add("open");els.scrim.hidden=false;els.menu.setAttribute("aria-expanded","true")}
  function closeSidebar(){els.sidebar.classList.remove("open");els.scrim.hidden=true;els.menu.setAttribute("aria-expanded","false")}
  function showToast(text){els.toast.textContent=text;els.toast.hidden=false;clearTimeout(showToast.t);showToast.t=setTimeout(()=>els.toast.hidden=true,2300)}

  function toggleBookmark(route){
    const i=state.bookmarks.indexOf(route);if(i>=0){state.bookmarks.splice(i,1);showToast("Bookmark removed")}else{state.bookmarks.push(route);showToast("Module bookmarked")}
    writeJSON(KEYS.bookmarks,state.bookmarks);const b=$(".bookmark-module");if(b)b.classList.toggle("active",state.bookmarks.includes(route));renderBookmarkList();
  }
  function renderBookmarkList(){
    els.bookmarkList.innerHTML=state.bookmarks.length?state.bookmarks.map(id=>{const m=content.modules[id];return `<div class="bookmark-item"><button data-bookmark-route="${id}"><strong>${m.title}</strong><small>${m.kicker}</small></button><button class="icon-button" data-remove-bookmark="${id}" aria-label="Remove bookmark">×</button></div>`}).join(""):`<div class="bookmark-empty">No bookmarks yet. Use ★ on a module to save it.</div>`;
  }

  function plainText(node){const clone=node.cloneNode(true);$$("button,script,style",clone).forEach(x=>x.remove());return clone.textContent.replace(/\s+/g," ").trim()}
  function loadVoices(){
    if(!("speechSynthesis" in window)){els.voiceStatus.textContent="TTS unavailable";return}
    state.voices=speechSynthesis.getVoices();const preferred=[/Google UK English Female/i,/Microsoft (Sonia|Libby|Hazel)/i,/en-GB.*female/i,/English.*female/i];state.voice=null;
    for(const p of preferred){state.voice=state.voices.find(v=>p.test(`${v.name} ${v.lang}`));if(state.voice)break}
    if(!state.voice)state.voice=state.voices.find(v=>v.lang?.toLowerCase().startsWith("en-gb"))||state.voices.find(v=>v.lang?.toLowerCase().startsWith("en"))||null;
    els.voiceStatus.textContent=state.voice?state.voice.name:"System voice";
  }
  function addSpeechButtons(){
    $$(".speech-unit",els.app).forEach((unit,i)=>{if($(".listen-button",unit))return;const b=document.createElement("button");b.className="listen-button interactive-only";b.type="button";b.textContent="▶ Listen";b.setAttribute("aria-label",`Listen to section ${i+1}`);b.addEventListener("click",()=>speakUnit(unit,b));unit.prepend(b)});
  }
  function resetSpeechButton(){if(state.speechButton)state.speechButton.textContent="▶ Listen";state.speechButton=null}
  function speakUnit(unit,button){
    if(!("speechSynthesis" in window)){showToast("Text-to-speech is unavailable");return}
    if(state.speechUnit===unit&&speechSynthesis.speaking&&!speechSynthesis.paused){speechSynthesis.pause();button.textContent="▶ Resume";return}
    if(state.speechUnit===unit&&speechSynthesis.paused){speechSynthesis.resume();button.textContent="Ⅱ Pause";return}
    cancelSpeech();const text=plainText(unit);if(!text)return;const utter=new SpeechSynthesisUtterance(text);utter.lang="en-GB";utter.rate=Number(els.speechRate.value);if(state.voice)utter.voice=state.voice;
    state.speechUnit=unit;state.speechButton=button;button.textContent="Ⅱ Pause";utter.onend=()=>{state.speechUnit=null;resetSpeechButton()};utter.onerror=()=>{state.speechUnit=null;resetSpeechButton()};speechSynthesis.speak(utter);
  }
  function cancelSpeech(){if("speechSynthesis" in window){speechSynthesis.cancel();if(speechSynthesis.paused)speechSynthesis.resume()}state.speechUnit=null;resetSpeechButton()}

  function search(query){
    const terms=query.trim().toLowerCase().split(/\s+/).filter(Boolean);if(!terms.length){els.searchResults.hidden=true;return}
    const hits=content.searchIndex.map(x=>{const hay=`${x.title} ${x.text}`.toLowerCase(),matched=terms.filter(t=>hay.includes(t)),title=terms.filter(t=>x.title.toLowerCase().includes(t)).length;return {...x,score:matched.length*3+title*7}}).filter(x=>x.score).sort((a,b)=>b.score-a.score).slice(0,10);
    els.searchResults.innerHTML=hits.length?hits.map(h=>`<button class="search-hit" type="button" data-search-route="${h.id}"><strong>${h.title}</strong><small>${h.text.slice(0,155)}…</small></button>`).join(""):`<div class="bookmark-empty">No matching module. Try a broader term.</div>`;els.searchResults.hidden=false;
  }
  function choiceToggle(selector,callback,multiple=false){
    $$(selector,els.app).forEach(btn=>btn.addEventListener("click",()=>{if(multiple){btn.classList.toggle("selected");btn.setAttribute("aria-pressed",String(btn.classList.contains("selected")))}else{$$(selector,els.app).forEach(x=>{x.classList.toggle("selected",x===btn);x.setAttribute("aria-pressed",String(x===btn))})}callback(btn)}));
  }

  function initClassification(){
    const sbp=$("#class-sbp"),dbp=$("#class-dbp"),ctx=$("#class-context"),out=$("#classification-result");
    const calc=()=>{const s=Number(sbp.value),d=Number(dbp.value);if(!Number.isFinite(s)||!Number.isFinite(d)){out.textContent="Enter valid values.";return}
      const esc=s>=140||d>=90?"Hypertension":s<120&&d<70?"Non-elevated BP":"Elevated BP";
      const aha=s>=140||d>=90?"Stage 2 hypertension":s>=130||d>=80?"Stage 1 hypertension":s>=120&&s<=129&&d<80?"Elevated BP":"Normal BP";
      const pp=s-d,isolated=(s>=140&&d<90)||((s>=130&&d<80));
      out.innerHTML=`<div class="result-title"><div><p class="eyebrow">Educational office classification</p><h3>${s}/${d} mmHg</h3></div>${isolated?'<span class="tag red">Isolated systolic pattern</span>':''}</div><div class="metric-row"><div class="metric"><strong>${esc}</strong><span>2024 ESC</span></div><div class="metric"><strong>${aha}</strong><span>2025 AHA/ACC</span></div><div class="metric"><strong>${pp}</strong><span>Pulse pressure (mmHg)</span></div></div><p class="small muted">Context selected: ${ctx.value}. Home and ambulatory thresholds and treatment decisions require the relevant protocol, repeated averages, risk, and clinical context.</p>`;
    };[sbp,dbp,ctx].forEach(x=>x.addEventListener("input",calc));calc();
  }
  function initMeasurement(){
    const map={
      "small-cuff":["Likely falsely high","Use a cuff whose bladder dimensions fit the arm circumference."],unsupported:["Likely falsely high","Support the back and arm; keep the cuff at heart level."],talking:["Transiently high","Allow quiet rest and do not talk during measurement."],clothing:["Unreliable","Place the cuff directly on bare upper-arm skin."],"full-bladder":["Transiently high","Empty the bladder and rest quietly for at least 5 minutes."],irregular:["Potentially inconsistent","Repeat several measurements and consider manual confirmation."]
    };
    const update=()=>{const sel=$$("#measurement-errors .selected",els.app);const out=$("#measurement-result");if(!sel.length){out.className="result-panel empty";out.textContent="Choose one or more errors to see the likely effect and the correction.";return}out.className="result-panel";out.innerHTML=`<h3>${sel.length} validity problem${sel.length>1?"s":""} detected</h3><div class="rank-list">${sel.map(b=>{const d=map[b.dataset.error];return `<div class="rank-item"><span class="score-badge">!</span><div><strong>${b.textContent}</strong><br><span class="small muted">${d[0]}. ${d[1]}</span></div></div>`}).join("")}</div><p class="small muted">Discard or repeat a clinically important invalid reading after correcting technique.</p>`};choiceToggle("#measurement-errors .choice-button",update,true);update();
  }
  function initConfirmation(){
    const run=()=>{const os=Number($("#office-sbp").value),od=Number($("#office-dbp").value),hs=Number($("#home-sbp").value),hd=Number($("#home-dbp").value),f=$("#pattern-framework").value;
      const officeHigh=f==="esc"?(os>=140||od>=90):(os>=130||od>=80),homeHigh=f==="esc"?(hs>=135||hd>=85):(hs>=130||hd>=80);let label,desc,tone="";
      if(officeHigh&&homeHigh){label="Sustained hypertension pattern";desc="Both settings are elevated, supporting persistent exposure.";tone="red"}else if(officeHigh&&!homeHigh){label="White-coat pattern";desc="Office elevation is not reproduced at home. Validate home technique/device and follow risk over time."}else if(!officeHigh&&homeHigh){label="Masked hypertension pattern";desc="Out-of-office pressure is elevated despite an apparently acceptable clinic value.";tone="red"}else{label="No hypertensive pattern by this simplified threshold";desc="Continue appropriate risk-based follow-up; one set of averages does not replace clinical assessment.";tone="green"}
      $("#pattern-result").innerHTML=`<div class="result-title"><div><p class="eyebrow">Pattern interpretation</p><h3>${label}</h3></div><span class="tag ${tone}">${f==="esc"?"ESC-oriented":"AHA/ACC-oriented"}</span></div><p>${desc}</p><div class="metric-row"><div class="metric"><strong>${os}/${od}</strong><span>Office average</span></div><div class="metric"><strong>${hs}/${hd}</strong><span>Home average</span></div><div class="metric"><strong>${officeHigh===homeHigh?"Concordant":"Discordant"}</strong><span>Setting agreement</span></div></div><p class="small muted">This tool uses simplified teaching thresholds. Formal diagnosis follows the chosen guideline and structured measurement protocol.</p>`;
    };$("#pattern-check").addEventListener("click",run);run();
  }
  function initMechanisms(){
    const map={sympathetic:["Sympathetic activation","Higher heart rate, vasoconstriction, renin release, and stress-related variability. Chronic overactivity contributes to vascular remodeling and metabolic interaction."],raas:["RAAS activation","Renin generates angiotensin II–mediated vasoconstriction; aldosterone promotes sodium retention. Both contribute to cardiac and vascular remodeling."],sodium:["Renal sodium retention","Impaired sodium excretion expands extracellular volume and shifts pressure natriuresis, producing salt-sensitive and often treatment-resistant hypertension."],stiffness:["Arterial stiffness","A stiff aorta cannot buffer systolic ejection effectively. Pulse-wave reflection returns earlier, widening pulse pressure and increasing LV systolic load."],endothelium:["Endothelial dysfunction","Reduced nitric-oxide-mediated vasodilation and increased vasoconstrictor tone raise systemic vascular resistance."],obesity:["Obesity and insulin resistance","Renal compression, sympathetic and RAAS activation, sodium retention, sleep apnea, inflammation, and metabolic clustering reinforce pressure elevation."]};
    const show=b=>{const d=map[b.dataset.mechanism];$("#mechanism-result").innerHTML=`<p class="eyebrow">Mechanism</p><h3>${d[0]}</h3><p>${d[1]}</p>`};choiceToggle("#mechanism-buttons .pill-button",show);show($("#mechanism-buttons .selected"));
  }
  function initSecondary(){
    const causes={
      "Primary aldosteronism":{w:0,clues:{hypokalemia:5,young:1,snoring:1},why:"Mineralocorticoid excess is strongly suggested by resistant hypertension and hypokalemia."},
      "Renovascular disease":{w:0,clues:{bruit:5,flash:5,young:2,renal:2},why:"Bruit, flash edema, abrupt/resistant disease, and a major RAAS-blocker creatinine rise are high-yield clues."},
      "Renal parenchymal disease":{w:0,clues:{renal:5,young:1},why:"Albuminuria, abnormal urinalysis, and reduced eGFR point toward intrinsic kidney disease."},
      "Obstructive sleep apnea":{w:0,clues:{snoring:5,hypokalemia:1},why:"Snoring, witnessed apnea, daytime sleepiness, obesity, and nocturnal/non-dipping hypertension support OSA."},
      "Pheochromocytoma / paraganglioma":{w:0,clues:{episodes:6,young:1},why:"Episodic headache, palpitations, sweating, pallor, and labile pressure suggest catecholamine excess."},
      "Coarctation of the aorta":{w:0,clues:{armleg:6,young:3},why:"An arm–leg gradient and delayed femoral pulses are classic clues."},
      "Drug or substance effect":{w:0,clues:{drug:6},why:"A temporal relationship to NSAIDs, steroids, OCPs, stimulants, liquorice, alcohol, or illicit sympathomimetics may explain poor control."},
      "Other endocrine disease":{w:0,clues:{endocrine:6,young:1},why:"A characteristic phenotype should prompt targeted—not indiscriminate—hormonal testing."}
    };
    const update=()=>{const selected=$$("#secondary-clues .selected",els.app).map(x=>x.dataset.clue),out=$("#secondary-result");if(!selected.length){out.className="result-panel empty";out.textContent="Select clues to generate a ranked, explainable differential.";return}
      const ranked=Object.entries(causes).map(([name,c])=>({name,score:selected.reduce((s,k)=>s+(c.clues[k]||0),0),why:c.why})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,5),max=Math.max(...ranked.map(x=>x.score),1);
      out.className="result-panel";out.innerHTML=`<h3>Ranked diagnostic directions</h3><div class="rank-list">${ranked.map((x,i)=>`<div class="rank-item"><span class="score-badge">${i+1}</span><div><strong>${x.name}</strong><div class="rank-bar"><span style="width:${x.score/max*100}%"></span></div><span class="small muted">${x.why}</span></div></div>`).join("")}</div><p class="small muted">This ranks clue compatibility, not disease probability. Real testing depends on prevalence, medications, biochemistry, and specialist protocols.</p>`;
    };choiceToggle("#secondary-clues .choice-button",update,true);update();
  }
  function initAssessment(){
    const map={bp:["Blood-pressure history","Previous readings, age at onset, home values, treatment response, adherence, side effects, access to medication, and what measurement technique was used."],cardiac:["Cardiovascular symptoms","Exertional chest pain, dyspnea, orthopnea, palpitations, syncope, and claudication. Examine for LVH, murmurs, heart failure, and vascular disease."],neuro:["Neurologic and visual symptoms","TIA/stroke symptoms, cognitive change, severe headache, seizures, or visual loss. New focal deficits require urgent imaging."],renal:["Renal domain","Hematuria, edema, nocturia, reduced urine output, known kidney disease; examine for enlarged kidneys or abdominal/flank bruit."],secondary:["Secondary-cause clues","Snoring/apnea, episodic sweating/palpitations, muscle weakness, endocrine phenotype, drug/substance exposure, abrupt onset, or rapid worsening."],risk:["Global risk factors","Smoking, diabetes, dyslipidemia, obesity, inactivity, diet, alcohol, family history, psychosocial stress, established CVD, and CKD."],pregnancy:["Pregnancy and reproductive history","Current pregnancy, preeclampsia history, contraception, pregnancy plans, fetal monitoring needs, and potentially teratogenic medicines."]};
    const show=b=>{const d=map[b.dataset.assessment];$("#assessment-result").innerHTML=`<p class="eyebrow">Assessment domain</p><h3>${d[0]}</h3><p>${d[1]}</p>`};choiceToggle("#assessment-tabs .pill-button",show);show($("#assessment-tabs .selected"));
  }
  function initOrganDamage(){
    const map={heart:["Heart","Chronic: LV hypertrophy, diastolic dysfunction, atrial fibrillation, coronary disease, and heart failure. Acute: ACS, acute LV failure, and pulmonary edema.","ECG; echocardiography when structure/function will alter care; biomarkers and urgent imaging in acute presentations."],brain:["Brain","Chronic: small-vessel disease, cognitive decline, TIA, ischemic or hemorrhagic stroke. Acute: encephalopathy, intracerebral hemorrhage, or acute ischemic stroke.","Focused neurologic examination and urgent neuroimaging for acute symptoms."],kidney:["Kidney","Chronic: albuminuria, nephrosclerosis, CKD, progressive eGFR loss. Acute: AKI, hematuria, and rapidly worsening renal function.","Urinalysis, urine ACR, creatinine/eGFR, electrolytes, and targeted imaging."],retina:["Retina","Arteriolar narrowing, AV nicking, hemorrhages, cotton-wool spots, exudates, and papilledema in severe injury.","Fundoscopy is particularly important with severe BP, visual symptoms, or suspected emergency."],vessels:["Vasculature","Chronic atherosclerosis, peripheral arterial disease, and aneurysm; acute aortic dissection or rupture.","Pulse and bruit examination; urgent aortic imaging when sudden chest/back pain or major inter-arm difference occurs."]};
    const show=organ=>{$$("[data-organ]",els.app).forEach(x=>x.classList.toggle("active",x.dataset.organ===organ));const d=map[organ];$("#organ-result").innerHTML=`<p class="eyebrow">Target organ</p><h3>${d[0]}</h3><p>${d[1]}</p><p><strong>Useful assessment:</strong> ${d[2]}</p>`};$$("[data-organ]",els.app).forEach(b=>b.addEventListener("click",()=>show(b.dataset.organ)));show("heart");
  }
  function initInvestigations(){
    const map={baseline:["Baseline laboratory and ECG evaluation","Urinalysis and urine ACR; creatinine/eGFR; electrolytes; glucose or HbA1c; lipids; 12-lead ECG; CBC and TSH when selected.","Detect silent organ injury, refine risk, identify medication hazards, and generate targeted secondary-cause questions."],cardiac:["Echocardiography when indicated","Assess LV mass and geometry, systolic/diastolic function, valves, and consequences such as heart failure.","Use when ECG, symptoms, examination, or risk suggests cardiac damage; not every patient requires immediate echo."],brain:["Urgent brain imaging","Non-contrast CT rapidly assesses hemorrhage; MRI and vascular imaging follow according to the syndrome.","Do not assume severe BP caused the neurologic deficit without imaging."],renal:["Renal and renovascular evaluation","Urinalysis/ACR/eGFR first; renal ultrasound, duplex, CTA, or MRA when structural or renovascular disease is plausible.","Choose modality based on the clinical question, kidney function, contrast issues, and local expertise."],aldo:["Aldosterone-to-renin ratio","Screen for primary aldosteronism after reviewing interfering medications and correcting potassium as appropriate.","Interpretation and confirmatory testing follow local endocrine/hypertension protocols."],pheo:["Plasma free or urinary fractionated metanephrines","Use when catecholamine spells, adrenal lesion, hereditary risk, or another strong clue exists.","Do not use as indiscriminate screening for ordinary hypertension."],osa:["Validated screening followed by sleep study","Assess snoring, witnessed apnea, sleepiness, obesity, resistant or nocturnal/non-dipping hypertension.","Treating OSA supports overall control and reduces broader sleep-related risk."],endocrine:["Targeted hormonal testing","Select testing for Cushing syndrome, thyroid disease, hyperparathyroidism, or acromegaly from the phenotype and basic labs.","Broad panels create false positives when pre-test probability is low."]};
    const show=b=>{const d=map[b.dataset.test];$("#test-result").className="result-panel";$("#test-result").innerHTML=`<p class="eyebrow">Best next investigation direction</p><h3>${d[0]}</h3><p>${d[1]}</p><p class="small muted">${d[2]}</p>`};choiceToggle("#test-questions .choice-button",show);
  }
  function initLifestyle(){
    const map={weight:"Set a sustainable weight and waist goal; even modest loss can improve BP, diabetes, sleep apnea, and lipids.",dash:"Build meals around vegetables, fruit, whole grains, legumes, nuts, fish, and low-fat dairy.",sodium:"Reduce processed and restaurant sodium; target below 2,300 mg/day and toward 1,500 mg/day when feasible.",potassium:"Increase potassium-rich foods only when kidney function and serum potassium make this safe.",activity:"Work toward 75–150 minutes/week of aerobic activity plus appropriate resistance exercise.",alcohol:"Reducing or eliminating alcohol can improve BP control and adherence.",smoking:"Stop tobacco and nicotine exposure to sharply reduce overall cardiovascular risk.",sleep:"Screen for and treat sleep apnea, improve sleep duration, and use practical stress-reduction strategies."};
    const update=()=>{const sel=$$("#lifestyle-choices .selected",els.app),out=$("#lifestyle-result");if(!sel.length){out.className="result-panel empty";out.textContent="Select interventions to build a concise, clinically relevant plan.";return}out.className="result-panel";out.innerHTML=`<h3>Your selected priorities</h3><ol>${sel.map(b=>`<li><strong>${b.textContent}:</strong> ${map[b.dataset.life]}</li>`).join("")}</ol><p class="small muted">Limit the initial plan to realistic priorities, define how progress will be measured, and reassess rather than giving a long unranked list.</p>`};choiceToggle("#lifestyle-choices .choice-button",update,true);update();
  }
  function initPharmacology(){
    const map={acei:["ACE inhibitor","Ramipril, lisinopril, enalapril","Strong for albuminuric CKD, diabetes with albuminuria, CAD, and HFrEF.","Cough, angioedema, hyperkalemia, creatinine rise; contraindicated in pregnancy."],arb:["Angiotensin receptor blocker","Losartan, valsartan, candesartan","Similar organ-protection logic without bradykinin cough.","Hyperkalemia and creatinine rise; pregnancy contraindication; do not combine routinely with ACEI."],dhp:["Long-acting DHP calcium-channel blocker","Amlodipine, long-acting nifedipine","Broad efficacy across ages and useful for isolated systolic hypertension.","Ankle edema, flushing, headache, gingival overgrowth."],thiazide:["Thiazide / thiazide-like diuretic","Chlorthalidone, indapamide, hydrochlorothiazide","Strong outcome evidence; useful in salt-sensitive and isolated systolic hypertension.","Hyponatremia, hypokalemia, gout, glucose effects; monitor electrolytes."],mra:["Mineralocorticoid-receptor antagonist","Spironolactone, eplerenone","Preferred fourth-line therapy in true resistant hypertension; useful in primary aldosteronism and HFrEF.","Hyperkalemia, renal impairment; spironolactone can cause gynecomastia."],beta:["Beta-blocker","Evidence-based agents depend on indication","Useful in CAD/angina, post-MI, HFrEF, tachyarrhythmia, aortic disease, and labetalol in pregnancy.","Bradycardia, heart block, fatigue; nonselective agents may worsen bronchospasm. Not routine first-line for uncomplicated HTN."],loop:["Loop diuretic","Furosemide and related agents","Useful for fluid overload, heart failure, or advanced CKD when thiazide efficacy is limited.","Volume depletion, hypokalemia, and ototoxicity at high doses."],other:["Other add-on agents","Alpha-1 blockers, central alpha-2 agonists, hydralazine, minoxidil","Reserved for indication-specific or refractory situations after the core regimen is optimized.","Orthostasis, sedation/rebound with clonidine, reflex tachycardia/fluid retention, lupus-like syndrome, hypertrichosis/pericardial effusion."]};
    const show=b=>{const d=map[b.dataset.drug];$("#drug-result").innerHTML=`<div class="result-title"><div><p class="eyebrow">Drug class</p><h3>${d[0]}</h3></div><span class="tag">${d[1]}</span></div><div class="two-col"><div><strong>Best uses</strong><p>${d[2]}</p></div><div><strong>Cautions</strong><p>${d[3]}</p></div></div>`};choiceToggle("#drug-buttons .pill-button",show);show($("#drug-buttons .selected"));
  }
  function initComorbidities(){
    const map={cad:["Coronary artery disease / angina","Useful: beta-blocker when indicated; ACEI/ARB for vascular risk; DHP-CCB or long-acting nitrate for symptoms.","Avoid abrupt beta-blocker withdrawal and excessive diastolic lowering in severe CAD."],hfrEF:["Heart failure with reduced EF","Use disease-modifying HF therapy: ARNI/ACEI/ARB, evidence-based beta-blocker, MRA, SGLT2 inhibitor; diuretic for congestion.","Avoid verapamil/diltiazem in reduced EF and NSAIDs; do not rely on isolated short-acting vasodilators."],ckd:["CKD with albuminuria","ACEI or ARB titrated with creatinine and potassium monitoring.","Avoid dual ACEI+ARB and unmonitored RAAS blockade during dehydration, AKI, or hyperkalemia."],diabetes:["Diabetes","Standard first-line classes apply; ACEI/ARB has a specific role when albuminuria or CKD is present.","Beta-blockers are not absolutely contraindicated but may mask adrenergic hypoglycemia symptoms."],pregnancy:["Pregnancy","Labetalol, extended-release nifedipine, or methyldopa for chronic therapy; acute severe protocols use obstetric-approved rapid agents.","Avoid ACEI, ARB, and direct renin inhibitor; review therapy before conception."],asthma:["Asthma / COPD","ACEI/ARB, DHP-CCB, and thiazide-like therapy are suitable; a cardioselective beta-blocker can be used if strongly indicated.","Avoid nonselective beta-blockers in active bronchospasm."],brady:["Bradycardia / AV block","ACEI/ARB, DHP-CCB, and thiazide-like therapy do not slow AV conduction.","Avoid beta-blocker and non-DHP CCB unless paced or closely supervised."],gout:["Gout","Consider losartan or a CCB when otherwise appropriate.","Thiazides can raise urate; balance this against their strong BP benefit."],pad:["Peripheral arterial disease","Treat to standard targets; ACEI/ARB and CCB are useful.","Beta-blockers are not universally contraindicated when another compelling indication exists."]};
    const show=b=>{const d=map[b.dataset.comorbidity];$("#comorbidity-result").innerHTML=`<p class="eyebrow">Clinical setting</p><h3>${d[0]}</h3><div class="two-col"><div class="callout success"><strong>Preferred / useful</strong><div>${d[1]}</div></div><div class="callout warning"><strong>Avoid / caution</strong><div>${d[2]}</div></div></div>`};choiceToggle("#comorbidity-buttons .pill-button",show);show($("#comorbidity-buttons .selected"));
  }
  function initResistant(){
    const steps=[
      ["Verify measurement","Repeat with a validated device, correct cuff, quiet rest, supported posture, and repeated averaging. A bad measurement cannot prove drug resistance."],
      ["Confirm outside the office","HBPM or ABPM excludes white-coat effect and confirms sustained uncontrolled pressure."],
      ["Assess adherence nonjudgmentally","Ask about cost, complexity, side effects, understanding, refill access, and unintentional missed doses. Simplify with single-pill combinations when possible."],
      ["Optimize the regimen","Use adequate doses and long-acting agents; ensure the three-drug foundation includes an effective diuretic and that CKD/volume status is considered."],
      ["Remove contributors","Address high sodium intake, obesity, alcohol, sleep apnea, NSAIDs, steroids, OCPs, stimulants, decongestants, liquorice, and volume excess."],
      ["Add MRA and investigate causes","Spironolactone is preferred fourth-line when potassium and kidney function allow. Screen for aldosteronism, CKD, renovascular disease, OSA, and refer when control remains difficult."]
    ];
    const show=i=>{$$("#resistant-steps .step",els.app).forEach((x,j)=>x.classList.toggle("active",j===i));const d=steps[i];$("#resistant-result").innerHTML=`<p class="eyebrow">Step ${i+1}</p><h3>${d[0]}</h3><p>${d[1]}</p>`};$$("#resistant-steps .step",els.app).forEach((b,i)=>b.addEventListener("click",()=>show(i)));show(0);
  }
  function initEmergency(){
    const run=()=>{const s=Number($("#em-sbp").value),d=Number($("#em-dbp").value),inj=$("#em-injury").value,severe=s>180||d>120,out=$("#em-result");
      if(inj!=="no")out.innerHTML=`<div class="result-title"><div><p class="eyebrow">Emergency pathway</p><h3>Acute organ injury selected</h3></div><span class="tag red">Immediate evaluation</span></div><p>${severe?"Severe BP plus acute organ injury is consistent with a hypertensive emergency.":"Acute organ injury requires emergency assessment even though this entered BP is not above the usual severe threshold; do not let the number falsely reassure."}</p><p><strong>Principle:</strong> monitored, titratable, syndrome-specific treatment while confirming the diagnosis and injured organ.</p>`;
      else if(severe)out.innerHTML=`<div class="result-title"><div><p class="eyebrow">Non-emergency pathway if assessment confirms no injury</p><h3>Severe asymptomatic hypertension</h3></div><span class="tag">${s}/${d}</span></div><p>Repeat correctly, assess reversible causes and adherence, initiate/reinstitute/intensify oral therapy, and arrange prompt follow-up. Avoid reflex rapid IV lowering.</p>`;
      else out.innerHTML=`<div class="result-title"><div><p class="eyebrow">Current inputs</p><h3>No severe threshold and no selected acute injury</h3></div><span class="tag green">Not an emergency classification</span></div><p>Interpret repeated valid readings within the diagnostic and risk framework. New concerning symptoms still require clinical assessment.</p>`;
    };$("#em-check").addEventListener("click",run);run();
  }
  function initKidney(){
    const map={atherosclerosis:["Atherosclerotic renal-artery stenosis","Typical patient: older adult with diffuse atherosclerosis. Lesions are often ostial/proximal. Clues include resistant HTN, renal dysfunction, recurrent flash pulmonary edema, and widespread vascular disease.","Medical therapy for most stable cases; revascularization is selective for high-risk clinical syndromes."],fmd:["Fibromuscular dysplasia","Typical patient: younger woman without traditional atherosclerotic risk. Lesions are often mid-to-distal with a “string-of-beads” appearance. Clues include abrupt young-onset HTN, bruit, headache, or pulsatile tinnitus.","Percutaneous angioplasty is often effective when clinically significant."]};
    const show=b=>{const d=map[b.dataset.reno];$("#renovascular-result").innerHTML=`<p class="eyebrow">Renovascular pattern</p><h3>${d[0]}</h3><p>${d[1]}</p><p><strong>Treatment emphasis:</strong> ${d[2]}</p>`};choiceToggle("#renovascular-buttons .pill-button",show);show($("#renovascular-buttons .selected"));
  }
  function initCardiorenal(){
    const run=()=>{const o=$("#cr-organ").value,t=$("#cr-tempo").value;let d;if(o==="systemic"||t==="simultaneous")d=["Type 5 — secondary cardiorenal syndrome","A systemic disorder causes simultaneous cardiac and renal dysfunction, for example sepsis, diabetes, or amyloidosis."];
      else if(o==="heart"&&t==="acute")d=["Type 1 — acute cardiorenal syndrome","Acute worsening of cardiac function causes acute kidney injury, as in acute decompensated HF or cardiogenic shock."];
      else if(o==="heart"&&t==="chronic")d=["Type 2 — chronic cardiorenal syndrome","Chronic cardiac dysfunction causes progressive CKD through low perfusion, neurohormonal activation, and venous congestion."];
      else if(o==="kidney"&&t==="acute")d=["Type 3 — acute renocardiac syndrome","Acute kidney injury causes acute HF, arrhythmia, ischemia, or fluid/electrolyte-mediated cardiac dysfunction."];
      else d=["Type 4 — chronic renocardiac syndrome","Chronic kidney disease promotes LVH, CAD, HF, arrhythmia, and vascular calcification."];
      $("#cr-result").innerHTML=`<p class="eyebrow">Classification</p><h3>${d[0]}</h3><p>${d[1]}</p>`};$("#cr-check").addEventListener("click",run);run();
  }
  function initAlgorithm(){
    const steps=[
      ["Validate the reading","Use a validated upper-arm device, correct cuff, 5-minute rest, supported posture, bare arm at heart level, silence, and at least two readings. Measure both arms initially.","measurement"],
      ["Check for acute organ injury","Look for neurologic deficit or confusion, chest/back pain, ACS, pulmonary edema, AKI/oliguria, visual loss, dissection, or eclampsia. The organ defines the emergency.","emergency"],
      ["Confirm sustained exposure","Use structured HBPM or ABPM to distinguish white-coat, masked, sustained, and normal patterns. ABPM also reveals nocturnal and non-dipping hypertension.","confirmation"],
      ["Assess total risk and damage","History, examination, urine ACR, eGFR, electrolytes, glucose, lipids, ECG, and selected echo or imaging. Identify heart, brain, kidney, retinal, and vascular injury.","organ-damage"],
      ["Search targeted secondary causes","Prioritize testing with young or abrupt onset, rapid worsening, resistance, hypokalemia, renal bruit, catecholamine spells, OSA, endocrine phenotype, flash edema, or drug exposure.","secondary"],
      ["Set target and treat","Choose a single guideline framework, match the target to measurement technique and tolerance, prescribe lifestyle therapy, and select first-line or indication-specific drugs.","goals-lifestyle"],
      ["Reassess response and safety","Review repeated BP, adherence, access, adverse effects, orthostasis, electrolytes, kidney function, and whether the regimen needs titration or simplification.","pharmacology"],
      ["Resolve apparent resistance","Recheck technique, HBPM/ABPM, adherence, doses, diuretic, sodium/volume, interfering agents, OSA, and secondary causes before adding fourth-line therapy.","resistant"]
    ];
    const show=i=>{$$("#algorithm-steps .step",els.app).forEach((x,j)=>x.classList.toggle("active",i===j));const d=steps[i];$("#algorithm-result").innerHTML=`<p class="eyebrow">Step ${i+1}</p><h3>${d[0]}</h3><p>${d[1]}</p><button class="secondary-button" data-route="${d[2]}">Open detailed module</button>`};$$("#algorithm-steps .step",els.app).forEach((b,i)=>b.addEventListener("click",()=>show(i)));show(0);
  }
  function initCases(){
    const renderList=()=>{$("#case-list").innerHTML=content.clinicalCases.map((c,i)=>`<button class="case-tab ${i===state.caseIndex?"active":""}" data-case="${i}"><strong>Case ${i+1}</strong><small>${c.tag} · ${c.title}</small></button>`).join("")};
    const renderCase=()=>{const c=content.clinicalCases[state.caseIndex];$("#case-card").innerHTML=`<p class="eyebrow">Case ${state.caseIndex+1} · ${c.tag}</p><h2>${c.title}</h2><p>${c.stem}</p><div class="case-question"><strong>Question</strong><p>${c.question}</p></div><button class="primary-button" id="reveal-case" type="button">Reveal reasoning</button><div class="answer-panel" id="case-answer" hidden><strong>Best answer and reasoning</strong><p>${c.answer}</p><div class="button-row">${c.links.map(id=>`<button class="secondary-button" data-route="${id}">Review ${content.modules[id].title}</button>`).join("")}</div></div>`;$("#reveal-case").addEventListener("click",()=>{$("#case-answer").hidden=false;$("#reveal-case").hidden=true})};
    renderList();renderCase();$$("[data-case]",els.app).forEach(b=>b.addEventListener("click",()=>{state.caseIndex=Number(b.dataset.case);renderList();renderCase();initCaseTabs()}));
    function initCaseTabs(){$$("[data-case]",els.app).forEach(b=>b.addEventListener("click",()=>{state.caseIndex=Number(b.dataset.case);renderList();renderCase();initCaseTabs()}))}
  }
  function initFlashcards(){
    const filters=$("#flash-filters"), grid=$("#flash-grid"), counter=$("#flash-counter");
    const revealAll=$("#flash-reveal-all"), resetCards=$("#flash-reset");
    const cats=["All",...new Set(content.flashcards.map(x=>x.category))];

    filters.innerHTML=cats.map(c=>`<button class="pill-button ${c===state.flashFilter?"selected":""}" type="button" data-flash-filter="${c}" aria-pressed="${c===state.flashFilter}">${c}</button>`).join("");

    const setCardState=(card,flipped)=>{
      card.classList.toggle("flipped",flipped);
      card.setAttribute("aria-pressed",String(flipped));
      const frontFace=card.querySelector(".flash-front"), backFace=card.querySelector(".flash-back");
      if(frontFace)frontFace.setAttribute("aria-hidden",String(flipped));
      if(backFace)backFace.setAttribute("aria-hidden",String(!flipped));
      const front=card.dataset.front||"this flashcard";
      card.setAttribute("aria-label",flipped?`Hide answer for: ${front}`:`Reveal answer for: ${front}`);
    };

    const visibleCards=()=>state.flashFilter==="All"?content.flashcards:content.flashcards.filter(x=>x.category===state.flashFilter);

    const render=()=>{
      const cards=visibleCards();
      counter.textContent=`${cards.length} ${cards.length===1?"card":"cards"}`;
      grid.innerHTML=cards.map((c,i)=>`
        <button class="flashcard" type="button" data-card-id="${c.id}" data-front="${c.front.replace(/"/g,"&quot;")}" aria-pressed="false" aria-label="Reveal answer for: ${c.front.replace(/"/g,"&quot;")}">
          <span class="flashcard-inner">
            <span class="flash-face flash-front">
              <span class="flash-card-topline"><span class="tag">${c.category}</span><span class="flash-number">${String(i+1).padStart(2,"0")}</span></span>
              <span class="flash-side-label">Question</span>
              <h3>${c.front}</h3>
              <span class="flash-hint"><span aria-hidden="true">↻</span> Click or press Enter / Space</span>
            </span>
            <span class="flash-face flash-back" aria-hidden="true">
              <span class="flash-card-topline"><span class="tag green">Answer</span><span class="flash-number">${String(i+1).padStart(2,"0")}</span></span>
              <span class="flash-side-label">Key recall point</span>
              <p>${c.back}</p>
              <span class="flash-hint"><span aria-hidden="true">↺</span> Click to return to the question</span>
            </span>
          </span>
        </button>`).join("");
    };

    filters.addEventListener("click",event=>{
      const button=event.target.closest("[data-flash-filter]");
      if(!button)return;
      state.flashFilter=button.dataset.flashFilter;
      $$('[data-flash-filter]',filters).forEach(x=>{
        const selected=x===button;
        x.classList.toggle("selected",selected);
        x.setAttribute("aria-pressed",String(selected));
      });
      render();
    });

    grid.addEventListener("click",event=>{
      const card=event.target.closest(".flashcard");
      if(!card)return;
      setCardState(card,!card.classList.contains("flipped"));
    });

    revealAll.addEventListener("click",()=>$$('.flashcard',grid).forEach(card=>setCardState(card,true)));
    resetCards.addEventListener("click",()=>{
      $$('.flashcard',grid).forEach(card=>setCardState(card,false));
      const first=$('.flashcard',grid);
      if(first)first.focus({preventScroll:true});
    });

    render();
  }
  function saveQuiz(){writeJSON(KEYS.quiz,state.quiz)}
  function initQuiz(){
    const shell=$("#quiz-shell"),qs=content.quizQuestions;if(state.quiz.index>=qs.length)state.quiz.finished=true;
    const render=()=>{
      if(state.quiz.finished){const pct=Math.round(state.quiz.score/qs.length*100);shell.innerHTML=`<div class="quiz-score content-card"><p class="eyebrow">Completed</p><strong>${state.quiz.score}/${qs.length}</strong><h2>${pct}%</h2><p>${pct>=84?"Excellent control of the framework.":pct>=68?"Good foundation. Review the explanations for missed decisions.":"Revisit measurement, secondary causes, drug selection, and emergency distinctions before retrying."}</p><div class="button-row" style="justify-content:center"><button class="primary-button" id="quiz-restart">Restart quiz</button><button class="secondary-button" data-route="flashcards">Review flashcards</button></div></div>`;$("#quiz-restart").addEventListener("click",()=>{state.quiz={index:0,score:0,answered:false,finished:false,selected:null};saveQuiz();render()});return}
      const q=qs[state.quiz.index],progress=(state.quiz.index+(state.quiz.answered?1:0))/qs.length*100;shell.innerHTML=`<div class="quiz-head"><div><p class="eyebrow">Question ${state.quiz.index+1} of ${qs.length}</p><strong>Score: ${state.quiz.score}</strong></div><button class="text-button" id="quiz-reset">Reset</button></div><div class="quiz-progress"><span style="width:${progress}%"></span></div><article class="quiz-card"><h2>${q.q}</h2><div class="quiz-options">${q.o.map((o,i)=>`<button class="quiz-option ${state.quiz.answered?(i===q.a?"correct":i===state.quiz.selected?"incorrect":""):state.quiz.selected===i?"selected":""}" data-option="${i}" ${state.quiz.answered?"disabled":""}>${String.fromCharCode(65+i)}. ${o}</button>`).join("")}</div>${state.quiz.answered?`<div class="quiz-feedback"><strong>${state.quiz.selected===q.a?"Correct":"Not quite"}</strong><p>${q.e}</p></div><div class="button-row" style="margin-top:15px"><button class="primary-button" id="quiz-next">${state.quiz.index===qs.length-1?"Finish quiz":"Next question"}</button></div>`:`<div class="button-row" style="margin-top:15px"><button class="primary-button" id="quiz-submit" ${state.quiz.selected===null?"disabled":""}>Submit answer</button></div>`}</article>`;
      $$("[data-option]",shell).forEach(b=>b.addEventListener("click",()=>{state.quiz.selected=Number(b.dataset.option);saveQuiz();render()}));const submit=$("#quiz-submit",shell);if(submit)submit.addEventListener("click",()=>{if(state.quiz.selected===null)return;state.quiz.answered=true;if(state.quiz.selected===q.a)state.quiz.score++;saveQuiz();render()});const next=$("#quiz-next",shell);if(next)next.addEventListener("click",()=>{if(state.quiz.index===qs.length-1)state.quiz.finished=true;else{state.quiz.index++;state.quiz.answered=false;state.quiz.selected=null}saveQuiz();render()});$("#quiz-reset",shell).addEventListener("click",()=>{state.quiz={index:0,score:0,answered:false,finished:false,selected:null};saveQuiz();render()});
    };render();
  }
  function initRoute(route){const map={classification:initClassification,measurement:initMeasurement,confirmation:initConfirmation,mechanisms:initMechanisms,secondary:initSecondary,assessment:initAssessment,"organ-damage":initOrganDamage,investigations:initInvestigations,"goals-lifestyle":initLifestyle,pharmacology:initPharmacology,comorbidities:initComorbidities,resistant:initResistant,emergency:initEmergency,kidney:initKidney,cardiorenal:initCardiorenal,algorithm:initAlgorithm,"clinical-lab":initCases,flashcards:initFlashcards,quiz:initQuiz};if(map[route])map[route]()}

  document.addEventListener("click",e=>{const r=e.target.closest("[data-route]");if(r){e.preventDefault();navigate(r.dataset.route)}const b=e.target.closest(".bookmark-module");if(b)toggleBookmark(state.route);const sr=e.target.closest("[data-search-route]");if(sr){navigate(sr.dataset.searchRoute);els.search.value="";els.searchResults.hidden=true}const br=e.target.closest("[data-bookmark-route]");if(br){navigate(br.dataset.bookmarkRoute);els.bookmarkDialog.close()}const rm=e.target.closest("[data-remove-bookmark]");if(rm){e.stopPropagation();toggleBookmark(rm.dataset.removeBookmark)}});
  els.menu.addEventListener("click",openSidebar);els.closeSidebar.addEventListener("click",closeSidebar);els.scrim.addEventListener("click",closeSidebar);
  els.resetProgress.addEventListener("click",()=>{state.visited=new Set([state.route]);writeJSON(KEYS.visited,[state.route]);updateNav();showToast("Visited progress reset")});
  els.clearBookmarks.addEventListener("click",()=>{state.bookmarks=[];writeJSON(KEYS.bookmarks,[]);renderBookmarkList();const b=$(".bookmark-module");if(b)b.classList.remove("active");showToast("Bookmarks cleared")});
  els.search.addEventListener("input",()=>search(els.search.value));els.search.addEventListener("keydown",e=>{if(e.key==="Escape"){els.search.value="";els.searchResults.hidden=true;els.search.blur()}});
  document.addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();els.search.focus()}if(e.key==="Escape"){els.searchResults.hidden=true;closeSidebar();if(els.bookmarkDialog.open)els.bookmarkDialog.close()}});
  els.theme.addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;storage.set(KEYS.theme,next);showToast(`${next[0].toUpperCase()+next.slice(1)} theme`)});
  els.speechRate.value=storage.get(KEYS.rate)||"0.92";els.speechRate.addEventListener("change",()=>storage.set(KEYS.rate,els.speechRate.value));els.stopSpeech.addEventListener("click",cancelSpeech);els.print.addEventListener("click",()=>window.print());
  els.bookmarksButton.addEventListener("click",()=>{renderBookmarkList();els.bookmarkDialog.showModal()});els.closeBookmarks.addEventListener("click",()=>els.bookmarkDialog.close());
  window.addEventListener("hashchange",()=>render(routeFromHash()));
  document.documentElement.dataset.theme=storage.get(KEYS.theme)||"light";buildNav();renderBookmarkList();loadVoices();if("speechSynthesis" in window)speechSynthesis.onvoiceschanged=loadVoices;navigate(routeFromHash(),true);
})();
