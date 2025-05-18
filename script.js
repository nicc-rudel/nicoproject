
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
//menù a tendina iniziale
document.addEventListener("DOMContentLoaded", function () {
    let dropdownBtn = document.querySelector(".dropbtn");
    let dropdownMenu = document.querySelector(".dropdown-content");

    dropdownBtn.addEventListener("click", function () {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Chiudi il menù se si clicca fuori
    document.addEventListener("click", function (event) {
        if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});


// caroselo immagini
let images = document.querySelectorAll(".custom-image"); 
let modal = document.getElementById("modal");
let modalImg = document.getElementById("modalImg");
let currentIndex = 0;
let interval; // Per il movimento automatico del carosello

// 🖼 Apri il modal e ferma il carosello
document.querySelectorAll(".open-modal").forEach(button => {
    button.addEventListener("click", function() {
        let targetModal = document.getElementById(this.dataset.modal);
        targetModal.style.display = "block";
        stopSlider();
    });
});

// ❌ Chiudi il modal e riavvia il carosello
document.querySelectorAll(".close").forEach(closeBtn => {
    closeBtn.addEventListener("click", function() {
        this.closest(".modal").style.display = "none";
        startSlider();
    });
});

// 🏹 Navigazione tra le immagini
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
}

// 🔁 Avvia il carosello automaticamente
function startSlider() {
    interval = setInterval(() => {
        nextImage();
    }, 3000);
}

// ⏸ Ferma il carosello quando il modal è aperto
function stopSlider() {
    clearInterval(interval);
}

// 🖥️ Chiusura del modal con il tasto ESC
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal").forEach(modal => {
            modal.style.display = "none";
        });
        startSlider();
    }
});

// ✨ Avvia il carosello all'apertura della pagina
startSlider();





//funzione menu a tendina sezione immagini
document.addEventListener("DOMContentLoaded", function () {
    let dropdown = document.querySelector(".dropdown-content");
    let button = document.querySelector(".dropbtn");

    button.addEventListener("click", function () {
        dropdown.classList.toggle("show");
    });

    // Chiude il menu se l'utente clicca fuori
    window.addEventListener("click", function (event) {
        if (!button.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove("show");
        }
    });
});

//filtro immagini
document.getElementById("category").addEventListener("change", applyFilters);

function applyFilters() {
    let category = document.getElementById("category").value;
    let images = document.querySelectorAll(".photo-gallery img");

    images.forEach(img => {
        let imgCategories = img.getAttribute("data-category").split(" ");

        if (category === "tutte" || imgCategories.includes(category)) {
            img.style.display = "block";
        } else {
            img.style.display = "none";
        }
    });
}



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
    }, 1000);

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
    let resetBtn = document.getElementById("resetBtn");
    let downloadPdfBtn = document.getElementById("downloadBtn");
    let sendQuoteBtn = document.getElementById("sendQuoteBtn");
    let whatsappQuoteBtn = document.getElementById("whatsappQuoteBtn");
    let priceBreakdown = document.getElementById("priceBreakdown");
    let totalPrice = document.getElementById("totalPrice");
    let resultContainer = document.getElementById("resultContainer");

    // Prezzi fissi
    const woodPrices = {
        rovere: 45, noce: 60, teak: 75, doussie: 85, pino: 35
    };

    const installationPrices = {
        flottante: 15, incollata: 25, chiodata: 30
    };

    const subfloorPrices = {
        cemento: 0, gres: 5, legno: 0, irregolare: 8
    };

    const roomShapePrices = {
        rettangolare: 0, complessa: 3
    };

    const locationPrices = {
        urbano: 0, extraurbano: 50, montano: 100
    };

    const accessoryPrices = {
        battiscopa: 10, soglia: 25, ventilazione: 15
    };

    // Mostra il campo "Prezzo personalizzato" se selezionato "Altro"
    woodTypeSelect.addEventListener("change", function () {
        document.getElementById("customPriceGroup").style.display = woodTypeSelect.value === "custom" ? "block" : "none";
    });

    // Funzione di calcolo preventivo
    calculateBtn.addEventListener("click", function () {
        let surface = parseFloat(surfaceInput.value);
        if (isNaN(surface) || surface <= 0) {
            alert("Inserisci una superficie valida.");
            return;
        }

        let woodType = woodTypeSelect.value;
        let customPrice = parseFloat(customPriceInput.value) || 0;
        let installationType = installationTypeSelect.value;
        let subfloorType = subfloorSelect.value;
        let roomShape = roomShapeSelect.value;
        let location = locationSelect.value;
        let selectedAccessories = Array.from(accessoriesSelect.selectedOptions).map(opt => opt.value);

        // Calcolo dei costi base
        let woodPrice = woodType === "custom" ? customPrice : (woodPrices[woodType] || 0);
        let installationPrice = installationPrices[installationType] || 0;
        let subfloorPrice = subfloorPrices[subfloorType] || 0;
        let roomShapePrice = roomShapePrices[roomShape] || 0;
        let locationPrice = locationPrices[location] || 0;

        // Calcolo degli accessori
        let accessoriesCost = selectedAccessories.reduce((total, accessory) => {
            return total + (accessoryPrices[accessory] || 0);
        }, 0);

        let totalCost = (woodPrice + installationPrice + subfloorPrice + roomShapePrice) * surface + locationPrice + accessoriesCost;

        // Mostra il risultato
        resultContainer.style.display = "block";
        priceBreakdown.innerHTML = `
            <p><strong>Legno:</strong> €${woodPrice}/m²</p>
            <p><strong>Installazione:</strong> €${installationPrice}/m²</p>
            <p><strong>Sottofondo:</strong> €${subfloorPrice}/m²</p>
            <p><strong>Forma stanza:</strong> €${roomShapePrice}/m²</p>
            <p><strong>Accessori:</strong> €${accessoriesCost.toFixed(2)}</p>
            <p><strong>Località:</strong> +€${locationPrice}</p>
        `;
        totalPrice.innerHTML = `<h3>Totale stimato: €${totalCost.toFixed(2)}</h3>`;
    });

    // Funzione per scaricare il PDF
    downloadPdfBtn.addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        let woodType = woodTypeSelect.value;
        let customPrice = customPriceInput.value;
        let surface = surfaceInput.value;
        let installationType = installationTypeSelect.value;
        let subfloorType = subfloorSelect.value;
        let roomShape = roomShapeSelect.value;
        let location = locationSelect.value;
        let notes = notesInput.value;
        let accessories = Array.from(accessoriesSelect.selectedOptions).map(opt => opt.text).join(", ");

        doc.text("Preventivo Parquet", 10, 10);
        doc.text(`Tipo di legno: ${woodType}`, 10, 20);
        if (woodType === "custom") doc.text(`Prezzo personalizzato: €${customPrice}/m²`, 10, 30);
        doc.text(`Superficie: ${surface} m²`, 10, 40);
        doc.text(`Tipo di posa: ${installationType}`, 10, 50);
        doc.text(`Sottofondo: ${subfloorType}`, 10, 60);
        doc.text(`Forma stanza: ${roomShape}`, 10, 70);
        doc.text(`Accessori: ${accessories}`, 10, 80);
        doc.text(`Località: ${location}`, 10, 90);
        doc.text(`Note: ${notes}`, 10, 100);

        doc.save("preventivo.pdf");
    });

    // Funzione di invio email
    sendQuoteBtn.addEventListener("click", function () {
        let emailAddress = "luxurywoodpavimenti@gmail.com";
        let subject = "Preventivo parquet";
        let body = "Ecco il preventivo generato, in allegato il PDF.";

        window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });

    // Funzione di invio WhatsApp
    whatsappQuoteBtn.addEventListener("click", function () {
        let phoneNumber = "3923850100";
        let message = "Ciao! Ti invio il preventivo per il parquet.";

        let url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    });

    // Funzione di reset
    resetBtn.addEventListener("click", function () {
        document.getElementById("quoteForm").reset();
        resultContainer.style.display = "none";
    });
});






