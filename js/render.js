// ── Onboarding ──

function showOnboarding() {
  const el = document.getElementById('onboarding');
  el.classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
  renderOnboardingStep(1);
}

function renderOnboardingStep(step) {
  const el = document.getElementById('onboarding');

  if (step === 1) {
    el.innerHTML = `
      <div class="elv8-tag">ELV8 PERFORMANCE</div>
      <h1>WHERE YOUR FEET ARE</h1>
      <p class="subline">Stop searching for belief. Build it where you stand.</p>
      <p class="body">10 weeks. One athlete. One playbook.</p>
      <div class="phase-grid">
        <div class="phase-card"><div class="phase-weeks">Weeks 1\u20132</div><div class="phase-name">Conviction Over Confidence</div></div>
        <div class="phase-card"><div class="phase-weeks">Weeks 3\u20134</div><div class="phase-name">Progress Over Perfect</div></div>
        <div class="phase-card"><div class="phase-weeks">Weeks 5\u20136</div><div class="phase-name">Strive When It\u2019s Going Wrong</div></div>
        <div class="phase-card"><div class="phase-weeks">Weeks 7\u20138</div><div class="phase-name">Stop Searching for Belief</div></div>
        <div class="phase-card"><div class="phase-weeks">Weeks 9\u201310</div><div class="phase-name">Stay Where Your Feet Are</div></div>
      </div>
      <button class="btn-red" onclick="renderOnboardingStep(2)">Start My 10 Weeks</button>
          <p class="privacy-note">Your coach can see your progress (habits &amp; streaks) to support you. No journal content is ever shared.</p>
    `;
  }

  else if (step === 2) {
    el.innerHTML = `
      <h1>WHAT DO THEY CALL YOU?</h1>
      <p class="body">This is your programme. Your name goes on it.</p>
      <input type="text" id="ob-name" placeholder="First name" autofocus>
      <button class="btn-red" onclick="onboardingName()">That\u2019s me \u2192</button>
    `;
    setTimeout(() => document.getElementById('ob-name').focus(), 100);
  }

  else if (step === 3) {
    el.innerHTML = `
      <h1>WHEN DOES IT START?</h1>
      <p class="body">Today is good. There\u2019s never a better day than the day you actually start.</p>
      <input type="date" id="ob-date" value="${today()}" min="${today()}">
      <button class="btn-red" onclick="onboardingDate()">This is Day 1</button>
    `;
  }

  else if (step === 4) {
    let sliders = '';
    DIMENSIONS.forEach((dim, i) => {
      sliders += `
        <div class="slider-wrap">
          <div class="slider-header">
            <span class="slider-label">${esc(dim)}</span>
            <span class="slider-value" id="sv-${i}">5/10</span>
          </div>
          <input type="range" min="1" max="10" value="5" id="sl-${i}" oninput="document.getElementById('sv-${i}').textContent=this.value+'/10'">
        </div>
      `;
    });
    el.innerHTML = `
      <h1>BEFORE WE START \u2014 WHERE ARE YOU NOW?</h1>
      <p class="body">Rate yourself honestly on each of these. You\u2019ll do this again at Week 10 and see exactly how far you\u2019ve come. No right answers. Just truth.</p>
      ${sliders}
      <button class="btn-red mt-16" onclick="onboardingAssessment()">I\u2019m ready. Let\u2019s start.</button>
    `;
  }
}

function onboardingName() {
  const name = document.getElementById('ob-name').value.trim();
  if (!name) return;
  D.name = name;
  save();
  renderOnboardingStep(3);
}

function onboardingDate() {
  let date = document.getElementById('ob-date').value;
  if (!date) return;
  // A new athlete starts today at the earliest — never backdate into a
  // later week (guards against a past date picked / a bypassed min attr).
  if (date < today()) date = today();
  D.start = date;
  save();
  renderOnboardingStep(4);
}

function onboardingAssessment() {
  const scores = [];
  for (let i = 0; i < 10; i++) {
    scores.push(parseInt(document.getElementById('sl-' + i).value));
  }
  D.assessment.week0 = scores;
  D.setupComplete = true;
  save();

  // Show celebration
  const cel = document.getElementById('celebration');
  cel.innerHTML = `
    <h1>DAY 1 STARTS NOW.</h1>
    <p>Let\u2019s go, ${esc(D.name)}.</p>
    <button class="btn-red" style="width:auto;padding:14px 40px" onclick="finishOnboarding()">Let\u2019s go</button>
  `;
  cel.classList.remove('hidden');
  document.getElementById('onboarding').classList.add('hidden');
}

