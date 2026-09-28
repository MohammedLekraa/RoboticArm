/* =========================================
   PROJECT DETAIL INTERACTION LOGIC
========================================= */

// 1. DINAMISME DE L'ÍNDEX LATERAL (IntersectionObserver)
const projectSections = document.querySelectorAll('.project-section');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

if (projectSections.length > 0 && sidebarLinks.length > 0) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        sidebarLinks.forEach(link => {
          link.classList.remove('active');
          if (link.dataset.section === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  projectSections.forEach(sec => sectionObserver.observe(sec));
}

// 2. MÒDUL DISSENY CAD INTERACTIU
const cadData = [
  {
    title: "01. Base Inicial",
    component: "Avantbraç InMoov",
    reason: "Estructura base per albergar la servomecànica.",
    img: "Brazo1.jpg"
  },
  {
    title: "02. Selecció Mà",
    component: "FlexyHand",
    reason: "Major resistència mecànica i durabilitat articular en ús continu.",
    img: "Brazo3.jpg"
  },
  {
    title: "03. Redisseny CAD",
    component: "Punts d'Ancoratge a mida",
    reason: "Fusió i integració mecànica entre FlexyHand i l'avantbraç InMoov.",
    img: "Brazo4.jpg"
  },
  {
    title: "04. Resultat i Ensamblatge",
    component: "Braç Ensamblat en TPU/PLA",
    reason: "Sistema robust i funcional posterior a la impressió 3D.",
    img: "Brazo1.jpg"
  }
];

const cadBtns = document.querySelectorAll('.cad-step-btn');
const cadTitle = document.getElementById('cad-step-title');
const cadDisplay = document.getElementById('cad-display');

cadBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    cadBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const index = parseInt(btn.dataset.step);
    const data = cadData[index];

    if (cadDisplay) {
      cadDisplay.querySelector('.cad-info').innerHTML = `
        <h4>${data.title}</h4>
        <p><strong>Component:</strong> ${data.component}</p>
        <p><strong>Justificació:</strong> ${data.reason}</p>
      `;
      cadDisplay.querySelector('img').src = data.img;
    }
  });
});

// 3. DESGLOSSAMENT D'ARQUITECTURA DEL SISTEMA
const archDetails = {
  sensors: "<strong>Sensors Dits (5 Flex Sensors):</strong> Captura del nivell de doblament individual de cada dit mitjançant divisors de tensió.",
  mpu: "<strong>Sensor Canell (MPU6050 / GY-521):</strong> Aceleròmetre i giroscopi encarregats de mesurar la inclinació i posició espacial del canell.",
  mcu: "<strong>Microcontroladors (2x ESP32 Wemos D1 R32):</strong> Un dedicat a l'emissió al guant i un altre a la recepció/control PWM al braç.",
  comms: "<strong>Enllaç de Comunicacions (Bluetooth SPP):</strong> Flux continu i sense fils de paquets de dades entre el guant i el braç."
};

const archBlocks = document.querySelectorAll('.arch-block');
const archDetailBox = document.getElementById('arch-detail');

archBlocks.forEach(block => {
  block.addEventListener('click', () => {
    const key = block.dataset.arch;
    if (archDetailBox && archDetails[key]) {
      archDetailBox.innerHTML = `<p>${archDetails[key]}</p>`;
    }
  });
});

// 4. SELECTOR DE PCBs
const pcbData = {
  glove: {
    title: "PCB Guant (Acondicionament d'Insenyal)",
    purpose: "Lectura analògica d'acondicionament de senyals dels sensors.",
    components: "5 Resistències (47 kΩ) per a divisors de tensió.",
    io: "Entrada de sensors Flex / Salida cap a l'ESP32.",
    img: "Brazo4.jpg"
  },
  arm: {
    title: "PCB Braç (Interfície de Potència)",
    purpose: "Distribució de potència i control dels actuadors.",
    components: "Condensador de desacoblament i bornera d'alimentació.",
    io: "Entrada PWM des de l'ESP32 / Salida a 6 Servomotors.",
    img: "Brazo1.jpg"
  }
};

const btnPcbGlove = document.getElementById('btn-pcb-glove');
const btnPcbArm = document.getElementById('btn-pcb-arm');
const pcbCard = document.getElementById('pcb-info-card');

function updatePCB(type) {
  const data = pcbData[type];
  if (!pcbCard) return;

  pcbCard.querySelector('.pcb-details').innerHTML = `
    <h3>${data.title}</h3>
    <ul>
      <li><strong>Propòsit:</strong> ${data.purpose}</li>
      <li><strong>Components Clau:</strong> ${data.components}</li>
      <li><strong>Entrades / Eixides:</strong> ${data.io}</li>
    </ul>
  `;
  pcbCard.querySelector('img').src = data.img;
}

if (btnPcbGlove && btnPcbArm) {
  btnPcbGlove.addEventListener('click', () => {
    btnPcbGlove.classList.add('active');
    btnPcbArm.classList.remove('active');
    updatePCB('glove');
  });

  btnPcbArm.addEventListener('click', () => {
    btnPcbArm.classList.add('active');
    btnPcbGlove.classList.remove('active');
    updatePCB('arm');
  });
}