// Carosello immagini
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 1; // Partiamo dalla prima slide effettiva
    let autoSlideInterval;

    // Clonazione per il loop fluido
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    const allSlides = document.querySelectorAll(".slide"); // Include i cloni
    slider.style.transform = `translateX(-100%)`;

    function autoSlide() {
        autoSlideInterval = setInterval(() => {
            currentSlide++;
            slider.style.transition = "transform 0.6s ease-in-out";
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;

            if (currentSlide === allSlides.length - 1) {
                setTimeout(() => {
                    slider.style.transition = "none";
                    currentSlide = 1;
                    slider.style.transform = `translateX(-100%)`;
                }, 600);
            }
        }, 4000);
    }

    document.getElementById("nextSlide").addEventListener("click", function () {
        clearInterval(autoSlideInterval);
        currentSlide++;
        slider.style.transition = "transform 0.6s ease-in-out";
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        if (currentSlide === allSlides.length - 1) {
            setTimeout(() => {
                slider.style.transition = "none";
                currentSlide = 1;
                slider.style.transform = `translateX(-100%)`;
            }, 600);
        }
        autoSlide();
    });

    document.getElementById("prevSlide").addEventListener("click", function () {
        clearInterval(autoSlideInterval);
        currentSlide--;
        slider.style.transition = "transform 0.6s ease-in-out";
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        if (currentSlide === 0) {
            setTimeout(() => {
                slider.style.transition = "none";
                currentSlide = allSlides.length - 2;
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            }, 600);
        }
        autoSlide();
    });

    // 🔍 **Apertura modali corretta**
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("open-modal")) {
            let modalId = event.target.getAttribute("data-modal");
            document.getElementById(modalId).style.display = "block";
        }
    });

    document.querySelectorAll(".close").forEach(closeBtn => {
        closeBtn.addEventListener("click", function () {
            this.parentElement.parentElement.style.display = "none";
        });
    });

    window.addEventListener("click", function (event) {
        if (event.target.classList.contains("modal")) {
            event.target.style.display = "none";
        }
    });

    autoSlide();
});






//carosello immagini
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");
    const dotsContainer = document.querySelector(".dots-container");
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Creazione dinamica degli indicatori (dots)
    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateDots() {
        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }
    }

    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        slider.style.transition = "transform 0.6s ease-in-out";
        slider.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
        updateDots();
    }

    function nextSlide() {
        const newIndex = (currentSlide + 1) % totalSlides;
        goToSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(newIndex);
    }

    function autoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    prevBtn.addEventListener("click", function () {
        clearInterval(autoSlideInterval);
        prevSlide();
        autoSlide();
    });

    nextBtn.addEventListener("click", function () {
        clearInterval(autoSlideInterval);
        nextSlide();
        autoSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener("click", function () {
            clearInterval(autoSlideInterval);
            goToSlide(Number(dot.dataset.index));
            autoSlide();
        });
    });

    updateDots();
    autoSlide();
});