function finishOnboarding() {
  document.getElementById('celebration').classList.add('hidden');
  tickStreak();
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('streak-num').textContent = D.streak;
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  renderToday();
}


// ── Today Tab ──

function renderToday() {
  const day = getDay();
  const week = getWeek();
  const phase = getPhase();
  const content = CONTENT[week - 1];
  const h = todayHabits();
  const prompt = getPrompt();

  let html = '';

  // Week badge
  html += `<div class="week-badge">WEEK ${week} \u00B7 PHASE ${phase}</div>`;

  // Milestone banner
  const milestoneDays = [7, 14, 21, 35, 70];
  const milestoneMessages = {
    7: '7 days in. Most people quit by now. You haven\u2019t.',
    14: '14 days. Two weeks of showing up. That\u2019s evidence.',
    21: '21 days. It\u2019s becoming who you are now.',
    35: '35 days. Halfway. You\u2019re not the same athlete you were in Week 1.',
    70: '70 days. You did it. Every single one.'
  };
  if (milestoneDays.includes(day) && !D.milestones.includes(day)) {
    html += `<div class="milestone-banner" onclick="dismissMilestone(${day})">&#x1F525; ${milestoneMessages[day]}</div>`;
  }

  // Midpoint assessment banner (Day 29+, Week 5)
  if (day >= 29 && day <= 35 && D.assessment.week5.length === 0) {
    html += `<div class="milestone-banner" onclick="openMidpointAssessment()">You\u2019re halfway. Time for a quick pulse check.</div>`;
  }

  // Today's Prompt
  html += `
    <div class="card">
      <div class="card-label">TODAY\u2019S PROMPT</div>
      <p style="font-size:18px;font-weight:500;line-height:1.5;margin-bottom:10px">${esc(prompt)}</p>
      <button class="btn-ghost" onclick="switchTab('journal')">\u2192 Journal this</button>
    </div>
  `;

  // Today's Check-In
  html += `
    <div class="card">
      <div class="card-label">TODAY\u2019S CHECK-IN</div>
      <div class="habit-row" onclick="toggleHabit('showUp')">
        <div class="habit-check ${h.showUp ? 'done' : ''}">
          ${h.showUp ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
        </div>
        <span class="habit-label ${h.showUp ? 'done' : ''}">Showed up today</span>
      </div>
      <div class="habit-row" onclick="toggleHabit('journal')">
        <div class="habit-check ${h.journal ? 'done' : ''}">
          ${h.journal ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
        </div>
        <span class="habit-label ${h.journal ? 'done' : ''}">Wrote in my journal</span>
      </div>
      <div class="habit-row" onclick="toggleHabit('evidence')">
        <div class="habit-check ${h.evidence ? 'done' : ''}">
          ${h.evidence ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
        </div>
        <span class="habit-label ${h.evidence ? 'done' : ''}">Added evidence</span>
      </div>
    </div>
  `;

  // From Shea
  html += `
    <div class="card card-accent">
      <div class="label-red mb-8">FROM SHEA</div>
      <p class="text-muted italic" style="line-height:1.7">${esc(content.quote)}</p>
    </div>
  `;

  // Progress bar
  const pct = Math.round((day / 70) * 100);
  html += `
    <div class="progress-wrap">
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="progress-text">Day ${day} of 70 \u2014 ${esc(D.name)}, keep going.</div>
    </div>
  `;

  // Share with Shea (Week 2+)
  if (week >= 2) {
    html += `<button class="btn-outline mt-12" onclick="openShareModal()">Share my week with Shea</button>`;
  }

  // Pre-Session Check-In
  html += `<button class="btn-outline mt-12" onclick="openPreSession()">\u26A1 Pre-Session Check-In</button>`;

  // I Want to Quit
  html += `<button class="btn-quit mt-12" onclick="openQuitModal()">\u26A1 I WANT TO QUIT</button>`;

  document.getElementById('tab-today').innerHTML = html;

  // Animate progress bar
  setTimeout(() => {
    const fill = document.querySelector('.progress-fill');
    if (fill) fill.style.width = pct + '%';
  }, 50);
}

