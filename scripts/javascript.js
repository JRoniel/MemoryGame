const cardImages = ["A.png", "B.png", "C.png", "D.png", "E.png", "F.png", "A.png", "B.png", "C.png", "D.png", "E.png", "F.png"];
const cardNames = {
  "A.png": "Bruce",
  "B.png": "Docinho",
  "C.png": "Kahleesi",
  "D.png": "Cleitin",
  "E.png": "Naruto",
  "F.png": "Bob Marley"
};

let flippedCards = [];
let matchedCards = [];
let moveCount = 0;
let gameStarted = false;
let timerInterval;
let seconds = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCardElement(cardValue) {
  const card = document.createElement("div");
  card.classList.add("card");
  const cardImage = document.createElement("img");
  cardImage.src = "./images/blank.jpg"; // Use uma imagem em branco ou de fundo vazio
  cardImage.alt = "Card";
  card.appendChild(cardImage);
  card.dataset.cardValue = cardValue; // Armazene o valor da carta nos dados do elemento
  card.addEventListener("click", flipCard);
  return card;
}

function startGame() {
  shuffle(cardImages);
  createGameBoard();
}

function startTimer() {
  timerInterval = setInterval(function () {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    document.getElementById("timer").textContent = `${minutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function flipCard() {
  if (!gameStarted) {
    startTimer();
    gameStarted = true;
  }

  const card = this;

  if (!card.classList.contains("flipped") && flippedCards.length < 2) {
    setTimeout(() => {
      card.classList.remove("flipping");
      card.classList.add("flipped");
      const cardImage = card.querySelector("img");
      cardImage.src = `./images/${card.dataset.cardValue}`; // Revele a imagem após a animação
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        const card1Value = card1.dataset.cardValue;
        const card2Value = card2.dataset.cardValue;

        if (card1Value === card2Value) {
          matchedCards.push(card1, card2);
          flippedCards = [];

          const cardName = cardNames[card1Value];
          if (cardName) {
            showCardFoundText(cardName);
          }

          if (matchedCards.length === cardImages.length) {
            showWinAlert();
          }
        } else {
          setTimeout(() => {
            flippedCards.forEach(card => {
              card.classList.remove("flipped");
              card.querySelector("img").src = "./images/blank.jpg";
            });
            flippedCards = [];
          }, 1000); // Reduzido para 500ms
        }
        moveCount++;
        document.getElementById("move-counter").textContent = moveCount;
      }
    }, 100); // Reduzido para 500ms
  }
}


function showCardFoundText(cardName) {
  const cardFoundDiv = document.getElementById("card-found-text");
  cardFoundDiv.style.display = "block"; // Exibe o elemento
  cardFoundDiv.textContent = `Você encontrou ${cardName}`;
  setTimeout(() => {
    cardFoundDiv.style.display = "none"; // Oculta o elemento após alguns segundos
    cardFoundDiv.textContent = "";
  }, 5000); // Remove o texto após 5 segundos (ajuste conforme necessário)
}

function showWinAlert() {
  const winText = "Parabéns! Você ganhou, clique em (recarregar)";
  const cardFoundDiv = document.getElementById("card-found-text");
  cardFoundDiv.style.display = "block"; // Exibe o elemento
  cardFoundDiv.textContent = winText;
  stopTimer();
}

function createGameBoard() {
  const gameBoard = document.getElementById("game-board");

  for (let i = 0; i < cardImages.length; i++) {
    const card = createCardElement(cardImages[i]);
    gameBoard.appendChild(card);
  }
}

function openPopup() {
  const popup = document.getElementById("imagePopup");
  popup.style.display = "block";
}

function closePopup(event) {
  if (event.target.id === "imagePopup") {
    const popup = document.getElementById("imagePopup");
    popup.style.display = "none";
  }
}

function reloadGame() {
  // Limpa o tabuleiro
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  moveCount = 0;
  seconds = 0;
  gameStarted = false;
  document.getElementById("move-counter").textContent = moveCount;
  document.getElementById("timer").textContent = "0:00";
  openPopup();
  startGame(); // Inicia um novo jogo
}

startGame(); // Inicia o jogo
