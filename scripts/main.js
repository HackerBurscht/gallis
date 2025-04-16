document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.aboutus_img_container');
  const image = container ? container.querySelector('.aboutus_img') : null;
  
  if (!container || !image) {
    console.error('Container oder Bild nicht gefunden.');
    return;
  }
  
  function updateParallax() {
    // Bestimme die Position des Containers relativ zum Dokument
    const containerTop = container.offsetTop;
    const containerHeight = container.clientHeight;
    
    // Aktuelle Scroll-Position
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    // Berechne, wie weit wir seit dem Eintritt in den Container gescrollt haben
    const relativeScroll = scrollY - containerTop;
    
    // Klammere den Wert zwischen 0 (Noch nicht im Container oder ganz oben) und containerHeight (als Maximalwert)
    const progress = Math.min(Math.max(relativeScroll / containerHeight, 0), 1);
    
    // Definiere den maximalen Offset – hier 15% der Container-Höhe (anpassbar)
    const maxOffset = containerHeight * 0.15;
    
    // Berechne den tatsächlichen Offset
    const offset = progress * maxOffset;
    
    // Setze den Transform so, dass scale erhalten bleibt und translateY (negativ = nach oben) angepasst wird  
    image.style.transform = `scale(1.2) translateY(-${offset}px)`;
  }
  
  window.addEventListener('scroll', updateParallax);
  updateParallax(); // Einmal beim Laden
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

