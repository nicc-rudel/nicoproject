
//coockies
document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookieBanner");
    const acceptBtn = document.getElementById("acceptCookies");
    const declineBtn = document.getElementById("declineCookies");
    const consent = document.getElementById("cookieConsent");
    const closeConsentBtn = document.getElementById("closeConsent");

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    if (!getCookie("cookieAccepted")) {
        banner.style.display = "block";
        consent.style.display = "none";
    } else {
        banner.style.display = "none";
        consent.style.display = "none"; // Assicura che la scritta sia nascosta
    }

    acceptBtn.addEventListener("click", function () {
        setCookie("cookieAccepted", "true", 1);
        banner.style.display = "none";
        consent.style.display = "none"; // Nasconde subito la scritta
    });

    declineBtn.addEventListener("click", function () {
        setCookie("cookieAccepted", "false", 1);
        banner.style.display = "none";
        consent.style.display = "none";
    });

    closeConsentBtn.addEventListener("click", function () {
        consent.style.display = "none";
    });
});
//menu a tendina
document.addEventListener("DOMContentLoaded", function () {
    let dropdownBtn = document.querySelector(".dropbtn");
    let dropdownMenu = document.querySelector(".dropdown-content");

    // Funzioni per aprire e chiudere il menù
    function openDropdown() {
        dropdownMenu.style.display = "block";
    }

    function closeDropdown() {
        dropdownMenu.style.display = "none";
    }

    // Gestore per il click sul bottone: alterna la visibilità del menù
    dropdownBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // Impedisce che il click si propaghi al documento
        if (dropdownMenu.style.display === "block") {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    // Apre il menù quando il mouse passa sopra il bottone o il contenuto
    dropdownBtn.addEventListener("mouseover", openDropdown);
    dropdownMenu.addEventListener("mouseover", openDropdown);

    // Chiude il menù quando il mouse esce dal bottone o dal menù:
    // Usiamo un breve ritardo per dare il tempo di passare da un elemento all'altro
    dropdownBtn.addEventListener("mouseleave", function () {
        setTimeout(function () {
            if (!dropdownBtn.matches(":hover") && !dropdownMenu.matches(":hover")) {
                closeDropdown();
            }
        }, 100);
    });

    dropdownMenu.addEventListener("mouseleave", function () {
        setTimeout(function () {
            if (!dropdownBtn.matches(":hover") && !dropdownMenu.matches(":hover")) {
                closeDropdown();
            }
        }, 100);
    });

    // Chiude il menù se si clicca fuori dal bottone e dal menù
    document.addEventListener("click", function (event) {
        if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            closeDropdown();
        }
    });
});



