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
