/* ==========================================================================
   MANVIA — workouts.js
   Workout data, filtering, detail modal and guided timer.
   ========================================================================== */

const WORKOUTS = [
  {
    id: 'full-body-strength',
    name: 'Full Body Strength',
    cats: ['Strength', 'Intermediate'],
    duration: 45, level: 'Intermediate', kcal: 380,
    img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80',
    alt: 'Woman performing a barbell strength exercise in a gym',
    desc: 'A balanced full-body session that trains push, pull, hinge and squat patterns for total-body strength.',
    exercises: [
      { n: 'Goblet Squat', s: 4, r: '10 reps', rest: '60s' },
      { n: 'Dumbbell Bench Press', s: 4, r: '10 reps', rest: '60s' },
      { n: 'Romanian Deadlift', s: 3, r: '12 reps', rest: '75s' },
      { n: 'Single-Arm Row', s: 3, r: '12 / side', rest: '45s' },
      { n: 'Plank Hold', s: 3, r: '45 sec', rest: '30s' },
    ],
  },
  {
    id: 'upper-body-power',
    name: 'Upper Body Power',
    cats: ['Strength', 'Advanced'],
    duration: 40, level: 'Advanced', kcal: 340,
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    alt: 'Athlete training upper body with weights',
    desc: 'Explosive pressing and pulling work to build upper-body strength and control.',
    exercises: [
      { n: 'Push Press', s: 5, r: '5 reps', rest: '90s' },
      { n: 'Weighted Pull-Up', s: 4, r: '6 reps', rest: '90s' },
      { n: 'Incline Dumbbell Press', s: 3, r: '8 reps', rest: '60s' },
      { n: 'Face Pull', s: 3, r: '15 reps', rest: '45s' },
    ],
  },
  {
    id: 'lower-body-burn',
    name: 'Lower Body Burn',
    cats: ['Strength', 'Beginner'],
    duration: 35, level: 'Beginner', kcal: 300,
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    alt: 'Woman training legs with dumbbells',
    desc: 'A beginner-friendly leg session focused on glutes, quads and hamstrings with controlled tempo.',
    exercises: [
      { n: 'Bodyweight Squat', s: 3, r: '15 reps', rest: '45s' },
      { n: 'Reverse Lunge', s: 3, r: '12 / side', rest: '45s' },
      { n: 'Glute Bridge', s: 3, r: '15 reps', rest: '45s' },
      { n: 'Calf Raise', s: 3, r: '20 reps', rest: '30s' },
    ],
  },
  {
    id: 'hiit-express',
    name: 'HIIT Express',
    cats: ['HIIT', 'Cardio', 'Intermediate'],
    duration: 20, level: 'Intermediate', kcal: 260,
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
    alt: 'Woman doing an intense interval training session',
    desc: 'Twenty minutes, maximum effect. Short work intervals with tight rest for a fast conditioning hit.',
    exercises: [
      { n: 'Jump Squat', s: 4, r: '30 sec', rest: '20s' },
      { n: 'Mountain Climbers', s: 4, r: '30 sec', rest: '20s' },
      { n: 'Burpee', s: 4, r: '30 sec', rest: '20s' },
      { n: 'High Knees', s: 4, r: '30 sec', rest: '20s' },
    ],
  },
  {
    id: 'core-crusher',
    name: 'Core Crusher',
    cats: ['Strength', 'All Levels', 'Beginner'],
    duration: 25, level: 'All Levels', kcal: 190,
    img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=900&q=80',
    alt: 'Women training core strength together on mats',
    desc: 'Deep core activation for stability, posture and injury resilience.',
    exercises: [
      { n: 'Dead Bug', s: 3, r: '12 / side', rest: '40s' },
      { n: 'Hollow Hold', s: 3, r: '30 sec', rest: '40s' },
      { n: 'Side Plank', s: 3, r: '30 sec / side', rest: '40s' },
      { n: 'Bird Dog', s: 3, r: '12 / side', rest: '30s' },
    ],
  },
  {
    id: 'mobility-flow',
    name: 'Mobility Flow',
    cats: ['Mobility', 'All Levels', 'Beginner'],
    duration: 30, level: 'All Levels', kcal: 150,
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    alt: 'Woman stretching through a mobility flow',
    desc: 'Joint-by-joint mobility work to move freely and recover faster between training days.',
    exercises: [
      { n: 'Cat-Cow', s: 2, r: '10 reps', rest: '20s' },
      { n: '90/90 Hip Switch', s: 3, r: '10 / side', rest: '30s' },
      { n: 'Thoracic Opener', s: 3, r: '8 / side', rest: '30s' },
      { n: 'World\'s Greatest Stretch', s: 2, r: '6 / side', rest: '30s' },
    ],
  },
  {
    id: 'morning-yoga',
    name: 'Morning Yoga',
    cats: ['Yoga', 'Beginner', 'All Levels'],
    duration: 25, level: 'Beginner', kcal: 130,
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    alt: 'Woman practising yoga in a calm sunlit studio',
    desc: 'A gentle wake-up flow that combines breath, balance and light strength.',
    exercises: [
      { n: 'Sun Salutation A', s: 3, r: '5 rounds', rest: '30s' },
      { n: 'Warrior II Flow', s: 2, r: '8 / side', rest: '30s' },
      { n: 'Low Lunge Hold', s: 2, r: '45 sec / side', rest: '20s' },
      { n: 'Seated Forward Fold', s: 1, r: '90 sec', rest: '—' },
    ],
  },
  {
    id: 'glute-focus',
    name: 'Glute Focus',
    cats: ['Strength', 'Intermediate'],
    duration: 40, level: 'Intermediate', kcal: 320,
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    alt: 'Woman training glutes with a barbell hip thrust',
    desc: 'Hip-dominant training for glute strength, shape and hip stability.',
    exercises: [
      { n: 'Hip Thrust', s: 4, r: '10 reps', rest: '75s' },
      { n: 'Bulgarian Split Squat', s: 3, r: '10 / side', rest: '60s' },
      { n: 'Cable Kickback', s: 3, r: '15 / side', rest: '45s' },
      { n: 'Banded Abduction', s: 3, r: '20 reps', rest: '30s' },
    ],
  },
  {
    id: 'cardio-endurance',
    name: 'Cardio Endurance',
    cats: ['Cardio', 'Intermediate', 'Advanced'],
    duration: 50, level: 'Intermediate', kcal: 480,
    img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80',
    alt: 'Modern gym cardio floor with treadmills',
    desc: 'Steady-state and tempo intervals to build your aerobic base and staying power.',
    exercises: [
      { n: 'Treadmill Warm-Up', s: 1, r: '8 min', rest: '—' },
      { n: 'Tempo Run', s: 4, r: '5 min', rest: '90s' },
      { n: 'Rower Intervals', s: 5, r: '500 m', rest: '60s' },
      { n: 'Cool-Down Walk', s: 1, r: '6 min', rest: '—' },
    ],
  },
];

