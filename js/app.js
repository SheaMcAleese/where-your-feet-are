const COACH_WHATSAPP = '64274070070';

// ── Supabase Progress Tracking ──
const SUPA_URL = 'https://rqqjqoyjaiphsfhyyvka.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcWpxb3lqYWlwaHNmaHl5dmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTEyMTksImV4cCI6MjA4OTQyNzIxOX0.kIZI3gNv3kfaWOsZhQ6k2B1Me4Q-zZMaaIcQTHD3Tuc';

function getUid() {
  let uid = localStorage.getItem('wyfa_uid');
    if (!uid) {
        uid = 'u_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
            localStorage.setItem('wyfa_uid', uid);
              }
                return uid;
                }

                function pushProgress() {
                  if (!D.setupComplete || !D.name) return;
                    const habits = Object.values(D.habits);
                      const showUpDays = habits.filter(h => h.showUp).length;
                        const journalDays = habits.filter(h => h.journal).length;
                          const evidenceDays = habits.filter(h => h.evidence).length;
                            const payload = {
                                uid: getUid(),
                                    name: D.name,
                                        start_date: D.start || null,
                                            day: getDay(),
                                                week: getWeek(),
                                                    phase: getPhase(),
                                                        streak: D.streak || 0,
                                                            last_open: D.lastOpen || null,
                                                                days_active: habits.length,
                                                                    show_up_days: showUpDays,
                                                                        journal_days: journalDays,
                                                                            evidence_days: evidenceDays,
                                                                                milestones: D.milestones || [],
                                                                                    updated_at: new Date().toISOString()
                                                                                      };
                                                                                        fetch(SUPA_URL + '/rest/v1/progress', {
                                                                                            method: 'POST',
                                                                                                headers: {
                                                                                                      'apikey': SUPA_KEY,
                                                                                                            'Authorization': 'Bearer ' + SUPA_KEY,
                                                                                                                  'Content-Type': 'application/json',
                                                                                                                        'Prefer': 'resolution=merge-duplicates'
                                                                                                                            },
                                                                                                                                body: JSON.stringify(payload)
                                                                                                                                  }).catch(() => {});
                                                                                                                                  }


let D = {};

function defaults() {
  return {
    name: '',
    start: '',
    setupComplete: false,
    assessment: { week0: [], week5: [], week10: [] },
    conviction: '',
    evidence: [],
    storm: { signal: '', anchor: '', action: '' },
    journal: [],
    preSession: [],
    beliefLetter: '',
    habits: {},
    streak: 0,
    lastOpen: '',
    milestones: [],
    phaseCelebrations: []
  };
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function getDay() {
  if (!D.start) return 1;
  const ms = new Date(today()) - new Date(D.start);
  return Math.min(Math.max(Math.floor(ms / 86400000) + 1, 1), 70);
}

function getWeek() {
  return Math.min(Math.ceil(getDay() / 7), 10);
}

function getPhase() {
  return Math.ceil(getWeek() / 2);
}

function getPrompt() {
  const w = getWeek(), d = getDay();
  const prompts = CONTENT[w - 1].prompts;
  return prompts[(d - 1) % 7];
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' });
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function save() {
  localStorage.setItem('wyfa_v1', JSON.stringify(D));
    pushProgress();
}

function load() {
  try {
    D = { ...defaults(), ...JSON.parse(localStorage.getItem('wyfa_v1') || '{}') };
  } catch(e) {
    D = defaults();
  }
}

function todayHabits() {
  const t = today();
  if (!D.habits[t]) D.habits[t] = { showUp: false, journal: false, evidence: false };
  return D.habits[t];
}

function tickStreak() {
  const t = today();
  if (D.lastOpen === t) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (D.lastOpen === yesterday) {
    D.streak = (D.streak || 0) + 1;
  } else {
    D.streak = 1;
  }
  D.lastOpen = t;
  save();
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.add('hidden'), 2500);
}

function switchTab(tab) {
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
  if (tab === 'today') renderToday();
  if (tab === 'week') renderWeek();
  if (tab === 'journal') renderJournal();
  if (tab === 'tools') renderTools();
}

function weekHabitCount(weekNum) {
  let count = 0;
  const startDay = (weekNum - 1) * 7;
  for (let i = 0; i < 7; i++) {
    const d = new Date(new Date(D.start).getTime() + (startDay + i) * 86400000);
    const key = d.toISOString().slice(0, 10);
    const h = D.habits[key];
    if (h) {
      if (h.showUp) count++;
      if (h.journal) count++;
      if (h.evidence) count++;
    }
  }
  return count;
}

function weekJournalCount(weekNum) {
  return D.journal.filter(j => j.week === weekNum).length;
}

// Coach "clean start" link: ?reset=1
// Wipes this device so a new athlete begins at Day 1. It will NOT silently
// destroy progress — if saved data exists, it asks first (Cancel keeps it).
function maybeReset() {
  const params = new URLSearchParams(location.search);
  if (params.get('reset') !== '1') return;
  // Strip the param so a later refresh can never re-trigger a wipe.
  history.replaceState(null, '', location.pathname);
  const hasData = !!localStorage.getItem('wyfa_v1');
  if (!hasData || confirm('Start fresh on this device? This erases any saved progress here.\n\nTap Cancel to keep your existing progress.')) {
    localStorage.removeItem('wyfa_v1');
  }
}

// Boot
function boot() {
  maybeReset();
  load();

  if (!D.setupComplete) {
    showOnboarding();
    return;
  }

  tickStreak();
    pushProgress();
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('streak-num').textContent = D.streak;

  // Milestone streak pill
  const milestones = [7, 14, 21, 35, 70];
  if (milestones.includes(getDay())) {
    document.getElementById('streak-pill').classList.add('milestone');
  }

  // Nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  renderToday();

  // Check for Week 10 exit assessment
  if (getDay() >= 63 && D.assessment.week10.length === 0) {
    setTimeout(() => openExitAssessment(), 800);
  }
}

document.addEventListener('DOMContentLoaded', boot);

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
