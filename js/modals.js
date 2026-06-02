// ── Modal Framework ──

function openModal(html) {
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-content').innerHTML = html;
  overlay.classList.remove('hidden');

  overlay.onclick = function(e) {
    if (e.target === overlay) closeModal();
  };
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}


// ── Modal 1: Pre-Session Check-In ──

function openPreSession() {
  let convictionHTML = '';
  if (D.conviction) {
    convictionHTML = `
      <div class="conviction-box">${esc(D.conviction)}</div>
      <p class="conviction-box-caption">This is who you are. Carry it in.</p>
    `;
  } else {
    convictionHTML = `<p class="text-muted italic text-sm">No conviction statement yet. Go to Tools to write one.</p>`;
  }

  openModal(`
    <div class="modal-title">PRE-SESSION</div>
    <div class="modal-subtitle">2 minutes before you go. Do this every time.</div>

    <div class="modal-section">
      <div class="modal-section-label">STEP 1 \u2014 SET YOUR INTENTION</div>
      <textarea id="ps-intention" placeholder="What are you here to do today?" style="min-height:80px"></textarea>
    </div>

    <div class="modal-section">
      <div class="modal-section-label">STEP 2 \u2014 YOUR CONVICTION</div>
      ${convictionHTML}
    </div>

    <div class="modal-section">
      <div class="modal-section-label">STEP 3 \u2014 YOUR CUE WORD</div>
      <input type="text" id="ps-cue" placeholder="One word you'll say to yourself when it gets hard.">
    </div>

    <div class="modal-section">
      <div class="modal-section-label">STEP 4 \u2014 THREE BREATHS</div>
      <div id="breath-container">
        <div class="breath-circle" id="breath-circle">Ready</div>
        <button class="btn-outline mt-12" onclick="startBreathing()">Begin</button>
      </div>
      <div id="breath-done" class="hidden mt-16">
        <button class="btn-red" onclick="savePreSession()">I\u2019m ready. Let\u2019s go.</button>
      </div>
    </div>
  `);
}

function startBreathing() {
  const circle = document.getElementById('breath-circle');
  const container = document.getElementById('breath-container');
  container.querySelector('.btn-outline').classList.add('hidden');

  // Inhale
  circle.className = 'breath-circle inhale';
  circle.textContent = 'In';

  setTimeout(() => {
    // Hold
    circle.className = 'breath-circle hold';
    circle.textContent = 'Hold';
  }, 4000);

  setTimeout(() => {
    // Exhale
    circle.className = 'breath-circle exhale';
    circle.textContent = 'Out';
  }, 6000);

  setTimeout(() => {
    circle.className = 'breath-circle';
    circle.textContent = 'Done';
    document.getElementById('breath-done').classList.remove('hidden');
  }, 10000);
}

function savePreSession() {
  const intention = document.getElementById('ps-intention').value.trim();
  const cue = document.getElementById('ps-cue').value.trim();
  D.preSession.push({ date: today(), intention: intention, cue: cue });
  save();
  closeModal();
  showToast('Ready. Go get it.');
}


// ── Modal 2: I Want to Quit ──