const FILTERS = ['All', 'Strength', 'Cardio', 'Yoga', 'Mobility', 'HIIT', 'Beginner', 'Intermediate', 'Advanced'];

let activeFilter = 'All';
let searchTerm = '';

/* ---------- Rendering ---------- */
function workoutCard(w) {
  return `
    <article class="card card-hover reveal" data-id="${w.id}">
      <div class="media">
        <span class="chip badge-float">${w.cats[0]}</span>
        <img src="${w.img}" alt="${w.alt}" loading="lazy" />
      </div>
      <h3 style="margin:1rem 0 .5rem">${w.name}</h3>
      <p style="font-size:.9rem">${w.desc}</p>
      <div class="row" style="gap:.4rem;margin-top:.9rem">
        <span class="chip"><i class="fa-regular fa-clock"></i> ${w.duration} min</span>
        <span class="chip"><i class="fa-solid fa-gauge-high"></i> ${w.level}</span>
        <span class="chip"><i class="fa-solid fa-fire"></i> ${w.kcal} kcal</span>
      </div>
      <button class="btn btn-dark btn-block view-workout" style="margin-top:1.1rem" data-id="${w.id}">View Workout</button>
    </article>`;
}

function renderWorkouts() {
  const grid = document.getElementById('workoutGrid');
  const list = WORKOUTS.filter((w) => {
    const matchesFilter = activeFilter === 'All' || w.cats.includes(activeFilter);
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch = !q || w.name.toLowerCase().includes(q) || w.desc.toLowerCase().includes(q) || w.cats.join(' ').toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });
  grid.innerHTML = list.map(workoutCard).join('');
  document.getElementById('resultCount').textContent = `${list.length} workout${list.length === 1 ? '' : 's'}`;
  document.getElementById('emptyState').style.display = list.length ? 'none' : 'block';
  requestAnimationFrame(() => grid.querySelectorAll('.reveal').forEach((el) => el.classList.add('in')));
}

function renderFilters() {
  const wrap = document.getElementById('workoutFilters');
  wrap.innerHTML = FILTERS.map((f) => `<button class="filter-btn ${f === activeFilter ? 'active' : ''}" data-filter="${f}">${f}</button>`).join('');
}

