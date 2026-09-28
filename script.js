
document.addEventListener("DOMContentLoaded", () => {

  // Scroll reveal

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  // Active navigation

  const navLinks = document.querySelectorAll(".nav-btn");

  const sections = [
    ...document.querySelectorAll(
      "#overview, #architecture, #hardware, #firmware, #results"
    )
  ];

  const updateNavigation = () => {
    const position = window.scrollY + window.innerHeight * 0.35;

    let currentSection = "";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (position >= top && position < bottom) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const target = link.getAttribute("href").substring(1);

      link.classList.toggle(
        "active",
        target === currentSection
      );
    });
  };

  window.addEventListener("scroll", updateNavigation, {
    passive: true
  });

  updateNavigation();

});
