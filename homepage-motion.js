/* Light terminal interactions.
   Visual inspiration: Renjie Pi — https://pipilurj.github.io/
   Implemented for Xuankun Rong; no external animation dependencies. */
(() => {
  'use strict';
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const bar = document.querySelector('#reading-progress');
  const links = [...document.querySelectorAll('.nav-files a')];
  const sections = links.map(link => document.querySelector(link.hash)).filter(Boolean);
  let scrollQueued = false;
  function updateReadingPosition() {
    const root = document.documentElement;
    const extent = root.scrollHeight - root.clientHeight;
    if (bar) bar.style.transform = `scaleX(${extent > 0 ? root.scrollTop / extent : 0})`;
    const boundary = innerHeight * .38;
    const active = sections.filter(section => section.getBoundingClientRect().top <= boundary).at(-1);
    links.forEach(link => {
      const selected = link.hash === `#${active?.id}`;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollQueued = false;
  }
  addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateReadingPosition); }
  }, { passive: true });
  addEventListener('resize', updateReadingPosition, { passive: true });
  updateReadingPosition();

  // A short reveal, with all content visible if JavaScript or observers are unavailable.
  let revealObserver;
  const revealItems = [...document.querySelectorAll('.paper, .log-panel, .awards-list')];
  if ('IntersectionObserver' in window && !motionPreference.matches) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px 28px 0px', threshold: .04 });
    revealItems.forEach(element => {
      element.classList.add('motion-reveal');
      revealObserver.observe(element);
    });
  }

  const typed = document.querySelector('#typed');
  const topics = typed ? JSON.parse(typed.dataset.words) : [];
  const topicHold = 4800;
  let topic = 0, characters = topics[0]?.length || 0, deleting = true, typingTimer;
  function typeNext() {
    if (motionPreference.matches || !typed || document.hidden) return;
    const word = topics[topic];
    characters += deleting ? -1 : 1;
    typed.textContent = word.slice(0, characters);
    let delay = deleting ? 45 : 90;
    if (characters === 0) { deleting = false; topic = (topic + 1) % topics.length; delay = 400; }
    else if (characters === word.length && !deleting) { deleting = true; delay = topicHold; }
    typingTimer = setTimeout(typeNext, delay);
  }
  function startTyping() {
    clearTimeout(typingTimer);
    if (!typed) return;
    if (motionPreference.matches) typed.textContent = topics.join(' · ');
    else if (!document.hidden) {
      typed.textContent = topics[topic];
      characters = topics[topic].length;
      deleting = true;
      typingTimer = setTimeout(typeNext, topicHold);
    }
  }
  startTyping();

  document.addEventListener('visibilitychange', startTyping);
  motionPreference.addEventListener('change', () => {
    if (motionPreference.matches) {
      revealObserver?.disconnect();
      revealItems.forEach(element => element.classList.add('is-visible'));
    }
    startTyping();
  });
})();
