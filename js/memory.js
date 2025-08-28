// Definition der Alpaka-Daten
const alpakas = [
    { name: "Luna", age: 5, food: "Karotten", img: "assets/img/luna.jpg" },
    { name: "Oskar", age: 7, food: "Äpfel", img: "assets/img/oskar.jpg" },
    { name: "Bella", age: 4, food: "Heu", img: "assets/img/bella.jpg" },
    { name: "Max", age: 6, food: "Gras", img: "assets/img/max.jpg" }
];

// Karten für das Memory-Spiel erzeugen (Foto + Info)
let cards = [];
alpakas.forEach(alpaka => {
    // Bild-Karte
    cards.push({
        type: "image",
        alpaka: alpaka.name,
        content: `<img src="${alpaka.img}" alt="${alpaka.name}" class="w-full h-full object-cover rounded-lg">`
    });
    // Info-Karte
    cards.push({
        type: "info",
        alpaka: alpaka.name,
        content: `<div class="p-2 text-center" style="font-size:clamp(0.6rem,2.5vw,1rem); line-height:1.2;">
                  <p class="font-bold">${alpaka.name}</p>
                  <p>${alpaka.age} Jahre</p>
                  <p>Mag: ${alpaka.food}</p>
                </div>`
    });
});

// Karten mischen
cards = cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById("memory-game"); // Container für das Spiel
const status = document.getElementById("memory-status"); // Anzeige für den Spielfortschritt

let firstCard = null; // erste aufgedeckte Karte
let lockBoard = false; // verhindert gleichzeitiges Klicken
let matches = 0; // Zähler für erfolgreich gefundene Paare

// Karten ins Grid einfügen
cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className =
        "card relative bg-white rounded-xl shadow-lg cursor-pointer flex items-center justify-center aspect-square";

    // Datenattribute für den Vergleich
    cardElement.dataset.alpaka = card.alpaka;
    cardElement.dataset.type = card.type;
    cardElement.dataset.index = index;

    // Vorderseite mit Bild oder Info
    const front = document.createElement("div");
    front.className =
        "absolute inset-0 flex items-center justify-center bg-white rounded-lg shadow hidden front p-1 text-center";
    front.setAttribute("style", "font-size:clamp(0.6rem,2.5vw,1rem); line-height:1.2;");
    front.innerHTML = card.content;

    // Rückseite mit Logo
    const back = document.createElement("div");
    back.className =
        "absolute inset-0 flex items-center justify-center bg-[#6B8F71] rounded-lg shadow back";
    back.innerHTML = `<img src="assets/illustrations/logo_memory.svg" alt="Hof Logo" class="w-2/3 h-2/3 object-contain">`;

    cardElement.appendChild(front);
    cardElement.appendChild(back);

    // Klick-Event, um Karte umzudrehen
    cardElement.addEventListener("click", () => flipCard(cardElement));

    gameBoard.appendChild(cardElement); // Karte in Spielfeld einfügen
});

// Funktion, um Karten umzudrehen und zu vergleichen
function flipCard(cardElement) {
    if (lockBoard) return; // kein weiteres Drehen möglich
    if (cardElement.classList.contains("flipped")) return; // Karte bereits umgedreht

    // Umschalten: Rückseite ausblenden, Vorderseite anzeigen
    cardElement.querySelector(".front").classList.remove("hidden");
    cardElement.querySelector(".back").classList.add("hidden");
    cardElement.classList.add("flipped");

    if (!firstCard) {
        firstCard = cardElement; // merkt sich die erste Karte
        return;
    }

    // Vergleich, ob Karten zusammenpassen
    if (
        firstCard.dataset.alpaka === cardElement.dataset.alpaka &&
        firstCard.dataset.type !== cardElement.dataset.type
    ) {
        // passendes Kartenpaar gefunden
        matches++;
        firstCard = null;
        if (matches === alpakas.length) {
            status.innerText = "🎉 Glückwunsch, du kennst alle Alpakas!";
        }
    } else {
        // Kein Match, beide Karten nach kurzer Zeit wieder umdrehen
        lockBoard = true;
        setTimeout(() => {
            firstCard.querySelector(".front").classList.add("hidden");
            firstCard.querySelector(".back").classList.remove("hidden");
            firstCard.classList.remove("flipped");

            cardElement.querySelector(".front").classList.add("hidden");
            cardElement.querySelector(".back").classList.remove("hidden");
            cardElement.classList.remove("flipped");

            firstCard = null;
            lockBoard = false;
        }, 1000);
    }
}
