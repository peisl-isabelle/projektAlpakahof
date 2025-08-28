// vollständiges Laden der DOM-Struktur abwarten
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".kontakt-box form"); // Kontaktformular auswählen

    // Event-Listener für das Absenden
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Verhindern, dass Standard-Formular abgesendet wird

        // Werte auslesen und trimmen
        const name = form.elements["name"].value.trim();
        const email = form.elements["email"].value.trim();
        const nachricht = form.elements["nachricht"].value.trim();

        // Validierung, ob alle Felder ausgefüllt sind
        if (!name || !email || !nachricht) {
            alert("Bitte fülle alle Felder aus."); // Fehlermeldung anzeigen
            return;
        }

        // Betreff und Nachricht für Mail vorbereiten
        const subject = "Nachricht von " + name;
        const body = nachricht;

        // Lokales Mailprogramm öffnen und mit Werten füllen
        window.location.href = "mailto:isabelle.peisl@iu-study.org" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);
    });
});
