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
  if (!image) {
    console.error('Kein Element mit der Klasse "aboutus_img" gefunden.');
    return;
  } else {
    console.log('aboutus_img gefunden');
  }

  let ticking = false;

  function updateImagePosition() {
    const rect = image.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Debug-Ausgabe: Gesamte BoundingClientRect-Info
    console.log('rect:', rect);
    
    // Berechne progress – egal ob das Bild aktuell ganz im Viewport ist oder nicht
    const progress = 1 - rect.top / windowHeight;
    const maxOffset = 50; // Maximale Verschiebung (50px)
    const offset = progress * maxOffset;

    image.style.transform = `translateY(-${offset}px)`;

    console.log('progress:', progress, 'offset:', offset);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    console.log('Scroll-Event ausgelöst');
    if (!ticking) {
      window.requestAnimationFrame(updateImagePosition);
      ticking = true;
    }
  });
});



