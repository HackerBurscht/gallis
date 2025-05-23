import { animate, scroll, hover, stagger, spring } from 'https://cdn.jsdelivr.net/npm/motion@12.12.1/+esm'

// News-badge ***************************************************************************************
document.addEventListener("DOMContentLoaded", () => {
  // 1) Gerader Einflug von oben, ohne Overshoot
  animate(
    ".news-badge",
    {
      transform: ["translateY(-100%)", "translateY(0%)"],
      opacity: [0, 1]
    },
    {
      delay: 0.5,       // Warte 0.5s nach Page-Load
      duration: 0.8,    // Fahrt in 0.8s
      easing: "ease-out",
      fill: "forwards"
    }
  );

  // 2) Shine-Effekt
  animate(
    ".news-badge .shine",
    {
      transform: ["translateX(-100%)", "translateX(100%)"],
      opacity: [0, 0.6, 0]
    },
    {
      delay: 1.4,       // beginnt, nachdem das Badge drin ist (0.5 + 0.8 + 0.1)
      duration: 1.0,
      easing: "ease-in-out",
      fill: "forwards"
    }
  );
});

// news-overlay animation ***************************************************************************************
document.addEventListener("DOMContentLoaded", () => {
  const badge        = document.querySelector(".news-badge");
  const overlay      = document.getElementById("newsOverlay");
  const content      = overlay.querySelector(".overlay-content");
  const closeBtn     = overlay.querySelector(".overlay-close");
  const backdrop     = overlay.querySelector(".overlay-backdrop");
  const leftCurtain  = document.querySelector(".curtain-left");
  const rightCurtain = document.querySelector(".curtain-right");

  function openOverlay() {
    // 1) Vorhänge schließen
    animate(
      [leftCurtain, rightCurtain],
      { width: ["0%", "50%"] },
      {
        duration: 0.6,
        easing: "ease-in",
        onComplete: () => {
          // 2) Overlay sichtbar machen
          overlay.classList.add("visible");

          // 3) Content mit Overshoot einfahren
          animate(
            content,
            {
              opacity: [0, 1],
              transform: [
                "translate(-50%, -60%) scale(0.8)",
                "translate(-50%, -50%) scale(1.05)",
                "translate(-50%, -50%) scale(1)"
              ]
            },
            {
              delay: 0.2,
              duration: 0.7,
              easing: ["ease-out","cubic-bezier(0.25,1.5,0.5,1)","ease-out"],
              fill: "forwards"
            }
          );
        }
      }
    );
  }

  function closeOverlay() {
    // 1) Content ausblenden & schrumpfen
    animate(
      content,
      {
        opacity: [1, 0],
        transform: [
          "translate(-50%, -50%) scale(1)",
          "translate(-50%, -60%) scale(0.8)"
        ]
      },
      {
        duration: 0.4,
        easing: "ease-in",
        fill: "forwards",
        onComplete: () => {
          // 2) Overlay unsichtbar machen
          overlay.classList.remove("visible");
          // 3) Vorhänge wieder öffnen
          animate(
            [leftCurtain, rightCurtain],
            { width: ["50%", "0%"] },
            { duration: 0.6, easing: "ease-out", fill: "forwards" }
          );
        }
      }
    );
  }

  badge.addEventListener("click", openOverlay);
  closeBtn.addEventListener("click", closeOverlay);
  backdrop.addEventListener("click", closeOverlay);
});



