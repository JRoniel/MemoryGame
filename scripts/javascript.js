const cardImages = ["A.jpg", "B.jpg", "C.jpg", "D.jpg", "E.jpg", "F.jpg", "A.jpg", "B.jpg", "C.jpg", "D.jpg", "E.jpg", "F.jpg"];
let flippedCards = [];
let matchedCards = [];
let moveCount = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createGameBoard() {
  shuffle(cardImages);
  const gameBoard = document.getElementById("game-board");

  for (let i = 0; i < cardImages.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardImage = document.createElement("img");
    cardImage.src = "./images/blank.jpg"; // Use uma imagem em branco ou de fundo vazio
    cardImage.alt = "Card";
    card.appendChild(cardImage);
    card.dataset.cardValue = cardImages[i]; // Armazene o valor da carta nos dados do elemento
    card.addEventListener("click", flipCard);
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

function flipCard() {
  if (!this.classList.contains("flipped") && flippedCards.length < 2) {
    this.classList.add("flipped");
    const cardImage = this.querySelector("img");
    cardImage.src = "./images/" + this.dataset.cardValue; // Revele a imagem ao clicar

    flippedCards.push(this);

    if (flippedCards.length === 2) {
      const card1Value = flippedCards[0].dataset.cardValue;
      const card2Value = flippedCards[1].dataset.cardValue;

      if (card1Value === card2Value) {
        matchedCards.push(flippedCards[0], flippedCards[1]);
        flippedCards = [];

        // Verifique se o jogador ganhou e mostre o alerta
        if (matchedCards.length === cardImages.length) {
          showWinAlert();
        }
      } else {
        setTimeout(() => {
          flippedCards[0].classList.remove("flipped");
          flippedCards[1].classList.remove("flipped");
          // Oculte as imagens novamente
          flippedCards[0].querySelector("img").src = "./images/blank.jpg";
          flippedCards[1].querySelector("img").src = "./images/blank.jpg";
          flippedCards = [];
        }, 1000);
      }
      moveCount++;
      document.getElementById("move-counter").textContent = moveCount;
    }
  }
}

function showWinAlert() {
  alert("Parabéns! Você ganhou!");
}

function reloadGame() {
  // Limpa o tabuleiro
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  moveCount = 0;
  document.getElementById("move-counter").textContent = moveCount;

  // Cria um novo tabuleiro
  createGameBoard();
  openPopup();
}

createGameBoard();