function dismissMilestone(day) {
  D.milestones.push(day);
  save();
  renderToday();
}

function toggleHabit(key) {
  const h = todayHabits();
  if (key === 'journal' && !h.journal) {
    switchTab('journal');
    return;
  }
  if (key === 'evidence' && !h.evidence) {
    openEvidenceModal();
    return;
  }
  h[key] = !h[key];
  save();
  renderToday();
}


// ── Week Tab ──

function renderWeek() {
  const week = getWeek();
  const phase = getPhase();
  const content = CONTENT[week - 1];
  const dayStart = (week - 1) * 7 + 1;
  const dayEnd = week * 7;

  let html = '';

  // Heading
  html += `
    <h2 class="display" style="font-size:22px">WEEK ${week}</h2>
    <p class="text-3 text-xs mb-12">Days ${dayStart}\u2013${dayEnd}</p>
  `;

  // 10-dot timeline
  html += '<div class="timeline">';
  for (let w = 1; w <= 10; w++) {
    let cls = 'future';
    if (w < week) cls = 'past';
    if (w === week) cls = 'current';
    html += `<div class="timeline-dot ${cls}">${w}</div>`;
  }
  html += '</div>';

  // Phase header card
  html += `
    <div class="card">
      <div class="label-red mb-8">${content.phase}</div>
      <h3 class="display" style="font-size:30px;margin-bottom:4px">${content.title}</h3>
      <p class="text-muted italic text-sm">${esc(content.tag)}</p>
    </div>
  `;

  // Coach Note
  html += `
    <div class="card card-accent">
      <div class="card-label">COACH NOTE \u2014 SHEA</div>
      <p class="text-muted" style="font-size:14px;line-height:1.7">${esc(content.note)}</p>
    </div>
  `;

  // This Week's Focus
  html += `
    <div class="card">
      <div class="card-label">THIS WEEK\u2019S FOCUS</div>
      <p style="line-height:1.6">${esc(content.focus)}</p>
    </div>
  `;

  // Daily Action
  html += `
    <div class="card">
      <div class="card-label">DAILY ACTION</div>
      <p style="line-height:1.6">${esc(content.action)}</p>
    </div>
  `;

  // Shea's Take
  html += `
    <div class="card">
      <div class="card-label">SHEA\u2019S TAKE THIS WEEK</div>
      <p class="text-muted" style="line-height:1.7">${esc(content.sheasTake)}</p>
      <p class="text-3 text-xs mt-8">Follow @sheamcaleese on LinkedIn for more.</p>
    </div>
  `;

  // Phase completion celebration check
  const phaseDays = [14, 28, 42, 56, 70];
  const day = getDay();
  const phaseIdx = phaseDays.indexOf(day);
  if (phaseIdx !== -1 && !D.phaseCelebrations.includes(day)) {
    const phaseNum = phaseIdx + 1;
    const phaseTitle = CONTENT[phaseIdx * 2].title;
    setTimeout(() => showPhaseCelebration(phaseNum, phaseTitle, day), 500);
  }

  document.getElementById('tab-week').innerHTML = html;
}

function showPhaseCelebration(phaseNum, phaseTitle, day) {
  const cel = document.getElementById('celebration');
  cel.innerHTML = `
    <h1>PHASE ${phaseNum} COMPLETE.</h1>
    <p style="font-family:'Bebas Neue';font-size:24px;margin-bottom:8px">${esc(phaseTitle)}</p>
    <p>Next phase unlocks now.</p>
    <button class="btn-red" style="width:auto;padding:14px 40px;margin-top:16px" onclick="dismissPhaseCelebration(${day})">Keep going</button>
  `;
  cel.classList.remove('hidden');
}

function dismissPhaseCelebration(day) {
  D.phaseCelebrations.push(day);
  save();
  document.getElementById('celebration').classList.add('hidden');
}


// ── Journal Tab ──

