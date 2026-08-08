/* ==========================================================================
   MANVIA — membership.js
   Pricing toggle, plan selection, comparison table and FAQ accordion.
   ========================================================================== */

const PLANS = [
  { id: 'starter', name: 'Starter', monthly: 799, yearly: 7990, popular: false,
    features: ['Gym access', 'Basic workout library', 'Progress tracking', 'Community challenges'] },
  { id: 'pro', name: 'Pro', monthly: 1499, yearly: 14990, popular: true,
    features: ['Everything in Starter', 'Advanced workout plans', 'Nutrition guidance', 'Trainer sessions', 'Class booking', 'Advanced analytics'] },
  { id: 'elite', name: 'Elite', monthly: 2499, yearly: 24990, popular: false,
    features: ['Everything in Pro', 'Personal trainer', 'Personalized programs', 'Priority class booking', 'Premium wellness plans', 'Exclusive challenges'] },
];

const COMPARE = [
  ['Gym access', true, true, true],
  ['Workout library', true, true, true],
  ['Progress tracking', true, true, true],
  ['Nutrition guidance', false, true, true],
  ['Class booking', false, true, true],
  ['Advanced analytics', false, true, true],
  ['Personal trainer', false, false, true],
  ['Priority booking', false, false, true],
];

const FAQS = [
  ['Can I cancel anytime?', 'Yes. All plans are commitment-free — cancel from your profile and your membership runs until the end of the current billing period.'],
  ['Can I change my plan?', 'You can upgrade or downgrade at any time. Upgrades apply immediately with a prorated charge; downgrades start at the next cycle.'],
  ['Are trainer sessions included?', 'Pro includes group and limited 1:1 trainer sessions. Elite includes dedicated personal training and personalised programming.'],
  ['Can I book group classes?', 'Class booking is included on Pro and Elite. Elite members also get priority access to popular slots.'],
  ['Is there a free trial?', 'Yes — every new member gets a 7-day trial with full access to the workout library and progress dashboard.'],
];

let cycle = 'monthly';

function renderPlans() {
  const saved = MV.get(STORE.membership, null);
  document.getElementById('planGrid').innerHTML = PLANS.map((p) => {
    const price = cycle === 'monthly' ? p.monthly : p.yearly;
    const unit = cycle === 'monthly' ? '/month' : '/year';
    const active = saved && saved.id === p.id;
    return `<article class="card price-card card-hover reveal in ${p.popular ? 'featured' : ''}">
      <div class="row between"><h3>${p.name}</h3>${p.popular ? '<span class="chip chip-accent">MOST POPULAR</span>' : ''}</div>
      <div class="price">₹${price.toLocaleString('en-IN')}<small>${unit}</small></div>
      <ul class="feature-list">${p.features.map((f) => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}</ul>
      <button class="btn ${p.popular ? 'btn-primary' : 'btn-dark'} btn-block choose-plan" data-id="${p.id}">
        ${active ? 'Current plan' : 'Choose ' + p.name}
      </button>
    </article>`;
  }).join('');
}

function renderCompare() {
  const mark = (v) => (v ? '<i class="fa-solid fa-check tick"></i>' : '<i class="fa-solid fa-minus cross"></i>');
  document.getElementById('compareBody').innerHTML = COMPARE.map(
    (r) => `<tr><td>${r[0]}</td><td class="center">${mark(r[1])}</td><td class="center">${mark(r[2])}</td><td class="center">${mark(r[3])}</td></tr>`
  ).join('');
}

function renderFaq() {
  document.getElementById('faqList').innerHTML = FAQS.map(
    (f) => `<div class="acc-item"><button class="acc-head">${f[0]}<i class="fa-solid fa-chevron-down"></i></button><div class="acc-body"><p>${f[1]}</p></div></div>`
  ).join('');
  initAccordions();
}

document.addEventListener('DOMContentLoaded', () => {
  renderPlans();
  renderCompare();
  renderFaq();

  document.getElementById('billingToggle').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    cycle = btn.dataset.cycle;
    document.querySelectorAll('#billingToggle button').forEach((b) => b.classList.toggle('active', b === btn));
    renderPlans();
    toast(cycle === 'yearly' ? 'Yearly pricing applied — save 17%.' : 'Monthly pricing applied.', 'fa-tags');
  });

  document.getElementById('planGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('.choose-plan');
    if (!btn) return;
    const plan = PLANS.find((p) => p.id === btn.dataset.id);
    MV.set(STORE.membership, { id: plan.id, name: plan.name, cycle });
    renderPlans();
    toast(`${plan.name} membership selected (${cycle}).`, 'fa-crown');
  });
});
