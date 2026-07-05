/* =====================================================================
   AJUALÁ CAFÉ BAR · main.js  (vanilla, IIFE — sin módulos, sin librerías)
===================================================================== */
(function () {
  "use strict";

  // Marca que JS está activo (las animaciones .reveal solo aplican con .js).
  document.documentElement.classList.add("js");

  // Envuelve cada init: un fallo no debe romper el resto del sitio.
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[ajuala] init falló:", name, e); }
  }

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Año del footer ---------- */
  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Navegación: estado scroll + menú móvil ---------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (!nav) return;

    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && links) {
      var setOpen = function (open) {
        nav.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        document.body.style.overflow = open ? "hidden" : "";
      };
      toggle.addEventListener("click", function () {
        setOpen(!nav.classList.contains("is-open"));
      });
      // Cierra al pulsar un enlace
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { setOpen(false); });
      });
      // Cierra con Escape
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setOpen(false);
      });
    }
  }

  /* ---------- Scroll reveal con IntersectionObserver + red de seguridad ---------- */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!els.length) return;

    if (!("IntersectionObserver" in window) || prefersReduced) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });

    els.forEach(function (el) { io.observe(el); });

    // Seguridad: a los 6s revela cualquier cosa que siguiera oculta.
    setTimeout(function () {
      els.forEach(function (el) { el.classList.add("is-visible"); });
    }, 6000);
  }

  /* ---------- Parallax suave de la imagen "La experiencia" ---------- */
  function initParallax() {
    if (prefersReduced) return;
    var bg = document.querySelector(".showcase__bg");
    if (!bg) return;
    var ticking = false;
    var apply = function () {
      var sec = bg.parentElement;
      var rect = sec.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        // desplazamiento relativo a la posición de la sección en el viewport
        var offset = (rect.top - window.innerHeight) * 0.06;
        bg.style.transform = "scale(1.06) translateY(" + offset.toFixed(1) + "px)";
      }
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }, { passive: true });
    apply();
  }

  /* ---------- Video de portada: bucle automático silenciado ---------- */
  function initHeroVideo() {
    var video = document.getElementById("heroVideo");
    if (!video) return;

    // Con prefers-reduced-motion → no reproducir; se queda el poster estático.
    if (prefersReduced) {
      video.removeAttribute("autoplay");
      video.removeAttribute("loop");
      try { video.pause(); } catch (e) {}
      return;
    }

    // Asegura la reproducción (algunos navegadores ignoran el atributo autoplay
    // hasta que el video puede reproducirse).
    video.muted = true; // requisito para autoplay
    var tryPlay = function () {
      var p = video.play();
      if (p && p.catch) p.catch(function () {/* se reintenta con el primer gesto */});
    };
    if (video.readyState >= 2) tryPlay();
    video.addEventListener("canplay", tryPlay, { once: true });
    video.addEventListener("loadeddata", tryPlay, { once: true });

    // Red de seguridad: si algún navegador bloquea el autoplay inicial,
    // reproduce en cuanto el usuario interactúe por primera vez.
    var onGesture = function () {
      if (video.paused) tryPlay();
      window.removeEventListener("scroll", onGesture);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };
    window.addEventListener("scroll", onGesture, { passive: true });
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("touchstart", onGesture, { passive: true });

    // Reanuda al volver a la pestaña.
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden && video.paused && !prefersReduced) tryPlay();
    });
  }

  /* ---------- Arranque ---------- */
  function boot() {
    safe(initYear, "year");
    safe(initNav, "nav");
    safe(initReveal, "reveal");
    safe(initParallax, "parallax");
    safe(initHeroVideo, "heroVideo");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
