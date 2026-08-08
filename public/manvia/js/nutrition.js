/* ==========================================================================
   MANVIA — nutrition.js
   Meal library, daily plan, hydration tracker, wellness habits.
   ========================================================================== */

const MEALS = [
  { name: 'Protein Power Bowl', cat: 'Lunch', kcal: 520, p: 38, c: 48, f: 16,
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    alt: 'Protein bowl with grilled chicken, greens and grains' },
  { name: 'Avocado Toast', cat: 'Breakfast', kcal: 340, p: 12, c: 34, f: 18,
    img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80',
    alt: 'Avocado toast with eggs on a breakfast table' },
  { name: 'Green Smoothie', cat: 'Snacks', kcal: 210, p: 9, c: 32, f: 5,
    img: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=900&q=80',
    alt: 'Green smoothie in a glass with spinach and banana' },
  { name: 'Grilled Veggie Bowl', cat: 'Dinner', kcal: 430, p: 18, c: 52, f: 14,
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    alt: 'Grilled vegetable bowl with quinoa' },
  { name: 'Greek Yogurt & Berries', cat: 'Breakfast', kcal: 260, p: 20, c: 28, f: 7,
    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    alt: 'Greek yogurt topped with fresh berries' },
  { name: 'Chicken & Quinoa Bowl', cat: 'Dinner', kcal: 560, p: 44, c: 50, f: 17,
    img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
    alt: 'Chicken and quinoa bowl with vegetables' },
  { name: 'Fruit & Nut Snack', cat: 'Snacks', kcal: 240, p: 7, c: 26, f: 13,
    img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
    alt: 'Bowl of mixed fruits and nuts' },
  { name: 'Paneer Tikka Salad', cat: 'Lunch', kcal: 480, p: 32, c: 30, f: 24,
    img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
    alt: 'Fresh salad bowl with grilled paneer and vegetables' },
];

const MEAL_CATS = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];
let mealFilter = 'All';

