const savedMode = localStorage.getItem('theme') || 'dark'; // Default to dark mode
const toggleButton = document.getElementById('togglemode');
const icon = document.getElementById('navlinks');
const some = document.getElementById('some-links');

function setInitialMode() {
  const savedMode = localStorage.getItem('theme');
  if (savedMode === 'light') {
      document.body.classList.add('light-mode');
      toggleButton.src = 'assets/darkmode.svg';
      toggleButton.title = 'Change to darkmode';
      icon.style.filter = 'invert(70%) brightness(0%) contrast(100%)';
      some.style.filter = 'grayscale(0%) invert(0%)';
      
    } else {
      document.body.classList.remove('light-mode');
      toggleButton.src = 'assets/lightmode.svg';
      toggleButton.title = 'Change to lightmode';
      icon.style.filter = 'invert(0%) brightness(70%) contrast(100%)';
      some.style.filter = 'grayscale(100%) brightness(70%) invert(100%)';
  }
}

// Skift mellem dark og light mode
function toggleMode() {
  document.body.classList.toggle('light-mode');
  const isLightMode = document.body.classList.contains('light-mode');

  if (isLightMode) {
      localStorage.setItem('theme', 'light');
      toggleButton.src = 'assets/darkmode.svg'; 
      toggleButton.title = 'Change to darkmode';
      icon.style.filter = 'invert(70%) brightness(0%) contrast(100%)';
      some.style.filter = 'grayscale(0%) invert(0%)';
    } else {
      localStorage.setItem('theme', 'dark');
      toggleButton.src = 'assets/lightmode.svg';
      toggleButton.title = 'Change to lightmode';
      icon.style.filter = 'invert(0%) brightness(70%) contrast(100%)';
      some.style.filter = 'grayscale(100%) brightness(70%) invert(100%)';
    }
}

document.addEventListener("DOMContentLoaded", function() {
  // Opret container til sneflager og placer den bagest
  const snowContainer = document.createElement("div");
  snowContainer.id = "snowContainer";
  document.body.appendChild(snowContainer);
  
  // Funktion til at oprette sneflager
  function createSnowflake() {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");
      snowflake.style.backgroundImage = 'url(assets/snowflake.svg)';
      snowflake.style.backgroundSize = 'contain';
      snowflake.style.backgroundRepeat = 'no-repeat';
      snowflake.style.left = `${Math.random() * 95}vw`; 
      snowflake.style.animationDuration = `${20 + Math.random() * 5}s`; 
      snowflake.style.filter = 'blur(2px)';
      snowflake.style.opacity = Math.random();
      snowflake.style.width = `${5 + Math.random() * 10}px`; // Width between 5px and 15px
      snowContainer.appendChild(snowflake);
      if (localStorage.getItem('theme') == "light") {
        snowContainer.style.filter = 'invert(70%) brightness(0%) contrast(100%)';
      } else {
        snowContainer.style.filter = 'invert(0%) brightness(70%) contrast(100%)';
      }
      
      // Fjern sneflagen efter animationen er færdig
      setTimeout(() => {
          snowflake.remove();
      }, 40000); // Fjern efter 40 sekunder for langsommere snefald
  }

  // Opret en ny sneflage hvert 300 ms
  setInterval(createSnowflake, 900);
});

// Eventlistener til knappen
toggleButton.addEventListener('click', toggleMode);

// Initial tilstand ved load
setInitialMode();