function renderJournal() {
  const prompt = getPrompt();
  const week = getWeek();
  const todayEntry = D.journal.find(j => j.date === today());

  let html = '';

  html += `
    <h2 class="display" style="font-size:22px">JOURNAL</h2>
    <p class="text-3 text-xs mb-16">Write honestly. No one else reads this.</p>
  `;

  // Today's entry
  html += `
    <div class="card">
      <p style="font-weight:600;margin-bottom:10px">${esc(prompt)}</p>
      <textarea id="journal-input" placeholder="Write here...">${todayEntry ? esc(todayEntry.text) : ''}</textarea>
      <button class="btn-red mt-12" onclick="saveJournal()">Save</button>
    </div>
  `;

  // Past entries
  const past = [...D.journal].reverse();
  if (past.length > 0) {
    html += '<div class="mt-16">';
    past.forEach((entry, i) => {
      html += `
        <div class="journal-entry" onclick="toggleJournalExpand(this)">
          <div class="journal-meta">${fmtDate(entry.date)} \u00B7 Week ${entry.week}</div>
          <div class="journal-prompt">${esc(entry.prompt)}</div>
          <div class="journal-text">${esc(entry.text)}</div>
        </div>
      `;
    });
    html += '</div>';
  }

  document.getElementById('tab-journal').innerHTML = html;
}

function saveJournal() {
  const text = document.getElementById('journal-input').value.trim();
  if (!text) return;

  const t = today();
  const existing = D.journal.findIndex(j => j.date === t);
  const entry = { date: t, week: getWeek(), prompt: getPrompt(), text: text };

  if (existing >= 0) {
    D.journal[existing] = entry;
  } else {
    D.journal.push(entry);
  }

  // Mark journal habit
  todayHabits().journal = true;
  save();
  showToast('Entry saved.');
  renderJournal();
}

function toggleJournalExpand(el) {
  const textEl = el.querySelector('.journal-text');
  textEl.classList.toggle('expanded');
}


// ── Tools Tab ──

function renderTools() {
  const day = getDay();
  let html = '';

  // Card 1 — Conviction Statement
  html += `
    <div class="card">
      <div class="flex-between mb-8">
        <div class="card-label" style="margin:0">MY CONVICTION STATEMENT</div>
        <button class="btn-sm" onclick="openConvictionModal()">Edit</button>
      </div>
      ${D.conviction
        ? `<p class="display" style="font-size:21px;line-height:1.3">${esc(D.conviction)}</p>`
        : `<p class="text-muted italic text-sm">Not yet written. Week 1 \u2014 build it now.</p>`
      }
    </div>
  `;

  // Card 2 — Evidence File
  const evidenceCount = D.evidence.length;
  html += `
    <div class="card">
      <div class="flex-between mb-8">
        <div class="card-label" style="margin:0">MY EVIDENCE FILE</div>
        <button class="btn-sm" onclick="openEvidenceModal()">+ Add</button>
      </div>
      <div class="display text-red" style="font-size:44px;line-height:1">${evidenceCount}</div>
      <p class="text-3 text-xs">${evidenceCount} piece${evidenceCount !== 1 ? 's' : ''} of evidence</p>
      ${renderDotGrid()}
      ${renderRecentEvidence()}
    </div>
  `;

  // Card 3 — Storm Playbook
  const hasStorm = D.storm.signal || D.storm.anchor || D.storm.action;
  html += `
    <div class="card">
      <div class="flex-between mb-8">
        <div class="card-label" style="margin:0">STORM PLAYBOOK</div>
        <button class="btn-sm" onclick="openStormModal()">${hasStorm ? 'Edit' : 'Build'}</button>
      </div>
      <div class="storm-step">
        <div class="storm-num">1</div>
        <div><div class="storm-label">SIGNAL</div><div class="storm-text">${D.storm.signal ? esc(D.storm.signal) : '<em class="text-3">Not set yet.</em>'}</div></div>
      </div>
      <div class="storm-step">
        <div class="storm-num">2</div>
        <div><div class="storm-label">ANCHOR</div><div class="storm-text">${D.storm.anchor ? esc(D.storm.anchor) : '<em class="text-3">Not set yet.</em>'}</div></div>
      </div>
      <div class="storm-step">
        <div class="storm-num">3</div>
        <div><div class="storm-label">ACTION</div><div class="storm-text">${D.storm.action ? esc(D.storm.action) : '<em class="text-3">Not set yet.</em>'}</div></div>
      </div>
    </div>
  `;

  // Card 4 — Belief Letter
  if (day < 57) {
    const daysLeft = 57 - day;
    html += `
      <div class="card locked">
        <div class="card-label">MY BELIEF LETTER</div>
        <p class="lock-msg">&#x1F512; Unlocks in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}. Your playbook for the rest of your career.</p>
      </div>
    `;
  } else {
    const justUnlocked = day >= 57 && day <= 59 ? ' just-unlocked' : '';
    html += `
      <div class="card${justUnlocked}">
        <div class="flex-between mb-8">
          <div class="card-label" style="margin:0">MY BELIEF LETTER</div>
          <button class="btn-sm" onclick="openBeliefLetterModal()">Edit</button>
        </div>
        ${D.beliefLetter
          ? `<p class="text-muted italic" style="line-height:1.7">${esc(D.beliefLetter)}</p>`
          : `<p class="text-muted italic text-sm">Not yet written. Open the editor to write your letter.</p>`
        }
      </div>
    `;
  }

  // Card 5 — Progress (after Week 10 assessment)
  if (D.assessment.week10.length === 10) {
    html += renderProgressCard();
  } else if (day >= 63) {
    html += `
      <div class="card">
        <div class="card-label">MY PROGRESS</div>
        <p class="text-muted italic text-sm">Complete the Week 10 assessment to see your transformation.</p>
        <button class="btn-outline mt-12" onclick="openExitAssessment()">Take Week 10 Assessment</button>
      </div>
    `;
  }

  // Settings
  html += `<div class="settings-link" onclick="confirmDeleteData()">&#x2699; Delete all my data</div>`;

  document.getElementById('tab-tools').innerHTML = html;
}

