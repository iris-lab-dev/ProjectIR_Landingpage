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

const requestSteps = document.querySelectorAll("[data-request-step]");
const requestPanels = document.querySelectorAll("[data-request-panel]");
const requestProgress = document.querySelector(".request-card-progress");
let requestStepTimer;

const setRequestStep = (selectedStep) => {
  window.clearTimeout(requestStepTimer);

  requestSteps.forEach((item) => {
    item.classList.remove("is-active");
    item.setAttribute("aria-selected", "false");
  });
  requestPanels.forEach((panel) => {
    const isSelected = panel.dataset.requestPanel === selectedStep;
    panel.classList.toggle("is-active", isSelected);
    panel.hidden = !isSelected;
  });

  const selectedButton = document.querySelector(`[data-request-step="${selectedStep}"]`);
  selectedButton.offsetWidth;
  selectedButton.classList.add("is-active");
  selectedButton.setAttribute("aria-selected", "true");
  requestProgress.textContent = `0${selectedStep} / 03`;

  requestStepTimer = window.setTimeout(() => {
    setRequestStep(String(selectedStep === "3" ? 1 : Number(selectedStep) + 1));
  }, 3000);
};

requestSteps.forEach((step) => {
  step.addEventListener("click", () => setRequestStep(step.dataset.requestStep));
});

if (requestSteps.length) setRequestStep("1");
