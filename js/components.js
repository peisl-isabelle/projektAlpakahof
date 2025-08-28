// Funktion zum Laden der HTML-Komponenten in die Seite
function loadComponent(url, containerId) {
    return fetch(url) // Abruf der Datei
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Inhalt der HTML-Datei als Text zurückgeben
      })
      .then(html => {
        // HTML-Code in gewünschtes Container-Element einfügen
        document.getElementById(containerId).innerHTML = html;
      })
      .catch(err => console.error('Error loading component:', err)); // Fehlermeldung ausgeben
  }
  
  // Sobald DOM-Struktur geladen ist
  document.addEventListener('DOMContentLoaded', function() {
    // Navigation und Footer laden
    Promise.all([
      loadComponent('components/navigation.html', 'navigation-container'),
      loadComponent('components/footer.html', 'footer-container')
    ])
    .then(() => {
      console.log('Components loaded successfully'); //Erfolgsmeldung
      // Event auslösen, signalisiert, dass alle Komponenten geladen wurden
      document.dispatchEvent(new Event('componentsLoaded'));
    });
  });
  