// caroselo immagini
document.addEventListener("DOMContentLoaded", function () {
  /***************************************
   * 1. CONFIGURAZIONE DEL CAROSELLO
   ***************************************/
  const slider = document.querySelector(".slider");
  // Seleziona le slide reali (prima di aggiungere i cloni)
  let realSlides = Array.from(slider.querySelectorAll(".slide"));
  const totalRealSlides = realSlides.length; // ad es. 3

  // Clonazione: copia la prima e l'ultima slide
  const firstClone = realSlides[0].cloneNode(true);
  const lastClone = realSlides[realSlides.length - 1].cloneNode(true);
  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slider.firstElementChild);

  // Ora tutte le slide (inclusi i cloni)
  const allSlides = slider.querySelectorAll(".slide");
  let currentIndex = 1; // impostiamo la prima slide reale
  let isTransitioning = false;
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;

  /***************************************
   * 2. PROGRESSION BAR
   ***************************************/
  const progressBar = document.querySelector(".progress-bar");

  function resetProgressBar() {
    if (progressBar) {
      progressBar.style.transition = "none";
      progressBar.style.width = "0%";
      progressBar.offsetWidth; // forziamo il reflow
      progressBar.style.transition = "width 4s linear";
      progressBar.style.width = "100%";
    }
  }
  resetProgressBar();

  /***************************************
   * 3. FUNZIONI DI NAVIGAZIONE DEL CAROSELLO
   ***************************************/
  function goToSlide(index) {
    slider.style.transition = "transform 0.6s ease-in-out";
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    goToSlide(currentIndex);
    resetProgressBar();
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    goToSlide(currentIndex);
    resetProgressBar();
  }

  // Al termine della transizione, controlla se siamo su un clone e riposiziona di conseguenza
  slider.addEventListener("transitionend", function () {
    if (currentIndex === allSlides.length - 1) {
      // Siamo sul clone della prima slide; reimposta alla prima reale
      slider.style.transition = "none";
      currentIndex = 1;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    if (currentIndex === 0) {
      // Siamo sul clone dell'ultima slide; reimposta all'ultima reale
      slider.style.transition = "none";
      currentIndex = totalRealSlides;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    isTransitioning = false;
    updateDots();
  });

  // Timer per l'auto slide: passa alla slide successiva ogni 4 secondi
  let autoSlideInterval = setInterval(nextSlide, 4000);

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 4000);
    resetProgressBar();
  }

  // Gestione dei bottoni di navigazione
  const nextBtn = document.getElementById("nextSlide");
  const prevBtn = document.getElementById("prevSlide");

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      clearInterval(autoSlideInterval);
      nextSlide();
      resetAutoSlide();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      clearInterval(autoSlideInterval);
      prevSlide();
      resetAutoSlide();
    });
  }

  /***************************************
   * 4. INDICATORI (DOTS)
   ***************************************/
  const dots = document.querySelectorAll(".dots-container .dot");

  function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    // Calcola l'indice attivo relativo alle slide reali
    let activeIndex = currentIndex;
    if (activeIndex === 0) activeIndex = totalRealSlides;
    if (activeIndex === allSlides.length - 1) activeIndex = 1;
    if (dots[activeIndex - 1]) {
      dots[activeIndex - 1].classList.add("active");
    }
  }

  dots.forEach(dot => {
    dot.addEventListener("click", function () {
      clearInterval(autoSlideInterval);
      // I dati nei dot sono 1-indexed (es. data-slide="1")
      let slideNumber = parseInt(this.dataset.slide);
      currentIndex = slideNumber;
      slider.style.transition = "transform 0.6s ease-in-out";
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
      resetAutoSlide();
    });
  });

  /***************************************
   * 5. GESTIONE DEI MODALI
   ***************************************/
  // Apertura del modal: cliccando sul bottone "scopri di più"
  const openModalButtons = document.querySelectorAll(".open-modal");
  openModalButtons.forEach(button => {
    button.addEventListener("click", function () {
      const nav = document.getElementsByTagName("nav")[0];
      const modalId = this.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
        // Ferma l'auto slide e l'animazione della progress bar
        clearInterval(autoSlideInterval);
        if (progressBar) {
          progressBar.style.transition = "none";
        }
        nav.style.display="none";
      }
    });
  });

  // Chiusura del modal tramite bottone (classe "close")
  const closeModalButtons = document.querySelectorAll(".modal .close");
  closeModalButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const nav = document.getElementsByTagName("nav")[0];
      const modal = this.closest(".modal");
      if (modal) {
        modal.style.display = "none";
        nav.style.display="flex";
      }
      resetAutoSlide();
    });
  });

  // Chiusura del modal cliccando sullo sfondo
  window.addEventListener("click", function (event) {
    document.querySelectorAll(".modal").forEach(modal => {
      if (event.target === modal) {
        modal.style.display = "none";
        resetAutoSlide();
      }
    });
  });

  // Chiusura del modal con il tasto ESC
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      document.querySelectorAll(".modal").forEach(modal => {
        modal.style.display = "none";
      });
      resetAutoSlide();
    }
  });
});




document.addEventListener("DOMContentLoaded", function () {
    // FUNZIONALITÀ MENU A TENDINA
    let dropdown = document.querySelector(".dropdown-content");
    let button = document.querySelector(".dropbtn");

    button.addEventListener("click", function (event) {
        event.stopPropagation(); // Impedisce la propagazione del click
        dropdown.classList.toggle("show");
    });

    // Chiude il menu se l'utente clicca fuori
    window.addEventListener("click", function (event) {
        if (!button.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove("show");
        }
    });

    // FUNZIONALITÀ FILTRO IMMAGINI
    let categorySelect = document.getElementById("category");
    categorySelect.addEventListener("change", applyFilters);

    function applyFilters() {
        let category = categorySelect.value;
        let images = document.querySelectorAll(".photo-gallery img");
        let photoSection = document.getElementById("foto-lavori");

        // Mantiene la sezione foto visibile sempre
        photoSection.style.display = "block";

        images.forEach(img => {
            let imgCategories = img.getAttribute("data-category").split(" ");

            // Nasconde tutte le immagini se la categoria è "nessuna"
            if (category === "nessuna") {
                img.style.display = "none";
            } else {
                // Mostra le immagini se la categoria corrisponde oppure se si sceglie "tutte"
                img.style.display = (category === "tutte" || imgCategories.includes(category)) ? "block" : "none";
            }
        });
    }

    // Imposta l'opzione di default in base al dispositivo:
    // Su mobile: "nessuna" (le foto sono nascoste all'apertura)
    // Su desktop: "tutte" (le foto vengono mostrate subito)
    if (window.matchMedia("(max-width: 768px)").matches) {
        categorySelect.value = "nessuna";
    } else {
        categorySelect.value = "tutte";
    }

    applyFilters();  // Applica i filtri in base al valore impostato
});
//Modal scorrimento immagini 
const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    closeButton: true,
    zoomable: false,
  });



