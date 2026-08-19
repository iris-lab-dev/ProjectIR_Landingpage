const siteHeaderTemplate = document.createElement("template");
siteHeaderTemplate.innerHTML = `
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="./index.html" aria-label="틈틈 처음으로">틈틈</a>
      <nav class="nav" aria-label="페이지 탐색"><a href="./agent.html">수행</a><a href="./request.html">요청</a><a href="./ad.html">Ad+</a></nav>
      <a class="button primary" data-header-cta href="#">바로 시작하기</a>
    </div>
  </header>
`;

const siteFooterTemplate = document.createElement("template");
siteFooterTemplate.innerHTML = `
  <footer><div class="container"><div class="footer-policy"><span>통합회원 이용약관</span><i aria-hidden="true">|</i><span>서비스 이용약관</span><i aria-hidden="true">|</i><strong>개인정보처리방침</strong><i aria-hidden="true">|</i><span>운영정책</span></div><div class="footer-info"><span><a href="https://irislab.co.kr">주식회사 아이리스랩</a></span><span>대표 : 이종우</span><span>사업자등록번호: 723-88-03656</span><span>주소 : 경상남도 양산시 하북면 지곡1길 8 1동 406호</span><span>이메일 : contact@irislab.co.kr</span><span>연락처 : 070-8970-6780</span><span>통신판매업 신고번호 : 2026-경남양산-0378</span><span>직업정보제공사업 신고번호 : 양산 제2026-3호</span><span>호스팅 서비스 제공 : (유)한국오라클</span></div></div></footer>
`;

function renderSiteLayout() {
  document.querySelectorAll("[data-site-header]").forEach((placeholder) => {
    const header = siteHeaderTemplate.content.cloneNode(true);
    const cta = header.querySelector("[data-header-cta]");
    cta.textContent = placeholder.dataset.ctaLabel;
    cta.href = placeholder.dataset.ctaHref;
    placeholder.replaceWith(header);
  });

  document.querySelectorAll("[data-site-footer]").forEach((placeholder) => {
    placeholder.replaceWith(siteFooterTemplate.content.cloneNode(true));
  });
}

function init() {
  renderSiteLayout();

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
