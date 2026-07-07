document.addEventListener("DOMContentLoaded", () => {
    // --- FORMULARIO DEL FOOTER (NEWSLETTER) ---
    if (newsletterForm) {
        // Buscamos el input de manera segura para evitar que falle el script
        const newsletterEmail = document.getElementById("newsletterEmail") || newsletterForm.querySelector("input[type='email']");
        const newsletterSuccess = document.getElementById("newsletterSuccessMessage");
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
        if (existingError) existingError.remove()
        inputEement.classList.remove("is-invalid");
        if (inputElement.value.trim() !== "") {
            inputElement.classList.add("is-valid");
        }
    };


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



