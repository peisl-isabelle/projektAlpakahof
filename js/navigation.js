// abwarten, bis Komponenten Navigation und Footer geladen wurden
document.addEventListener('componentsLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle'); // Hamburger-Button
    const navMenu = document.querySelector('.nav-menu'); // Container für Menü
  
    if (menuToggle && navMenu) {
        // Hamburger Menü mit Klick auf Button ein- oder ausblenden
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('hidden');
        });
    } else {
        console.error("Hamburger button or navigation menu not found."); // Fehlermeldung
    }
  
  });