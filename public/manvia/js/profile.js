/* ==========================================================================
   MANVIA — profile.js
   Profile editing, goal selection, recovery, check-in and settings.
   ========================================================================== */

const GOAL_OPTIONS = [
  { id: 'strength', name: 'Build Strength', note: 'Progressive resistance training' },
  { id: 'endurance', name: 'Improve Endurance', note: 'Cardio base and stamina' },
  { id: 'weight', name: 'Lose Weight', note: 'Balanced training and nutrition' },
  { id: 'mobility', name: 'Improve Mobility', note: 'Move freely, recover faster' },
  { id: 'active', name: 'Stay Active', note: 'Consistent daily movement' },
];

const RECOVERY = [
  { name: 'Sleep', value: '7h 20m', pct: 82, icon: 'fa-moon' },
  { name: 'Energy', value: '82%', pct: 82, icon: 'fa-bolt' },
  { name: 'Recovery', value: '78%', pct: 78, icon: 'fa-heart-pulse' },
  { name: 'Stress', value: 'Low', pct: 24, icon: 'fa-spa' },
];

const MOODS = ['Excellent', 'Good', 'Okay', 'Tired'];

/* ---------- Profile form ---------- */
function loadProfile() {
  const form = document.getElementById('profileForm');
  const user = MV.get(STORE.user, null);
  if (user) {
    Object.entries(user).forEach(([k, v]) => { if (form.elements[k]) form.elements[k].value = v; });
    if (user.name) document.getElementById('profileName').textContent = user.name;
  }
}

/* ---------- Goals ---------- */
function renderGoalOptions() {
  const selected = MV.get('manvia_selected_goal', 'strength');
  document.getElementById('goalOptions').innerHTML = GOAL_OPTIONS.map(
    (g) => `<button type="button" class="option ${g.id === selected ? 'selected' : ''}" data-id="${g.id}">
      <strong>${g.name}</strong><small class="muted">${g.note}</small></button>`
  ).join('');
}

/* ---------- Recovery ---------- */
function renderRecovery() {
  document.getElementById('recoveryGrid').innerHTML = RECOVERY.map(
    (r) => `<div class="card card-hover reveal in">
      <div class="feature-icon"><i class="fa-solid ${r.icon}"></i></div>
      <h3>${r.name}</h3>
      <p style="margin:.3rem 0 1rem"><strong style="color:var(--text)">${r.value}</strong></p>
      <div class="bar"><span style="width:${r.pct}%"></span></div>
    </div>`
  ).join('');
}

/* ---------- Check-in ---------- */
function renderCheckin() {
  const saved = MV.get(STORE.checkin, null);
  document.getElementById('checkinOptions').innerHTML = MOODS.map(
    (m) => `<button class="filter-btn ${saved && saved.mood === m ? 'active' : ''}" data-mood="${m}">${m}</button>`
  ).join('');
  const status = document.getElementById('checkinStatus');
  if (saved) {
    status.style.display = 'block';
    status.textContent = `Today's check-in saved: ${saved.mood}.`;
  }
}

/* ---------- Settings ---------- */
function getSettings() {
  return MV.get(STORE.settings, { darkMode: true, notifications: true, emailUpdates: false });
}

function renderSettings() {
  const s = getSettings();
  document.getElementById('setDark').classList.toggle('on', s.darkMode !== false);
  document.getElementById('setNotif').classList.toggle('on', !!s.notifications);
  document.getElementById('setEmail').classList.toggle('on', !!s.emailUpdates);
}

function toggleSetting(key, el, label) {
  const s = getSettings();
  s[key] = !s[key];
  MV.set(STORE.settings, s);
  el.classList.toggle('on', !!s[key]);
  if (key === 'darkMode') applyTheme(s.darkMode ? 'dark' : 'light');
  toast(`${label} ${s[key] ? 'enabled' : 'disabled'}.`, 'fa-sliders');
}

document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  renderGoalOptions();
  renderRecovery();
  renderCheckin();
  renderSettings();

  document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    MV.set(STORE.user, data);
    document.getElementById('profileName').textContent = data.name;
    toast('Profile updated!', 'fa-user-check');
  });

  document.getElementById('goalOptions').addEventListener('click', (e) => {
    const btn = e.target.closest('.option');
    if (!btn) return;
    MV.set('manvia_selected_goal', btn.dataset.id);
    renderGoalOptions();
    toast('Fitness goal updated!', 'fa-bullseye');
  });

  document.getElementById('checkinOptions').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    MV.set(STORE.checkin, { mood: btn.dataset.mood, date: new Date().toDateString() });
    renderCheckin();
    toast("Today's check-in saved.", 'fa-clipboard-check');
  });

  document.getElementById('setDark').addEventListener('click', (e) => toggleSetting('darkMode', e.currentTarget, 'Dark mode'));
  document.getElementById('setNotif').addEventListener('click', (e) => toggleSetting('notifications', e.currentTarget, 'Notifications'));
  document.getElementById('setEmail').addEventListener('click', (e) => toggleSetting('emailUpdates', e.currentTarget, 'Email updates'));
});
