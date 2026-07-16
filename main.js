/* ==========================================================================
   St. Mane's Sporting Goods — preview interactions & rendering
   No framework, no build step. Renders cards from window.STORE so the
   markup stays in sync with the placeholder catalog.
   ========================================================================== */
(function () {
  "use strict";
  const S = window.STORE || { products: [], CATEGORIES: [], ICONS: {}, CAT_TINT: {}, fmt: (n) => '$' + n };

  /* ---- helpers ----------------------------------------------------------- */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const stars = (rating) => {
    const full = Math.round(rating);
    return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
  };

  const condBadge = (cond) => {
    if (cond === 'used') return '<span class="badge badge--used">Pre-Owned</span>';
    if (cond === 'sale') return '<span class="badge badge--sale">Sale</span>';
    return '<span class="badge badge--new">New</span>';
  };

  function productCard(p) {
    const icon = S.ICONS[p.cat] || S.ICONS.apparel || '';
    const grads = S.GRADS || ['#eceef0'];
    const grad = grads[(p.id * 5) % grads.length];
    const priceHtml = p.was
      ? `<s>${S.fmt(p.was)}</s>${S.fmt(p.price)}`
      : `${S.fmt(p.price)}`;
    return `
      <article class="prod-card reveal">
        <div class="prod-card__media" style="background:${grad};color:rgba(255,255,255,.92)">
          <div class="prod-card__badges">${condBadge(p.cond)}</div>
          <button class="prod-card__fav" aria-label="Save ${p.name}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21Z"/></svg>
          </button>
          <span class="gear">${icon}</span>
        </div>
        <div class="prod-card__body">
          <span class="prod-card__cat">${p.catLabel}</span>
          <h3 class="prod-card__name">${p.name}</h3>
          <div class="prod-card__rate">${stars(p.rating)} <span>(${p.reviews})</span></div>
          <div class="prod-card__foot">
            <div class="prod-card__price">${priceHtml}</div>
            <button class="prod-card__add" data-add>Shop <span class="arr">↗</span></button>
          </div>
        </div>
      </article>`;
  }

  function categoryCard(c) {
    const tint = S.CAT_TINT[c.key] || ['#eef0f4', '#13294b'];
    const icon = S.ICONS[c.key] || '';
    return `
      <a href="shop.html#${c.key}" class="cat-card reveal" style="background:${tint[1]}">
        <span class="ico">${icon}</span>
        <div>
          <span class="cat-card__name">${c.name}</span>
          <span class="cat-card__count">${c.count} items</span>
        </div>
      </a>`;
  }

  /* ---- render -------------------------------------------------------------- */
  const featuredEl = $('[data-featured]');
  if (featuredEl) {
    featuredEl.innerHTML = S.products.slice(0, 8).map(productCard).join('');
  }

  const catsEl = $('[data-categories]');
  if (catsEl) {
    catsEl.innerHTML = S.CATEGORIES.map(categoryCard).join('');
  }

  const shopEl = $('[data-shop-grid]');
  if (shopEl) {
    shopEl.innerHTML = S.products.map(productCard).join('');
    const countEl = $('[data-shop-count]');
    if (countEl) countEl.textContent = S.products.length;
  }

  /* ---- partner brands marquee (track duplicated for a seamless loop) ------ */
  const brandsEl = $('[data-brands]');
  if (brandsEl && S.BRANDS) {
    const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    // Use a white logo file from  if present; fall back to the
    // brand name as a wordmark until the real logo is dropped in.
    const logo = (b) => {
      const file = b.logo || (slug(b.name) + '.svg');
      return '<span class="brand-logo">'
        + '<img class="brand-logo__img" src="' + file + '" alt="' + b.name + '" '
        + 'onerror="this.insertAdjacentText(\'afterend\', this.alt); this.remove();">'
        + '</span>';
    };
    brandsEl.innerHTML = S.BRANDS.concat(S.BRANDS).map(logo).join('');
  }

  /* ---- external online-store funnel --------------------------------------- */
  /* This site is the storefront/landing page only — ordering happens on a
     separate online shop, so every "buy" action points there.              */
  const STORE_URL = 'https://store.stmanes.com/'; // online store
  $$('[data-store]').forEach((a) => {
    a.setAttribute('href', STORE_URL); a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener');
  });
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-add]') || e.target.closest('[aria-label="Cart"]')) {
      e.preventDefault(); window.open(STORE_URL, '_blank', 'noopener'); return;
    }
    const fav = e.target.closest('.prod-card__fav');
    if (fav) fav.style.color = fav.style.color === 'rgb(23, 45, 87)' ? '' : 'rgb(23, 45, 87)';
  });

  /* ---- mobile nav --------------------------------------------------------- */
  const nav = $('.nav');
  const toggle = $('.nav__toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
    $$('.nav__links a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('is-open')));
  }

  /* ---- shop filter chips (visual filtering of the preview grid) ----------- */
  $$('[data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      $$('[data-filter]').forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const key = chip.getAttribute('data-filter');
      const list = (key === 'all') ? S.products : S.products.filter((p) => p.cat === key);
      if (shopEl) {
        shopEl.innerHTML = list.map(productCard).join('');
        const countEl = $('[data-shop-count]');
        if (countEl) countEl.textContent = list.length;
        revealNow();
      }
    });
  });

  /* Pre-select category from URL hash on the shop page (#hockey etc.) */
  if (shopEl && location.hash) {
    const chip = $(`[data-filter="${location.hash.slice(1)}"]`);
    if (chip) chip.click();
  }

  /* ---- reveal on scroll --------------------------------------------------- */
  let io;
  function revealNow() {
    const items = $$('.reveal:not(.is-in)');
    if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-in')); return; }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
      }, { threshold: 0.12 });
    }
    items.forEach((el) => io.observe(el));
  }
  revealNow();

  /* ---- footer year & demo form handlers ----------------------------------- */
  $$('[data-year]').forEach((e) => (e.textContent = '2026'));
  $$('form[data-demo]').forEach((f) =>
    f.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const note = f.querySelector('[data-note]');
      if (note) { note.hidden = false; f.reset(); }
    })
  );

  /* ---- animated search with live product results -------------------------- */
  const isSPA = !!document.querySelector('[data-page]');     // single-file build?
  const shopHref = isSPA ? '#shop' : 'shop.html';
  $$('[data-search]').forEach((box) => {
    const input = box.querySelector('.search__input');
    const toggle = box.querySelector('.search__toggle');
    const results = box.querySelector('[data-search-results]');
    if (!input || !toggle || !results) return;
    const open = () => { box.classList.add('is-open'); toggle.setAttribute('aria-expanded', 'true'); setTimeout(() => input.focus(), 80); };
    const close = () => { box.classList.remove('is-open', 'has-results'); toggle.setAttribute('aria-expanded', 'false'); input.value = ''; results.innerHTML = ''; };
    toggle.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (box.classList.contains('is-open')) {
        if (input.value.trim()) { location.href = shopHref; } else { close(); }
      } else { open(); }
    });
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { box.classList.remove('has-results'); results.innerHTML = ''; return; }
      const grads = S.GRADS || ['#172d57'];
      const matches = (S.products || []).filter((p) =>
        p.name.toLowerCase().includes(q) || (p.catLabel || '').toLowerCase().includes(q)
      ).slice(0, 6);
      if (!matches.length) {
        results.innerHTML = '<div class="search__empty">No gear matches that — try “glove” or “hockey”.</div>';
      } else {
        results.innerHTML = matches.map((p) => {
          const grad = grads[(p.id * 5) % grads.length];
          const icon = (S.ICONS || {})[p.cat] || '';
          return '<a class="search__result" href="' + shopHref + '">'
            + '<span class="sw" style="background:' + grad + '">' + icon + '</span>'
            + '<span><span class="ct">' + (p.catLabel || '') + '</span><br><span class="nm">' + p.name + '</span></span>'
            + '<span class="pr">' + S.fmt(p.price) + '</span></a>';
        }).join('');
      }
      box.classList.add('has-results');
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Enter' && input.value.trim()) location.href = shopHref;
    });
    document.addEventListener('click', (e) => { if (!box.contains(e.target)) close(); });
  });

  /* ---- services carousel: CSS marquee animation; JS just duplicates the
         slides once so the loop is seamless ----------------------------------- */
  $$('[data-svc-track]').forEach((track) => {
    Array.from(track.children).forEach((s) => track.appendChild(s.cloneNode(true)));
  });

  /* ---- live "Open now / Closed" badge ------------------------------------- */
  /* Driven by the real store hours below; updates itself every minute so it
     flips automatically through the day. Any [data-open-status] element on the
     page gets filled in. Index 0 = Sunday; [openMin, closeMin] in minutes,
     null = closed.                                                            */
  (function openStatus() {
    const els = $$('[data-open-status]');
    if (!els.length) return;
    const HOURS = [
      null,          // Sunday      — closed
      [540, 1020],   // Monday      9:00 am – 5:00 pm
      [540, 1020],   // Tuesday
      [540, 1020],   // Wednesday
      [540, 1020],   // Thursday
      [540, 1020],   // Friday
      null           // Saturday    — closed
    ];
    const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const clock = (m) => {
      let h = Math.floor(m / 60); const mm = m % 60;
      const ap = h >= 12 ? 'pm' : 'am';
      h = h % 12; if (h === 0) h = 12;
      return h + (mm ? ':' + String(mm).padStart(2, '0') : '') + ' ' + ap;
    };
    const nextOpen = (day, min) => {
      for (let i = 0; i < 7; i++) {
        const d = (day + i) % 7;
        const h = HOURS[d];
        if (!h) continue;
        if (i === 0 && min >= h[0]) continue; // today's opening already passed
        const when = i === 0 ? 'today' : i === 1 ? 'tomorrow' : DAY[d];
        return 'opens ' + when + ' at ' + clock(h[0]);
      }
      return 'see hours';
    };
    const update = () => {
      const now = new Date();
      const day = now.getDay();
      const min = now.getHours() * 60 + now.getMinutes();
      const h = HOURS[day];
      const isOpen = !!h && min >= h[0] && min < h[1];
      const text = isOpen ? 'Open now · until ' + clock(h[1]) : 'Closed · ' + nextOpen(day, min);
      els.forEach((el) => {
        el.classList.toggle('is-open', isOpen);
        el.classList.toggle('is-closed', !isOpen);
        el.innerHTML = '<span class="status-badge__dot"></span><span>' + text + '</span>';
      });
      // Highlight today's row in any hours list (rows are ordered Mon→Sun).
      $$('.hours-list').forEach((list) => {
        const rows = $$('li', list);
        if (rows.length < 7) return;
        const todayIdx = (day + 6) % 7; // Sun(0)→6, Mon(1)→0, …
        rows.forEach((li, i) => li.classList.toggle('today', i === todayIdx));
      });
    };
    update();
    setInterval(update, 60000);
  })();
})();