/* ---------- Detail modal ---------- */
function openWorkout(id) {
  const w = WORKOUTS.find((x) => x.id === id);
  if (!w) return;
  document.getElementById('workoutModalContent').innerHTML = `
    <div class="modal-hero">
      <img src="${w.img}" alt="${w.alt}" />
      <div class="media-overlay"></div>
    </div>
    <div class="modal-body">
      <div class="row between">
        <h3>${w.name}</h3>
        <span class="chip chip-accent">${w.level}</span>
      </div>
      <p>${w.desc}</p>
      <div class="row" style="gap:.4rem">
        <span class="chip"><i class="fa-regular fa-clock"></i> ${w.duration} min</span>
        <span class="chip"><i class="fa-solid fa-fire"></i> ${w.kcal} kcal</span>
        <span class="chip"><i class="fa-solid fa-layer-group"></i> ${w.exercises.length} exercises</span>
      </div>
      <div>
        <h4 style="margin-bottom:.4rem">Exercises</h4>
        ${w.exercises
          .map(
            (e) => `<div class="ex-row">
              <span><strong>${e.n}</strong></span>
              <span class="muted">${e.s} sets · ${e.r} · rest ${e.rest}</span>
            </div>`
          )
          .join('')}
      </div>
      <div class="row">
        <button class="btn btn-primary" id="startWorkoutBtn" data-id="${w.id}"><i class="fa-solid fa-play"></i> Start Workout</button>
        <button class="btn btn-ghost" id="saveWorkoutBtn" data-id="${w.id}">Save to my plan</button>
      </div>
    </div>`;
  openModal('workoutModal');
}

/* ---------- Timer ---------- */
const timer = { total: 0, left: 0, id: null, workout: null, index: 0 };

function fmt(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function paintTimer() {
  document.getElementById('timerDisplay').textContent = fmt(timer.left);
  const done = timer.total ? ((timer.total - timer.left) / timer.total) * 100 : 0;
  document.getElementById('timerBar').style.width = done + '%';
  const count = timer.workout ? timer.workout.exercises.length : 1;
  const idx = Math.min(count, Math.floor((done / 100) * count) + 1);
  document.getElementById('timerExercise').textContent =
    timer.workout ? `Exercise ${idx} of ${count} · ${timer.workout.exercises[idx - 1].n}` : '';
}

function startTimerFor(id) {
  const w = WORKOUTS.find((x) => x.id === id);
  if (!w) return;
  clearInterval(timer.id);
  timer.workout = w;
  timer.total = w.duration * 60;
  timer.left = timer.total;
  document.getElementById('timerWorkoutName').textContent = w.name;
  paintTimer();
  closeModal('workoutModal');
  openModal('timerModal');
}

function tick() {
  if (timer.left <= 0) {
    clearInterval(timer.id);
    timer.id = null;
    toast('Workout complete. Great work! 💪', 'fa-trophy');
    return;
  }
  timer.left -= 1;
  paintTimer();
}

function completeWorkout() {
  const done = MV.get(STORE.workouts, []);
  if (timer.workout) done.push({ id: timer.workout.id, name: timer.workout.name, date: new Date().toISOString() });
  MV.set(STORE.workouts, done);
  clearInterval(timer.id);
  timer.id = null;
  closeModal('timerModal');
  toast('Workout added successfully!', 'fa-circle-check');
}

/* ---------- Events ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderFilters();
  renderWorkouts();

  document.getElementById('workoutFilters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    renderFilters();
    renderWorkouts();
  });

  document.getElementById('workoutSearch').addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderWorkouts();
  });

  document.getElementById('workoutGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('.view-workout');
    if (btn) openWorkout(btn.dataset.id);
  });

  document.getElementById('workoutModalContent').addEventListener('click', (e) => {
    if (e.target.closest('#startWorkoutBtn')) startTimerFor(e.target.closest('#startWorkoutBtn').dataset.id);
    if (e.target.closest('#saveWorkoutBtn')) toast('Saved to your weekly plan!', 'fa-bookmark');
  });

  document.getElementById('timerStart').addEventListener('click', () => {
    if (timer.id || !timer.workout) return;
    timer.id = setInterval(tick, 1000);
    toast('Timer started — you\'ve got this.', 'fa-play');
  });
  document.getElementById('timerPause').addEventListener('click', () => {
    clearInterval(timer.id);
    timer.id = null;
    toast('Timer paused.', 'fa-pause');
  });
  document.getElementById('timerReset').addEventListener('click', () => {
    clearInterval(timer.id);
    timer.id = null;
    timer.left = timer.total;
    paintTimer();
  });
  document.getElementById('timerComplete').addEventListener('click', completeWorkout);
});
