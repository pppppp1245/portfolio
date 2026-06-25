let dragging = null;
let startX = 0;
let startY = 0;
let pointerStartX = 0;
let pointerStartY = 0;
let hasMoved = false;
const DRAG_THRESHOLD = 6;

function getPoint(e) {
  const originalEvent = e.originalEvent || e;
  if (originalEvent.touches && originalEvent.touches.length) {
    return originalEvent.touches[0];
  }
  if (originalEvent.changedTouches && originalEvent.changedTouches.length) {
    return originalEvent.changedTouches[0];
  }
  return originalEvent;
}

function initDraggable(selector) {
  $(selector).each(function() {
    const $el = $(this);
    $el.css({ position: 'absolute', cursor: 'grab' });

    $el.on('mousedown touchstart', function(e) {
      const point = getPoint(e);
      dragging = $el;
      hasMoved = false;
      pointerStartX = point.clientX;
      pointerStartY = point.clientY;
      startX = point.clientX - $el.offset().left;
      startY = point.clientY - $el.offset().top;
      $el.css({ zIndex: 100, cursor: 'grabbing' });
      gsap.to($el, { scale: 1.05, duration: 0.15 });
    });
  });

  $(document).on('mousemove touchmove', function(e) {
    if (!dragging) return;

    const point = getPoint(e);
    const moveX = Math.abs(point.clientX - pointerStartX);
    const moveY = Math.abs(point.clientY - pointerStartY);
    const x = point.clientX - startX;
    const y = point.clientY - startY;
    const maxX = window.innerWidth - dragging.outerWidth();
    const maxY = window.innerHeight - dragging.outerHeight();

    if (moveX > DRAG_THRESHOLD || moveY > DRAG_THRESHOLD) {
      hasMoved = true;
      e.preventDefault();
    }

    dragging.css({
      left: Math.max(0, Math.min(maxX, x)),
      top: Math.max(0, Math.min(maxY, y)),
      right: 'auto',
      bottom: 'auto'
    });
  });

  $(document).on('mouseup touchend touchcancel', function() {
    if (!dragging) return;

    gsap.to(dragging, { scale: 1, duration: 0.2 });
    dragging.css('cursor', 'grab');
    dragging = null;
  });
}

$(function() {
  function startCharacterFloat() {
    gsap.to('#char-me', {
      y: -12,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  gsap.to('.sparkle', {
    y: -15,
    rotation: 45,
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: { each: 0.4, from: 'random' }
  });

  gsap.from(['#char-me', '#obj-work', '#obj-notepad'], {
    opacity: 0,
    y: 50,
    scale: 0.85,
    stagger: 0.15,
    duration: 0.7,
    ease: 'back.out(1.5)',
    delay: 0.3,
    onComplete: startCharacterFloat
  });

  gsap.to('.bg-blob', {
    x: 30,
    y: 20,
    duration: 6,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: { each: 1.5 }
  });

  $('#char-me').on('mouseenter', function() {
    gsap.to(this, { scale: 1.03, duration: 0.35, ease: 'power2.out' });
  }).on('mouseleave', function() {
    gsap.to(this, { scale: 1, duration: 0.35, ease: 'power2.out' });
  });

  initDraggable('#obj-work');
  initDraggable('#obj-notepad');

  $('#obj-work').on('click', function() {
    if (!hasMoved) openWindow('window-work');
    hasMoved = false;
  });

  $('#obj-notepad').on('click', function() {
    if (!hasMoved) openWindow('window-notepad');
    hasMoved = false;
  });
});

(function() {
  const THRESHOLD = 5;
  function initStickerDrag(selector) {
    document.querySelectorAll(selector).forEach(el => {
      let active = false, moved = false;
      let sx, sy, sl, st;
      el.style.position = 'absolute';

      function start(cx, cy) {
        active = true; moved = false;
        sx = cx; sy = cy;
        sl = parseInt(el.style.left) || el.offsetLeft;
        st = parseInt(el.style.top)  || el.offsetTop;
        el.style.zIndex = 200;
        gsap.to(el, { scale: 1.08, duration: 0.15, ease: 'power2.out' });
      }
      function move(cx, cy) {
        if (!active) return;
        const dx = cx - sx, dy = cy - sy;
        if (Math.abs(dx) > THRESHOLD || Math.abs(dy) > THRESHOLD) moved = true;
        el.style.left = Math.max(0, Math.min(window.innerWidth  - el.offsetWidth,  sl + dx)) + 'px';
        el.style.top  = Math.max(0, Math.min(window.innerHeight - el.offsetHeight, st + dy)) + 'px';
      }
      function end() {
        if (!active) return;
        active = false;
        el.style.zIndex = 50;
        gsap.to(el, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
      }

      el.addEventListener('mousedown', e => start(e.clientX, e.clientY));
      el.addEventListener('touchstart', e => start(e.touches[0].clientX, e.touches[0].clientY));
      document.addEventListener('mousemove', e => move(e.clientX, e.clientY));
      document.addEventListener('touchmove', e => move(e.touches[0].clientX, e.touches[0].clientY));
      document.addEventListener('mouseup', end);
      document.addEventListener('touchend', end);
    });
  }

  initStickerDrag('.sticker-wrap');
  initStickerDrag('.sticker-shape');

  gsap.from(['.sticker-wrap', '.sticker-shape'], {
    opacity: 0,
    scale: 0.4,
    rotation: () => Math.random() * 30 - 15,
    duration: 0.5,
    ease: 'back.out(2)',
    stagger: { each: 0.12, from: 'random' },
    delay: 0.8
  });
})();
