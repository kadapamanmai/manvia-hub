/* ==========================================================================
   MANVIA — main.js
   Shared: storage, nav injection, toasts, modals, counters, reveals,
   search, theme, progress bars, rings.
   ========================================================================== */

/* ---------- Storage helpers ---------- */
const MV = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  },
};

const STORE = {
  user: 'manvia_user',
  goals: 'manvia_goals',
  water: 'manvia_water',
  workouts: 'manvia_workouts',
  settings: 'manvia_settings',
  checkin: 'manvia_checkin',
  membership: 'manvia_membership',
};

/* ---------- Toast system ---------- */
function toast(message, icon = 'fa-circle-check') {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add('hide');
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

/* ---------- Modal helpers ---------- */
function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  const m = id ? document.getElementById(id) : document.querySelector('.modal.open');
  if (!m) return;
  m.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('click', (e) => {
  if (e.target.classList && e.target.classList.contains('modal')) closeModal();
  const closer = e.target.closest('[data-close-modal]');
  if (closer) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    document.querySelector('.search-overlay.open')?.classList.remove('open');
    document.querySelector('.drawer.open')?.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ---------- Navigation (injected on every page) ---------- */
const NAV_ITEMS = [
  { label: 'Home', href: 'index.html', icon: 'fa-house' },
  { label: 'Workouts', href: 'workouts.html', icon: 'fa-dumbbell' },
  { label: 'Nutrition', href: 'nutrition.html', icon: 'fa-bowl-food' },
  { label: 'Progress', href: 'progress.html', icon: 'fa-chart-line' },
  { label: 'Trainers', href: 'trainers.html', icon: 'fa-user-group' },
  { label: 'Schedule', href: 'trainers.html#schedule', icon: 'fa-calendar-days' },
  { label: 'Membership', href: 'membership.html', icon: 'fa-crown' },
];

const BOTTOM_ITEMS = [
  { label: 'Home', href: 'index.html', icon: 'fa-house' },
  { label: 'Workouts', href: 'workouts.html', icon: 'fa-dumbbell' },
  { label: 'Progress', href: 'progress.html', icon: 'fa-chart-line' },
  { label: 'Nutrition', href: 'nutrition.html', icon: 'fa-bowl-food' },
  { label: 'Profile', href: 'profile.html', icon: 'fa-user' },
];

const SEARCH_INDEX = [
  { title: 'Full Body Strength', tag: 'Workout', href: 'workouts.html' },
  { title: 'HIIT Express', tag: 'Workout', href: 'workouts.html' },
  { title: 'Morning Yoga', tag: 'Workout', href: 'workouts.html' },
  { title: 'Mobility Flow', tag: 'Workout', href: 'workouts.html' },
  { title: 'Protein Power Bowl', tag: 'Nutrition', href: 'nutrition.html' },
  { title: 'Hydration Tracker', tag: 'Nutrition', href: 'nutrition.html' },
  { title: 'Fitness Score', tag: 'Progress', href: 'progress.html' },
  { title: 'Achievements', tag: 'Progress', href: 'progress.html' },
  { title: 'Ananya Rao — Strength Coach', tag: 'Trainer', href: 'trainers.html' },
  { title: 'Weekly Class Schedule', tag: 'Schedule', href: 'trainers.html#schedule' },
  { title: 'Pro Membership', tag: 'Membership', href: 'membership.html' },
  { title: 'Daily Check-in', tag: 'Profile', href: 'profile.html' },
];

function currentPage() {
  const path = window.location.pathname.split('/').pop();
  return path && path !== '' ? path : 'index.html';
}

function buildNav() {
  const page = currentPage();
  const isActive = (href) => href.split('#')[0] === page;

  const header = document.createElement('header');
  header.innerHTML = `
    <nav class="nav" id="siteNav" aria-label="Primary">
      <div class="nav-inner">
        <a class="logo" href="index.html">MAN<span>VIA</span></a>
        <ul class="nav-links">
          ${NAV_ITEMS.map((i) => `<li><a href="${i.href}" class="${isActive(i.href) ? 'active' : ''}">${i.label}</a></li>`).join('')}
        </ul>
        <div class="nav-actions">
          <button class="icon-btn desk-only" id="searchOpen" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
          <button class="icon-btn desk-only" id="notifBtn" aria-label="Notifications"><i class="fa-solid fa-bell"></i></button>
          <a class="icon-btn desk-only" href="profile.html" aria-label="Profile"><i class="fa-solid fa-user"></i></a>
          <a class="btn btn-primary btn-sm hide-sm" href="membership.html">Start Your Journey</a>
          <button class="icon-btn hamburger" id="menuBtn" aria-label="Open menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>
        </div>
      </div>
    </nav>

    <div class="drawer" id="drawer" role="dialog" aria-label="Mobile menu">
      <div class="row between">
        <a class="logo" href="index.html">MAN<span>VIA</span></a>
        <button class="icon-btn" id="drawerClose" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <ul class="drawer-links">
        ${NAV_ITEMS.map((i) => `<li><a href="${i.href}" class="${isActive(i.href) ? 'active' : ''}">${i.label}</a></li>`).join('')}
        <li><a href="profile.html" class="${page === 'profile.html' ? 'active' : ''}">Profile</a></li>
      </ul>
      <div class="row" style="margin-top:1.5rem;gap:.6rem">
        <a class="btn btn-primary btn-block" href="membership.html">Start Your Journey</a>
        <button class="btn btn-ghost btn-block" id="drawerSearch"><i class="fa-solid fa-magnifying-glass"></i> Search MANVIA</button>
      </div>
    </div>

    <div class="search-overlay" id="searchOverlay">
      <div class="search-panel">
        <input type="search" id="searchInput" placeholder="Search workouts, meals, trainers, classes..." aria-label="Search" />
        <div class="search-results" id="searchResults"></div>
      </div>
    </div>
  `;
  document.body.prepend(header);

  const bottom = document.createElement('nav');
  bottom.className = 'bottom-nav';
  bottom.setAttribute('aria-label', 'Mobile navigation');
  bottom.innerHTML = `<ul>${BOTTOM_ITEMS.map(
    (i) => `<li><a href="${i.href}" class="${isActive(i.href) ? 'active' : ''}"><i class="fa-solid ${i.icon}"></i>${i.label}</a></li>`
  ).join('')}</ul>`;
  document.body.appendChild(bottom);

  /* Scroll state */
  const nav = document.getElementById('siteNav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Drawer */
  const drawer = document.getElementById('drawer');
  const openDrawer = () => { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeDrawer = () => { drawer.classList.remove('open'); document.body.style.overflow = ''; };
  document.getElementById('menuBtn').addEventListener('click', openDrawer);
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeDrawer));

  /* Search */
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  const renderResults = (q) => {
    const list = SEARCH_INDEX.filter((i) => i.title.toLowerCase().includes(q.toLowerCase()) || i.tag.toLowerCase().includes(q.toLowerCase()));
    results.innerHTML = list.length
      ? list.map((i) => `<a href="${i.href}"><span>${i.title}</span><span class="chip">${i.tag}</span></a>`).join('')
      : '<p style="padding:.8rem">No results found. Try "yoga", "protein" or "trainer".</p>';
  };
  const openSearch = () => {
    overlay.classList.add('open');
    renderResults('');
    setTimeout(() => input.focus(), 60);
  };
  document.getElementById('searchOpen').addEventListener('click', openSearch);
  document.getElementById('drawerSearch').addEventListener('click', () => { closeDrawer(); openSearch(); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });
  input.addEventListener('input', (e) => renderResults(e.target.value));

  /* Notifications */
  document.getElementById('notifBtn').addEventListener('click', () => {
    toast('New achievement unlocked: 12 Day Streak 🔥', 'fa-bell');
  });
}

/* ---------- Footer ---------- */
function buildFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="logo" href="index.html">MAN<span>VIA</span></a>
          <p style="margin-top:.8rem;max-width:32ch">Move Better. Feel Stronger. Live Better.</p>
          <div class="socials">
            <a class="icon-btn" href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a class="icon-btn" href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a class="icon-btn" href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a class="icon-btn" href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>${NAV_ITEMS.map((i) => `<li><a href="${i.href}">${i.label}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="profile.html">Your Wellness Space</a></li>
            <li><a href="progress.html">Fitness Score</a></li>
            <li><a href="nutrition.html">Hydration Tracker</a></li>
            <li><a href="workouts.html">Workout Library</a></li>
            <li><a href="trainers.html#schedule">Class Schedule</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:hello@manvia.fit"><i class="fa-solid fa-envelope"></i> hello@manvia.fit</a></li>
            <li><a href="tel:+919876543210"><i class="fa-solid fa-phone"></i> +91 98765 43210</a></li>
            <li><a href="#"><i class="fa-solid fa-location-dot"></i> 4th Floor, Aurora House, Bengaluru</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 MANVIA. All rights reserved.</span>
        <span>Wellness content is general guidance, not medical advice.</span>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Animated counters ---------- */
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const duration = 1500;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const value = target * eased;
    el.textContent = value.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!('IntersectionObserver' in window)) { els.forEach(animateCounter); return; }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { animateCounter(entry.target); io.unobserve(entry.target); }
      });
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Progress bars ---------- */
function initBars() {
  const bars = document.querySelectorAll('.bar > span[data-value]');
  const fill = (el) => { el.style.width = Math.min(100, parseFloat(el.dataset.value)) + '%'; };
  if (!('IntersectionObserver' in window)) { bars.forEach(fill); return; }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { fill(e.target); io.unobserve(e.target); } }),
    { threshold: 0.4 }
  );
  bars.forEach((b) => io.observe(b));
}

/* ---------- Circular rings ---------- */
function makeRing(container, percent, label, size = 120, stroke = 10) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  container.classList.add('ring');
  container.innerHTML = `
    <svg width="${size}" height="${size}" aria-hidden="true">
      <circle class="track" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}"></circle>
      <circle class="value" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}"
        stroke-dasharray="${c}" stroke-dashoffset="${c}"></circle>
    </svg>
    <div class="ring-label" style="font-size:${size > 130 ? '1.9rem' : '1.15rem'}">${label}</div>
  `;
  const circle = container.querySelector('.value');
  const run = () => { circle.style.strokeDashoffset = String(c - (c * percent) / 100); };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    io.observe(container);
  } else { run(); }
}

/* ---------- Theme (dark mode) ---------- */
function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
}
function initTheme() {
  const settings = MV.get(STORE.settings, { darkMode: true, notifications: true, emailUpdates: false });
  applyTheme(settings.darkMode === false ? 'light' : 'dark');
}
initTheme();

/* ---------- Smooth scroll for in-page anchors ---------- */
function initAnchors() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
  });
}

/* ---------- Accordion ---------- */
function initAccordions() {
  document.querySelectorAll('.acc-head').forEach((head) => {
    head.addEventListener('click', () => {
      const item = head.parentElement;
      const body = item.querySelector('.acc-body');
      const isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.acc-item.open').forEach((o) => {
        o.classList.remove('open');
        o.querySelector('.acc-body').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildFooter();
  initReveal();
  initCounters();
  initBars();
  initAnchors();
  initAccordions();
  if (window.location.hash) {
    const el = document.getElementById(window.location.hash.slice(1));
    if (el) setTimeout(() => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }), 250);
  }
});