function renderMealFilters() {
  document.getElementById('mealFilters').innerHTML = MEAL_CATS.map(
    (c) => `<button class="filter-btn ${c === mealFilter ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');
}

function renderMeals() {
  const list = MEALS.filter((m) => mealFilter === 'All' || m.cat === mealFilter);
  document.getElementById('mealGrid').innerHTML = list
    .map(
      (m) => `<article class="card card-hover reveal in">
        <div class="media"><span class="chip badge-float">${m.cat}</span>
          <img src="${m.img}" alt="${m.alt}" loading="lazy" /></div>
        <h3 style="margin:1rem 0 .6rem">${m.name}</h3>
        <div class="grid g-4" style="gap:.5rem">
          <div><small class="muted">Calories</small><br /><strong>${m.kcal}</strong></div>
          <div><small class="muted">Protein</small><br /><strong>${m.p}g</strong></div>
          <div><small class="muted">Carbs</small><br /><strong>${m.c}g</strong></div>
          <div><small class="muted">Fats</small><br /><strong>${m.f}g</strong></div>
        </div>
        <button class="btn btn-dark btn-block add-meal" style="margin-top:1.1rem" data-name="${m.name}">Add to today</button>
      </article>`
    )
    .join('');
}

/* ---------- Daily plan ---------- */
const PLAN = [
  { meal: 'Breakfast', time: '8:00 AM', note: 'Greek Yogurt & Berries', icon: 'fa-mug-saucer' },
  { meal: 'Lunch', time: '1:00 PM', note: 'Protein Power Bowl', icon: 'fa-bowl-food' },
  { meal: 'Snack', time: '4:30 PM', note: 'Fruit & Nut Snack', icon: 'fa-apple-whole' },
  { meal: 'Dinner', time: '7:30 PM', note: 'Grilled Veggie Bowl', icon: 'fa-utensils' },
];

function renderPlan() {
  document.getElementById('dailyPlan').innerHTML = PLAN.map(
    (p) => `<div class="card card-hover reveal in">
      <div class="feature-icon"><i class="fa-solid ${p.icon}"></i></div>
      <h3>${p.meal}</h3>
      <p class="accent" style="font-weight:700">${p.time}</p>
      <p style="font-size:.9rem">${p.note}</p>
    </div>`
  ).join('');
}

/* ---------- Hydration ---------- */
const GLASS_COUNT = 8;
const GLASS_ML = 312.5; /* 8 glasses ≈ 2.5 L */

function getWater() {
  const stored = MV.get(STORE.water, null);
  if (Array.isArray(stored) && stored.length === GLASS_COUNT) return stored;
  const seed = Array.from({ length: GLASS_COUNT }, (_, i) => i < 6); /* 1.8 L default */
  MV.set(STORE.water, seed);
  return seed;
}

function renderWater() {
  const state = getWater();
  const filled = state.filter(Boolean).length;
  const litres = ((filled * GLASS_ML) / 1000).toFixed(1);
  const pct = Math.round((filled / GLASS_COUNT) * 100);

  document.getElementById('glasses').innerHTML = state
    .map((on, i) => `<button class="glass ${on ? 'filled' : ''}" data-i="${i}" aria-pressed="${on}" aria-label="Glass ${i + 1}"><i class="fa-solid fa-glass-water"></i></button>`)
    .join('');
  document.getElementById('waterLitres').textContent = `${litres} L`;
  document.getElementById('waterBar').style.width = pct + '%';
  document.getElementById('waterPct').textContent = `${pct}% of your daily goal`;
}

function toggleGlass(i) {
  const state = getWater();
  state[i] = !state[i];
  MV.set(STORE.water, state);
  renderWater();
  if (state.every(Boolean)) toast('Hydration goal reached! 💧', 'fa-droplet');
}

/* ---------- Habits ---------- */
const HABITS = [
  { name: 'Drink Water', value: '7/8', pct: 88, icon: 'fa-droplet' },
  { name: 'Eat Balanced Meals', value: '5/7', pct: 71, icon: 'fa-bowl-food' },
  { name: 'Sleep', value: '7h 20m', pct: 82, icon: 'fa-moon' },
  { name: 'Daily Movement', value: '8,420 steps', pct: 84, icon: 'fa-person-walking' },
];

function renderHabits() {
  document.getElementById('habitGrid').innerHTML = HABITS.map(
    (h) => `<div class="card card-hover reveal in habit-card" data-name="${h.name}">
      <div class="row between"><div class="feature-icon" style="margin:0"><i class="fa-solid ${h.icon}"></i></div><span class="chip">${h.pct}%</span></div>
      <h3 style="margin:1rem 0 .3rem">${h.name}</h3>
      <p style="margin-bottom:1rem"><strong style="color:var(--text)">${h.value}</strong></p>
      <div class="bar"><span data-value="${h.pct}"></span></div>
    </div>`
  ).join('');
  document.querySelectorAll('#habitGrid .bar > span').forEach((el) => { el.style.width = el.dataset.value + '%'; });
}

/* ---------- Events ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderMealFilters();
  renderMeals();
  renderPlan();
  renderWater();
  renderHabits();

  document.getElementById('mealFilters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    mealFilter = btn.dataset.cat;
    renderMealFilters();
    renderMeals();
  });

  document.getElementById('mealGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('.add-meal');
    if (btn) toast(`${btn.dataset.name} added to today's plan!`, 'fa-plus');
  });

  document.getElementById('glasses').addEventListener('click', (e) => {
    const g = e.target.closest('.glass');
    if (g) toggleGlass(Number(g.dataset.i));
  });

  document.getElementById('waterFill').addEventListener('click', () => {
    const state = getWater();
    const next = state.indexOf(false);
    if (next === -1) { toast('You already hit your hydration goal today!', 'fa-droplet'); return; }
    toggleGlass(next);
  });

  document.getElementById('waterReset').addEventListener('click', () => {
    MV.set(STORE.water, Array(GLASS_COUNT).fill(false));
    renderWater();
    toast('Hydration reset for today.', 'fa-rotate-left');
  });

  document.getElementById('habitGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.habit-card');
    if (card) toast(`${card.dataset.name} logged for today!`, 'fa-circle-check');
  });
});