function openQuitModal() {
  let stormHTML = '';
  if (D.storm.signal || D.storm.anchor || D.storm.action) {
    stormHTML = `
      <div class="storm-step"><div class="storm-num">1</div><div><div class="storm-label">SIGNAL</div><div class="storm-text">${esc(D.storm.signal)}</div></div></div>
      <div class="storm-step"><div class="storm-num">2</div><div><div class="storm-label">ANCHOR</div><div class="storm-text">${esc(D.storm.anchor)}</div></div></div>
      <div class="storm-step"><div class="storm-num">3</div><div><div class="storm-label">ACTION</div><div class="storm-text">${esc(D.storm.action)}</div></div></div>
    `;
  } else {
    stormHTML = `<p class="text-muted italic text-sm">You haven\u2019t built your Storm Playbook yet. Go to Tools \u2192 build it. That\u2019s your protocol.</p>`;
  }

  openModal(`
    <div class="modal-title">HOLD ON.</div>
    <div class="modal-subtitle">Before you do anything \u2014 work through this. All three steps.</div>

    <div class="modal-section">
      <div class="modal-section-label">STEP 1 \u2014 NAME IT</div>
      <textarea id="quit-vent" placeholder="What's going on right now? Say it on paper. Don't filter it." style="min-height:100px"></textarea>
    </div>

    <div class="modal-section">
      <div class="modal-section-label">STEP 2 \u2014 YOUR ANCHOR</div>
      ${D.conviction
        ? `<div class="conviction-box">${esc(D.conviction)}</div>
           <p class="conviction-box-caption">This is who you are. Not how you feel right now. Who you ARE.</p>`
        : `<p class="text-muted italic text-sm">No conviction statement yet. Go to Tools to write one.</p>`
      }
    </div>

    <div class="modal-section">
      <div class="modal-section-label">STEP 3 \u2014 YOUR STORM PLAYBOOK</div>
      ${stormHTML}
    </div>

    <div class="modal-section">
      <div class="modal-section-label">STEP 4 \u2014 ONE SMALL ACTION</div>
      <textarea id="quit-action" placeholder="What's the one thing you can do right now? Not solve everything \u2014 one thing." style="min-height:80px"></textarea>
    </div>

    <button class="btn-red mt-16" onclick="closeQuit()">I\u2019m still in it. I choose to stay.</button>

    <a href="https://wa.me/${COACH_WHATSAPP}?text=${encodeURIComponent('Hey Shea \u2014 I\'m really struggling right now. Can we talk?')}" target="_blank" rel="noopener" class="btn-green mt-12" style="display:block;text-decoration:none;text-align:center">Message Shea</a>

    <button class="btn-ghost mt-12" style="display:block;width:100%;text-align:center;color:var(--text-3)" onclick="closeModal()">Close</button>
  `);
}

function closeQuit() {
  closeModal();
  showToast('Good. Stay in it.');
}


// ── Modal 3: Conviction Statement ──

function openConvictionModal() {
  openModal(`
    <div class="modal-title">MY CONVICTION STATEMENT</div>
    <div class="modal-subtitle">Who are you as an athlete \u2014 not what you can do, but who you are. One or two sentences. Make it real.</div>
    <textarea id="conviction-input" placeholder="I am..." style="min-height:120px">${esc(D.conviction)}</textarea>
    <p class="text-3 text-xs italic mt-8">e.g. "I show up when it matters, every time." / "I am a fighter who doesn\u2019t quit."</p>
    <button class="btn-red mt-16" onclick="saveConviction()">Save</button>
  `);
}

function saveConviction() {
  D.conviction = document.getElementById('conviction-input').value.trim();
  save();
  closeModal();
  renderTools();
  renderToday();
}


// ── Modal 4: Add Evidence ──

function openEvidenceModal() {
  openModal(`
    <div class="modal-title">ADD EVIDENCE</div>
    <div class="modal-subtitle">What did you do today that counts? Training, a hard conversation, showing up when you didn\u2019t want to \u2014 log it.</div>
    <textarea id="evidence-input" placeholder="Today I..." style="min-height:120px"></textarea>
    <button class="btn-red mt-16" onclick="saveEvidence()">Save</button>
  `);
}

function saveEvidence() {
  const text = document.getElementById('evidence-input').value.trim();
  if (!text) return;
  D.evidence.push({ date: today(), text: text });
  todayHabits().evidence = true;
  save();
  closeModal();
  showToast('Evidence added.');
  renderTools();
  renderToday();
}


// ── Modal 5: Storm Playbook ──

