/* Tejori — shared behaviour for Tejori sections. Safe to include more than once. */
(() => {
  if (window.Tejori) return;
  const Tejori = (window.Tejori = {});
  const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';

  /* ── Toast ── */
  let toast;
  let toastTimer;
  function showToast(message, opts = {}) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'tj-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.classList.toggle('tj-toast--error', !!opts.error);
    toast.innerHTML = '';
    const text = document.createElement('span');
    text.textContent = message;
    toast.appendChild(text);
    if (!opts.error) {
      const link = document.createElement('a');
      link.href = root + 'cart';
      link.textContent = 'View bag';
      toast.appendChild(link);
    }
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }
  Tejori.toast = showToast;

  /* ── Cart ── */
  async function refreshCount() {
    const cart = await fetch(root + 'cart.js', { headers: { Accept: 'application/json' } }).then((r) => r.json());
    document.querySelectorAll('[data-tj-cart-count]').forEach((el) => {
      el.textContent = cart.item_count;
      el.hidden = cart.item_count === 0;
    });
    return cart;
  }

  Tejori.addToCart = async (id, quantity = 1) => {
    const res = await fetch(root + 'cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ items: [{ id: Number(id), quantity: Number(quantity) || 1 }] }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.description || data.message || 'Could not add to bag');
    const cart = await refreshCount();
    // Let the theme (and its cart drawer, if any) know the cart changed.
    document.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true, detail: { cart } }));
    document.dispatchEvent(new CustomEvent('tejori:cart:added', { bubbles: true, detail: { items: data.items, cart } }));
    return data;
  };

  async function handleAdd(button, id, qty) {
    if (!id) return;
    button.classList.add('is-loading');
    button.disabled = true;
    try {
      await Tejori.addToCart(id, qty);
      button.classList.add('is-added');
      showToast('Added to bag');
      setTimeout(() => button.classList.remove('is-added'), 1800);
    } catch (err) {
      showToast(err.message, { error: true });
    } finally {
      button.classList.remove('is-loading');
      button.disabled = false;
    }
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tj-add]');
    if (!btn) return;
    e.preventDefault();
    const qtyEl = btn.dataset.tjQty ? document.getElementById(btn.dataset.tjQty) : null;
    const qty = qtyEl ? Math.max(1, parseInt(qtyEl.value, 10) || 1) : 1;
    handleAdd(btn, btn.dataset.tjAdd, qty);
  });

  // Product forms: progressive enhancement of the native /cart/add form
  document.addEventListener('submit', (e) => {
    const form = e.target.closest('form[data-tj-product-form]');
    if (!form) return;
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    handleAdd(btn, form.querySelector('[name="id"]').value, form.querySelector('[name="quantity"]')?.value || 1);
  });

  /* ── Quantity steppers ── */
  document.addEventListener('click', (e) => {
    const step = e.target.closest('[data-tj-step]');
    if (!step) return;
    const input = step.closest('.tj-qty')?.querySelector('input');
    if (!input) return;
    const next = Math.max(1, (parseInt(input.value, 10) || 1) + Number(step.dataset.tjStep));
    input.value = next;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ── Reveal on scroll ── */
  const io =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add('is-in');
              io.unobserve(entry.target);
            }),
          { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        )
      : null;
  function observeReveals(scope) {
    scope.querySelectorAll('.tj-reveal:not(.is-in)').forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')));
  }

  /* ── Header ── */
  function setHeaderHeight() {
    const header = document.querySelector('.tj-header-wrap');
    if (header) document.documentElement.style.setProperty('--tj-header-h', header.offsetHeight + 'px');
  }
  function initHeader(scope) {
    const wrap = scope.querySelector('.tj-header-wrap');
    if (!wrap || wrap.dataset.tjReady) return;
    wrap.dataset.tjReady = '1';
    const onScroll = () => wrap.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const drawer = scope.querySelector('.tj-drawer');
    if (!drawer) return;
    const open = () => {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      drawer.querySelector('[data-tj-menu-close]')?.focus();
    };
    const close = () => {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    scope.querySelectorAll('[data-tj-menu-open]').forEach((b) => b.addEventListener('click', open));
    drawer.querySelectorAll('[data-tj-menu-close], .tj-drawer__nav a').forEach((b) => b.addEventListener('click', close));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  }

  /* ── Product page ── */
  function initGallery(gallery) {
    if (gallery.dataset.tjReady) return;
    gallery.dataset.tjReady = '1';
    const track = gallery.querySelector('.tj-gallery__track');
    const dots = gallery.querySelectorAll('.tj-gallery__dots button');
    const thumbs = gallery.querySelectorAll('.tj-gallery__thumbs button');
    const setActive = (i) => {
      dots.forEach((d, n) => d.classList.toggle('is-active', n === i));
      thumbs.forEach((t, n) => t.classList.toggle('is-active', n === i));
    };
    const goTo = (i) => track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    track.addEventListener('scroll', () => setActive(Math.round(track.scrollLeft / track.clientWidth)), { passive: true });
    [...dots, ...thumbs].forEach((b) => b.addEventListener('click', () => goTo(Number(b.dataset.index))));
    Tejori.galleryGoTo = goTo;

    // Mobile: the gallery gently recedes as the details sheet slides over it
    const frame = gallery.querySelector('.tj-gallery__frame');
    const mq = window.matchMedia('(max-width: 989px)');
    const onScroll = () => {
      if (!mq.matches) {
        frame.style.transform = '';
        frame.style.opacity = '';
        return;
      }
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.55));
      frame.style.transform = `scale(${1 - 0.06 * p})`;
      frame.style.opacity = String(1 - 0.45 * p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initProduct(section) {
    const form = section.querySelector('form[data-tj-product-form]');
    if (!form || form.dataset.tjReady) return;
    form.dataset.tjReady = '1';

    // Variant picker
    const dataEl = section.querySelector('[data-tj-variants]');
    const variants = dataEl ? JSON.parse(dataEl.textContent) : [];
    const idInput = form.querySelector('[name="id"]');
    const submit = form.querySelector('[type="submit"]');
    const price = section.querySelector('[data-tj-price]');
    const compare = section.querySelector('[data-tj-compare]');
    const save = section.querySelector('[data-tj-save]');
    const buyPrice = section.querySelector('[data-tj-buy-price]');
    const barBtn = section.querySelector('.tj-buybar [data-tj-add]');
    const barPrice = section.querySelector('[data-tj-bar-price]');
    section.querySelectorAll('[data-tj-variant]').forEach((btn) =>
      btn.addEventListener('click', () => {
        const v = variants.find((x) => String(x.id) === btn.dataset.tjVariant);
        if (!v) return;
        section.querySelectorAll('[data-tj-variant]').forEach((b) => {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-checked', String(b === btn));
        });
        idInput.value = v.id;
        if (barBtn) barBtn.dataset.tjAdd = v.id;
        submit.disabled = !v.available;
        submit.querySelector('[data-tj-label]').textContent = v.available ? submit.dataset.addLabel : submit.dataset.soldLabel;
        if (price) price.textContent = v.price;
        if (barPrice) barPrice.textContent = v.price;
        if (buyPrice) buyPrice.textContent = v.available ? ' · ' + v.price : '';
        if (compare) {
          compare.hidden = !v.compare;
          compare.textContent = v.compare ? compare.dataset.prefix + v.compare : '';
        }
        if (save) {
          save.hidden = !v.save;
          save.textContent = v.save ? 'Save ' + v.save + '%' : '';
        }
        if (v.media_index != null && Tejori.galleryGoTo) Tejori.galleryGoTo(v.media_index);
        const url = new URL(window.location.href);
        url.searchParams.set('variant', v.id);
        window.history.replaceState({}, '', url);
      })
    );

    // Mobile buy bar appears once the main button scrolls away
    const bar = section.querySelector('.tj-buybar');
    if (bar && 'IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => bar.classList.toggle('is-visible', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(form);
    }
  }

  /* ── Init (page load + theme editor reloads) ── */
  function init(scope = document) {
    initHeader(scope);
    setHeaderHeight();
    observeReveals(scope);
    scope.querySelectorAll('[data-tj-gallery]').forEach(initGallery);
    scope.querySelectorAll('[data-tj-product]').forEach(initProduct);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
  window.addEventListener('resize', setHeaderHeight);
  document.addEventListener('shopify:section:load', (e) => init(e.target));
})();
