const toggleButton = document.getElementById('togglemode');
const icon = document.getElementById('navlinks');
const some = document.getElementById('some-links');
const tools = document.getElementById('tools');

// Initial light/dark mode
function setInitialMode() {
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'light') {
        document.body.classList.add('light-mode');
        toggleButton.src = 'assets/darkmode.svg';
        toggleButton.title = 'Skift til mørk-tilstand';
        setFilters(true);
    } else {
        document.body.classList.remove('light-mode');
        toggleButton.src = 'assets/lightmode.svg';
        toggleButton.title = 'Skift til lys-tilstand';
        setFilters(false);
    }
}

// Skift mellem dark og light mode
function toggleMode() {
    const isLightMode = document.body.classList.toggle('light-mode');
    //sæt cookie, hvis cookies er accepteret.
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    }
    toggleButton.src = isLightMode ? 'assets/darkmode.svg' : 'assets/lightmode.svg';
    toggleButton.title = isLightMode ? 'Skift til mørk-tilstand' : 'Skift til lys-tilstand';
    setFilters(isLightMode);
}

function setFilters(isLightMode) {
    const lightFilter = 'invert(70%) brightness(0%) contrast(100%)';
    const darkFilter = 'invert(0%) brightness(70%) contrast(100%)';
    const grayscaleFilter = 'grayscale(100%) brightness(70%) invert(100%)';
    
    icon.style.filter = isLightMode ? lightFilter : darkFilter;
    some.style.filter = isLightMode ? 'grayscale(0%) invert(0%)' : grayscaleFilter;
    tools.style.filter = isLightMode ? 'grayscale(0%) invert(0%)' : grayscaleFilter;
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
    if (!consent) banner.style.display = "block";

    acceptBtn?.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "accepted");
        banner.style.display = "none";
        console.log("Cookies accepteret.");
    });

    rejectBtn?.addEventListener("click", () => {
        //localStorage.setItem("cookieConsent", "rejected");
        banner.style.display = "none";
        console.log("Cookies afvist.");
    });
});
