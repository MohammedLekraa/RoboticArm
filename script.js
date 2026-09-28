document.addEventListener("DOMContentLoaded", () => {
  
  /* =========================================
     1. HIGHLIGHT DE NAVEGACIÓN EN SCROLL (TOC & SIDEBAR)
  ========================================= */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".sidebar-right a, .sidebar-left a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  /* =========================================
     2. BOTÓN INTERACTIVO PARA COPIAR CÓDIGO
  ========================================= */
  const codeBoxes = document.querySelectorAll(".code-box");

  codeBoxes.forEach((box) => {
    const header = box.querySelector(".code-header");
    const codeBlock = box.querySelector("code");

    if (!header || !codeBlock) return;

    const copyBtn = document.createElement("button");
    copyBtn.innerText = "COPY";
    copyBtn.style.padding = "2px 8px";
    copyBtn.style.fontSize = "0.6rem";
    copyBtn.style.fontFamily = "var(--font-mono)";
    copyBtn.style.background = "#2a2b2c";
    copyBtn.style.color = "#ffffff";
    copyBtn.style.border = "1px solid #444";
    copyBtn.style.borderRadius = "3px";
    copyBtn.style.cursor = "pointer";
    copyBtn.style.transition = "all 0.2s ease";

    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.innerText);
        copyBtn.innerText = "COPIED!";
        copyBtn.style.background = "#2e7d32";

        setTimeout(() => {
          copyBtn.innerText = "COPY";
          copyBtn.style.background = "#2a2b2c";
        }, 2000);
      } catch (err) {
        console.error("Error al copiar el código:", err);
      }
    });

    header.appendChild(copyBtn);
  });

  /* =========================================
     3. ZOOM INTERACTIVO EN IMÁGENES (LIGHTBOX)
  ========================================= */
  const images = document.querySelectorAll(".media-frame img");

  images.forEach((img) => {
    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.background = "rgba(0, 0, 0, 0.88)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = "2000";
      overlay.style.cursor = "zoom-out";
      overlay.style.backdropFilter = "blur(6px)";

      const fullImg = document.createElement("img");
      fullImg.src = img.src;
      fullImg.style.maxWidth = "90vw";
      fullImg.style.maxHeight = "90vh";
      fullImg.style.objectFit = "contain";
      fullImg.style.borderRadius = "4px";
      fullImg.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";

      overlay.appendChild(fullImg);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => {
        overlay.remove();
      });
    });
  });

  /* =========================================
     4. REVELADO SUAVE DE SECCIONES (FADE-IN EFFECT)
  ========================================= */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".doc-block").forEach((block) => {
    block.style.opacity = "0";
    block.style.transform = "translateY(20px)";
    block.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    observer.observe(block);
  });

});
