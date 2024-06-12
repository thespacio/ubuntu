const cardsData = [
    { id: 1, text: "Ubuntu", matchId: 1 },
    { id: 2, text: "Es una distribución de Linux", matchId: 1 },
    { id: 3, text: "Fecha lanzamiento", matchId: 2 },
    { id: 4, text: "Lanzado en 2004", matchId: 2 },
    { id: 5, text: "Característica", matchId: 3 },
    { id: 6, text: "Libre y de código abierto", matchId: 3 },
    { id: 7, text: "Requisitos", matchId: 4 },
    { id: 8, text: "2 GB de RAM", matchId: 4 },
    { id: 9, text: "Significado Ubuntu", matchId: 5 },
    { id: 10, text: "Yo soy porque nosotros somos", matchId: 5 },
    { id: 11, text: "Gestor de Ventanas", matchId: 6 },
    { id: 12, text: "GNOME Shell (predeterminado)", matchId: 6 },
    { id: 13, text: "Ventaja", matchId: 7 },
    { id: 14, text: "Amplia comunidad de soporte", matchId: 7 },
    { id: 15, text: "Herramienta de instalación", matchId: 8 },
    { id: 16, text: "RUFUS", matchId: 8 },
    { id: 17, text: "Fundador Canonical", matchId: 9 },
    { id: 18, text: "Mark Shuttleworth", matchId: 9 },
];
const gameBoard = document.getElementById('game-board');

let flippedCards = [];
let matchedCards = 0;

function createCard(cardData) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = cardData.id;
    card.dataset.matchId = cardData.matchId;
    card.textContent = "?";
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function initializeGame() {
    const shuffledCards = cardsData.sort(() => 0.5 - Math.random());
    shuffledCards.forEach(cardData => {
        const card = createCard(cardData);
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    card.textContent = cardsData.find(c => c.id == card.dataset.id).text;
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.matchId === card2.dataset.matchId) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        if (matchedCards === cardsData.length) {
            alert("¡Felicidades! Has encontrado todas las parejas.");
        }
    } else {
        card1.textContent = "?";
        card2.textContent = "?";
    }
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    flippedCards = [];
}

initializeGame();
