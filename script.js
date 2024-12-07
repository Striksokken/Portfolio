const savedMode = localStorage.getItem('theme') || 'dark'; // Default to dark mode
const toggleButton = document.getElementById('togglemode');
const icon = document.getElementById('navlinks');
const some = document.getElementById('some-links');
const tools = document.getElementById('tools');

function setInitialMode() {
  const savedMode = localStorage.getItem('theme');
  if (savedMode === 'light') {
      document.body.classList.add('light-mode');
      toggleButton.src = 'assets/darkmode.svg';
      toggleButton.title = 'Skift sidens udseende til mørk-tilstand';
      icon.style.filter = 'invert(70%) brightness(0%) contrast(100%)';
      some.style.filter = 'grayscale(0%) invert(0%)';
      tools.style.filter = 'grayscale(0%) invert(0%)';
      
    } else {
      document.body.classList.remove('light-mode');
      toggleButton.src = 'assets/lightmode.svg';
      toggleButton.title = 'Skift sidens udseende til lys-tilstand';
      icon.style.filter = 'invert(0%) brightness(70%) contrast(100%)';
      some.style.filter = 'grayscale(100%) brightness(70%) invert(100%)';
      tools.style.filter = 'grayscale(100%) brightness(70%) invert(100%)';
  }
}

// Skift mellem dark og light mode
function toggleMode() {
  document.body.classList.toggle('light-mode');
  const isLightMode = document.body.classList.contains('light-mode');

  if (isLightMode) {
      localStorage.setItem('theme', 'light');
      toggleButton.src = 'assets/darkmode.svg'; 
      toggleButton.title = 'Skift sidens udseende til mørk-tilstand';
      icon.style.filter = 'invert(70%) brightness(0%) contrast(100%)';
      some.style.filter = 'grayscale(0%) invert(0%)';
      tools.style.filter = 'grayscale(0%) invert(0%)';
    } else {
      localStorage.setItem('theme', 'dark');
      toggleButton.src = 'assets/lightmode.svg';
      toggleButton.title = 'Skift sidens udseende til lys-tilstand';
      icon.style.filter = 'invert(0%) brightness(70%) contrast(100%)';
      some.style.filter = 'grayscale(100%) brightness(70%) invert(100%)';
      tools.style.filter = 'grayscale(100%) brightness(70%) invert(100%)';
    }
}


//Cookies-window
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");

  // Tjek om samtykke allerede er givet
  const consent = localStorage.getItem("cookieConsent");

  if (!consent) {
    banner.style.display = "block"; // Vis banner
  }

  // Accepter cookies
  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    banner.style.display = "none";
    enableCookies();
  });

  // Afvis cookies
  rejectBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "rejected");
    banner.style.display = "none";
    blockCookies();
  });

  function enableCookies() {
    // Indsæt scripts til cookies her, f.eks. Google Analytics
    console.log("Cookies er accepteret.");
  }

  function blockCookies() {
    console.log("Cookies er afvist.");
    // Bloker evt. tredjeparts cookies
  }
});


//Contact-form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Stopper formularens standard handling (sideskift)

  // Indsamler formularens data
  const formData = new FormData(this);

  // Sender data med fetch til mail.php
  fetch("mail.php", {
      method: "POST",
      body: formData
  })
  .then(response => response.text()) // Læser svaret som tekst
  .then(data => {
      alert(data);
      document.getElementById("contactForm").reset(); // Nulstiller formularen
  })
  .catch(error => {
      document.getElementById("responseMessage").innerText = "Der opstod en fejl. Prøv igen senere.";
      console.error("Fejl:", error);
  });
});



document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM indlæst - sneflager initialiseres");
  // Opret container til sneflager og placer den bagest
  const snowContainer = document.createElement("div");
  snowContainer.id = "snowContainer";
  document.body.appendChild(snowContainer);
  
  // Funktion til at oprette sneflager
  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.style.backgroundImage = "url('assets/snowflake.svg')";
    snowflake.style.backgroundSize = 'contain';
    snowflake.style.backgroundRepeat = 'no-repeat';
    snowflake.style.left = `${Math.random() * 95}vw`; 
    snowflake.style.animationDuration = `${20 + Math.random() * 5}s`; 
    snowflake.style.filter = 'blur(2px)';
    snowflake.style.opacity = Math.random();
    snowflake.style.width = `${5 + Math.random() * 10}px`; // Width between 5px and 15px
    snowflake.style.zIndex = 1001;
    snowContainer.appendChild(snowflake);
    snowflake.style.filter =
    localStorage.getItem('theme') === "light"
      ? 'invert(70%) brightness(0%) contrast(100%)'
      : 'invert(0%) brightness(70%) contrast(100%)';

    
    // Fjern sneflagen efter animationen er færdig
    setTimeout(() => {
        snowflake.remove();
    }, 20000); // Fjern efter 40 sekunder for langsommere snefald
  }

  // Opret en ny sneflage hvert 300 ms
  setInterval(createSnowflake, 300);
});

// Eventlistener til knappen
toggleButton.addEventListener('click', toggleMode);

// Initial tilstand ved load
setInitialMode();

