document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const newsletterForm = document.getElementById("newsletterForm");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showError = (inputElement, message) => {
        const container = inputElement.closest(".input-container") || inputElement.parentElement;
        clearError(inputElement);
        const errorText = document.createElement("small");
        errorText.className = "text-danger error-message d-block mt-1";
        errorText.style.fontWeight = "500";
        errorText.innerText = message;
        container.appendChild(errorText);
        inputElement.classList.add("is-invalid");
        inputElement.classList.remove("is-valid");
    };

    const clearError = (inputElement) => {
        const container = inputElement.closest(".input-container") || inputElement.parentElement;
        const existingError = container.querySelector(".error-message");
        if (existingError) existingError.remove();
        inputElement.classList.remove("is-invalid");
        if (inputElement.value.trim() !== "") {
            inputElement.classList.add("is-valid");
        }
    };


    // --- FORMULARIO DE CONTACTO ---
    if (contactForm) {
        const fields = contactForm.querySelectorAll("input, select, textarea");
        const successDiv = document.getElementById("contactSuccessMessage");
        
        fields.forEach(field => {
            field.addEventListener("blur", () => validateField(field));
            field.addEventListener("change", () => validateField(field));
        });

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita recarga
            
            let isFormValid = true;
            fields.forEach(field => {
                if (!validateField(field)) isFormValid = false;
            });

            if (isFormValid) {
                // Capturamos los valores ingresados por el usuario
                const nombreVal = document.getElementById("nombre").value.trim();
                const apellidoVal = document.getElementById("apellido").value.trim();

                // Si creaste el div en el HTML, inyecta el texto ahí; si no, usa un alert
                if (successDiv) {
                    successDiv.innerText = `Gracias ${nombreVal} ${apellidoVal}, dentro de las 48 horas estaremos en contacto contigo.`;
                    successDiv.style.display = "block";
                } else {
                    alert(`Gracias ${nombreVal} ${apellidoVal}, dentro de las 48 horas estaremos en contacto contigo.`);
                }

                contactForm.reset();
                fields.forEach(field => field.classList.remove("is-valid"));
            } else {
                const firstInvalid = contactForm.querySelector(".is-invalid");
                if (firstInvalid) firstInvalid.focus();
            }
        });
    }

    // --- FORMULARIO DEL FOOTER (NEWSLETTER) ---
    if (newsletterForm) {
        // Buscamos el input de manera segura para evitar que falle el script
        const newsletterEmail = document.getElementById("newsletterEmail") || newsletterForm.querySelector("input[type='email']");
        const newsletterSuccess = document.getElementById("newsletterSuccessMessage");

        if (newsletterEmail) {
            newsletterEmail.addEventListener("blur", () => validateField(newsletterEmail));
        }

        // El listener se asocia al evento submit del form obligatoriamente
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Bloquea CUALQUIER intento de recarga de página
            e.stopPropagation();

            if (newsletterEmail && validateField(newsletterEmail)) {
                if (newsletterSuccess) {
                    newsletterSuccess.innerText = "¡Correo enviado con éxito!";
                    newsletterSuccess.style.display = "block";
                } else {
                    alert("¡Gracias por unirte a nuestra causa!");
                }
                
                newsletterForm.reset();
                newsletterEmail.classList.remove("is-valid");
            }
        });
    }
});