function openStormModal() {
  openModal(`
    <div class="modal-title">STORM PLAYBOOK</div>
    <div class="modal-subtitle">For when it goes wrong. Build this once. Use it every time.</div>

    <div class="modal-section">
      <div class="modal-section-label">SIGNAL \u2014 What triggers you?</div>
      <textarea id="storm-signal" style="min-height:60px" placeholder="When I notice...">${esc(D.storm.signal)}</textarea>
    </div>

    <div class="modal-section">
      <div class="modal-section-label">ANCHOR \u2014 What brings you back?</div>
      <textarea id="storm-anchor" style="min-height:60px" placeholder="I come back to...">${esc(D.storm.anchor)}</textarea>
    </div>

    <div class="modal-section">
      <div class="modal-section-label">ACTION \u2014 What do you do immediately?</div>
      <textarea id="storm-action" style="min-height:60px" placeholder="I immediately...">${esc(D.storm.action)}</textarea>
    </div>

    <button class="btn-red mt-8" onclick="saveStorm()">Save</button>
  `);
}

function saveStorm() {
  D.storm.signal = document.getElementById('storm-signal').value.trim();
  D.storm.anchor = document.getElementById('storm-anchor').value.trim();
  D.storm.action = document.getElementById('storm-action').value.trim();
  save();
  closeModal();
  renderTools();
}


// ── Modal 6: Belief Letter ──

function openBeliefLetterModal() {
  openModal(`
    <div class="modal-title">MY BELIEF LETTER</div>
    <div class="modal-subtitle">10 weeks of work. Write your letter to yourself \u2014 who you\u2019ve become and what you carry forward for the rest of your career.</div>
    <textarea id="belief-input" style="min-height:200px" placeholder="Dear future me...">${esc(D.beliefLetter)}</textarea>
    <button class="btn-red mt-16" onclick="saveBeliefLetter()">Save</button>
  `);
}

function saveBeliefLetter() {
  D.beliefLetter = document.getElementById('belief-input').value.trim();
  save();
  closeModal();
  renderTools();
}


// ── Modal 7: Share with Shea ──

function openShareModal() {
  const week = getWeek();
  const day = getDay();
  const habitsThisWeek = weekHabitCount(week);
  const journalThisWeek = weekJournalCount(week);

  let msg = `Hey Shea \u2014 here's my Week ${week} update:\n\n`;
  msg += `\uD83D\uDCC5 Day ${day} of 70\n`;
  msg += `\uD83D\uDD25 Streak: ${D.streak} days\n`;
  msg += `\u2705 Habits this week: ${habitsThisWeek}/21 completed\n`;
  msg += `\uD83D\uDCDD Journal entries: ${journalThisWeek} this week\n`;
  msg += `\uD83D\uDDC2 Evidence file: ${D.evidence.length} total entries\n`;

  if (D.conviction) {
    msg += `\nMy conviction: "${D.conviction}"\n`;
  }

  msg += `\n\u2014 ${D.name}`;

  openModal(`
    <div class="modal-title">SHARE YOUR WEEK</div>
    <div class="modal-subtitle">Send Shea a summary of how your week\u2019s gone.</div>
    <div class="card" style="font-size:12px;line-height:1.7;white-space:pre-wrap;color:var(--text-2)">${esc(msg)}</div>

    <a href="https://wa.me/${COACH_WHATSAPP}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener" class="btn-green mt-16" style="display:block;text-decoration:none;text-align:center">Send via WhatsApp</a>

    <button class="btn-outline mt-12" onclick="copyShareMessage()">Copy to clipboard</button>
  `);

  window._shareMsg = msg;
}

function copyShareMessage() {
  navigator.clipboard.writeText(window._shareMsg).then(() => {
    showToast('Copied.');
  }).catch(() => {
    showToast('Could not copy.');
  });
}


// ── Modal 8: Week 5 Midpoint Assessment ──

