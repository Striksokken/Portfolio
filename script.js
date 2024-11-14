const toggleButton = document.getElementById('togglemode');
const icon = document.getElementById('navlinks');

function setInitialMode() {
  const savedMode = localStorage.getItem('theme');
  if (savedMode === 'light') {
      document.body.classList.add('light-mode');
      toggleButton.src = 'assets/lightmode.svg';
      icon.style.filter = 'invert(70%) brightness(0%) contrast(100%)';
      
    } else {
      document.body.classList.remove('light-mode');
      toggleButton.src = 'assets/darkmode.svg';
      icon.style.filter = 'invert(0%) brightness(70%) contrast(100%)';

  }
}

// Skift mellem dark og light mode
function toggleMode() {
  document.body.classList.toggle('light-mode');
  const isLightMode = document.body.classList.contains('light-mode');

  if (isLightMode) {
      localStorage.setItem('theme', 'light');
      toggleButton.src = 'assets/lightmode.svg';
      icon.style.filter = 'invert(70%) brightness(0%) contrast(100%)';
    } else {
      localStorage.setItem('theme', 'dark');
      toggleButton.src = 'assets/darkmode.svg'; 
      icon.style.filter = 'invert(0%) brightness(70%) contrast(100%)';
    }
}

// Eventlistener til knappen
toggleButton.addEventListener('click', toggleMode);

// Initial tilstand ved load
setInitialMode();
