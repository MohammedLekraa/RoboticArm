document.addEventListener("DOMContentLoaded", () => {
  
  /* =========================================
     1. BOTÓN COPIAR CÓDIGO (Copy Snippet)
  ========================================= */
  const codeBlocks = document.querySelectorAll(".code-block");

  codeBlocks.forEach((block) => {
    block.style.position = "relative";

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.innerText = "COPY";
    
    copyBtn.style.position = "absolute";
    copyBtn.style.top = "8px";
    copyBtn.style.right = "8px";
    copyBtn.style.padding = "4px 8px";
    copyBtn.style.fontSize = "0.6rem";
    copyBtn.style.fontFamily = "var(--font-mono)";
    copyBtn.style.background = "#2a2b2c";
    copyBtn.style.color = "#ffffff";
    copyBtn.style.border = "1px solid #444";
    copyBtn.style.borderRadius = "3px";
    copyBtn.style.cursor = "pointer";
    copyBtn.style.transition = "all 0.2s ease";

    copyBtn.addEventListener("click", async () => {
      const codeText = block.querySelector("code")?.innerText || block.innerText;

      try {
        await navigator.clipboard.writeText(codeText);
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

    block.appendChild(copyBtn);
  });


  /* =========================================
     2. ZOOM EN IMÁGENES / DIAGRAMAS
  ========================================= */
  const images = document.querySelectorAll(".main-image-frame img, .doc-media img");

  images.forEach((img) => {
    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.background = "rgba(0, 0, 0, 0.85)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = "1000";
      overlay.style.cursor = "zoom-out";
      overlay.style.backdropFilter = "blur(5px)";

      const fullImg = document.createElement("img");
      fullImg.src = img.src;
      fullImg.style.maxWidth = "90vw";
      fullImg.style.maxHeight = "90vh";
      fullImg.style.objectFit = "contain";
      fullImg.style.borderRadius = "6px";
      fullImg.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";

      overlay.appendChild(fullImg);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => {
        overlay.remove();
      });
    });
  });


  /* =========================================
     3. REVELADO SUAVE DE SECCIONES (Scroll Reveal)
  ========================================= */
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".doc-section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(15px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

});