function renderDotGrid() {
  let html = '<div class="dot-grid">';
  const day = getDay();
  const evidenceDates = D.evidence.map(e => e.date);

  for (let i = 1; i <= 70; i++) {
    const d = new Date(new Date(D.start).getTime() + (i - 1) * 86400000);
    const dateStr = d.toISOString().slice(0, 10);
    let cls = '';

    if (i === day) {
      cls = 'is-today';
    } else if (i < day) {
      cls = evidenceDates.includes(dateStr) ? 'has-evidence' : 'past-empty';
    }
    // future dots use default (--text-4)

    html += `<div class="dot-grid-dot ${cls}"></div>`;
  }

  html += '</div>';
  return html;
}

function renderRecentEvidence() {
  if (D.evidence.length === 0) return '<p class="text-3 text-xs italic mt-8">Nothing here yet. Every time you show up \u2014 log it.</p>';

  const recent = [...D.evidence].reverse().slice(0, 10);
  let html = '<div class="mt-12">';
  recent.forEach(e => {
    html += `<div style="padding:6px 0;border-bottom:1px solid var(--border-sub)">
      <span class="text-3 text-xs">${fmtDate(e.date)}</span>
      <p class="text-sm text-muted">${esc(e.text)}</p>
    </div>`;
  });
  html += '</div>';
  return html;
}

function renderProgressCard() {
  const w0 = D.assessment.week0;
  const w10 = D.assessment.week10;
  let totalGrowth = 0;

  let bars = '';
  DIMENSIONS.forEach((dim, i) => {
    const v0 = w0[i] || 0;
    const v10 = w10[i] || 0;
    totalGrowth += (v10 - v0);
    bars += `
      <div class="bar-row">
        <div class="bar-label">${esc(dim)}</div>
        <div class="bar-pair">
          <div class="bar week0" style="width:${v0 * 10}%">${v0}</div>
          <div class="bar week10" style="width:${v10 * 10}%">${v10}</div>
        </div>
      </div>
    `;
  });

  const avg = (totalGrowth / 10).toFixed(1);
  return `
    <div class="card">
      <div class="card-label">MY PROGRESS</div>
      <div class="bar-chart">${bars}</div>
      <p class="text-sm text-muted mt-8">Average growth: +${avg} points across 10 dimensions.</p>
      <p class="text-xs text-3 mt-8">Grey = Week 0 | Red = Week 10</p>
    </div>
  `;
}

function confirmDeleteData() {
  if (confirm('Delete all your data? This cannot be undone.')) {
    localStorage.removeItem('wyfa_v1');
    location.reload();
  }
}
