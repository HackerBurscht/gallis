//Infinity Slider Gallery
const gallery = document.querySelector('.gallery');
gallery.innerHTML += gallery.innerHTML;

//Footer animation
// Selektiere den Bereich, in dem die animierte Linie enthalten ist
const footerSmallLinks = document.querySelector('.footer_small_links');

// Erstelle den Intersection Observer
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Klasse hinzufügen, damit das ::after-Element animiert
        footerSmallLinks.classList.add('animate');
        // Falls die Animation nur einmal erfolgen soll:
        observer.disconnect();
      }
    });
  },
  { threshold: 0.5 } // z. B. 50 % sichtbar
);

// Beobachte den ausgewählten Container
observer.observe(footerSmallLinks);
  // Selektiere den Logo-Container
  const logoContainer = document.querySelector('.footer_logo_container');

  // Intersection Observer erstellen, der auslöst, wenn der Container zur Hälfte sichtbar ist
  const observerLogo = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          logoContainer.classList.add('animate');
          observer.disconnect(); // Optional: nur einmal auslösen
        }
      });
    },
    { threshold: 0.5 } // 50 % Sichtbarkeit
  );

  observerLogo.observe(logoContainer);