//Scroll-indicator ***************************************************************************************
document.addEventListener("DOMContentLoaded", () => {
  const indicator  = document.querySelector(".scroll-indicator");
  const thumb      = document.querySelector(".scroll-thumb");
  const scrollText = document.querySelector(".scroll-text");
  const intro      = document.querySelector(".intro");

  // 1) Sanftes Einblenden
  animate(
    indicator,
    { opacity: [0, 1], y: [20, 0] },
    { delay: 0.5, duration: 1.2, easing: "ease-out" }
  );

  // 2) Daumen-Leiste bewegt sich beim Scrollen
  scroll(
    animate(thumb, { top: ["0%", "80%"] }, { ease: "linear", fill: "both" }),
    {
      source: document.scrollingElement,
      axis: "y",
      offset: ["start start", "end end"]
    }
  );

  // 3) IntersectionObserver auf die Intro-Section
  const introObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Intro ist noch im Viewport → Text anzeigen
        scrollText.classList.remove("hidden");
      } else {
        // Intro ist komplett raus → Text verstecken
        scrollText.classList.add("hidden");
      }
    },
    {
      root: null,       // das Browser-Fenster
      threshold: 0.75    // ab 10% Sichtbarkeit gilt als "eingetreten"
    }
  );
  introObserver.observe(intro);
});

// Slogan-text-effect and rating stars ***************************************************************************************
document.addEventListener("DOMContentLoaded", () => {
  const slogan = document.getElementById("slogan");
  const words  = slogan.textContent.trim().split(/\s+/);

  // 1) Markdown → einzelne <span class="slogan_word">
  slogan.innerHTML = words.map(w => `<span class="slogan_word">${w}</span>`).join(" ");
  const spans = slogan.querySelectorAll(".slogan_word");

  // 2) Sterne selektieren
  const stars = document.querySelectorAll(".ratings .starburst");

  // 3) IntersectionObserver
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // a) Wort-Animation
      spans.forEach((span, i) => {
        setTimeout(() => span.classList.add("visible"), 100 + i * 175);
      });

      // b) Sterne **nach** der Wort-Animation
      const maxWordDelay = 100 + (spans.length - 1) * 180;
      setTimeout(() => {
        animate(
          stars,
          { opacity: [0, 1], y: [20, 0] },
          { delay: stagger(0.1), duration: 0.8, easing: "ease-out" }
        );
      }, maxWordDelay + 50); // +50 ms Puffer

      obs.unobserve(slogan);
    });
  }, { threshold: 0.5 });

  observer.observe(slogan);
});

// stars hover
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".starburst");
  // für jedes Stern-Element einmal registeren:
  stars.forEach(el => {
    hover(
      el,                              // <-- ein DOM-Element
      { rotate: [0, 360] },            // Keyframes
      { duration: 1, easing: "ease-in-out" }
    );
  });
});


// Infinity Slider Gallery ***************************************************************************************
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector("#gallery");
  const images = Array.from(gallery.children);

  // Dupliziere alle Bilder für den Loop-Effekt
  images.forEach(img => {
    const clone = img.cloneNode(true);
    gallery.appendChild(clone);
  });

  let position = 0;
  const speed = 2; // px pro Frame

  // Gesamte Breite der Originalbilder berechnen (ohne Gap)
  const totalWidth = images.reduce((sum, img) => sum + img.offsetWidth, 0);

  function animate() {
    position -= speed;

    if (Math.abs(position) >= totalWidth) {
      position = 0;
    }

    gallery.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});

// intro animation ***************************************************************************************
document.addEventListener('DOMContentLoaded', () => {
  // Elemente, die animiert werden sollen:
  const targets = document.querySelectorAll('.intro_adjectives');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // Unobserve, wenn du die Animation nur einmal starten möchtest:
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 }); // 80% Sichtbarkeit als Trigger

  targets.forEach(target => observer.observe(target));
});

// lightbox gallery ***************************************************************************************
document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "gallis_drone.png",
    "gallis_eröffnung_1.jpg",
    "gallis_eröffnung_2.jpg",
    "gallis_schild.png",
    "gallis_winter.jpeg"
  ];
  const basePath = "images/modal_gallery/";

  const lightbox = document.getElementById("lightbox");
  const mainImg = document.querySelector(".lightbox_main");
  const thumbsContainer = document.querySelector(".lightbox_thumbs");
  const closeBtn = document.querySelector(".lightbox_close");

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = index;
    mainImg.src = basePath + images[index];
    document.querySelectorAll(".lightbox_thumbs img").forEach((thumb, i) => {
      thumb.classList.toggle("active", i === index);
    });
  }
