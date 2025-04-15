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

  window.addEventListener('scroll', () => {
    const rect = image.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      // Sichtbarer Anteil berechnen (0 = unten, 1 = oben voll sichtbar)
      const scrollPercent = 1 - rect.top / windowHeight;
      const offset = scrollPercent * 500; // Maximal 50px nach oben

      image.style.transform = `translateY(-${offset}px)`;
    }
  });
});


