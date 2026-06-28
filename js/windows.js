function animateWindowContent(id) {
  if (id === 'window-about') {
    gsap.from('.about-left', {
      x: -60,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      ease: 'power2.out'
    });
    gsap.from('.about-right > *', {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.3,
      ease: 'power2.out'
    });
  }

  if (id === 'window-work') {
    gsap.from('.project-card', {
      y: 50,
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
      delay: 0.2,
      ease: 'power2.out'
    });
  }
}

function openWindow(id) {
  const $win = $('#' + id);
  if (!$win.length) return;

  $win.css('display', 'flex');
  gsap.fromTo($win,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: 'power3.out',
      onStart: function() {
        animateWindowContent(id);
      }
    }
  );
}

function closeWindow(id) {
  const $win = $('#' + id);
  if (!$win.length) return;

  gsap.to($win, {
    opacity: 0,
    y: 30,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: function() {
      $win.css('display', 'none');
      gsap.set($win, { y: 0 });
      if (id === 'window-work' && typeof showProjectList === 'function') {
        showProjectList();
      }
    }
  });
}

window.openWindow = openWindow;
window.closeWindow = closeWindow;

$(function() {
  $('.fullwin-close').on('click', function() {
    closeWindow($(this).closest('.fullwin').attr('id'));
  });

  $('#char-me').on('click', function() {
    openWindow('window-about');
  });

  $(document).on('keydown', function(e) {
    if (e.key !== 'Escape') return;
    const $openWin = $('.fullwin').filter(function() {
      return $(this).css('display') !== 'none';
    }).last();
    if ($openWin.length) closeWindow($openWin.attr('id'));
  });
});
