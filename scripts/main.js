document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.aboutus_img_container');
  const image = container ? container.querySelector('.aboutus_img') : null;

  // Funktion: Berechnet den Fortschritt und setzt den Transform-Style
  function updateParallax() {
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // progress: 0, wenn der Container noch unterhalb des Viewports liegt,
    // 1, wenn der obere Rand (rect.top) beim oberen Rand des Fensters liegt.
    // Wenn der Container schon weiter oben ist, wird der Wert größer als 1 – wir klammern zwischen 0 und 1.
    let progress = 1 - (rect.top / windowHeight);
    progress = Math.min(Math.max(progress, 0), 1); // Clamp: 0 <= progress <= 1

    // Maximale Verschiebung: 15% der Container-Höhe
    const maxOffset = container.clientHeight * 0.15;
    const offset = progress * maxOffset;
    
    // Setze den Transform-Stil: scale bleibt konstant, translateY wird verändert
    image.style.transform = `scale(1.2) translateY(-${offset}px)`;
  }

  // Nutze requestAnimationFrame für flüssige Animationen
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll);
  // Einmal beim Laden ausführen
  updateParallax();
});



// Infinity Slider Gallery
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  if (!gallery) return;

  // 1. Inhalt duplizieren
  const clone = gallery.innerHTML;
  gallery.innerHTML += clone;

  // 2. Maße berechnen
  const fullWidth    = gallery.scrollWidth;    // nach Duplizieren
  const singleWidth  = fullWidth / 2;          // Breite eines Sets
  const speed        = 50;                     // Pixel pro Sekunde
  const duration     = singleWidth / speed;    // Zeit in Sek.

  // 3. Nahtlose Loop-Animation
  const { animate } = Motion;
  animate(
    gallery,
    { x: [0, -singleWidth] },
    {
      duration:    duration,
      easing:      "linear",
      repeat:      Infinity,
      repeatType:  "loop"   // <<< hier die unsichtbare Rücksetzung
    }
  );
});




// intro animation
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

// lightbox gallery
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
  const prevBtn = document.querySelector(".lightbox_prev");
  const nextBtn = document.querySelector(".lightbox_next");

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




  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
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
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);
});


// Elipse
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.gallery_wrapper');
  const ellipse = document.querySelector('.gallery_ellipse');
  if (!wrapper || !ellipse) return;

  const ryStart = 1000;
  const ryEnd   = 20;

  let ticking = false;
  function updateEllipse() {
    const rect = wrapper.getBoundingClientRect();
    const winH = window.innerHeight;

    let progress = 1 - (rect.top / winH);
    progress = Math.min(Math.max(progress, 0), 1);

    const ry = ryStart - (ryStart - ryEnd) * progress;
    ellipse.style.setProperty('--ellipse-ry', ry + '%');

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateEllipse);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll);
  updateEllipse();
});

// Eplise mobile
document.addEventListener('DOMContentLoaded', () => {
  const mobContainer = document.querySelector('.half_cirlce_container');
  const mobEllipse   = mobContainer?.querySelector('.half_circle');
  if (!mobContainer || !mobEllipse) return;

  const ryStart = 1000; // Start‑Ry in Prozent
  const ryEnd   = 35;  // End‑Ry in Prozent (stark abgeflacht)

  let ticking = false;
  function updateMobileEllipse() {
    const rect = mobContainer.getBoundingClientRect();
    const winH = window.innerHeight;

    // progress: 0 (unten) → 1 (oben)
    let progress = 1 - (rect.top / winH);
    progress = Math.min(Math.max(progress, 0), 1);

    const ry = ryStart - (ryStart - ryEnd) * progress;
    mobEllipse.style.setProperty('--ellipse-ry', ry + '%');

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateMobileEllipse);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll);
  updateMobileEllipse(); // einmal initial aufrufen
});

