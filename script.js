// Dades de les seccions del disseny CAD
const cadStepsData = {
  1: {
    title: "Modelat CAD v1.0",
    desc: "Primera versió del disseny estructural imprès en PLA. Es van identificar punts de fatiga a l'eix principal de rotació i flexió.",
    img: "Brazo1.jpg" // O la imatge que correspon Swallow v1
  },
  2: {
    title: "Reforç Base v2.0",
    desc: "Redisseny dels suports inferiors amb major gruix de paret i optimització de toleràncies per als rodaments de la base.",
    img: "Brazo3.jpg"
  },
  3: {
    title: "Integració Servos v3.0",
    desc: "Versió final optimitzada amb allotjaments dedicats per als servomotors, reduint el fregament de les politges de tracció.",
    img: "Brazo4.jpg"
  }
};

/**
 * Canvia la informació de la secció CAD segons el pas seleccionat
 * @param {number} stepNumber - Número del pas (1, 2 o 3)
 */
function showCadStep(stepNumber) {
  const data = cadStepsData[stepNumber];
  
  if (!data) return;

  // 1. Actualitzar contingut del DOM
  document.getElementById('cad-title').innerText = data.title;
  document.getElementById('cad-desc').innerText = data.desc;
  document.getElementById('cad-img').src = data.img;
  document.getElementById('cad-img').alt = data.title;

  // 2. Actualitzar estat actiu dels botons
  const buttons = document.querySelectorAll('.cad-step-btn');
  buttons.forEach((btn, index) => {
    if (index + 1 === stepNumber) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Ressaltar l'enllaç actiu del sidebar al fer scroll (ScrollSpy)
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.project-section');
  const navLinks = document.querySelectorAll('.sidebar-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
