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


// scroll effect on img
document.addEventListener('DOMContentLoaded', () => {
  const image = document.querySelector('.aboutus_img');
  let ticking = false;

  function updateImagePosition() {
    const rect = image.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Prüfen, ob das Bild im Viewport ist
    if (rect.top < windowHeight && rect.bottom > 0) {
      // progress: 0 wenn Bild gerade am unteren Rand ist, bis 1 wenn es vollständig im Sichtbereich (oben) ist.
      const progress = 1 - rect.top / windowHeight;
      const maxOffset = 100; // max. Verschiebung in Pixeln, anpassen bei Bedarf
      const offset = progress * maxOffset;
      
      // Debug-Ausgabe: Entferne diese Zeile, sobald der Effekt stimmt.
      console.log('progress:', progress, 'offset:', offset);
      
      image.style.transform = `translateY(-${offset}px)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateImagePosition);
      ticking = true;
    }
  });
});


