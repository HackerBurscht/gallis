document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.aboutus_img_container');
  const image = container ? container.querySelector('.aboutus_img') : null;

  if (!container || !image) {
    console.error('Container oder Bild nicht gefunden.');
    return;
  }

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
const gallery = document.querySelector('.gallery');
gallery.innerHTML += gallery.innerHTML;

// Footer animation
document.addEventListener('DOMContentLoaded', () => {
  // Elemente, die animiert werden sollen:
  const targets = document.querySelectorAll('.footer_logo_container, .footer_small_links');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // Unobserve, wenn du die Animation nur einmal starten möchtest:
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 }); // 20% Sichtbarkeit als Trigger

  targets.forEach(target => observer.observe(target));
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

function openLightbox() {
  document.body.classList.add('modal-open');  // Scrollen sperren
  lightbox.classList.remove('hidden');
  showImage(currentIndex);
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.classList.remove('modal-open');  // Scrollen wieder zulassen
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

