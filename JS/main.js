document.addEventListener("DOMContentLoaded", () => {
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



