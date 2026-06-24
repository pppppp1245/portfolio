$(function() {
  gsap.from('.desk-item', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'back.out(1.4)'
  });

  $('#monitor').on('click', function() {
    gsap.to('body', {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: function() {
        window.location.href = 'desktop.html';
      }
    });
  });
});
