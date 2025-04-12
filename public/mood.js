window.onload = function () {
    const emojis = ['🌸', '🍫', '🛀', '🧸', '🍕', '🎧', '☕', '📖'];
    const gameBoard = document.getElementById("memory-game");
    const completionMessage = document.getElementById("completion-message");
  
    let cards = [];
    let flippedCards = [];
    let matchedCount = 0;
    let turnCount = 0;
  
    function createBoard() {
      const emojiPairs = [...emojis, ...emojis]; // make pairs
      emojiPairs.sort(() => 0.5 - Math.random()); // shuffle
  
      emojiPairs.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.textContent = "❔";
        card.addEventListener("click", handleFlip);
        cards.push(card);
        gameBoard.appendChild(card);
      });
    }
  
    function handleFlip(e) {
      const card = e.currentTarget;
  
      if (flippedCards.includes(card) || card.classList.contains("matched")) return;
  
      card.textContent = card.dataset.emoji;
      card.classList.add("flipped");
      flippedCards.push(card);
  
      if (flippedCards.length === 2) {
        turnCount++;
        setTimeout(checkMatch, 700);
      }
    }
  
    function checkMatch() {
      const [card1, card2] = flippedCards;
  
      if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCount += 2;
      } else {
        card1.textContent = "❔";
        card2.textContent = "❔";
      }
  
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
  
      if (matchedCount === emojis.length * 2) {
        showCompletionMessage();
      }
    }
  
    function showCompletionMessage() {
      let feedback = "";
  
      if (turnCount <= 12) {
        feedback = "Wow, you completed it quickly! 🌟";
      } else if (turnCount <= 18) {
        feedback = "You're doing great 💖";
      } else {
        feedback = "You completed it in " + turnCount + " turns. Try for better next time! 💪";
      }
  
      completionMessage.innerHTML = `
        <strong>Yay! You did it! 🎉</strong><br>
        You matched all pairs in <strong>${turnCount}</strong> turns.<br>
        ${feedback}
      `;
      completionMessage.style.display = "block";
    }
  
    createBoard();
  };
  