/* ==========================================================================
   MANVIA — progress.js
   Chart.js dashboards, fitness score rings, achievements and goals.
   ========================================================================== */

const LIME = '#c7f000';
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function chartTheme() {
  const light = document.documentElement.getAttribute('data-theme') === 'light';
  return {
    grid: light ? 'rgba(17,17,17,.08)' : 'rgba(255,255,255,.07)',
    text: light ? '#5f6360' : '#a5a5a5',
  };
}

function initCharts() {
  if (typeof Chart === 'undefined') return;
  const t = chartTheme();
  Chart.defaults.color = t.text;
  Chart.defaults.font.family = 'Inter, sans-serif';

  const axis = {
    x: { grid: { color: t.grid }, border: { display: false } },
    y: { grid: { color: t.grid }, border: { display: false }, beginAtZero: true },
  };

  /* Weekly activity — line */
  new Chart(document.getElementById('activityChart'), {
    type: 'line',
    data: {
      labels: DAYS,
      datasets: [{
        label: 'Active minutes',
        data: [45, 60, 0, 55, 70, 90, 30],
        borderColor: LIME,
        backgroundColor: 'rgba(199,240,0,.14)',
        fill: true, tension: 0.4, borderWidth: 3,
        pointBackgroundColor: LIME, pointRadius: 4, pointHoverRadius: 6,
      }],
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: axis },
  });

  /* Calories — bar */
  new Chart(document.getElementById('caloriesChart'), {
    type: 'bar',
    data: {
      labels: DAYS,
      datasets: [{
        label: 'kcal',
        data: [420, 510, 120, 480, 620, 480, 210],
        backgroundColor: 'rgba(199,240,0,.55)',
        hoverBackgroundColor: LIME,
        borderRadius: 8, borderSkipped: false,
      }],
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: axis },
  });

  /* Monthly progress — doughnut */
  new Chart(document.getElementById('monthlyChart'), {
    type: 'doughnut',
    data: {
      labels: ['Strength', 'Cardio', 'Yoga & Mobility', 'Rest'],
      datasets: [{
        data: [11, 7, 6, 6],
        backgroundColor: [LIME, '#8fd400', '#173d32', 'rgba(165,165,165,.25)'],
        borderWidth: 0, hoverOffset: 8,
      }],
    },
    options: { responsive: true, maintainAspectRatio: false, cutout: '66%', plugins: { legend: { position: 'bottom' } } },
  });

  /* Fitness score — radar */
  new Chart(document.getElementById('scoreChart'), {
    type: 'radar',
    data: {
      labels: ['Consistency', 'Activity', 'Hydration', 'Recovery', 'Nutrition'],
      datasets: [{
        label: 'Fitness score',
        data: [92, 86, 74, 81, 79],
        borderColor: LIME,
        backgroundColor: 'rgba(199,240,0,.18)',
        pointBackgroundColor: LIME, borderWidth: 2,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { r: { min: 0, max: 100, grid: { color: t.grid }, angleLines: { color: t.grid }, pointLabels: { color: t.text }, ticks: { display: false } } },
    },
  });
}

/* ---------- Fitness score ---------- */
const SCORE_PARTS = [
  { name: 'Consistency', v: 92 },
  { name: 'Activity', v: 86 },
  { name: 'Hydration', v: 74 },
  { name: 'Recovery', v: 81 },
];

function renderScore() {
  makeRing(document.getElementById('scoreRing'), 84, '84<span style="font-size:.9rem;color:var(--text-muted)">/100</span>', 168, 13);
  document.getElementById('scoreBreakdown').innerHTML = SCORE_PARTS.map(
    (p) => `<div style="text-align:center"><div class="mini-ring" data-v="${p.v}"></div><p style="margin-top:.5rem;font-size:.85rem">${p.name}</p></div>`
  ).join('');
  document.querySelectorAll('.mini-ring').forEach((el) => makeRing(el, Number(el.dataset.v), `${el.dataset.v}%`, 104, 9));
}

/* ---------- Achievements ---------- */
const ACHIEVEMENTS = [
  { name: '7 Day Streak', icon: 'fa-fire', unlocked: true },
  { name: 'First Workout', icon: 'fa-flag-checkered', unlocked: true },
  { name: '10 Workouts', icon: 'fa-dumbbell', unlocked: true },
  { name: 'Hydration Hero', icon: 'fa-droplet', unlocked: false },
  { name: 'Early Bird', icon: 'fa-sun', unlocked: false },
];

function renderAchievements() {
  document.getElementById('achievements').innerHTML = ACHIEVEMENTS.map(
    (a) => `<div class="card achv card-hover reveal in ${a.unlocked ? '' : 'locked'}">
      <div class="ico"><i class="fa-solid ${a.icon}"></i></div>
      <strong>${a.name}</strong>
      <small class="muted">${a.unlocked ? 'Unlocked' : 'Locked'}</small>
    </div>`
  ).join('');
}

/* ---------- Goals ---------- */
const DEFAULT_GOALS = [
  { id: 'g1', title: 'Complete 20 workouts', progress: '14/20', pct: 70, done: false },
  { id: 'g2', title: 'Drink 2.5L water daily', progress: '80%', pct: 80, done: false },
  { id: 'g3', title: 'Train 4 days/week', progress: '4/4', pct: 100, done: false },
];

function getGoals() {
  const saved = MV.get(STORE.goals, null);
  if (Array.isArray(saved) && saved.length === DEFAULT_GOALS.length) return saved;
  MV.set(STORE.goals, DEFAULT_GOALS);
  return DEFAULT_GOALS;
}

function renderGoals() {
  const goals = getGoals();
  document.getElementById('goalGrid').innerHTML = goals
    .map(
      (g) => `<div class="card card-hover reveal in">
        <div class="row between"><h3>${g.title}</h3>${g.done ? '<span class="chip chip-accent">Completed</span>' : ''}</div>
        <p style="margin:.6rem 0 1rem">Progress: <strong style="color:var(--text)">${g.progress}</strong></p>
        <div class="bar"><span style="width:${g.done ? 100 : g.pct}%"></span></div>
        <button class="btn ${g.done ? 'btn-ghost' : 'btn-dark'} btn-block goal-btn" style="margin-top:1.1rem" data-id="${g.id}">
          ${g.done ? 'Mark as active' : 'Mark as completed'}
        </button>
      </div>`
    )
    .join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  renderScore();
  renderAchievements();
  renderGoals();

  document.getElementById('goalGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('.goal-btn');
    if (!btn) return;
    const goals = getGoals().map((g) => (g.id === btn.dataset.id ? { ...g, done: !g.done } : g));
    MV.set(STORE.goals, goals);
    renderGoals();
    const goal = goals.find((g) => g.id === btn.dataset.id);
    toast(goal.done ? 'Goal completed! 🎉' : 'Goal set back to active.', goal.done ? 'fa-trophy' : 'fa-rotate-left');
  });
});
