const toggleButton = document.getElementById('togglemode');

function setInitialMode() {
    const savedMode = localStorage.getItem('theme');
    const isLightMode = savedMode === 'light';
    document.body.classList.toggle('light-mode', isLightMode);
    updateThemeIcon(isLightMode);
}

function toggleMode() {
    const isLightMode = document.body.classList.toggle('light-mode');
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    }
    updateThemeIcon(isLightMode);
}

function updateThemeIcon(isLightMode) {
    if (!toggleButton) return;
    toggleButton.src = isLightMode ? 'assets/darkmode.svg' : 'assets/lightmode.svg';
    toggleButton.title = isLightMode ? 'Skift til mørk-tilstand' : 'Skift til lys-tilstand';
}

document.addEventListener("DOMContentLoaded", function () {
    setInitialMode();
    toggleButton?.addEventListener('click', toggleMode);

    // Kontaktformular
    const contactForm = document.getElementById("contactForm");
    contactForm?.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        fetch("mail.php", { method: "POST", body: formData })
            .then(response => response.text())
            .then(data => {
                alert(data);
                contactForm.reset();
            })
            .catch(error => {
                alert("Der opstod en fejl. Prøv igen senere.");
                console.error("Fejl:", error);
            });
    });

    // Cookies
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");
    const rejectBtn = document.getElementById("reject-cookies");
    const consent = localStorage.getItem("cookieConsent");
    if (!consent && banner) banner.style.display = "block";

    acceptBtn?.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "accepted");
        if (banner) banner.style.display = "none";
        console.log("Cookies accepteret.");
    });

    rejectBtn?.addEventListener("click", () => {
        if (banner) banner.style.display = "none";
        console.log("Cookies afvist.");
    });
});