// Helfer zum Verhindern von Scroll‑ und Touch‑Events
function preventScroll(e) {
  e.preventDefault();
}

let savedScrollY = 0;

function openLightbox() {
  // 1) Scroll-Position merken
  savedScrollY = window.pageYOffset || document.documentElement.scrollTop;
  // 2) Body fixieren und top setzen
  document.body.classList.add('modal-open');
  document.body.style.top = `-${savedScrollY}px`;

  // 3) Scroll- und Touch-Events blockieren
  window.addEventListener('wheel', preventScroll, { passive: false });
  window.addEventListener('touchmove', preventScroll, { passive: false });

  // 4) Lightbox anzeigen
  lightbox.classList.remove('hidden');
  showImage(currentIndex);
}

function closeLightbox() {
  // 1) Lightbox verstecken
  lightbox.classList.add('hidden');

  // 2) Scroll- und Touch-Events wieder zulassen
  window.removeEventListener('wheel', preventScroll, { passive: false });
  window.removeEventListener('touchmove', preventScroll, { passive: false });

  // 3) Body-Positionierung zurücksetzen
  document.body.classList.remove('modal-open');
  document.body.style.top = '';

  // 4) Genaue Scroll-Position wiederherstellen
  window.scrollTo(0, savedScrollY);
}

  // Thumbnails erstellen
  images.forEach((img, index) => {
    const thumb = document.createElement("img");
    thumb.src = basePath + img;
    thumb.addEventListener("click", () => showImage(index));
    thumbsContainer.appendChild(thumb);
  });

  // Events
  document.querySelector(".aboutus_button").addEventListener("click", openLightbox);
  closeBtn.addEventListener("click", closeLightbox);
});


//Elipse Motion ***************************************************************************************
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.gallery_wrapper');
  if (!wrapper) return;

  scroll(
    animate('.gallery_ellipse', {
      // fährt von 100px unterhalb → in Position
      y: [200, 0],
      // von vollem Radius → abgeflacht
      borderTopLeftRadius: ['95% 100%', '95% 20%'],
      borderTopRightRadius: ['95% 100%', '95% 20%']
    }, {
      duration: 0.8,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    }),
    {
      target: wrapper,
      // Animation startet, wenn wrapper oben in den Viewport fährt
      offset: ['start end', 'end start']
    }
  );
});

//Offer contents ***************************************************************************************

document.addEventListener("DOMContentLoaded", () => {
  // Selektiere beide Text-Container
  const targets = Array.from(document.querySelectorAll(".offer_left, .offer_right, .aboutus_texts, .aboutus_textcontainer-light"));
  if (!targets.length) return;

  targets.forEach(el => {
    // 1) Erstelle die Animation: 0→1 Opacity und von 30px unten nach oben
    const anim = animate(
      el,
      {
        opacity: [0, 1],
        transform: ["translateY(30px)", "translateY(0)"]
      },
      {
        duration: 0.8,
        easing: "ease-out",
        fill: "forwards"     // <-- wichtig: beendet in finalem Zustand
      }
    );

    // 2) Bind das Ganze an den Scroll: sobald das TOP des Elements den BOTTOM des Viewports erreicht...
    scroll(
      anim,
      {
        target: el,
        offset: ["start end", "center center"]  // <-- hier korrigiert
      }
    );
  });
});

//Footer ***************************************************************************************
document.addEventListener('DOMContentLoaded', () => {
  // Beobachte sowohl das Logo-Container als auch die Footer-Links
  const targets = document.querySelectorAll('.footer_logo_container, .footer_small_links');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2  // startet, sobald 20% des Elements sichtbar sind
  });

  targets.forEach(el => observer.observe(el));
});
