// "Zurück nach oben"-Button
const backToTopBtn = document.getElementById("backToTop");

// Event Listener für Scroll-Ereignis, Button nur sichtbar, wenn mehr als 300px gescrollt wurde
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove("hidden"); // Button einblenden
    } else {
        backToTopBtn.classList.add("hidden"); // Button ausblenden
    }
});

// Event Listener für Klick auf den Button, scrollt Seite nach oben
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});