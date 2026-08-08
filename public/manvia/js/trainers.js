/* ==========================================================================
   MANVIA — trainers.js
   Trainer profiles, profile modal, weekly schedule and class booking.
   ========================================================================== */

const TRAINERS = [
  { id: 't1', name: 'Ananya Rao', specialty: 'Strength Training', exp: '8 years', rating: 4.9,
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    alt: 'Portrait of strength coach Ananya Rao',
    bio: 'Ananya coaches progressive strength programmes for women returning to lifting, with a focus on technique before load.',
    certs: ['NSCA CSCS', 'Precision Nutrition L1'], slots: ['Mon 7:00 AM', 'Wed 6:30 PM', 'Sat 9:00 AM'] },
  { id: 't2', name: 'Meera Nair', specialty: 'Yoga', exp: '10 years', rating: 5.0,
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    alt: 'Portrait of yoga teacher Meera Nair',
    bio: 'Meera blends vinyasa flow with breathwork and restorative sequencing for stress resilience and mobility.',
    certs: ['RYT-500', 'Yin Yoga Certified'], slots: ['Tue 6:00 AM', 'Thu 7:30 AM', 'Sun 8:00 AM'] },
  { id: 't3', name: 'Rohit Shetty', specialty: 'HIIT', exp: '6 years', rating: 4.8,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    alt: 'Portrait of HIIT coach Rohit Shetty',
    bio: 'Rohit designs short, high-quality conditioning sessions that fit around busy work weeks.',
    certs: ['ACE CPT', 'Kettlebell L2'], slots: ['Mon 6:00 PM', 'Fri 7:00 AM', 'Sat 5:30 PM'] },
  { id: 't4', name: 'Sara Khan', specialty: 'Mobility', exp: '7 years', rating: 4.9,
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    alt: 'Portrait of mobility specialist Sara Khan',
    bio: 'Sara works with desk-bound clients on hip, shoulder and spine mobility to reduce stiffness and pain.',
    certs: ['FRCms', 'Physio Assistant Dip.'], slots: ['Tue 5:30 PM', 'Thu 6:00 PM', 'Sun 10:00 AM'] },
  { id: 't5', name: 'Kavya Iyer', specialty: 'Nutrition Coaching', exp: '9 years', rating: 4.7,
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80',
    alt: 'Portrait of nutrition coach Kavya Iyer',
    bio: 'Kavya builds realistic, culturally familiar eating habits — no crash plans, no banned foods.',
    certs: ['MSc Nutrition', 'PN L2'], slots: ['Mon 11:00 AM', 'Wed 4:00 PM', 'Fri 12:00 PM'] },
  { id: 't6', name: 'Dev Malhotra', specialty: 'Functional Training', exp: '5 years', rating: 4.8,
    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    alt: 'Portrait of functional training coach Dev Malhotra',
    bio: 'Dev trains real-world movement patterns — carrying, hinging, rotating — for everyday strength.',
    certs: ['NASM CPT', 'TRX Certified'], slots: ['Tue 7:00 AM', 'Thu 6:30 PM', 'Sat 8:00 AM'] },
];

const SCHEDULE = {
  Monday: [
    { time: '06:30', name: 'Morning Strength', trainer: 'Ananya Rao', dur: '55 min', spots: 4 },
    { time: '18:00', name: 'HIIT Blast', trainer: 'Rohit Shetty', dur: '30 min', spots: 8 },
  ],
  Tuesday: [
    { time: '06:00', name: 'Yoga Flow', trainer: 'Meera Nair', dur: '45 min', spots: 6 },
    { time: '17:30', name: 'Mobility', trainer: 'Sara Khan', dur: '40 min', spots: 10 },
  ],
  Wednesday: [
    { time: '07:00', name: 'Functional Training', trainer: 'Dev Malhotra', dur: '50 min', spots: 5 },
    { time: '18:30', name: 'Morning Strength', trainer: 'Ananya Rao', dur: '55 min', spots: 3 },
  ],
  Thursday: [
    { time: '07:30', name: 'Yoga Flow', trainer: 'Meera Nair', dur: '45 min', spots: 9 },
    { time: '18:30', name: 'Core Training', trainer: 'Sara Khan', dur: '35 min', spots: 7 },
  ],
  Friday: [
    { time: '07:00', name: 'HIIT Blast', trainer: 'Rohit Shetty', dur: '30 min', spots: 2 },
    { time: '12:00', name: 'Core Training', trainer: 'Kavya Iyer', dur: '35 min', spots: 11 },
  ],
  Saturday: [
    { time: '09:00', name: 'Morning Strength', trainer: 'Ananya Rao', dur: '60 min', spots: 6 },
    { time: '17:30', name: 'Functional Training', trainer: 'Dev Malhotra', dur: '50 min', spots: 4 },
  ],
  Sunday: [
    { time: '08:00', name: 'Yoga Flow', trainer: 'Meera Nair', dur: '50 min', spots: 12 },
    { time: '10:00', name: 'Mobility', trainer: 'Sara Khan', dur: '40 min', spots: 10 },
  ],
};

