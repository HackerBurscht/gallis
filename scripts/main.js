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
  }
  console.log('aboutus_img gefunden');

  // Jeder Scroll löst updateImagePosition aus
  window.addEventListener('scroll', () => {
    updateImagePosition();
  });

  function updateImagePosition() {
    const rect = image.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Logge aktuelle Werte
    console.log('updateImagePosition - rect.top:', rect.top, 'windowHeight:', windowHeight);
    
    // Berechne den progress-Wert: 
    // Wenn das Bild oben im Viewport ist (rect.top = 0), dann progress = 1
    const progress = 1 - rect.top / windowHeight;
    const maxOffset = 50; // Maximale Verschiebung (50px)
    const offset = progress * maxOffset;
    
    console.log('Calculated offset:', offset);
    image.style.transform = `translateY(-${offset}px)`;
  }
});



