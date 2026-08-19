async function init() {
  const baseTemplate = await fetch("./base.html").then((response) => {
    if (!response.ok) throw new Error("공통 레이아웃을 불러올 수 없습니다.");
    return response.text();
  });
  const baseDocument = new DOMParser().parseFromString(baseTemplate, "text/html");

  document.querySelectorAll("[data-site-header]").forEach((placeholder) => {
    const header = baseDocument.querySelector("#site-header-template").content.cloneNode(true);
    const cta = header.querySelector("[data-header-cta]");
    cta.textContent = placeholder.dataset.ctaLabel;
    cta.href = placeholder.dataset.ctaHref;
    placeholder.replaceWith(header);
  });

  document.querySelectorAll("[data-site-footer]").forEach((placeholder) => {
    const footer = baseDocument.querySelector("#site-footer-template").content.cloneNode(true);
    placeholder.replaceWith(footer);
  });

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
}

init();
