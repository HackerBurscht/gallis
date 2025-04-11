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