// Funzione per inviare l'email
document.getElementById("sendEmailBtn").addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("Compila tutti i campi prima di inviare la richiesta.");
        return;
    }

    let subject = encodeURIComponent("Richiesta Preventivo - Luxury Wood");
    let body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`);

    window.location.href = `mailto:luxurywoodpavimenti@email.com?subject=${subject}&body=${body}`;
});






//pop-up whatsApp
document.addEventListener("DOMContentLoaded", function () {
    let popup = document.getElementById("popup");
    let closeBtn = document.getElementById("close-popup");

    // Mostra il pop-up dopo 1 secondo
    setTimeout(function () {
        popup.style.display = "block";
    }, 3000);

    // Nasconde il pop-up automaticamente dopo 10 secondi se non cliccato
    setTimeout(function () {
        if (popup.style.display === "block") {
            popup.style.display = "none";
        }
    }, 20000);

    // Chiude il pop-up manualmente al clic sul pulsante
    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });
});



// Funzione per mostrare il preventivo
document.getElementById("showQuoteBtn").addEventListener("click", function () {
    let formSection = document.getElementById("quoteForm");

    if (formSection.style.display === "none" || formSection.style.display === "") {
        formSection.style.display = "block"; // Mostra il form
    } else {
        formSection.style.display = "none"; // Nasconde il form
    }
});


//funzione refresh sezione preventivo
document.getElementById("resetBtn").addEventListener("click", function() {
    // Resetta tutti gli input del form
    document.getElementById("quoteForm").reset();

    // Nasconde il prezzo personalizzato se era visibile
    document.getElementById("customPriceGroup").style.display = "none";

    // Nasconde la sezione del risultato
    document.getElementById("resultContainer").style.display = "none";
});



//sezione download preventivo
document.addEventListener("DOMContentLoaded", function () {
  // Selezione degli elementi HTML
  let woodTypeSelect = document.getElementById("woodType");
  let customPriceInput = document.getElementById("customPrice");
  let surfaceInput = document.getElementById("surface");
  let installationTypeSelect = document.getElementById("installationType");
  let subfloorSelect = document.getElementById("subfloor");
  let roomShapeSelect = document.getElementById("roomShape");
  let accessoriesSelect = document.getElementById("accessories");
  let locationSelect = document.getElementById("location");
  let notesInput = document.getElementById("notes");
  let calculateBtn = document.getElementById("calculateBtn");
  let downloadPdfBtn = document.getElementById("downloadPdfBtn");
  let priceBreakdown = document.getElementById("priceBreakdown");
  let totalPrice = document.getElementById("totalPrice");
  let resultContainer = document.getElementById("resultContainer");

  // Prezzi fissi
  const woodPrices = { rovere: 45, noce: 60, teak: 75, doussie: 85, pino: 35 };
  const installationPrices = { flottante: 15, incollata: 25, chiodata: 30 };
  const subfloorPrices = { cemento: 0, gres: 5, legno: 0, irregolare: 8 };
  const roomShapePrices = { rettangolare: 0, complessa: 3 };
  const locationPrices = { urbano: 0, extraurbano: 50, montano: 100 };
  const accessoryPrices = { battiscopa: 10, soglia: 25, ventilazione: 15 };

  // Mostra il campo prezzo personalizzato se necessario
  woodTypeSelect.addEventListener("change", function () {
    document.getElementById("customPriceGroup").style.display =
      woodTypeSelect.value === "custom" ? "block" : "none";
  });

  // Funzione di calcolo preventivo
  function calcolaPreventivo() {
    let surface = parseFloat(surfaceInput.value);
    if (isNaN(surface) || surface <= 0) {
      alert("Inserisci una superficie valida.");
      return null;
    }

    let woodType = woodTypeSelect.value;
    let customPrice = parseFloat(customPriceInput.value) || 0;
    let installationType = installationTypeSelect.value;
    let subfloorType = subfloorSelect.value;
    let roomShape = roomShapeSelect.value;
    let location = locationSelect.value;
    let selectedAccessories = Array.from(accessoriesSelect.selectedOptions).map(opt => opt.value);

    let woodPrice = woodType === "custom" ? customPrice : (woodPrices[woodType] || 0);
    let installationPrice = installationPrices[installationType] || 0;
    let subfloorPrice = subfloorPrices[subfloorType] || 0;
    let roomShapePrice = roomShapePrices[roomShape] || 0;
    let locationPrice = locationPrices[location] || 0;
    let accessoriesCost = selectedAccessories.reduce((total, accessory) => total + (accessoryPrices[accessory] || 0), 0);

    let totalCost = (woodPrice + installationPrice + subfloorPrice + roomShapePrice) * surface + locationPrice + accessoriesCost;

    return {
      woodType,
      woodPrice,
      customPrice,
      surface,
      installationType,
      installationPrice,
      subfloorType,
      subfloorPrice,
      roomShape,
      roomShapePrice,
      selectedAccessories,
      accessoriesCost,
      location,
      locationPrice,
      notes: notesInput.value,
      totalCost
    };
  }

  // Azione sul pulsante "Calcola"
  calculateBtn.addEventListener("click", function () {
    const data = calcolaPreventivo();
    if (!data) return;

    resultContainer.style.display = "block";
    priceBreakdown.innerHTML = `
      <p><strong>Legno:</strong> €${data.woodPrice}/m²</p>
      <p><strong>Installazione:</strong> €${data.installationPrice}/m²</p>
      <p><strong>Sottofondo:</strong> €${data.subfloorPrice}/m²</p>
      <p><strong>Forma stanza:</strong> €${data.roomShapePrice}/m²</p>
      <p><strong>Accessori:</strong> €${data.accessoriesCost.toFixed(2)}</p>
      <p><strong>Località:</strong> +€${data.locationPrice}</p>
    `;
    totalPrice.innerHTML = `<h3>Totale stimato: €${data.totalCost.toFixed(2)}</h3>`;
  });

  // Azione sul pulsante "Scarica PDF"
  downloadPdfBtn.addEventListener("click", function () {
    const data = calcolaPreventivo();
    if (!data) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const marginLeft = 20;
    let y = 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 153);
    doc.text("Luxury Wood - Preventivo", marginLeft, y);

    y += 10;
    doc.setDrawColor(180, 180, 180);
    doc.line(marginLeft, y, 190, y);

    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");

    // Dettaglio voci
    const entries = [
      ["Tipo di legno", data.woodType, `€${data.woodPrice}`, `${data.surface} m²`, `€${(data.woodPrice * data.surface).toFixed(2)}`],
      ["Installazione", data.installationType, `€${data.installationPrice}`, `${data.surface} m²`, `€${(data.installationPrice * data.surface).toFixed(2)}`],
      ["Sottofondo", data.subfloorType, `€${data.subfloorPrice}`, `${data.surface} m²`, `€${(data.subfloorPrice * data.surface).toFixed(2)}`],
      ["Forma stanza", data.roomShape, `€${data.roomShapePrice}`, `${data.surface} m²`, `€${(data.roomShapePrice * data.surface).toFixed(2)}`],
      ["Località", data.location, "-", "-", `€${data.locationPrice.toFixed(2)}`],
      ["Accessori", data.selectedAccessories.join(", ") || "-", "-", "-", `€${data.accessoriesCost.toFixed(2)}`],
    ];

    doc.setFont("helvetica", "bold");
    doc.text("Voce", marginLeft, y);
    doc.text("Opzione", marginLeft + 40, y);
    doc.text("Prezzo ", marginLeft + 90, y);
    doc.text("Quantità ", marginLeft + 120, y);
    doc.text("Totale ", marginLeft + 150, y);

    doc.setFont("helvetica", "normal");
    y += 6;
    entries.forEach(row => {
      doc.text(row[0], marginLeft, y);
      doc.text(row[1], marginLeft + 40, y);
      doc.text(row[2], marginLeft + 90, y);
      doc.text(row[3], marginLeft + 120, y);
      doc.text(row[4], marginLeft + 150, y);
      y += 6;
    });

    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text(`Totale stimato: €${data.totalCost.toFixed(2)}`, marginLeft, y);
    
    if (data.notes.trim() !== "") {
      y += 10;
      doc.setFont("helvetica", "normal");
      doc.text("Note:", marginLeft, y);
      doc.setFont("helvetica", "italic");
      y += 6;
      doc.text(data.notes, marginLeft, y);
    }

    // Footer
    doc.setFontSize(10);
    doc.text("Luxury Wood - Contatti: luxurywoodpavimenti@gmail.com | Tel: 392 3850 100", marginLeft, 285);
    doc.text("Pagina 1", 180, 285);

    doc.save("preventivo_luxurywood_pavimenti.pdf");
  });
});





