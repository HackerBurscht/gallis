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
document.addEventListener('DOMContentLoaded', () => {
  const images = [
    'images/modal_gallery/gallis_drone.png',
    'images/modal_gallery/gallis_eröffnung_1.jpg',
    'images/modal_gallery/gallis_eröffnung_2.jpg',
    'images/modal_gallery/gallis_schild.png',
    'images/modal_gallery/gallis_winter.jpeg'
  ];

  const modal = document.getElementById('lightbox-modal');
  const mainImg = document.getElementById('lightbox-main-img');
  const thumbsContainer = modal.querySelector('.lightbox-thumbs');
  let currentIndex = 0;

  // Build thumbnails
  images.forEach((src, idx) => {
    const thumb = document.createElement('img');
    thumb.src = src;
    thumb.alt = `Thumbnail ${idx+1}`;
    thumb.addEventListener('click', () => showImage(idx));
    thumbsContainer.appendChild(thumb);
  });

  const thumbs = thumbsContainer.querySelectorAll('img');

  function showImage(idx) {
    currentIndex = idx;
    mainImg.src = images[idx];
    thumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
  }

  // Navigation
  modal.querySelector('.lightbox-prev').addEventListener('click', () => {
    showImage((currentIndex - 1 + images.length) % images.length);
  });
  modal.querySelector('.lightbox-next').addEventListener('click', () => {
    showImage((currentIndex + 1) % images.length);
  });

  // Open lightbox
  document.querySelector('.aboutus_button a').addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('lightbox-hidden');
    showImage(0);
  });

  // Close lightbox
  modal.querySelector('.lightbox-close').addEventListener('click', () => {
    modal.classList.add('lightbox-hidden');
  });

  // Close on overlay click
  modal.querySelector('.lightbox-overlay').addEventListener('click', () => {
    modal.classList.add('lightbox-hidden');
  });
});
