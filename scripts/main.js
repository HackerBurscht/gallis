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


document.addEventListener('DOMContentLoaded', () => {
  // Selektiere den Container der Bildgruppe und das Bild selbst
  const container = document.querySelector('.aboutus_img_container');
  const image = container ? container.querySelector('.aboutus_img') : null;
  
  if (!container || !image) {
    console.error('Container oder Bild nicht gefunden');
    return;
  }
  
  let ticking = false;
  
  function updateParallax() {
    // Hole die Position des Containers im Viewport
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Berechne einen progress-Wert:
    // progress = 0: Container noch nicht (oder kaum) in Sicht, 
    // progress = 1: Container voll (oder zum gewünschten Grad) sichtbar
    // Hier wird als Beispiel (windowHeight - rect.top) geteilt durch (windowHeight + rect.height) genutzt,
    // und anschließend zwischen 0 und 1 geklammert.
    const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
    
    // Maximum translation: 15% der Container-Höhe (anpassbar)
    const maxOffset = container.clientHeight * 0.15;
    
    // Berechne den aktuellen Offset anhand des progress-Werts
    const offset = progress * maxOffset;
    
    // Setze den transform-Wert des Bildes: Hier bleibt das scale(1.2) erhalten, 
    // und translateY wird dynamisch angepasst (negativer Wert, um nach oben zu verschieben)
    image.style.transform = `scale(1.2) translateY(-${offset}px)`;
    
    ticking = false;
  }
  
  // Verwende requestAnimationFrame, um die Performance zu optimieren
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
  
  // Optional: Führe die Funktion einmal beim Laden aus, falls der Container schon im Viewport ist.
  updateParallax();
});


