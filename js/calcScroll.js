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