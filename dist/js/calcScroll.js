function fixScrollGap() {
  const sc = document.querySelector(".scrollable");
  if (!sc) return;

  // largura real da scrollbar (mesmo quando escondida)
  const scrollbarWidth = sc.offsetWidth - sc.clientWidth;

  // ajusta a variável CSS usada pela classe .scroll-fill
  sc.style.setProperty("--scrollbar-width", scrollbarWidth + "px");
}

window.addEventListener("load", fixScrollGap);
window.addEventListener("resize", fixScrollGap);


const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("max-h-0");
        mobileMenu.classList.toggle("opacity-0");

        mobileMenu.classList.toggle("max-h-[500px]"); // altura final para animar
        mobileMenu.classList.toggle("opacity-100");
    });

document.addEventListener("DOMContentLoaded", () => {
  console.log("✓ Script iniciado");

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.error("GSAP ou ScrollTrigger não encontrado. Confere as CDNs no HTML.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector("#carreiras-section");
  const scrollArea = document.querySelector("#cards-scroll");

  if (!section || !scrollArea) {
    console.error("Elemento #carreiras-section ou #cards-scroll não encontrado.");
    return;
  }

  // garante posição relativa/z-index
  section.style.position = section.style.position || "relative";
  scrollArea.style.position = scrollArea.style.position || "relative";

  function initScroll() {
    // remove triggers/tweens antigos só do scrollArea
    ScrollTrigger.getAll()
      .filter(t => t.trigger === section)
      .forEach(t => t.kill());
    gsap.killTweensOf(scrollArea);

    const sectionHeight = section.clientHeight;
    const areaHeight = scrollArea.scrollHeight;
    const viewportH = window.innerHeight;

    const extra = Math.max(0, areaHeight - sectionHeight);
    if (extra === 0) {
      console.log("Nenhum overflow nos cards — ScrollTrigger não será criado.");
      ScrollTrigger.refresh();
      return;
    }

    gsap.to(scrollArea, {
      y: -extra,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${extra}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onEnter: () => console.log("ScrollTrigger: enter"),
        onLeave: () => console.log("ScrollTrigger: leave"),
        onEnterBack: () => console.log("ScrollTrigger: enterBack"),
        onLeaveBack: () => console.log("ScrollTrigger: leaveBack"),
        markers: false
      }
    });

    ScrollTrigger.refresh();
  }

  // aguarda load completo e garante medidas corretas
  function waitForLoadThenInit() {
    if (document.readyState === "complete") {
      initScroll();
    } else {
      window.addEventListener("load", () => {
        setTimeout(initScroll, 50);
      });
    }
  }

  waitForLoadThenInit();

  // resize só refresca triggers
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
});

