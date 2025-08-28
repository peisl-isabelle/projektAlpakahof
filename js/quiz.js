// Quiz-Fragen Antworten und richtige Lösungswortbuchstaben
const quizData = [
  {
    question: "Seit wann gibt es unseren Alpakahof?",
    answers: ["2003", "1964", "1925", "1994"],
    correct: 2, // Index der richtigen Antwort
    letter: "H" // Lösungswortbuchstabe
  },
  {
    question: "Wie kamen die ersten Alpakas auf den Hof?",
    answers: ["Ein Geschenk von Freunden", "Durch Inspiration auf einer Südamerika-Reise", "Durch einen Zufallskauf auf einem Markt", "Weil ein Nachbar Alpakas abgeben wollte"],
    correct: 1,
    letter: "O"
  },
  {
    question: "Wie hießen die ersten Alpakas auf dem Hof?",
    answers: ["Timon und Pumba", "Susi und Strolch", "Pablo und Julia", "Anna und Paul"],
    correct: 2,
    letter: "F"
  },
  {
    question: "Was kannst du NICHT bei uns im Hofladen kaufen?",
    answers: ["Tiefkühlgerichte", "Produkte aus Alpakawolle", "Frisches Gemüse", "Marmeladen"],
    correct: 0,
    letter: "L"
  },
  {
    question: "Was ist uns bei der Arbeit im Café besonders wichtig?",
    answers: ["Schnelle Bedienung", "Regionale Bio-Zutaten", "Vegane Ersatzprodukte", "Internationale Küche"],
    correct: 1,
    letter: "I"
  },
  {
    question: "Wer hilft alles auf unserem Hof mit?",
    answers: ["Nur die Eltern", "Nur unsere Angestellten", "Ein externer Dienstleister", "Die ganze Familie, auch die allerkleinsten"],
    correct: 3,
    letter: "E"
  },
  {
    question: "Was ist unser großer Traum für die Zukunft?",
    answers: ["Eine Oase der Ruhe und Nachhaltigkeit schaffen", "Eine große Alpakafarm mit 100 Tieren", "Die Produktion von Kleidung aus kuschliger Alpakawolle", "Der Export von Alpakaprodukten"],
    correct: 0,
    letter: "B"
  },
  {
    question: "Was beschreibt die Philosophie unseres Hofs am besten?",
    answers: ["Tourismus und Erlebnis", "Export hochwertiger Wolle", "Gewinnsteigerung", "Nachhaltigkeit und respektvoller Umgang mit den Tieren"],
    correct: 3,
    letter: "E"
  }
];

let current = 0; // Index aktuelle Frage
let selectedAnswers = []; // Array für die gewählten Antworten

// Aktuelle Frage laden
function loadQuestion() {
  const q = quizData[current];
  document.getElementById("question").textContent = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  // Erzeugen der Antwort-Buttons
  q.answers.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.className =
      "answer-btn block w-full text-left px-4 py-2 rounded border border-[#D6CBB5] bg-[#F9F7F1] hover:bg-[#CBAF87]/20 transition";
    btn.dataset.index = i;

    // Auswahl wird per Klick gespeichert und optisch hervorgehoben
    btn.onclick = () => {
      selectedAnswers[current] = i;
      updateSelectedStyle();
    };
    answersDiv.appendChild(btn);
  });

  updateSelectedStyle();
}

// Hervorheben der gewählten Antwort
function updateSelectedStyle() {
  const selected = selectedAnswers[current];
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((btn) => {
    const index = parseInt(btn.dataset.index);
    if (index === selected) {
      btn.classList.add("bg-[#CBAF87]", "font-bold", "text-white");
    } else {
      btn.classList.remove("bg-[#CBAF87]", "font-bold", "text-white");
    }
  });
}

// Anzeigen der nächsten Frage oder des Ergebnisses per Klick auf Weiter-Button
function nextQuestion() {
  if (selectedAnswers[current] === undefined) {
    alert("Bitte wähle eine Antwort.");
    return;
  }

  current++;

  if (current < quizData.length) {
    loadQuestion();
  } else {
    showSolution();
  }
}

// Ergebnise anzeigen
function showSolution() {
  // Buchstaben für korrekte Fragen sammeln
  const letters = quizData.map((q, i) =>
    selectedAnswers[i] === q.correct ? q.letter : "_"
  );

  const allCorrect = !letters.includes("_"); // Prüfen, ob alles korrekt beantwortet wurde

  let html = `
    <h2 class="text-2xl font-bold mb-4">Danke fürs Mitmachen!</h2>
    <p class="text-lg">Dein Lösungswort lautet:</p>
    <p class="mt-2 text-3xl font-mono tracking-widest text-[#6B8F71]">${letters.join('')}</p>
    <p class="mt-4">Mit dem richtigen Lösungswort erhältst du in unserem Jubiläumsmonat ein gratis Heißgetränk im Hofcafé. Einlösbar nur einmal pro Person.</p>
  `;

  if (allCorrect) {
    html += `<p class="mt-4 text-green-700 font-semibold">Super! Alles richtig!</p>`;
  } else {
    html += `
      <p class="mt-4 text-red-700">Nicht ganz korrekt – du kannst es nochmal versuchen.</p>
      <button onclick="restartQuiz()" class="mt-6 px-4 py-2 bg-[#D6CBB5] hover:bg-[#CBAF87] text-[#4B4136] rounded">
        Versuch's nochmal
      </button>
    `;
  }

  document.getElementById("quiz").innerHTML = html;
}

// Neustarten
function restartQuiz() {
  current = 0;
  selectedAnswers = [];
  document.getElementById("quiz").innerHTML = `
    <div id="question" class="text-lg sm:text-xl font-semibold mb-4"></div>
    <div id="answers" class="space-y-2"></div>
    <button onclick="nextQuestion()" class="mt-6 w-full sm:w-auto px-4 py-2 bg-[#6B8F71] text-white rounded hover:bg-[#AFC1A2] transition">
      Weiter
    </button>
  `;
  loadQuestion();
}

// Quiz initial laden
loadQuestion();