function openMidpointAssessment() {
  let sliders = '';
  MIDPOINT_INDICES.forEach((dimIdx, i) => {
    sliders += `
      <div class="slider-wrap">
        <div class="slider-header">
          <span class="slider-label">${esc(DIMENSIONS[dimIdx])}</span>
          <span class="slider-value" id="mp-sv-${i}">5/10</span>
        </div>
        <input type="range" min="1" max="10" value="5" id="mp-sl-${i}" oninput="document.getElementById('mp-sv-${i}').textContent=this.value+'/10'">
      </div>
    `;
  });

  openModal(`
    <div class="modal-title">MIDPOINT PULSE CHECK</div>
    <div class="modal-subtitle">Quick check on 5 key dimensions. Rate yourself honestly.</div>
    ${sliders}
    <button class="btn-red mt-16" onclick="saveMidpoint()">Save</button>
  `);
}

function saveMidpoint() {
  const scores = [];
  for (let i = 0; i < MIDPOINT_INDICES.length; i++) {
    scores.push(parseInt(document.getElementById('mp-sl-' + i).value));
  }
  D.assessment.week5 = scores;
  save();
  closeModal();
  showToast('Pulse check saved.');
  renderToday();
}


// ── Modal 8b: Week 10 Exit Assessment ──

function openExitAssessment() {
  let sliders = '';
  DIMENSIONS.forEach((dim, i) => {
    sliders += `
      <div class="slider-wrap">
        <div class="slider-header">
          <span class="slider-label">${esc(dim)}</span>
          <span class="slider-value" id="ex-sv-${i}">5/10</span>
        </div>
        <input type="range" min="1" max="10" value="5" id="ex-sl-${i}" oninput="document.getElementById('ex-sv-${i}').textContent=this.value+'/10'">
      </div>
    `;
  });

  openModal(`
    <div class="modal-title">10 WEEKS LATER \u2014 WHERE ARE YOU NOW?</div>
    <div class="modal-subtitle">Same 10 questions as Week 1. Rate yourself honestly. Then see how far you\u2019ve come.</div>
    ${sliders}
    <button class="btn-red mt-16" onclick="saveExitAssessment()">See My Transformation</button>
  `);
}

function saveExitAssessment() {
  const scores = [];
  for (let i = 0; i < 10; i++) {
    scores.push(parseInt(document.getElementById('ex-sl-' + i).value));
  }
  D.assessment.week10 = scores;
  save();
  closeModal();
  openEndSummary();
}


// ── Modal 9: End-of-Programme Summary ──