const DAY_NAMES = Object.keys(SCHEDULE);
let activeDay = DAY_NAMES[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

function renderTrainers() {
  document.getElementById('trainerGrid').innerHTML = TRAINERS.map(
    (t) => `<article class="card card-hover reveal in">
      <div class="media" style="aspect-ratio:4/3.4"><span class="chip badge-float">${t.specialty}</span>
        <img src="${t.img}" alt="${t.alt}" loading="lazy" /></div>
      <div class="row between" style="margin-top:1rem"><h3>${t.name}</h3><span class="chip"><i class="fa-solid fa-star accent"></i> ${t.rating}</span></div>
      <p class="muted" style="font-size:.85rem;margin:.2rem 0 .7rem">${t.exp} experience</p>
      <p style="font-size:.9rem">${t.bio}</p>
      <p class="muted" style="font-size:.82rem;margin-top:.8rem"><i class="fa-regular fa-calendar"></i> ${t.slots.length} sessions available</p>
      <div class="row" style="margin-top:1.1rem;gap:.5rem;flex-wrap:nowrap">
        <button class="btn btn-dark btn-block view-trainer" data-id="${t.id}">View Profile</button>
        <button class="btn btn-primary btn-block book-trainer" data-id="${t.id}">Book Session</button>
      </div>
    </article>`
  ).join('');
}

function openTrainer(id) {
  const t = TRAINERS.find((x) => x.id === id);
  if (!t) return;
  document.getElementById('trainerModalContent').innerHTML = `
    <div class="modal-hero"><img src="${t.img}" alt="${t.alt}" /><div class="media-overlay"></div></div>
    <div class="modal-body">
      <div class="row between"><h3>${t.name}</h3><span class="chip chip-accent"><i class="fa-solid fa-star"></i> ${t.rating}</span></div>
      <p class="muted">${t.specialty} · ${t.exp} experience</p>
      <p>${t.bio}</p>
      <div><h4 style="margin-bottom:.5rem">Certifications</h4><div class="row" style="gap:.4rem">${t.certs.map((c) => `<span class="chip">${c}</span>`).join('')}</div></div>
      <div><h4 style="margin-bottom:.5rem">Available time slots</h4><div class="row" style="gap:.4rem">${t.slots.map((s) => `<span class="chip">${s}</span>`).join('')}</div></div>
      <button class="btn btn-primary book-trainer" data-id="${t.id}">Book Session</button>
    </div>`;
  openModal('trainerModal');
}

function renderDays() {
  document.getElementById('dayTabs').innerHTML = DAY_NAMES.map(
    (d) => `<button class="filter-btn ${d === activeDay ? 'active' : ''}" data-day="${d}">${d}</button>`
  ).join('');
}

function renderClasses() {
  document.getElementById('classList').innerHTML = SCHEDULE[activeDay]
    .map(
      (c) => `<div class="class-row reveal in">
        <div class="class-time">${c.time}</div>
        <div><strong>${c.name}</strong><br /><small class="muted">${c.trainer}</small></div>
        <div class="muted">${c.dur}</div>
        <div><span class="chip">${c.spots} spots left</span></div>
        <button class="btn btn-primary btn-sm book-class" data-name="${c.name}" data-time="${c.time}" data-trainer="${c.trainer}">Book Class</button>
      </div>`
    )
    .join('');
}

function confirmBooking(text) {
  document.getElementById('bookingDetails').textContent = text;
  closeModal('trainerModal');
  openModal('bookingModal');
  toast('Class booked successfully!', 'fa-calendar-check');
}

document.addEventListener('DOMContentLoaded', () => {
  renderTrainers();
  renderDays();
  renderClasses();

  document.body.addEventListener('click', (e) => {
    const view = e.target.closest('.view-trainer');
    if (view) { openTrainer(view.dataset.id); return; }

    const bookT = e.target.closest('.book-trainer');
    if (bookT) {
      const t = TRAINERS.find((x) => x.id === bookT.dataset.id);
      confirmBooking(`Session with ${t.name} (${t.specialty}) on ${t.slots[0]} is confirmed.`);
      return;
    }

    const bookC = e.target.closest('.book-class');
    if (bookC) {
      confirmBooking(`${bookC.dataset.name} with ${bookC.dataset.trainer}, ${activeDay} at ${bookC.dataset.time}.`);
      return;
    }

    const day = e.target.closest('#dayTabs .filter-btn');
    if (day) { activeDay = day.dataset.day; renderDays(); renderClasses(); }
  });
});
