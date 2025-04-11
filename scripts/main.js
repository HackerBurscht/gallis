//Infinity Slider Gallery
const gallery = document.querySelector('.gallery');
gallery.innerHTML += gallery.innerHTML;

//Footer animation
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

