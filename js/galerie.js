// Umschalten der Overlays in der Familiengalerie
function toggleOverlay(button) {
    // Alle Overlays schließen
    document.querySelectorAll('#familie-slider .overlay').forEach(overlay => {
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0');
    });
    // Nur das Overlay der aktuellen Karte öffnen
    const currentOverlay = button.previousElementSibling;
    currentOverlay.classList.remove('opacity-0');
    currentOverlay.classList.add('opacity-100');
}