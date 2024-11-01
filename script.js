function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open'); // Forhindrer rullefunktion når menuen er åben
}

const toggleButton = document.getElementById('togglemode');

// Tjek og indstil oprindelig tilstand
function setInitialMode() {
  const savedMode = localStorage.getItem('theme');
  if (savedMode === 'light') {
    document.body.classList.add('light-mode');
    toggleButton.textContent = '🌚';
  } else {
    document.body.classList.remove('light-mode');
    toggleButton.textContent = '🌞';
  }
}

// Skift mellem dark og light mode
function toggleMode() {
  document.body.classList.toggle('light-mode');
  const isLightMode = document.body.classList.contains('light-mode');

  if (isLightMode) {
    localStorage.setItem('theme', 'light');
    toggleButton.textContent = '🌚';
  } else {
    localStorage.setItem('theme', 'dark');
    toggleButton.textContent = '🌞';
  }
}

// Eventlistener til knappen
toggleButton.addEventListener('click', toggleMode);

// Initial tilstand ved load
setInitialMode();

