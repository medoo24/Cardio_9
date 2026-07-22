/* Systemic Hypertension Lab content. Data-driven, framework-free, offline-first. */
(() => {
  "use strict";

  const badge = (text, tone="") => `<span class="tag ${tone}">${text}</span>`;
  const callout = (title, body, tone="") => `<div class="callout ${tone} speech-unit"><strong>${title}</strong><div>${body}</div></div>`;
  const card = (title, body, icon="◆", cls="") => `<article class="content-card speech-unit ${cls}"><div class="card-icon" aria-hidden="true">${icon}</div><h3>${title}</h3>${body}</article>`;
  const section = (title, subtitle="") => `<div class="section-heading"><h2>${title}</h2>${subtitle?`<p>${subtitle}</p>`:""}</div>`;

  const navGroups = [
    {title:"Start",items:[
      {id:"overview",label:"Overview & study map"},
      {id:"classification",label:"Definition & classification"},
      {id:"measurement",label:"Accurate BP measurement"},
      {id:"confirmation",label:"Confirming the diagnosis"}
    ]},
    {title:"Cause & assessment",items:[
      {id:"mechanisms",label:"Mechanisms & primary HTN"},
      {id:"secondary",label:"Secondary hypertension"},
      {id:"assessment",label:"Clinical assessment"},
      {id:"organ-damage",label:"Target-organ damage"},
      {id:"investigations",label:"Diagnostic investigations"}
    ]},
    {title:"Treatment",items:[
      {id:"goals-lifestyle",label:"Goals & lifestyle therapy"},
      {id:"pharmacology",label:"Drug-class explorer"},
      {id:"comorbidities",label:"Treatment by comorbidity"},
      {id:"resistant",label:"Resistant hypertension"},
      {id:"emergency",label:"Severe HTN & emergency"}
    ]},
    {title:"Kidney & integration",items:[
      {id:"kidney",label:"Hypertension & kidney"},
      {id:"cardiorenal",label:"Cardiorenal syndromes"},
      {id:"algorithm",label:"Complete clinical algorithm"}
    ]},
    {title:"Practice",items:[
      {id:"clinical-lab",label:"Clinical reasoning cases"},
      {id:"flashcards",label:"Flashcards"},
      {id:"quiz",label:"Final quiz"},
      {id:"sources",label:"Sources & scope"}
    ]}
  ];

  const modules = {
    overview:{
      title:"Systemic Hypertension Lab",kicker:"Chapter 9 · interactive cardiology",lead:"A connected, clinically ordered learning environment: measure correctly, confirm sustained exposure, identify risk and organ damage, choose treatment, and recognize the patient who needs urgent care.",
      html:`
        <section class="hero speech-unit">
          <div class="hero-grid">
            <div>
              <div class="hero-kicker">Pressure is a continuous risk variable</div>
              <h2>Do not treat a number before you trust the number.</h2>
              <p>Hypertension is usually silent. The safest sequence is to verify technique, confirm the pattern with repeated and out-of-office readings, assess total cardiovascular risk and hypertension-mediated organ damage, then choose therapy that the patient can tolerate and sustain.</p>
              <div class="hero-actions">
                <button class="primary-button" type="button" data-route="classification">Start with classification</button>
                <button class="secondary-button" type="button" data-route="algorithm">Open the complete algorithm</button>
              </div>
            </div>
            <div class="hero-gauge" aria-label="Stylized blood pressure gauge"><div class="hero-gauge-inner"><div><strong>BP</strong><span>measurement → meaning → management</span></div></div></div>
          </div>
        </section>
        <div class="stat-grid">
          <div class="stat-card speech-unit"><strong>2</strong><span>major guideline classification frameworks compared without mixing them</span></div>
          <div class="stat-card speech-unit"><strong>5</strong><span>major target-organ systems explored interactively</span></div>
          <div class="stat-card speech-unit"><strong>8</strong><span>clinical reasoning cases with stepwise explanations</span></div>
          <div class="stat-card speech-unit"><strong>25</strong><span>scored final questions with answer rationales</span></div>
        </div>
        <section class="section-block">
          ${section("The core clinical sequence","Every later module links back to this pathway")}
          <div class="flow-row speech-unit">
            <div class="flow-node"><strong>1. Measure</strong><br><span class="muted small">Validated device, correct cuff, rest, position, repeated readings</span></div><div class="flow-arrow">→</div>
            <div class="flow-node"><strong>2. Confirm</strong><br><span class="muted small">HBPM or ABPM; identify white-coat and masked patterns</span></div><div class="flow-arrow">→</div>
            <div class="flow-node"><strong>3. Assess</strong><br><span class="muted small">Risk, secondary clues, organ damage, comorbidity</span></div><div class="flow-arrow">→</div>
            <div class="flow-node"><strong>4. Treat</strong><br><span class="muted small">Lifestyle, first-line drugs, indication-specific therapy</span></div><div class="flow-arrow">→</div>
            <div class="flow-node"><strong>5. Reassess</strong><br><span class="muted small">BP, adherence, adverse effects, electrolytes, kidney function</span></div>
          </div>
        </section>
        <section class="section-block">
          ${section("High-yield orientation")}
          <div class="card-grid">
            ${card("Hypertension is usually silent","<p>Headache, tinnitus, epistaxis, nausea, or blurred vision are not reliable diagnostic markers. Symptoms may matter clinically, but they do not replace correct blood-pressure measurement.</p>","◉")}
            ${card("The guideline framework matters","<p>The 2024 ESC system keeps the office hypertension threshold at 140/90 mmHg, while the 2025 AHA/ACC system classifies hypertension from 130/80 mmHg. Use one framework consistently.</p>","≠")}
            ${card("The organ defines the emergency","<p>Severe pressure alone does not equal hypertensive emergency. Acute brain, heart, kidney, retinal, aortic, or pregnancy-related injury changes the pathway to monitored intravenous treatment.</p>","!")}
          </div>
        </section>
        <section class="section-block">
          ${section("Suggested study routes")}
          <div class="three-col">
            <article class="content-card"><p class="eyebrow">First learning</p><h3>Build the foundation</h3><p>Classification → measurement → confirmation → mechanisms → assessment → investigations.</p><button class="secondary-button" data-route="classification">Begin foundation</button></article>
            <article class="content-card"><p class="eyebrow">Exam revision</p><h3>Focus on decisions</h3><p>Secondary causes → drugs → resistant hypertension → emergency → clinical cases.</p><button class="secondary-button" data-route="secondary">Begin decisions</button></article>
            <article class="content-card"><p class="eyebrow">Rapid test</p><h3>Challenge recall</h3><p>Use flashcards for retrieval, then complete the scored quiz and review explanations.</p><button class="secondary-button" data-route="flashcards">Open practice</button></article>
          </div>
        </section>
        ${callout("Clinical safety boundary","This site teaches reasoning and guideline structure. It does not provide patient-specific diagnosis, drug doses, or permission to delay urgent assessment when acute organ injury is suspected.","warning")}
      `
    },

    classification:{
      title:"Definition and classification",kicker:"Foundation 1",lead:"Blood pressure is a continuous cardiovascular risk variable. Diagnostic labels are useful only when the measurement method and guideline framework are explicit.",
      html:`
        <div class="two-col">
          <section class="content-card speech-unit">
            <h2>Clinical definition</h2>
            <p><strong>Systemic hypertension</strong> is sustained elevation of systemic arterial pressure sufficient to increase the risk of cardiovascular, cerebrovascular, renal, retinal, and aortic disease.</p>
            <p>A single reading is usually insufficient unless there is a hypertensive emergency or unequivocal acute hypertension-mediated organ injury.</p>
            <div class="tag-row">${badge("Repeated readings")}${badge("Out-of-office confirmation")}${badge("Risk-based treatment")}</div>
          </section>
          ${callout("Do not mix guideline systems","A patient can be called hypertensive under the AHA/ACC framework and have elevated BP rather than hypertension under the ESC framework. State which framework you are using, and interpret treatment targets with the same measurement method.","warning")}
        </div>
        <section class="section-block interactive-panel interactive-only">
          ${section("Dual-framework classification calculator","Educational classification only—not a diagnosis")}
          <div class="control-grid">
            <div class="field"><label for="class-sbp">Systolic BP (mmHg)</label><input id="class-sbp" type="number" min="60" max="280" value="138"></div>
            <div class="field"><label for="class-dbp">Diastolic BP (mmHg)</label><input id="class-dbp" type="number" min="30" max="180" value="86"></div>
            <div class="field"><label for="class-context">Measurement context</label><select id="class-context"><option>Office reading</option><option>Home average</option><option>Ambulatory average</option></select></div>
          </div>
          <div id="classification-result" class="result-panel" style="margin-top:15px"></div>
        </section>
        <section class="section-block">
          ${section("Contemporary office categories")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Framework</th><th>Category</th><th>Systolic</th><th>Diastolic</th></tr></thead>
            <tbody>
              <tr><td>2024 ESC</td><td>Non-elevated BP</td><td>&lt;120</td><td>&lt;70</td></tr>
              <tr><td>2024 ESC</td><td>Elevated BP</td><td>120–139</td><td>70–89</td></tr>
              <tr class="highlight-row"><td>2024 ESC</td><td>Hypertension</td><td>≥140</td><td>≥90</td></tr>
              <tr><td>2025 AHA/ACC</td><td>Normal</td><td>&lt;120</td><td>&lt;80</td></tr>
              <tr><td>2025 AHA/ACC</td><td>Elevated</td><td>120–129</td><td>&lt;80</td></tr>
              <tr><td>2025 AHA/ACC</td><td>Stage 1 hypertension</td><td>130–139</td><td>80–89</td></tr>
              <tr class="highlight-row"><td>2025 AHA/ACC</td><td>Stage 2 hypertension</td><td>≥140</td><td>≥90</td></tr>
            </tbody>
          </table></div>
        </section>
        <section class="section-block">
          ${section("Clinically useful patterns")}
          <div class="card-grid">
            ${card("Isolated systolic hypertension","<p>Elevated systolic pressure with non-elevated diastolic pressure. Typical in older adults with large-artery stiffness; high stroke-volume states can also contribute.</p>","↟")}
            ${card("White-coat hypertension","<p>High office BP but non-hypertensive home or ambulatory BP. It is not simply ignored: risk factors and progression still require follow-up.</p>","⌂")}
            ${card("Masked hypertension","<p>Apparently acceptable office BP with elevated home or ambulatory BP. It is more common with smoking, obesity, diabetes, CKD, sleep apnea, and occupational stress.</p>","◐")}
            ${card("Sustained hypertension","<p>High BP both inside and outside the office, giving the greatest confidence of persistent exposure.</p>","●")}
            ${card("Pulse pressure","<p>Systolic minus diastolic pressure. A wide pulse pressure often reflects arterial stiffness, especially in older adults.</p>","↔")}
            ${card("Orthostatic pattern","<p>Standing measurements matter when symptoms, older age, diabetes, autonomic disease, or recent treatment intensification raise concern for orthostatic hypotension.</p>","⇅")}
          </div>
        </section>
        ${callout("Exam trap","Do not diagnose chronic hypertension from symptoms or from one casually obtained measurement. First ask whether the technique was valid and whether the elevation is sustained.","danger")}
      `
    },

    measurement:{
      title:"Accurate blood-pressure measurement",kicker:"Foundation 2",lead:"Poor technique can create both false hypertension and false reassurance. Measurement is not a clerical step—it is part of the diagnostic test.",
      html:`
        <section class="interactive-panel interactive-only">
          ${section("Measurement-error simulator","Select everything that was wrong with the reading")}
          <div class="choice-grid" id="measurement-errors">
            <button class="choice-button" data-error="small-cuff" type="button">Cuff is too small</button>
            <button class="choice-button" data-error="unsupported" type="button">Arm or back unsupported</button>
            <button class="choice-button" data-error="talking" type="button">Patient is talking or anxious</button>
            <button class="choice-button" data-error="clothing" type="button">Cuff placed over clothing</button>
            <button class="choice-button" data-error="full-bladder" type="button">Full bladder / no rest</button>
            <button class="choice-button" data-error="irregular" type="button">Irregular rhythm with one automated reading</button>
          </div>
          <div id="measurement-result" class="result-panel empty" style="margin-top:15px">Choose one or more errors to see the likely effect and the correction.</div>
        </section>
        <section class="section-block">
          ${section("Office measurement checklist")}
          <div class="two-col">
            <div class="check-list speech-unit">
              <label class="check-row"><input type="checkbox"><span><strong>Validated upper-arm device</strong><br><span class="muted small">Use an appropriately sized cuff for arm circumference.</span></span></label>
              <label class="check-row"><input type="checkbox"><span><strong>Prepare for 30 minutes</strong><br><span class="muted small">Avoid exercise, caffeine, nicotine, and a heavy meal; empty the bladder.</span></span></label>
              <label class="check-row"><input type="checkbox"><span><strong>Quiet seated rest</strong><br><span class="muted small">At least 5 minutes, back supported, feet flat, legs uncrossed.</span></span></label>
              <label class="check-row"><input type="checkbox"><span><strong>Arm at heart level</strong><br><span class="muted small">Support the arm; place the cuff on bare skin.</span></span></label>
              <label class="check-row"><input type="checkbox"><span><strong>Repeat and average</strong><br><span class="muted small">At least 2 readings about 1 minute apart; do not talk.</span></span></label>
              <label class="check-row"><input type="checkbox"><span><strong>Both arms initially</strong><br><span class="muted small">Use the arm with the higher reproducible reading for future follow-up.</span></span></label>
            </div>
            <div>
              ${callout("Standing blood pressure","Check standing BP when orthostatic hypotension is suspected, particularly in older adults, diabetes, autonomic disease, or after treatment intensification.","success")}
              <div class="content-card speech-unit" style="margin-top:14px"><h3>Why repeated readings?</h3><p>Blood pressure varies beat to beat and minute to minute. Averaging correct readings reduces random noise and prevents a transient stress response from driving a long-term diagnosis.</p><p class="formula">Reliable decision = valid technique + repeated measurements + appropriate context</p></div>
            </div>
          </div>
        </section>
        <section class="section-block">
          ${section("Common errors and their direction")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Error</th><th>Likely effect</th><th>Correction</th></tr></thead>
            <tbody>
              <tr><td>Cuff too small</td><td>Falsely high BP</td><td>Use cuff bladder dimensions appropriate for arm circumference.</td></tr>
              <tr><td>Unsupported arm or back</td><td>Falsely high BP</td><td>Support the patient and arm; cuff at heart level.</td></tr>
              <tr><td>Talking, pain, anxiety, full bladder</td><td>Transiently high BP</td><td>Allow quiet rest and repeat after reversible stressors settle.</td></tr>
              <tr><td>Measuring over clothing</td><td>Unreliable reading</td><td>Place cuff directly on the upper arm.</td></tr>
              <tr><td>Irregular rhythm</td><td>Automated readings may vary</td><td>Repeat several times and consider manual confirmation.</td></tr>
            </tbody>
          </table></div>
        </section>
        ${callout("Inter-arm difference","A persistent inter-arm systolic difference should prompt assessment for vascular disease. A sudden major difference with chest or back pain raises concern for acute aortic disease.","danger")}
      `
    },

    confirmation:{
      title:"Confirming the diagnosis",kicker:"Foundation 3",lead:"Office BP answers only one question: what was the pressure in that setting? Home and ambulatory monitoring reveal whether the exposure persists in everyday life and during sleep.",
      html:`
        <section class="interactive-panel interactive-only">
          ${section("Office–home pattern explorer","Enter average values, not a single isolated reading")}
          <div class="control-grid">
            <div class="field"><label for="office-sbp">Office SBP</label><input id="office-sbp" type="number" value="148" min="70" max="260"></div>
            <div class="field"><label for="office-dbp">Office DBP</label><input id="office-dbp" type="number" value="92" min="35" max="160"></div>
            <div class="field"><label for="home-sbp">Home average SBP</label><input id="home-sbp" type="number" value="126" min="70" max="260"></div>
            <div class="field"><label for="home-dbp">Home average DBP</label><input id="home-dbp" type="number" value="78" min="35" max="160"></div>
            <div class="field"><label for="pattern-framework">Interpret with</label><select id="pattern-framework"><option value="aha">AHA/ACC framework</option><option value="esc">ESC office framework</option></select></div>
            <div class="field"><label>&nbsp;</label><button class="primary-button" id="pattern-check" type="button">Interpret pattern</button></div>
          </div>
          <div id="pattern-result" class="result-panel" style="margin-top:15px"></div>
        </section>
        <section class="section-block">
          ${section("Three tools, three strengths")}
          <div class="three-col">
            ${card("Repeated office measurement","<p>Useful for standardized clinical assessment and treatment follow-up, but vulnerable to alerting responses and rushed technique.</p>","1")}
            ${card("Home BP monitoring","<p>Improves diagnostic confidence, adherence, and treatment titration. Use a validated upper-arm device and a structured schedule of repeated readings.</p>","⌂")}
            ${card("Ambulatory BP monitoring","<p>Best for nocturnal hypertension, non-dipping patterns, white-coat hypertension, masked hypertension, and full 24-hour exposure.</p>","24")}
          </div>
        </section>
        <section class="section-block">
          ${section("Diagnostic sequence")}
          <div class="flow-row speech-unit">
            <div class="flow-node"><strong>High office reading</strong><br><span class="small muted">Do not react automatically</span></div><div class="flow-arrow">→</div>
            <div class="flow-node"><strong>Repeat correctly</strong><br><span class="small muted">Fix technique and average</span></div><div class="flow-arrow">→</div>
            <div class="flow-node"><strong>HBPM or ABPM</strong><br><span class="small muted">Observe everyday exposure</span></div><div class="flow-arrow">→</div>
            <div class="flow-node"><strong>Classify pattern</strong><br><span class="small muted">White-coat, masked, sustained, or normal</span></div><div class="flow-arrow">→</div>
            <div class="flow-node"><strong>Assess risk</strong><br><span class="small muted">Treatment depends on more than the label</span></div>
          </div>
        </section>
        <div class="two-col section-block">
          ${callout("White-coat effect","The office value is high while home/ambulatory values are below the chosen threshold. Confirm, monitor over time, and address overall cardiovascular risk rather than assuming it is harmless.","warning")}
          ${callout("Masked hypertension","The office value appears acceptable while home/ambulatory values are high. This can conceal clinically important exposure and is associated with diabetes, CKD, obesity, smoking, sleep apnea, and stress.","danger")}
        </div>
        ${callout("Device caution","Do not rely on a cuffless smartwatch or unvalidated consumer device as the basis for diagnosis until accuracy and reliability are established.","warning")}
      `
    },

    mechanisms:{
      title:"Mechanisms and primary hypertension",kicker:"Cause & assessment 1",lead:"Primary hypertension has no single identifiable cause. It emerges from interacting neural, hormonal, renal, vascular, metabolic, and environmental mechanisms.",
      html:`
        <section class="interactive-panel interactive-only">
          ${section("Mechanism explorer","Select a mechanism to connect physiology with the clinical phenotype")}
          <div class="tag-row" id="mechanism-buttons">
            <button class="pill-button selected" data-mechanism="sympathetic">Sympathetic activation</button>
            <button class="pill-button" data-mechanism="raas">RAAS activation</button>
            <button class="pill-button" data-mechanism="sodium">Renal sodium retention</button>
            <button class="pill-button" data-mechanism="stiffness">Arterial stiffness</button>
            <button class="pill-button" data-mechanism="endothelium">Endothelial dysfunction</button>
            <button class="pill-button" data-mechanism="obesity">Obesity & insulin resistance</button>
          </div>
          <div id="mechanism-result" class="result-panel" style="margin-top:15px"></div>
        </section>
        <section class="section-block">
          ${section("Why primary hypertension is multifactorial")}
          <div class="card-grid">
            ${card("Genetic susceptibility","<p>Many small-effect variants influence renal sodium handling, vascular tone, autonomic function, and hormonal pathways. Family history changes probability but does not determine destiny.</p>","DNA")}
            ${card("Age and vascular remodeling","<p>With aging, elastin fragmentation, collagen deposition, calcification, and endothelial changes increase arterial stiffness and systolic load.</p>","⌛")}
            ${card("Environment and behavior","<p>Dietary sodium, low physical activity, adiposity, sleep disruption, alcohol, stress, and medication exposures interact with biology.</p>","◎")}
          </div>
        </section>
        <section class="section-block">
          ${section("Mechanism → consequence")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Mechanism</th><th>Immediate effect</th><th>Longer-term consequence</th></tr></thead>
            <tbody>
              <tr><td>Sympathetic overactivity</td><td>Higher heart rate, vasoconstriction, renin release</td><td>Pressure variability, vascular remodeling, metabolic interaction</td></tr>
              <tr><td>RAAS activation</td><td>Angiotensin-mediated vasoconstriction and aldosterone sodium retention</td><td>Cardiac and vascular remodeling</td></tr>
              <tr><td>Renal sodium retention</td><td>Volume expansion</td><td>Salt-sensitive and resistant hypertension</td></tr>
              <tr><td>Arterial stiffness</td><td>Faster pulse-wave reflection and higher systolic pressure</td><td>Wide pulse pressure and LV load</td></tr>
              <tr><td>Endothelial dysfunction</td><td>Reduced vasodilator reserve</td><td>Higher systemic vascular resistance</td></tr>
              <tr><td>Obesity / insulin resistance</td><td>Renal compression, neurohormonal activation, sleep apnea</td><td>Metabolic risk clustering and difficult control</td></tr>
            </tbody>
          </table></div>
        </section>
        ${callout("Key concept","Primary hypertension is not synonymous with “no cause.” It means there is no single specific disease process that fully explains the pressure elevation. The mechanisms are real, multiple, and mutually reinforcing.","success")}
      `
    },

    secondary:{
      title:"Secondary hypertension",kicker:"Cause & assessment 2",lead:"Secondary hypertension has an identifiable and sometimes curable cause. The goal is targeted suspicion—not indiscriminate testing of every patient.",
      html:`
        <section class="interactive-panel interactive-only">
          ${section("Secondary-cause clue matcher","Select all clues present; the tool ranks reasonable diagnostic directions")}
          <div class="choice-grid" id="secondary-clues">
            <button class="choice-button" data-clue="young" type="button">Onset before age 30 / abrupt onset</button>
            <button class="choice-button" data-clue="hypokalemia" type="button">Spontaneous or diuretic-induced hypokalemia</button>
            <button class="choice-button" data-clue="snoring" type="button">Loud snoring, witnessed apnea, sleepiness</button>
            <button class="choice-button" data-clue="episodes" type="button">Episodic headache, palpitations, sweating</button>
            <button class="choice-button" data-clue="renal" type="button">Albuminuria, abnormal urine, reduced eGFR</button>
            <button class="choice-button" data-clue="bruit" type="button">Abdominal bruit / creatinine rise after ACEI or ARB</button>
            <button class="choice-button" data-clue="flash" type="button">Recurrent flash pulmonary edema</button>
            <button class="choice-button" data-clue="armleg" type="button">Arm–leg BP gradient / delayed femoral pulses</button>
            <button class="choice-button" data-clue="drug" type="button">NSAID, steroid, stimulant, OCP, liquorice, cocaine</button>
            <button class="choice-button" data-clue="endocrine" type="button">Cushingoid, thyroid, acromegalic, or calcium clues</button>
          </div>
          <div id="secondary-result" class="result-panel empty" style="margin-top:15px">Select clues to generate a ranked, explainable differential.</div>
        </section>
        <section class="section-block">
          ${section("Cause groups and high-yield clues")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Cause group</th><th>Examples</th><th>Clues</th><th>Targeted test</th></tr></thead>
            <tbody>
              <tr><td>Renal parenchymal</td><td>CKD, glomerular disease, diabetic kidney disease, polycystic kidneys</td><td>Albuminuria, abnormal urinalysis, low eGFR, abnormal kidney size</td><td>Urinalysis, ACR, creatinine/eGFR, renal imaging when indicated</td></tr>
              <tr><td>Renovascular</td><td>Atherosclerotic stenosis, fibromuscular dysplasia</td><td>Bruit, abrupt/resistant HTN, flash edema, ACEI/ARB creatinine rise</td><td>Duplex, CTA, or MRA according to context</td></tr>
              <tr><td>Mineralocorticoid excess</td><td>Primary aldosteronism</td><td>Resistant HTN, hypokalemia, adrenal nodule, sleep apnea</td><td>Aldosterone-to-renin ratio after medication and potassium review</td></tr>
              <tr><td>Sleep-related</td><td>Obstructive sleep apnea</td><td>Snoring, apnea, sleepiness, obesity, nocturnal/non-dipping BP</td><td>Validated screen followed by sleep study</td></tr>
              <tr><td>Catecholamine excess</td><td>Pheochromocytoma / paraganglioma</td><td>Episodic headache, palpitations, sweating, pallor, labile BP</td><td>Plasma free or urinary fractionated metanephrines</td></tr>
              <tr><td>Other endocrine</td><td>Cushing syndrome, thyroid disease, hyperparathyroidism, acromegaly</td><td>Characteristic phenotype or biochemical clue</td><td>Targeted hormonal testing</td></tr>
              <tr><td>Aortic</td><td>Coarctation</td><td>Arm–leg gradient, weak/delayed femoral pulses, murmur</td><td>Echo and cross-sectional imaging</td></tr>
              <tr><td>Drugs/substances</td><td>NSAIDs, steroids, OCPs, stimulants, decongestants, EPO, liquorice, alcohol, cocaine</td><td>Temporal relationship to exposure</td><td>Medication/substance review; withdrawal when feasible</td></tr>
            </tbody>
          </table></div>
        </section>
        <section class="section-block">
          ${section("When to actively screen")}
          <div class="two-col">
            <div class="content-card speech-unit"><ul><li>Onset before age 30 without typical risk factors, or abrupt onset at any age.</li><li>Rapid worsening of previously stable BP.</li><li>Resistant hypertension or need for four or more medications.</li><li>Disproportionate organ damage.</li></ul></div>
            <div class="content-card speech-unit"><ul><li>Hypokalemia, adrenal mass, catecholamine spells, or renal bruit.</li><li>Marked creatinine rise after RAAS blockade.</li><li>Recurrent unexplained flash pulmonary edema.</li><li>Asymmetric kidney size or suggestive endocrine phenotype.</li></ul></div>
          </div>
        </section>
        ${callout("Exam pearl","Hypertension plus hypokalemia should trigger primary aldosteronism in the differential. Do not automatically attribute every low potassium value to a diuretic.","warning")}
      `
    },

    assessment:{
      title:"Clinical assessment",kicker:"Cause & assessment 3",lead:"The consultation answers four questions: Is the BP truly sustained? What is the total cardiovascular risk? Is there organ damage? Is there a clue to a secondary cause or treatment hazard?",
      html:`
        <section class="interactive-panel interactive-only">
          ${section("History and examination switchboard","Choose a domain to reveal the most useful questions and findings")}
          <div class="tag-row" id="assessment-tabs">
            <button class="pill-button selected" data-assessment="bp">BP history</button>
            <button class="pill-button" data-assessment="cardiac">Cardiovascular</button>
            <button class="pill-button" data-assessment="neuro">Neurologic & visual</button>
            <button class="pill-button" data-assessment="renal">Renal</button>
            <button class="pill-button" data-assessment="secondary">Secondary clues</button>
            <button class="pill-button" data-assessment="risk">Risk factors</button>
            <button class="pill-button" data-assessment="pregnancy">Pregnancy</button>
          </div>
          <div id="assessment-result" class="result-panel" style="margin-top:15px"></div>
        </section>
        <section class="section-block">
          ${section("The ‘silent killer’ principle")}
          ${callout("Most chronic hypertension has no symptoms","Headache, tinnitus, epistaxis, nausea, or blurred vision may occur for many reasons and are not reliable markers of chronic BP elevation. Diagnose with measurement, not symptom mythology.","warning")}
        </section>
        <section class="section-block">
          ${section("Focused examination")}
          <div class="card-grid">
            ${card("Measure again","<p>Repeat correctly, measure both arms initially, and consider standing measurements. Record pulse rate and rhythm.</p>","BP")}
            ${card("Quantify metabolic risk","<p>Document body mass index and waist circumference. Look for obesity-related sleep apnea and metabolic clustering.</p>","◎")}
            ${card("Vascular examination","<p>Assess peripheral pulses, femoral delay, bruits, and signs of peripheral arterial disease.</p>","↔")}
            ${card("Heart failure and LVH","<p>Look for sustained or displaced apex, S4, murmurs, raised JVP, crepitations, and edema.</p>","♥")}
            ${card("Fundus","<p>Examine when BP is severe, symptoms are present, or hypertensive emergency is suspected.</p>","◉")}
            ${card("Endocrine, renal, neurologic","<p>Look for cushingoid or thyroid signs, enlarged kidneys or bruit, and focal or diffuse neurologic dysfunction.</p>","⌁")}
          </div>
        </section>
        <section class="section-block">
          ${section("Auscultatory findings in long-standing hypertension")}
          <div class="content-card speech-unit"><ul><li>An accentuated aortic component of S2 and an S4 may reflect high arterial pressure and a stiff hypertrophied LV.</li><li>An ejection systolic murmur may accompany a hyperdynamic state or aortic sclerosis; do not label it “relative stenosis” without structural assessment.</li><li>A diastolic murmur is abnormal and requires evaluation for aortic regurgitation or another structural lesion.</li></ul></div>
        </section>
        ${callout("Red-flag symptoms","New focal neurologic deficit, altered mental status, severe chest or back pain, pulmonary edema, visual loss, oliguria, or pregnancy complications require immediate evaluation for acute organ injury.","danger")}
      `
    },

    "organ-damage":{
      title:"Hypertension-mediated organ damage",kicker:"Cause & assessment 4",lead:"Target-organ injury may be silent for years. Detecting it changes cardiovascular risk, treatment urgency, drug selection, and follow-up intensity.",
      html:`
        <section class="interactive-panel interactive-only">
          ${section("Organ-damage map","Click the body diagram or the organ buttons")}
          <div class="organ-map">
            <div class="organ-buttons">
              <button class="organ-button active" data-organ="heart">Heart</button>
              <button class="organ-button" data-organ="brain">Brain</button>
              <button class="organ-button" data-organ="kidney">Kidney</button>
              <button class="organ-button" data-organ="retina">Retina</button>
              <button class="organ-button" data-organ="vessels">Vasculature</button>
            </div>
            <div class="body-diagram">
              <div class="body-shape" aria-label="Stylized body diagram">
                <button class="organ-dot active" data-organ="heart" aria-label="Heart"></button>
                <button class="organ-dot" data-organ="brain" aria-label="Brain"></button>
                <button class="organ-dot" data-organ="kidney" aria-label="Kidney"></button>
                <button class="organ-dot" data-organ="retina" aria-label="Retina"></button>
                <button class="organ-dot" data-organ="vessels" aria-label="Vasculature"></button>
              </div>
            </div>
          </div>
          <div id="organ-result" class="result-panel" style="margin-top:15px"></div>
        </section>
        <section class="section-block">
          ${section("Chronic injury versus acute severe presentation")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Organ</th><th>Chronic damage</th><th>Acute severe presentation</th></tr></thead>
            <tbody>
              <tr><td>Heart</td><td>LV hypertrophy, diastolic dysfunction, AF, coronary disease, heart failure</td><td>ACS, acute LV failure, pulmonary edema</td></tr>
              <tr><td>Brain</td><td>Small-vessel disease, cognitive decline, TIA, ischemic or hemorrhagic stroke</td><td>Encephalopathy, intracerebral hemorrhage, acute ischemic stroke</td></tr>
              <tr><td>Kidney</td><td>Albuminuria, nephrosclerosis, CKD, progressive eGFR loss</td><td>AKI, hematuria, rapidly worsening renal function</td></tr>
              <tr><td>Retina</td><td>Arteriolar narrowing, AV nicking, hemorrhages, exudates</td><td>Papilledema or severe retinal injury</td></tr>
              <tr><td>Vasculature</td><td>Atherosclerosis, PAD, aneurysm</td><td>Aortic dissection or rupture</td></tr>
            </tbody>
          </table></div>
        </section>
        <section class="section-block">
          ${section("Traditional hypertensive retinopathy")}
          <div class="four-col">
            <div class="content-card speech-unit"><h3>Grade I</h3><p>Generalized arteriolar narrowing or “silver wiring.” Chronic vascular change; often nonspecific.</p></div>
            <div class="content-card speech-unit"><h3>Grade II</h3><p>Arteriovenous crossing changes (AV nicking), suggesting more established chronic retinopathy.</p></div>
            <div class="content-card speech-unit"><h3>Grade III</h3><p>Retinal hemorrhages, cotton-wool spots, or hard exudates: severe retinal injury.</p></div>
            <div class="content-card speech-unit"><h3>Grade IV</h3><p>Grade III changes plus papilledema: supports malignant/emergency-state evaluation.</p></div>
          </div>
        </section>
        ${callout("Stroke or hypertensive encephalopathy?","Encephalopathy often causes diffuse symptoms such as confusion, seizures, headache, and visual disturbance. Focal lateralizing deficits raise concern for stroke. Imaging is essential because overlap is common.","danger")}
      `
    },

    investigations:{
      title:"Diagnostic investigations",kicker:"Cause & assessment 5",lead:"Baseline tests identify silent injury, refine global risk, establish medication safety, and reveal clues that justify targeted secondary-cause testing.",
      html:`
        <section class="interactive-panel interactive-only">
          ${section("Investigation selector","Choose the clinical question—not a fashionable test")}
          <div class="choice-grid" id="test-questions">
            <button class="choice-button" data-test="baseline" type="button">What baseline tests should most patients have?</button>
            <button class="choice-button" data-test="cardiac" type="button">Is there cardiac damage?</button>
            <button class="choice-button" data-test="brain" type="button">Is there acute cerebral injury?</button>
            <button class="choice-button" data-test="renal" type="button">Is there renal or renovascular disease?</button>
            <button class="choice-button" data-test="aldo" type="button">Could this be primary aldosteronism?</button>
            <button class="choice-button" data-test="pheo" type="button">Could this be pheochromocytoma?</button>
            <button class="choice-button" data-test="osa" type="button">Could this be sleep apnea?</button>
            <button class="choice-button" data-test="endocrine" type="button">Could this be another endocrine cause?</button>
          </div>
          <div id="test-result" class="result-panel empty" style="margin-top:15px">Choose a clinical question to see the most useful test and why it matters.</div>
        </section>
        <section class="section-block">
          ${section("Baseline evaluation")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Test</th><th>Why obtain it?</th><th>Important findings</th></tr></thead>
            <tbody>
              <tr><td>Urinalysis + urine ACR</td><td>Detect renal injury and refine risk</td><td>Protein, blood, albuminuria</td></tr>
              <tr><td>Creatinine + eGFR</td><td>Kidney function and medication safety</td><td>CKD, acute deterioration, response to ACEI/ARB or diuretic</td></tr>
              <tr><td>Electrolytes</td><td>Baseline and secondary clues</td><td>Hypokalemia suggests mineralocorticoid excess; hyperkalemia affects RAAS blockers</td></tr>
              <tr><td>Glucose or HbA1c</td><td>Detect diabetes/metabolic risk</td><td>Changes global cardiovascular management</td></tr>
              <tr><td>Lipid profile</td><td>Assess atherosclerotic risk</td><td>Supports statin and risk-reduction decisions</td></tr>
              <tr><td>12-lead ECG</td><td>LVH, ischemia, prior MI, rhythm/conduction disease</td><td>May trigger echo or further cardiac testing</td></tr>
              <tr><td>CBC and TSH when selected</td><td>Alternative causes/comorbidity</td><td>Anemia, thyroid dysfunction</td></tr>
            </tbody>
          </table></div>
        </section>
        <section class="section-block">
          ${section("Practical diagnostic sequence")}
          <div class="flow-row speech-unit">
            <div class="flow-node"><strong>Verify technique</strong></div><div class="flow-arrow">→</div>
            <div class="flow-node"><strong>Confirm outside office</strong></div><div class="flow-arrow">→</div>
            <div class="flow-node"><strong>Assess risk & HMOD</strong></div><div class="flow-arrow">→</div>
            <div class="flow-node"><strong>Review drugs/substances</strong></div><div class="flow-arrow">→</div>
            <div class="flow-node"><strong>Test targeted causes</strong></div>
          </div>
        </section>
        ${callout("Avoid indiscriminate endocrine panels","Targeted testing is more interpretable and cost-effective. A test should answer a plausible clinical question generated by the history, examination, labs, severity, or resistance pattern.","warning")}
      `
    },

    "goals-lifestyle":{
      title:"Treatment goals and lifestyle therapy",kicker:"Treatment 1",lead:"Targets are measurement-dependent and tolerance-dependent. Lifestyle therapy is foundational for every patient, whether or not medication is also required.",
      html:`
        <section class="section-block">
          ${section("Blood-pressure targets")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Guideline/context</th><th>General target</th><th>Key qualification</th></tr></thead>
            <tbody>
              <tr><td>2025 AHA/ACC</td><td>&lt;130/80 mmHg for most adults</td><td>Individualize with pregnancy, institutional care, limited predicted lifespan, or intolerance.</td></tr>
              <tr><td>2024 ESC</td><td>Treated SBP 120–129 mmHg for most patients</td><td>Only when well tolerated; use “as low as reasonably achievable” when frailty or symptoms limit intensive control.</td></tr>
              <tr><td>KDIGO CKD guidance</td><td>Standardized office SBP &lt;120 mmHg when tolerated</td><td>Requires standardized measurement; consider less intensive therapy with frailty, falls, limited life expectancy, or symptomatic orthostasis.</td></tr>
            </tbody>
          </table></div>
          ${callout("Measurement-dependent targets","A target derived from standardized research measurements should not be applied mechanically to casual, rushed clinic readings. Avoid symptomatic hypotension, falls, renal hypoperfusion, and excessive diastolic lowering in vulnerable patients.","warning")}
        </section>
        <section class="interactive-panel interactive-only section-block">
          ${section("Lifestyle plan builder","Select realistic priorities for the next review interval")}
          <div class="choice-grid" id="lifestyle-choices">
            <button class="choice-button" data-life="weight" type="button">Weight management</button>
            <button class="choice-button" data-life="dash" type="button">DASH-style eating pattern</button>
            <button class="choice-button" data-life="sodium" type="button">Reduce sodium</button>
            <button class="choice-button" data-life="potassium" type="button">Increase dietary potassium when safe</button>
            <button class="choice-button" data-life="activity" type="button">Aerobic + resistance activity</button>
            <button class="choice-button" data-life="alcohol" type="button">Reduce or eliminate alcohol</button>
            <button class="choice-button" data-life="smoking" type="button">Stop tobacco/nicotine exposure</button>
            <button class="choice-button" data-life="sleep" type="button">Treat sleep apnea and improve sleep</button>
          </div>
          <div id="lifestyle-result" class="result-panel empty" style="margin-top:15px">Select interventions to build a concise, clinically relevant plan.</div>
        </section>
        <section class="section-block">
          ${section("Lifestyle interventions for every patient")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Intervention</th><th>Practical direction</th><th>Clinical value</th></tr></thead>
            <tbody>
              <tr><td>Weight management</td><td>Aim for meaningful sustainable loss in overweight/obesity; improve waist and body composition</td><td>Lowers BP and improves diabetes, sleep apnea, and lipid risk</td></tr>
              <tr><td>DASH-style diet</td><td>Vegetables, fruit, whole grains, legumes, nuts, fish, low-fat dairy</td><td>Lowers BP and overall cardiovascular risk</td></tr>
              <tr><td>Sodium reduction</td><td>Keep below 2,300 mg/day and move toward 1,500 mg/day when feasible</td><td>Especially useful in salt-sensitive HTN, CKD, older adults, and resistance</td></tr>
              <tr><td>Dietary potassium</td><td>Increase through food when kidney function and potassium are normal</td><td>Promotes natriuresis; avoid unsupervised supplementation in CKD/hyperkalemia risk</td></tr>
              <tr><td>Physical activity</td><td>75–150 minutes/week aerobic activity plus appropriate resistance work</td><td>Improves BP, weight, insulin sensitivity, mood, and fitness</td></tr>
              <tr><td>Alcohol</td><td>Ideally none; otherwise limit</td><td>Excess raises BP and impairs control</td></tr>
              <tr><td>Smoking cessation</td><td>Stop tobacco and nicotine exposure</td><td>May not cause a large sustained BP fall, but sharply reduces cardiovascular risk</td></tr>
              <tr><td>Sleep and stress</td><td>Treat sleep apnea, improve sleep duration, use practical stress reduction</td><td>Supports BP control and adherence</td></tr>
            </tbody>
          </table></div>
        </section>
        ${callout("Adherence principle","The most effective plan is the one the patient can obtain, understand, tolerate, and continue. A theoretically ideal regimen that is not taken is not an effective regimen.","success")}
      `
    },

    pharmacology:{
      title:"Pharmacological treatment",kicker:"Treatment 2",lead:"First-line therapy is built from complementary classes. Selection depends on risk, comorbidity, organ protection, adverse effects, kidney function, electrolytes, and pregnancy status.",
      html:`
        <section class="interactive-panel interactive-only">
          ${section("Drug-class explorer","Select a class to compare strengths, cautions, and typical role")}
          <div class="tag-row" id="drug-buttons">
            <button class="pill-button selected" data-drug="acei">ACE inhibitor</button>
            <button class="pill-button" data-drug="arb">ARB</button>
            <button class="pill-button" data-drug="dhp">DHP calcium blocker</button>
            <button class="pill-button" data-drug="thiazide">Thiazide-like diuretic</button>
            <button class="pill-button" data-drug="mra">MRA</button>
            <button class="pill-button" data-drug="beta">Beta-blocker</button>
            <button class="pill-button" data-drug="loop">Loop diuretic</button>
            <button class="pill-button" data-drug="other">Other add-ons</button>
          </div>
          <div id="drug-result" class="result-panel" style="margin-top:15px"></div>
        </section>
        <section class="section-block">
          ${section("First-line classes")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Class</th><th>Examples</th><th>Strengths</th><th>Important cautions</th></tr></thead>
            <tbody>
              <tr><td>ACE inhibitor</td><td>Ramipril, lisinopril, enalapril</td><td>Albuminuric CKD, diabetes with albuminuria, CAD, HFrEF</td><td>Cough, hyperkalemia, creatinine rise, angioedema; contraindicated in pregnancy</td></tr>
              <tr><td>ARB</td><td>Losartan, valsartan, candesartan</td><td>Similar organ protection without bradykinin cough</td><td>Hyperkalemia, creatinine rise; pregnancy contraindication; do not routinely combine with ACEI</td></tr>
              <tr><td>Long-acting DHP-CCB</td><td>Amlodipine, long-acting nifedipine</td><td>Effective across ages; useful in isolated systolic HTN</td><td>Ankle edema, flushing, headache, gingival overgrowth</td></tr>
              <tr><td>Thiazide/thiazide-like</td><td>Chlorthalidone, indapamide, hydrochlorothiazide</td><td>Strong outcome evidence; salt-sensitive and isolated systolic HTN</td><td>Hyponatremia, hypokalemia, gout, glucose effects; monitor electrolytes</td></tr>
            </tbody>
          </table></div>
        </section>
        <section class="section-block">
          ${section("Starting and combining therapy")}
          <div class="timeline speech-unit">
            <div class="timeline-item"><h3>Confirm the indication</h3><p>Medication is recommended for average BP ≥140/90 mmHg and for selected patients ≥130/80 mmHg based on cardiovascular disease, stroke, diabetes, CKD, or predicted risk.</p></div>
            <div class="timeline-item"><h3>Use two agents when substantially above target</h3><p>For stage 2 hypertension, two complementary first-line agents—preferably a single-pill combination—improve adherence and speed control.</p></div>
            <div class="timeline-item"><h3>Build the common three-drug foundation</h3><p>ACEI or ARB + long-acting DHP-CCB + thiazide-like diuretic.</p></div>
            <div class="timeline-item"><h3>Reassess after initiation or dose change</h3><p>Review BP, adherence, symptoms, adverse effects, electrolytes, and kidney function.</p></div>
          </div>
        </section>
        <div class="two-col section-block">
          ${callout("Never routinely combine ACEI + ARB","Dual RAAS blockade increases harm without routine hypertension benefit.","danger")}
          ${callout("Beta-blockers are indication-specific","They are highly useful for CAD/angina, post-MI, HFrEF with evidence-based agents, tachyarrhythmia, aortic disease, and selected pregnancy settings—but not routine first-line monotherapy for uncomplicated HTN.","warning")}
        </div>
      `
    },

    comorbidities:{
      title:"Choosing treatment with comorbid disease",kicker:"Treatment 3",lead:"The same blood-pressure number can imply different preferred drugs and hazards depending on coronary disease, heart failure, CKD, diabetes, pregnancy, airway disease, conduction disease, gout, or PAD.",
      html:`
        <section class="interactive-panel interactive-only">
          ${section("Comorbidity treatment selector","Choose one dominant clinical setting")}
          <div class="tag-row" id="comorbidity-buttons">
            <button class="pill-button selected" data-comorbidity="cad">CAD / angina</button>
            <button class="pill-button" data-comorbidity="hfrEF">HFrEF</button>
            <button class="pill-button" data-comorbidity="ckd">CKD + albuminuria</button>
            <button class="pill-button" data-comorbidity="diabetes">Diabetes</button>
            <button class="pill-button" data-comorbidity="pregnancy">Pregnancy</button>
            <button class="pill-button" data-comorbidity="asthma">Asthma / COPD</button>
            <button class="pill-button" data-comorbidity="brady">Bradycardia / AV block</button>
            <button class="pill-button" data-comorbidity="gout">Gout</button>
            <button class="pill-button" data-comorbidity="pad">Peripheral arterial disease</button>
          </div>
          <div id="comorbidity-result" class="result-panel" style="margin-top:15px"></div>
        </section>
        <section class="section-block">
          ${section("Clinical matrix")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Setting</th><th>Preferred or useful</th><th>Avoid / caution</th></tr></thead>
            <tbody>
              <tr><td>CAD / angina</td><td>Beta-blocker when indicated; ACEI/ARB for vascular risk; DHP-CCB or long-acting nitrate for symptoms</td><td>Abrupt beta-blocker withdrawal; excessive DBP lowering in severe CAD</td></tr>
              <tr><td>HFrEF</td><td>ARNI/ACEI/ARB, evidence-based beta-blocker, MRA, SGLT2 inhibitor; diuretic for congestion</td><td>Verapamil/diltiazem in reduced EF; NSAIDs; isolated short-acting vasodilators</td></tr>
              <tr><td>CKD + albuminuria</td><td>ACEI or ARB titrated with creatinine and potassium monitoring</td><td>Dual ACEI+ARB; unmonitored RAAS blockade during dehydration/hyperkalemia</td></tr>
              <tr><td>Diabetes</td><td>Standard first-line agents; ACEI/ARB with albuminuria or CKD</td><td>Beta-blockers may mask adrenergic hypoglycemia symptoms</td></tr>
              <tr><td>Pregnancy</td><td>Labetalol, extended-release nifedipine, or methyldopa; acute severe protocols use labetalol/hydralazine/immediate-release oral nifedipine</td><td>ACEI, ARB, direct renin inhibitor; review before conception</td></tr>
              <tr><td>Asthma/COPD</td><td>ACEI/ARB, DHP-CCB, thiazide-like; cardioselective beta-blocker if strongly indicated</td><td>Nonselective beta-blockers in active bronchospasm</td></tr>
              <tr><td>Bradycardia/AV block</td><td>ACEI/ARB, DHP-CCB, thiazide-like</td><td>Beta-blocker and non-DHP CCB unless paced or closely supervised</td></tr>
              <tr><td>Gout</td><td>Consider losartan or CCB</td><td>Thiazides may raise urate; balance against BP benefit</td></tr>
              <tr><td>PAD</td><td>Treat to standard targets; ACEI/ARB and CCB useful</td><td>Beta-blockers are not universally contraindicated when another indication exists</td></tr>
            </tbody>
          </table></div>
        </section>
        ${callout("Pregnancy safety","Medication choice should be reviewed before conception. Chronic hypertension in pregnancy requires obstetric-specific targets, fetal monitoring, and avoidance of fetotoxic RAAS blockers.","danger")}
        <section class="section-block">
          ${section("Adverse-effect memory aid")}
          <div class="three-col">
            ${card("ACE inhibitor","<p>Cough, angioedema, hyperkalemia, creatinine rise, fetal toxicity.</p>","A")}
            ${card("Thiazide-like","<p>Hypokalemia, hyponatremia, hyperuricemia, photosensitivity, glucose effects.</p>","T")}
            ${card("DHP-CCB","<p>Ankle edema, flushing, headache, gingival hyperplasia.</p>","C")}
            ${card("Beta-blocker","<p>Bradycardia, fatigue, sexual dysfunction, bronchospasm with nonselective agents.</p>","β")}
            ${card("Spironolactone","<p>Hyperkalemia, gynecomastia, menstrual disturbance.</p>","S")}
            ${card("Clonidine","<p>Sedation, dry mouth, rebound hypertension if stopped suddenly.</p>","C")}
          </div>
        </section>
      `
    },

    resistant:{
      title:"Resistant hypertension",kicker:"Treatment 4",lead:"True resistant hypertension cannot be diagnosed until measurement, adherence, out-of-office BP, the regimen, and interfering factors have been examined.",
      html:`
        ${callout("Definition","BP remains above goal despite three antihypertensive drugs of different classes at maximally tolerated doses—ideally a long-acting RAAS blocker, long-acting calcium-channel blocker, and effective diuretic—or BP is controlled only with four or more drugs.","success")}
        <section class="interactive-panel interactive-only section-block">
          ${section("Resistance sequence","Open each step in order")}
          <div class="two-col">
            <div class="stepper" id="resistant-steps">
              <button class="step active" data-resistant="0"><span class="step-index">1</span><span><strong>Verify measurement</strong><small>Correct cuff, rest, repeated readings</small></span><span>›</span></button>
              <button class="step" data-resistant="1"><span class="step-index">2</span><span><strong>Confirm outside office</strong><small>Exclude white-coat effect</small></span><span>›</span></button>
              <button class="step" data-resistant="2"><span class="step-index">3</span><span><strong>Assess adherence</strong><small>Cost, complexity, effects, understanding</small></span><span>›</span></button>
              <button class="step" data-resistant="3"><span class="step-index">4</span><span><strong>Optimize regimen</strong><small>Doses, duration, diuretic, combinations</small></span><span>›</span></button>
              <button class="step" data-resistant="4"><span class="step-index">5</span><span><strong>Remove contributors</strong><small>Sodium, NSAIDs, alcohol, OSA, volume</small></span><span>›</span></button>
              <button class="step" data-resistant="5"><span class="step-index">6</span><span><strong>Add and investigate</strong><small>MRA, secondary causes, specialist</small></span><span>›</span></button>
            </div>
            <div id="resistant-result" class="result-panel"></div>
          </div>
        </section>
        <section class="section-block">
          ${section("Pseudo-resistance")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Factor</th><th>Examples</th></tr></thead>
            <tbody>
              <tr><td>Measurement problem</td><td>Wrong cuff, no rest, talking, pain, white-coat effect</td></tr>
              <tr><td>Medication non-adherence</td><td>Cost, complexity, side effects, misunderstanding, unintentional missed doses</td></tr>
              <tr><td>Suboptimal regimen</td><td>Low doses, short-acting drugs, inadequate diuretic, inappropriate combinations</td></tr>
              <tr><td>Interfering substances</td><td>NSAIDs, steroids, OCPs, stimulants, decongestants, excess alcohol, liquorice, high sodium</td></tr>
              <tr><td>Volume excess</td><td>CKD, heart failure, high sodium intake, inadequate diuresis</td></tr>
            </tbody>
          </table></div>
        </section>
        <section class="section-block">
          ${section("Management sequence")}
          <div class="content-card speech-unit"><ol><li>Confirm true resistance and address adherence, sodium, obesity, alcohol, and sleep apnea.</li><li>Optimize ACEI/ARB + long-acting DHP-CCB + thiazide-like diuretic, or loop diuretic when appropriate.</li><li>Add spironolactone if potassium and kidney function allow; use eplerenone when endocrine adverse effects are problematic.</li><li>Screen for primary aldosteronism, CKD, renal-artery disease, sleep apnea, and other secondary causes.</li><li>Refer when control remains difficult or organ damage progresses.</li><li>Consider renal denervation only in selected patients after multidisciplinary evaluation and shared decision-making.</li></ol></div>
        </section>
        ${callout("Definition correction","Resistant hypertension is not defined by “triple therapy for more than two months.” It requires an optimized regimen, adherence assessment, out-of-office confirmation, and exclusion of pseudo-resistance.","warning")}
      `
    },

    emergency:{
      title:"Severe hypertension and hypertensive emergency",kicker:"Treatment 5",lead:"The emergency is defined by acute organ injury, not by the pressure number alone. The immediate task is to identify the injured organ and lower pressure in a controlled, condition-specific way.",
      html:`
        <section class="interactive-panel interactive-only">
          ${section("Emergency triage lab","Educational triage logic—not a substitute for emergency assessment")}
          <div class="control-grid">
            <div class="field"><label for="em-sbp">Systolic BP</label><input id="em-sbp" type="number" value="192" min="70" max="300"></div>
            <div class="field"><label for="em-dbp">Diastolic BP</label><input id="em-dbp" type="number" value="122" min="30" max="200"></div>
            <div class="field"><label for="em-injury">Acute organ injury?</label><select id="em-injury"><option value="no">No clear acute injury</option><option value="neuro">Neurologic deficit / encephalopathy / ICH</option><option value="cardiac">ACS or acute pulmonary edema</option><option value="aorta">Aortic dissection suspected</option><option value="renal">Acute kidney injury / oliguria</option><option value="retina">Visual loss / papilledema</option><option value="pregnancy">Eclampsia / severe pregnancy complication</option></select></div>
          </div>
          <div class="button-row" style="margin-top:12px"><button class="primary-button" id="em-check" type="button">Classify pathway</button></div>
          <div id="em-result" class="result-panel" style="margin-top:15px"></div>
        </section>
        <section class="section-block">
          ${section("Severe asymptomatic hypertension versus emergency")}
          <div class="two-col">
            <div class="content-card speech-unit"><h3>Severe asymptomatic hypertension</h3><p>Usually BP &gt;180/120 mmHg without acute hypertension-mediated organ injury.</p><p><strong>Principle:</strong> repeat correctly, assess symptoms and causes, initiate/reinstitute/intensify oral therapy, and arrange prompt follow-up. Avoid rapid unsupervised or routine IV lowering.</p></div>
            <div class="content-card speech-unit"><h3>Hypertensive emergency</h3><p>Severe BP elevation with acute injury such as encephalopathy, ICH, ACS, pulmonary edema, AKI, aortic dissection, or eclampsia.</p><p><strong>Principle:</strong> ICU-level monitoring and titratable IV therapy directed by the injured organ.</p></div>
          </div>
        </section>
        <section class="section-block">
          ${section("General approach")}
          <div class="timeline speech-unit">
            <div class="timeline-item"><h3>Stabilize and confirm</h3><p>Airway, breathing, circulation; confirm BP rapidly, in both arms when appropriate.</p></div>
            <div class="timeline-item"><h3>Identify the organ</h3><p>Focused history and examination, ECG, urine, creatinine/electrolytes, biomarkers, and targeted imaging.</p></div>
            <div class="timeline-item"><h3>Use titratable IV therapy</h3><p>Continuous monitoring with a short-acting agent appropriate to the syndrome.</p></div>
            <div class="timeline-item"><h3>Control the rate of reduction</h3><p>In most emergencies, reduce mean arterial pressure by no more than about 20–25% in the first hour, then toward about 160/100–110 over the next 2–6 hours if stable.</p></div>
            <div class="timeline-item"><h3>Use condition-specific targets</h3><p>Aortic dissection, acute stroke, pregnancy, and catecholamine crisis do not follow a generic target.</p></div>
          </div>
        </section>
        <section class="section-block">
          ${section("Problem-directed therapy principles")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Problem</th><th>Commonly preferred agents</th><th>Special principle</th></tr></thead>
            <tbody>
              <tr><td>Aortic dissection</td><td>Esmolol or labetalol, then nicardipine/clevidipine if needed</td><td>Rapid HR and SBP reduction; beta-block before pure vasodilation</td></tr>
              <tr><td>Acute pulmonary edema</td><td>Nitroglycerin or clevidipine/nicardipine; loop diuretic when congested</td><td>Avoid routine beta-blocker initiation during acute decompensation</td></tr>
              <tr><td>ACS</td><td>Nitroglycerin; beta-blocker when appropriate; additional titratable agent if required</td><td>Balance BP lowering with coronary perfusion; treat ACS simultaneously</td></tr>
              <tr><td>Encephalopathy</td><td>Nicardipine, clevidipine, or labetalol</td><td>Controlled reduction; exclude stroke/ICH</td></tr>
              <tr><td>Acute ischemic stroke / ICH</td><td>Stroke-specific protocol</td><td>Neuroimaging first; do not apply a generic target</td></tr>
              <tr><td>Pregnancy/eclampsia</td><td>Labetalol, hydralazine, or immediate-release oral nifedipine; magnesium sulfate for seizures</td><td>Urgent obstetric coordination</td></tr>
              <tr><td>Catecholamine crisis</td><td>Phentolamine, nicardipine, or clevidipine</td><td>Avoid unopposed beta-blockade before alpha blockade</td></tr>
            </tbody>
          </table></div>
        </section>
        ${callout("Avoid","Sublingual immediate-release nifedipine can cause an unpredictable pressure fall, ischemia, and stroke. Nitroprusside is reserved for selected settings because of toxicity and monitoring requirements.","danger")}
      `
    },

    kidney:{
      title:"Hypertension and the kidney",kicker:"Kidney & integration 1",lead:"Hypertension damages renal microvasculature and accelerates nephron loss; kidney disease promotes hypertension through sodium retention, RAAS and sympathetic activation, and impaired vasodilation.",
      html:`
        <section class="hero speech-unit" style="padding:30px">
          <div class="hero-grid">
            <div><div class="hero-kicker">Bidirectional feedback loop</div><h2 style="font-size:3rem">Pressure injures nephrons. Lost nephrons raise pressure.</h2><p>This feedback loop amplifies both cardiovascular and renal risk, produces nocturnal and treatment-resistant patterns, and makes standardized measurement and longitudinal kidney monitoring essential.</p></div>
            <div class="content-card" style="color:var(--text)"><p><strong>Hypertension → kidney</strong></p><p class="small">Arteriolar thickening → nephrosclerosis → glomerulosclerosis → albuminuria → eGFR decline</p><hr style="border:0;border-top:1px solid var(--line)"><p><strong>Kidney disease → hypertension</strong></p><p class="small">Reduced sodium excretion → volume expansion → RAAS/sympathetic activation → resistance and nocturnal hypertension</p></div>
          </div>
        </section>
        <section class="section-block">
          ${section("CKD management principles")}
          <div class="card-grid">
            ${card("Standardize measurement","<p>KDIGO suggests standardized office SBP &lt;120 mmHg when tolerated in adults with non-dialysis CKD. A casual clinic number is not equivalent to a standardized research measurement.</p>","BP")}
            ${card("Protect albuminuric kidneys","<p>Use an ACE inhibitor or ARB for clinically significant albuminuria unless contraindicated.</p>","A")}
            ${card("Monitor after RAAS blockade","<p>Check creatinine and potassium after initiation and dose escalation. A creatinine rise &gt;30% requires evaluation for volume depletion, NSAIDs, renovascular disease, or another cause.</p>","K")}
            ${card("Treat total risk","<p>Control diabetes, lipids, smoking, sodium intake, and weight because renal and cardiovascular risk are tightly linked.</p>","Σ")}
          </div>
        </section>
        <section class="interactive-panel interactive-only section-block">
          ${section("Renovascular comparison","Switch between the two major patterns")}
          <div class="tag-row" id="renovascular-buttons"><button class="pill-button selected" data-reno="atherosclerosis">Atherosclerotic stenosis</button><button class="pill-button" data-reno="fmd">Fibromuscular dysplasia</button></div>
          <div id="renovascular-result" class="result-panel" style="margin-top:15px"></div>
        </section>
        <section class="section-block">
          ${section("Diagnosis and intervention")}
          <div class="content-card speech-unit"><ol><li>Duplex ultrasound is a useful initial test when local expertise is strong.</li><li>CTA or MRA provides anatomic assessment; invasive angiography is reserved for uncertainty or planned intervention.</li><li>ACEI/ARB may be used in unilateral disease with monitoring, but severe bilateral stenosis or stenosis to a solitary functioning kidney can precipitate renal failure.</li><li>Routine stenting is not beneficial for every stable atherosclerotic lesion. Consider revascularization for recurrent flash pulmonary edema, progressive renal dysfunction, refractory hypertension, or fibromuscular dysplasia.</li></ol></div>
        </section>
        ${callout("Interpret, do not panic","A modest creatinine rise after ACEI/ARB may reflect the expected hemodynamic effect. A large rise requires assessment; it does not automatically prove that the drug must be permanently abandoned.","warning")}
      `
    },

    cardiorenal:{
      title:"Cardiorenal syndromes",kicker:"Kidney & integration 2",lead:"Cardiorenal syndrome classifies the direction and tempo of heart–kidney interaction. The classification clarifies the primary event; it does not replace diagnosis of the underlying disease.",
      html:`
        <section class="interactive-panel interactive-only">
          ${section("Cardiorenal type sorter","Choose the primary event and tempo")}
          <div class="control-grid">
            <div class="field"><label for="cr-organ">Primary event</label><select id="cr-organ"><option value="heart">Cardiac</option><option value="kidney">Renal</option><option value="systemic">Systemic disorder</option></select></div>
            <div class="field"><label for="cr-tempo">Tempo</label><select id="cr-tempo"><option value="acute">Acute</option><option value="chronic">Chronic</option><option value="simultaneous">Simultaneous</option></select></div>
            <div class="field"><label>&nbsp;</label><button class="primary-button" id="cr-check" type="button">Identify syndrome</button></div>
          </div>
          <div id="cr-result" class="result-panel" style="margin-top:15px"></div>
        </section>
        <section class="section-block">
          ${section("Five-type classification")}
          <div class="table-wrap speech-unit"><table>
            <thead><tr><th>Type</th><th>Primary event</th><th>Result</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td>Type 1 — acute cardiorenal</td><td>Acute worsening of cardiac function</td><td>Acute kidney injury</td><td>Acute decompensated HF or cardiogenic shock</td></tr>
              <tr><td>Type 2 — chronic cardiorenal</td><td>Chronic cardiac dysfunction</td><td>Progressive CKD</td><td>Chronic HF with low perfusion and venous congestion</td></tr>
              <tr><td>Type 3 — acute renocardiac</td><td>Acute kidney injury</td><td>Acute HF, arrhythmia, ischemia, electrolyte-mediated dysfunction</td><td>AKI with hyperkalemia and pulmonary edema</td></tr>
              <tr><td>Type 4 — chronic renocardiac</td><td>Chronic kidney disease</td><td>LVH, CAD, HF, arrhythmia, vascular calcification</td><td>Advanced CKD with pressure/volume overload</td></tr>
              <tr><td>Type 5 — secondary</td><td>Systemic disorder</td><td>Simultaneous cardiac and renal dysfunction</td><td>Sepsis, diabetes, amyloidosis</td></tr>
            </tbody>
          </table></div>
        </section>
        <section class="section-block">
          ${section("What hypertension contributes")}
          <div class="three-col">
            ${card("Afterload and LV remodeling","<p>Persistent pressure load promotes LV hypertrophy, diastolic dysfunction, myocardial oxygen demand, and later heart failure.</p>","♥")}
            ${card("Renal microvascular injury","<p>Arteriolar and glomerular damage reduces nephron reserve, increases albuminuria, and worsens salt handling.</p>","K")}
            ${card("Treatment complexity","<p>Diuretics, RAAS blockers, volume status, potassium, and kidney perfusion must be balanced repeatedly rather than optimized once.</p>","⇄")}
          </div>
        </section>
        ${callout("Clinical integration","Do not treat creatinine and congestion as competing problems without context. Venous congestion itself can worsen kidney function; decongestion may improve the patient even when creatinine transiently changes.","warning")}
      `
    },

    algorithm:{
      title:"Complete clinical algorithm",kicker:"Kidney & integration 3",lead:"A compact pathway from first high reading to long-term control. Use the stepper to connect the foundation, assessment, management, and emergency modules.",
      html:`
        <section class="interactive-panel interactive-only">
          ${section("Clinical pathway stepper","Move sequentially or jump to the decision you need")}
          <div class="two-col">
            <div class="stepper" id="algorithm-steps">
              <button class="step active" data-algorithm="0"><span class="step-index">1</span><span><strong>Validate the reading</strong><small>Technique, cuff, rest, repeat, both arms</small></span><span>›</span></button>
              <button class="step" data-algorithm="1"><span class="step-index">2</span><span><strong>Check for emergency</strong><small>Acute organ injury changes everything</small></span><span>›</span></button>
              <button class="step" data-algorithm="2"><span class="step-index">3</span><span><strong>Confirm sustained BP</strong><small>HBPM / ABPM and pattern</small></span><span>›</span></button>
              <button class="step" data-algorithm="3"><span class="step-index">4</span><span><strong>Assess risk and damage</strong><small>History, exam, labs, ECG, HMOD</small></span><span>›</span></button>
              <button class="step" data-algorithm="4"><span class="step-index">5</span><span><strong>Search targeted causes</strong><small>Young, abrupt, severe, resistant, biochemical clues</small></span><span>›</span></button>
              <button class="step" data-algorithm="5"><span class="step-index">6</span><span><strong>Set target and treat</strong><small>Lifestyle + drug choice + comorbidity</small></span><span>›</span></button>
              <button class="step" data-algorithm="6"><span class="step-index">7</span><span><strong>Reassess and intensify</strong><small>BP, adherence, kidney, electrolytes, effects</small></span><span>›</span></button>
              <button class="step" data-algorithm="7"><span class="step-index">8</span><span><strong>Resolve apparent resistance</strong><small>Pseudo-resistance before fourth-line therapy</small></span><span>›</span></button>
            </div>
            <div id="algorithm-result" class="result-panel"></div>
          </div>
        </section>
        <section class="section-block">
          ${section("Decision checkpoints")}
          <div class="card-grid">
            ${card("Can I trust this BP?","<p>Validated device, correct cuff, preparation, position, silence, repeated average.</p><button class='secondary-button' data-route='measurement'>Measurement lab</button>","1")}
            ${card("Is the patient acutely injured?","<p>Look for neurologic, cardiac, renal, retinal, aortic, or obstetric injury—not just a high number.</p><button class='secondary-button' data-route='emergency'>Emergency lab</button>","2")}
            ${card("Is the exposure sustained?","<p>Use home or ambulatory readings to identify white-coat, masked, or sustained hypertension.</p><button class='secondary-button' data-route='confirmation'>Pattern explorer</button>","3")}
            ${card("Why this patient?","<p>Integrate primary mechanisms, secondary clues, substances, sleep apnea, and kidney disease.</p><button class='secondary-button' data-route='secondary'>Cause matcher</button>","4")}
            ${card("What treatment fits?","<p>Set a measurement-compatible target and select lifestyle and medication around comorbidity and tolerance.</p><button class='secondary-button' data-route='comorbidities'>Treatment selector</button>","5")}
            ${card("Why is control failing?","<p>Confirm technique, out-of-office pressure, adherence, regimen, sodium/volume, and secondary causes.</p><button class='secondary-button' data-route='resistant'>Resistance sequence</button>","6")}
          </div>
        </section>
        ${callout("One-sentence exam algorithm","Confirm the BP correctly, exclude acute organ injury, verify sustained hypertension out of office, assess risk/organ damage/secondary causes, initiate lifestyle and appropriate first-line therapy, then reassess adherence, safety, and response.","success")}
      `
    },

    "clinical-lab":{
      title:"Clinical reasoning cases",kicker:"Practice 1",lead:"Eight cases test whether you can move from measurement to pattern recognition, targeted investigation, treatment selection, and emergency management.",
      html:`<section class="case-layout interactive-only"><div class="case-list" id="case-list"></div><article class="case-card" id="case-card"></article></section>
      <section class="section-block"><div class="callout warning speech-unit"><strong>How to use the cases</strong><div>Commit to an answer before revealing the explanation. State the problem representation, the next best step, and one reason an attractive alternative is wrong.</div></div></section>`
    },

    flashcards:{
      title:"Flashcards",kicker:"Practice 2",lead:"True flip cards for active recall. Click a card or focus it and press Enter/Space to reveal the answer.",
      html:`
        <section class="flash-toolbar interactive-only" aria-label="Flashcard controls">
          <div class="flash-filter-block">
            <span class="flash-toolbar-label">Choose a topic</span>
            <div class="tag-row" id="flash-filters"></div>
          </div>
          <div class="flash-toolbar-meta">
            <strong class="flash-counter" id="flash-counter" aria-live="polite"></strong>
            <div class="flash-actions">
              <button class="secondary-button compact-button" id="flash-reveal-all" type="button">Reveal all</button>
              <button class="secondary-button compact-button" id="flash-reset" type="button">Reset cards</button>
            </div>
          </div>
        </section>
        <section class="flash-grid interactive-only" id="flash-grid" aria-label="Active-recall flashcards"></section>
        ${callout("Retrieval rule","Try to say the full answer before flipping. A correct feeling is not the same as a correctly retrieved explanation.","success")}
      `
    },

    quiz:{
      title:"Final quiz",kicker:"Practice 3",lead:"Twenty-five single-best-answer questions. The score is saved locally, and every answer includes an explanation.",
      html:`<section class="quiz-shell interactive-only" id="quiz-shell"></section>`
    },

    sources:{
      title:"Sources, scope, and clinical notes",kicker:"Reference",lead:"The website preserves the clinically useful structure of the uploaded chapter, adds interactive learning layers, and separates guideline frameworks so thresholds and targets are not blended.",
      html:`
        <section class="section-block">
          ${section("Primary learning source")}
          <div class="source-item speech-unit"><h3>Uploaded Systemic Hypertension chapter</h3><p>Structured review covering diagnosis, secondary causes, organ damage, treatment, resistant hypertension, hypertensive emergency, kidney disease, cardiorenal syndromes, corrections, and rapid revision.</p><p style="margin-top:8px"><a href="systemic-hypertension-source.pdf" target="_blank" rel="noopener">Open the included source PDF</a></p></div>
        </section>
        <section class="section-block">
          ${section("Authoritative guideline resources")}
          <div class="source-list">
            <div class="source-item speech-unit"><h3>2025 AHA/ACC multisociety high blood pressure guideline</h3><p>Adult classification, treatment goal, PREVENT-based risk threshold, home monitoring, stage 2 combination therapy, pregnancy, CKD, and severe asymptomatic hypertension.</p><p><a href="https://professional.heart.org/en/science-news/2025-high-blood-pressure-guideline" target="_blank" rel="noopener">Professional Heart Daily guideline hub</a></p></div>
            <div class="source-item speech-unit"><h3>2024 ESC elevated blood pressure and hypertension guideline</h3><p>ESC classification, continuous-risk model, out-of-office measurement, and treated systolic target of 120–129 mmHg for most patients when tolerated.</p><p><a href="https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/elevated-blood-pressure-and-hypertension/" target="_blank" rel="noopener">European Society of Cardiology guideline page</a></p></div>
            <div class="source-item speech-unit"><h3>KDIGO blood pressure in CKD guideline</h3><p>Standardized BP measurement, CKD-specific target interpretation, and RAAS blockade principles.</p><p><a href="https://kdigo.org/guidelines/blood-pressure-in-ckd/" target="_blank" rel="noopener">KDIGO guideline suite</a></p></div>
            <div class="source-item speech-unit"><h3>AHA scientific statement on resistant hypertension</h3><p>Definition, exclusion of pseudo-resistance, out-of-office confirmation, adherence, diuretic optimization, and MRA-based management.</p><p><a href="https://professional.heart.org/en/science-news/resistant-hypertension-detection-evaluation-and-management" target="_blank" rel="noopener">Professional Heart Daily statement hub</a></p></div>
            <div class="source-item speech-unit"><h3>AHA scientific statement on elevated BP in acute care</h3><p>Distinguishes asymptomatic elevation from acute target-organ injury and emphasizes careful measurement and context rather than reflexive IV treatment.</p><p><a href="https://professional.heart.org/en/science-news/management-of-elevated-blood-pressure-in-the-acute-care-setting" target="_blank" rel="noopener">Professional Heart Daily statement hub</a></p></div>
          </div>
        </section>
        <section class="section-block">
          ${section("Important framework notes")}
          <div class="two-col">
            ${callout("Thresholds differ","The website deliberately reports both ESC and AHA/ACC office categories. Do not merge them into a hybrid threshold.","warning")}
            ${callout("Targets depend on technique","Standardized research targets are not directly interchangeable with rushed casual measurements. Symptoms, frailty, falls, kidney perfusion, and orthostasis matter.","warning")}
            ${callout("Emergency = organ injury","A high number without acute injury follows a different pathway from encephalopathy, ICH, ACS, pulmonary edema, AKI, dissection, or eclampsia.","danger")}
            ${callout("Educational use","Drug selection, doses, targets, and emergency treatment must be adapted to the patient, local guideline, pregnancy status, comorbidity, and specialist advice.","danger")}
          </div>
        </section>
        <section class="section-block">
          ${section("What was improved in this website")}
          <div class="content-card speech-unit"><ul><li>Interconnected modules rather than isolated PDF pages.</li><li>Interactive classification, measurement, diagnostic-pattern, secondary-cause, organ-damage, drug, comorbidity, resistance, emergency, renal, and cardiorenal tools.</li><li>Search, bookmarks, visited progress, responsive layout, print view, dark mode, and text-to-speech.</li><li>True flip flashcards and a persistent scored quiz.</li><li>Clear distinction between guideline systems and between severe asymptomatic BP elevation and hypertensive emergency.</li></ul></div>
        </section>
      `
    }
  };

  const clinicalCases = [
    {title:"The anxious office reading",tag:"Diagnosis",stem:"A 48-year-old has office BP 151/94 and 148/92 mmHg during a stressful visit. Home readings over 7 days average 126/78. No organ damage is found.",question:"What is the most likely BP pattern and the next principle?",answer:"White-coat hypertension/effect is most likely. Verify that home technique and the device are valid, assess total cardiovascular risk, reinforce lifestyle measures, and arrange longitudinal follow-up rather than treating the office number in isolation.",links:["confirmation","measurement"]},
    {title:"Normal clinic, high home BP",tag:"Diagnosis",stem:"A 59-year-old with diabetes and CKD has clinic BP 126/76 but repeated home averages of 143/88. Technique is sound.",question:"What pattern matters here?",answer:"Masked hypertension. The apparently reassuring office value does not represent everyday exposure. Confirm with structured HBPM or ABPM and manage risk and treatment based on sustained out-of-office elevation.",links:["confirmation","organ-damage"]},
    {title:"Resistant hypertension and low potassium",tag:"Secondary",stem:"A 44-year-old remains at 158/96 despite an ARB, amlodipine, and chlorthalidone. Potassium is 3.1 mmol/L; adherence and ABPM confirm true resistance.",question:"Which secondary cause deserves priority and what is the targeted screening test?",answer:"Primary aldosteronism should be prioritized. Review medications and correct potassium as appropriate, then screen with an aldosterone-to-renin ratio according to local protocol.",links:["secondary","resistant"]},
    {title:"Flash edema and renal bruit",tag:"Kidney",stem:"A 72-year-old with diffuse atherosclerosis has recurrent flash pulmonary edema, resistant hypertension, an abdominal bruit, and a large creatinine rise after RAAS blockade.",question:"What diagnosis and testing direction are most important?",answer:"Atherosclerotic renovascular disease is a major concern. Duplex ultrasound can be an initial test where expertise is strong; CTA or MRA provides anatomic assessment. Revascularization is considered selectively in high-risk syndromes such as recurrent flash pulmonary edema.",links:["kidney","secondary"]},
    {title:"Severe BP without acute injury",tag:"Emergency",stem:"A patient has repeated BP 188/118 after missing medications. They are alert, have no chest/back pain, no neurologic deficit, no pulmonary edema, and stable renal function.",question:"Is this automatically a hypertensive emergency?",answer:"No. This is severe asymptomatic hypertension unless acute organ injury is found. Address measurement, causes and adherence, reinstitute or intensify oral therapy, and arrange timely follow-up. Avoid reflex rapid IV lowering.",links:["emergency","resistant"]},
    {title:"Pressure, confusion, and seizures",tag:"Emergency",stem:"A patient presents with BP 226/134, confusion, headache, visual disturbance, and a seizure. Imaging is required to exclude stroke or hemorrhage.",question:"What management category applies?",answer:"This is a hypertensive emergency with suspected encephalopathy until proven otherwise. It requires monitored, titratable IV therapy and controlled pressure reduction while neuroimaging identifies competing or overlapping pathology.",links:["emergency","organ-damage"]},
    {title:"Albuminuric CKD",tag:"Treatment",stem:"A 57-year-old with diabetes, hypertension, eGFR 52, and significant albuminuria needs treatment intensification. Potassium is normal.",question:"Which class has a specific organ-protective role?",answer:"An ACE inhibitor or ARB is preferred for albuminuric CKD, with creatinine and potassium monitoring after initiation and dose changes. Do not combine ACEI and ARB routinely.",links:["kidney","comorbidities"]},
    {title:"Stage 2 treatment start",tag:"Treatment",stem:"A patient has confirmed average BP 166/98 without a compelling contraindication and is substantially above target.",question:"What initial pharmacologic strategy is generally preferred?",answer:"Start two complementary first-line agents, preferably as a single-pill combination, alongside lifestyle therapy. A common foundation is a RAAS blocker plus long-acting DHP-CCB or thiazide-like diuretic, chosen around comorbidity and safety.",links:["pharmacology","goals-lifestyle"]}
  ];

  const flashcards = [
    ["Foundation","Why is one BP reading usually insufficient?","Because BP varies and technique/context can distort it; chronic diagnosis usually requires correct repeated and out-of-office confirmation."],
    ["Foundation","2024 ESC office threshold for hypertension?","At least 140 mmHg systolic or 90 mmHg diastolic."],
    ["Foundation","2025 AHA/ACC threshold for stage 1 hypertension?","130–139 mmHg systolic or 80–89 mmHg diastolic."],
    ["Foundation","What is isolated systolic hypertension?","Elevated systolic BP with non-elevated diastolic BP, often due to large-artery stiffness in older adults."],
    ["Measurement","Effect of a cuff that is too small?","It can falsely elevate the measured BP."],
    ["Measurement","How long should a seated patient rest before office BP?","At least 5 quiet minutes with back supported, feet flat, legs uncrossed, and arm supported at heart level."],
    ["Measurement","What should be done at the first assessment regarding both arms?","Measure both arms and use the arm with the higher reproducible reading for follow-up."],
    ["Measurement","When is standing BP especially important?","Older age, diabetes, autonomic disease, suspected orthostatic symptoms, or after treatment intensification."],
    ["Diagnosis","Define white-coat hypertension.","High office BP with non-hypertensive home or ambulatory BP."],
    ["Diagnosis","Define masked hypertension.","Non-hypertensive office BP with elevated home or ambulatory BP."],
    ["Diagnosis","Best method for nocturnal hypertension and dipping pattern?","Ambulatory blood-pressure monitoring (ABPM)."],
    ["Mechanisms","Main effect of RAAS activation?","Vasoconstriction plus aldosterone-mediated sodium retention, with vascular and cardiac remodeling."],
    ["Mechanisms","Why does arterial stiffness raise systolic BP?","Reduced aortic compliance and earlier pulse-wave reflection increase systolic load and pulse pressure."],
    ["Secondary","Hypertension + hypokalemia suggests what?","Primary aldosteronism, especially with resistant hypertension."],
    ["Secondary","Classic pheochromocytoma clue cluster?","Episodic headache, palpitations, sweating, pallor, and labile BP."],
    ["Secondary","Clues to renovascular hypertension?","Abrupt/resistant HTN, renal bruit, flash pulmonary edema, asymmetric kidneys, or marked creatinine rise after ACEI/ARB."],
    ["Secondary","Common drug/substance causes?","NSAIDs, steroids, estrogen-containing contraceptives, stimulants/decongestants, calcineurin inhibitors, EPO, liquorice, excess alcohol, cocaine/amphetamines."],
    ["Assessment","Why are symptoms unreliable for chronic hypertension diagnosis?","Most chronic hypertension is asymptomatic, and common symptoms are nonspecific."],
    ["Organ damage","Chronic cardiac consequences of hypertension?","LVH, diastolic dysfunction, atrial fibrillation, coronary disease, and heart failure."],
    ["Organ damage","Grade IV hypertensive retinopathy?","Grade III changes plus papilledema; supports emergency-state evaluation."],
    ["Investigations","Core renal screening tests?","Urinalysis, urine albumin-to-creatinine ratio, creatinine/eGFR, and electrolytes."],
    ["Treatment","Main first-line antihypertensive classes?","ACEI or ARB, long-acting DHP-CCB, and thiazide/thiazide-like diuretic."],
    ["Treatment","Why not combine ACEI and ARB routinely?","Dual RAAS blockade increases adverse renal and electrolyte effects without routine hypertension benefit."],
    ["Treatment","When are beta-blockers especially useful?","CAD/angina, post-MI, HFrEF with evidence-based agents, tachyarrhythmia, aortic disease, and selected pregnancy cases."],
    ["Treatment","Preferred fourth-line drug for true resistant HTN?","Spironolactone when potassium and kidney function allow."],
    ["Treatment","Classic DHP-CCB adverse effects?","Ankle edema, flushing, headache, and gingival hyperplasia."],
    ["Treatment","Classic thiazide-like adverse effects?","Hypokalemia, hyponatremia, hyperuricemia/gout, and glucose effects."],
    ["Comorbidity","Preferred class for albuminuric CKD?","ACE inhibitor or ARB with creatinine and potassium monitoring."],
    ["Pregnancy","Drugs commonly used for chronic hypertension in pregnancy?","Labetalol, extended-release nifedipine, or methyldopa; avoid ACEI/ARB/direct renin inhibitor."],
    ["Resistance","First step in apparent resistant hypertension?","Confirm correct measurement, adherence, and out-of-office BP; exclude pseudo-resistance."],
    ["Emergency","What defines hypertensive emergency?","Severe BP elevation with acute hypertension-mediated organ damage."],
    ["Emergency","Usual first-hour reduction in most hypertensive emergencies?","No more than about 20–25% reduction in mean arterial pressure, except condition-specific pathways."],
    ["Emergency","Why beta-block before pure vasodilation in aortic dissection?","To reduce heart rate and shear stress and avoid reflex tachycardia."],
    ["Emergency","What rapid-lowering drug route should be avoided?","Sublingual immediate-release nifedipine because the fall can be unpredictable and ischemic."],
    ["Kidney","What creatinine rise after ACEI/ARB deserves evaluation?","A rise greater than about 30%, prompting assessment for volume depletion, NSAIDs, renovascular disease, or another cause."],
    ["Cardiorenal","Type 1 cardiorenal syndrome?","Acute worsening of cardiac function causing acute kidney injury."],
    ["Cardiorenal","Type 4 cardiorenal syndrome?","Chronic kidney disease causing chronic cardiac disease such as LVH, CAD, HF, arrhythmia, or calcification."]
  ].map((x,i)=>({id:i+1,category:x[0],front:x[1],back:x[2]}));

  const quizQuestions = [
    {q:"Which statement best distinguishes the 2024 ESC and 2025 AHA/ACC office frameworks?",o:["Both diagnose hypertension from 120/70","ESC keeps hypertension at ≥140/90, while AHA/ACC classifies hypertension from 130/80","ESC uses only ambulatory BP","AHA/ACC has no stage system"],a:1,e:"The frameworks use different labels and thresholds. State the framework and do not mix its categories with another system's targets."},
    {q:"A cuff that is too small most commonly causes:",o:["Falsely low BP","Falsely high BP","No change","Only diastolic error"],a:1,e:"An undersized cuff can overestimate BP."},
    {q:"Which pattern describes high office BP but normal home/ambulatory BP?",o:["Masked hypertension","Sustained hypertension","White-coat hypertension","Orthostatic hypertension"],a:2,e:"White-coat hypertension/effect is office elevation without corresponding out-of-office elevation."},
    {q:"Which method is best for nocturnal hypertension and non-dipping?",o:["Single office reading","ABPM","ECG","Echocardiography"],a:1,e:"ABPM tracks pressure across daytime and sleep."},
    {q:"Hypertension with spontaneous hypokalemia most strongly suggests:",o:["Primary aldosteronism","Coarctation","Hyperthyroidism","White-coat effect"],a:0,e:"Hypokalemia plus resistant/severe hypertension is a classic clue to mineralocorticoid excess."},
    {q:"Which symptom cluster is most characteristic of pheochromocytoma/paraganglioma?",o:["Cough, edema, fever","Episodic headache, palpitations, sweating","Claudication, rash, diarrhea","Snoring, edema, hematuria"],a:1,e:"Catecholamine spells classically include episodic headache, palpitations, diaphoresis, pallor, and labile BP."},
    {q:"Which finding most strongly raises concern for renovascular hypertension?",o:["Mild stable BP at age 60","Flash pulmonary edema with renal bruit and ACEI-related creatinine rise","Isolated headache","Normal urinalysis"],a:1,e:"The combination is a high-yield renovascular pattern."},
    {q:"Which test is part of baseline evaluation for renal injury?",o:["Urine albumin-to-creatinine ratio","Troponin in every patient","Coronary angiography","Plasma metanephrines in every patient"],a:0,e:"Urinalysis and urine ACR detect silent renal injury and refine risk."},
    {q:"Which chronic cardiac consequence is associated with hypertension?",o:["LV hypertrophy","Right-to-left shunt","Acute pericarditis only","Congenital VSD"],a:0,e:"Pressure overload promotes LVH, diastolic dysfunction, AF, CAD, and HF."},
    {q:"Papilledema with severe hypertension should suggest:",o:["A harmless white-coat effect","Emergency-state evaluation","Routine annual follow-up only","Isolated systolic hypertension only"],a:1,e:"Papilledema supports severe retinal injury and hypertensive emergency evaluation."},
    {q:"Which is a main first-line class for uncomplicated hypertension?",o:["ACEI/ARB","Clonidine only","Hydralazine only","Reserpine"],a:0,e:"ACEI/ARB, long-acting DHP-CCB, and thiazide/thiazide-like diuretics form the main first-line foundation."},
    {q:"Which combination should not be used routinely?",o:["ARB + DHP-CCB","ACEI + ARB","DHP-CCB + thiazide-like","ARB + thiazide-like"],a:1,e:"Routine dual RAAS blockade increases harm without added routine benefit."},
    {q:"A patient with stage 2 hypertension substantially above target generally benefits from:",o:["No treatment for one year","Two complementary first-line agents, preferably a single-pill combination","Only a short-acting vasodilator","Beta-blocker monotherapy in every case"],a:1,e:"Two first-line agents improve time to control and adherence, especially as a fixed-dose combination."},
    {q:"Which is the preferred fourth-line agent for true resistant hypertension when safe?",o:["Spironolactone","Sublingual nifedipine","Diazoxide","Reserpine"],a:0,e:"An MRA is preferred after optimizing the standard three-drug foundation and excluding pseudo-resistance."},
    {q:"Before diagnosing resistant hypertension, which must be addressed?",o:["Measurement, adherence, out-of-office BP, and regimen quality","Only age","Only symptoms","Only echocardiography"],a:0,e:"True resistance requires exclusion of pseudo-resistance and confirmation of an optimized regimen."},
    {q:"Which statement defines hypertensive emergency?",o:["Any BP above 160/100","Severe BP elevation with acute target-organ injury","Headache alone at any BP","Four antihypertensive drugs"],a:1,e:"The acute organ injury—not a single numeric threshold—defines emergency."},
    {q:"In most hypertensive emergencies, the initial MAP reduction should generally be:",o:["To normal within 5 minutes","No more than about 20–25% in the first hour","Zero","Exactly 50% in 10 minutes"],a:1,e:"Overly rapid lowering can cause ischemia; exceptions use syndrome-specific targets."},
    {q:"In suspected aortic dissection, which principle is correct?",o:["Pure vasodilation before rate control","Beta-blockade before pure vasodilation","No BP treatment","Oral therapy only"],a:1,e:"Heart-rate and shear-stress control should precede pure vasodilation."},
    {q:"Which should be avoided for rapid unsupervised BP lowering?",o:["Sublingual immediate-release nifedipine","Validated home cuff","ABPM","Slow titration of chronic therapy"],a:0,e:"It can produce an unpredictable fall, ischemia, and stroke."},
    {q:"For CKD with significant albuminuria, which class has a specific protective role?",o:["ACEI or ARB","Alpha-1 blocker only","Clonidine only","Direct vasodilator only"],a:0,e:"RAAS blockade is preferred when tolerated, with creatinine and potassium monitoring."},
    {q:"A creatinine rise >30% after ACEI/ARB should prompt:",o:["Automatic lifelong avoidance without assessment","Evaluation for volume depletion, NSAIDs, renovascular disease, or another cause","No action","Immediate thrombolysis"],a:1,e:"A large rise needs investigation; context determines whether therapy is adjusted or stopped."},
    {q:"Which pregnancy medication is generally avoided because of fetal toxicity?",o:["ACE inhibitor","Labetalol","Extended-release nifedipine","Methyldopa"],a:0,e:"ACEI, ARB, and direct renin inhibitors are contraindicated in pregnancy."},
    {q:"Type 1 cardiorenal syndrome is:",o:["Acute cardiac worsening causing AKI","CKD causing chronic LVH","Sepsis causing both","Chronic HF causing CKD"],a:0,e:"Type 1 is acute cardiorenal; type 2 is chronic cardiorenal."},
    {q:"Which lifestyle intervention is especially important in salt-sensitive and resistant hypertension?",o:["Sodium reduction","Increasing alcohol","Stopping all activity","Unsupervised potassium supplements in CKD"],a:0,e:"Sodium restriction is particularly relevant in salt sensitivity, CKD, older age, and resistant HTN."},
    {q:"Which statement about symptoms is most accurate?",o:["Headache reliably diagnoses chronic hypertension","Most chronic hypertension is asymptomatic and symptoms are nonspecific","Epistaxis proves hypertensive emergency","No symptoms means no organ damage"],a:1,e:"Hypertension can be silent while causing progressive organ damage; measurement and assessment are essential."}
  ];

  const searchIndex = Object.entries(modules).map(([id,m])=>({id,title:m.title,text:(m.lead+" "+m.html).replace(/<[^>]+>/g," ").replace(/\s+/g," ")}));

  window.HypertensionContent = {navGroups,modules,clinicalCases,flashcards,quizQuestions,searchIndex};
})();