function openEndSummary() {
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

  // Calculate stats
  const totalHabits = Object.values(D.habits).reduce((sum, h) => {
    return sum + (h.showUp ? 1 : 0) + (h.journal ? 1 : 0) + (h.evidence ? 1 : 0);
  }, 0);

  const cel = document.getElementById('celebration');
  cel.innerHTML = `
    <div style="max-width:500px;width:100%;text-align:left;padding:24px;overflow-y:auto;max-height:100vh">
      <h1 style="font-family:'Bebas Neue';font-size:36px;text-align:center;margin-bottom:4px">YOU DID IT.</h1>
      <p style="text-align:center;color:var(--text-2);margin-bottom:24px">70 days. Here\u2019s who you became.</p>

      <div class="card">
        <div class="card-label">THE NUMBERS</div>
        <p class="text-sm">\uD83D\uDD25 Peak streak: ${D.streak} days</p>
        <p class="text-sm">\uD83D\uDDC2 Evidence entries: ${D.evidence.length}</p>
        <p class="text-sm">\uD83D\uDCDD Journal entries: ${D.journal.length}</p>
        <p class="text-sm">\u2705 Habits completed: ${totalHabits}/210</p>
      </div>

      ${D.conviction ? `
        <div class="card">
          <div class="card-label">YOUR CONVICTION STATEMENT</div>
          <p class="display" style="font-size:21px;line-height:1.3">${esc(D.conviction)}</p>
        </div>
      ` : ''}

      ${(D.storm.signal || D.storm.anchor || D.storm.action) ? `
        <div class="card">
          <div class="card-label">YOUR STORM PLAYBOOK</div>
          <div class="storm-step"><div class="storm-num">1</div><div><div class="storm-label">SIGNAL</div><div class="storm-text">${esc(D.storm.signal)}</div></div></div>
          <div class="storm-step"><div class="storm-num">2</div><div><div class="storm-label">ANCHOR</div><div class="storm-text">${esc(D.storm.anchor)}</div></div></div>
          <div class="storm-step"><div class="storm-num">3</div><div><div class="storm-label">ACTION</div><div class="storm-text">${esc(D.storm.action)}</div></div></div>
        </div>
      ` : ''}

      ${D.beliefLetter ? `
        <div class="card">
          <div class="card-label">YOUR BELIEF LETTER</div>
          <p class="text-muted italic" style="line-height:1.7">${esc(D.beliefLetter)}</p>
        </div>
      ` : ''}

      <div class="card">
        <div class="card-label">YOUR TRANSFORMATION</div>
        <div class="bar-chart">${bars}</div>
        <p class="text-sm text-muted mt-8">Average growth: +${avg} points across 10 dimensions.</p>
        <p class="text-xs text-3 mt-8">Grey = Week 0 | Red = Week 10</p>
      </div>

      <div class="card">
        <div class="card-label">WHAT COMES NEXT</div>
        <p style="line-height:1.7">The programme is complete. The work continues. Keep using your tools.</p>
      </div>

      <button class="btn-red mt-16" onclick="openEndShareModal()">Share with Shea</button>
      <button class="btn-outline mt-12" onclick="window.print()">Download my summary</button>
      <button class="btn-outline mt-12" onclick="closeEndSummary()">Close</button>
    </div>
  `;
  cel.classList.remove('hidden');
}

function closeEndSummary() {
  document.getElementById('celebration').classList.add('hidden');
  renderTools();
}

function openEndShareModal() {
  document.getElementById('celebration').classList.add('hidden');

  const totalHabits = Object.values(D.habits).reduce((sum, h) => {
    return sum + (h.showUp ? 1 : 0) + (h.journal ? 1 : 0) + (h.evidence ? 1 : 0);
  }, 0);

  let msg = `Hey Shea \u2014 I finished the programme!\n\n`;
  msg += `\uD83D\uDD25 Streak: ${D.streak} days\n`;
  msg += `\uD83D\uDDC2 Evidence: ${D.evidence.length} entries\n`;
  msg += `\uD83D\uDCDD Journal: ${D.journal.length} entries\n`;
  msg += `\u2705 Habits: ${totalHabits}/210\n`;

  if (D.conviction) {
    msg += `\nMy conviction: "${D.conviction}"\n`;
  }

  const w0 = D.assessment.week0;
  const w10 = D.assessment.week10;
  const totalGrowth = w10.reduce((sum, v, i) => sum + (v - (w0[i] || 0)), 0);
  const avg = (totalGrowth / 10).toFixed(1);
  msg += `\nAverage growth: +${avg} points across 10 dimensions.\n`;
  msg += `\n\u2014 ${D.name}`;

  openModal(`
    <div class="modal-title">SHARE YOUR RESULTS</div>
    <div class="modal-subtitle">Let Shea know you did it.</div>
    <div class="card" style="font-size:12px;line-height:1.7;white-space:pre-wrap;color:var(--text-2)">${esc(msg)}</div>
    <a href="https://wa.me/${COACH_WHATSAPP}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener" class="btn-green mt-16" style="display:block;text-decoration:none;text-align:center">Send via WhatsApp</a>
    <button class="btn-outline mt-12" onclick="navigator.clipboard.writeText(${JSON.stringify(msg).replace(/'/g, "\\'")}).then(()=>showToast('Copied.'))">Copy to clipboard</button>
  `);
}
