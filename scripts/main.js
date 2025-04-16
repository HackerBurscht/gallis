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

