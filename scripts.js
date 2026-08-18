const revealTargets = document.querySelectorAll(
  ".section > .container > *, .situation, .example, .action, .flow-item, .principles li"
);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

revealTargets.forEach((target) => {
  const position = Array.from(target.parentElement.children).indexOf(target);
  target.dataset.reveal = "";
  target.style.transitionDelay = `${Math.min(position, 4) * 90}ms`;
});

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -4%" });

  revealTargets.forEach((target) => observer.observe(target));
}
