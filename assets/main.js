// Lis-Term — interakcje demo
(function () {
  var hdr = document.getElementById('hdr');
  var onScroll = function () {
    if (window.scrollY > 8) hdr.classList.add('scrolled');
    else hdr.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile menu
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  burger.addEventListener('click', function () {
    drawer.classList.toggle('open');
    burger.classList.toggle('open');
  });
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      drawer.classList.remove('open');
      burger.classList.remove('open');
    });
  });

  // reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // hero crossfade slider
  var slidesWrap = document.getElementById('heroSlides');
  if (slidesWrap) {
    var slides = slidesWrap.querySelectorAll('.hero-slide');
    var dotsWrap = document.getElementById('heroDots');
    var idx = 0, timer;
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Zdjęcie ' + (i + 1));
      if (i === 0) b.classList.add('on');
      b.addEventListener('click', function () { go(i); reset(); });
      dotsWrap.appendChild(b);
    });
    var dots = dotsWrap.querySelectorAll('button');
    function go(n) {
      slides[idx].classList.remove('on'); if (dots[idx]) dots[idx].classList.remove('on');
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add('on'); if (dots[idx]) dots[idx].classList.add('on');
    }
    function reset() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 5000); }
    reset();
  }
})();
