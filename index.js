(() => {
  ("use strict");

  const get = (element) => document.querySelector(element);

  class GameData {
    constructor() {
      this.$board = get(".board");
      this.$scores = get(".scores");
      this.$moves = get(".moves");
      this.$limit = get(".limit");
      this.cards = [
        "star",
        "paper-plane",
        "snowflake",
        "thumbs-up",
        "user",
        "lemon",
        "heart",
        "bell",
        "moon",
        "sun"
      ];
      this.cardList = this.setCards([...this.cards, ...this.cards]);
      this.moves = 0; // 이동횟수
      this.scores = 0; // 점수
      this.limit = 50; // 횟수제한
      this.total = this.cards.length;
      this.current = [];
    }

    setCards(cardlist) {
      for (let index = 0; index < cardlist.length; index++) {
        // 피셔-예이츠 셔플(Fisher-Yates shuffle) 활용
        // 무작위 index 값 (0 이상의 배열 길이 값)
        const randomPosition = Math.floor(Math.random() * (index + 1));

        // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
        const temp = cardlist[index];
        cardlist[index] = cardlist[randomPosition];
        cardlist[randomPosition] = temp;
      }
      return cardlist;
    }

    getCards() {
      return this.cardList;
    }

    addMove() {
      return this.moves++;
    }

    addScore() {
      return this.scores++;
    }

    updatePoint() {
      this.$scores.textContent = this.scores;
      this.$moves.textContent = this.moves;
    }

    resetPoint() {
      this.$scores.textContent = 0;
      this.$moves.textContent = 0;
    }

    resetGame() {
      this.setCards(this.cardList); // 다시 shuffle
      this.moves = 0; // 이동횟수
      this.scores = 0; // 점수
      this.limit = 50; // 횟수제한
      this.$limit.textContent = this.limit;
      this.total = this.cards.length;
    }

    setGame() {
      this.$board.innerHTML = "";
      let temp = document.createDocumentFragment();
      for (let index = 0; index < this.getCards().length; index++) {
        let card = document.createElement("li");
        let front = document.createElement("span");
        let icon = document.createElement("i");
        card.classList.add("card");
        front.classList.add("front");
        icon.setAttribute("class", `icon far fa-${this.getCards()[index]}`);
 
        card.appendChild(front);
        card.appendChild(icon);
        temp.appendChild(card);
      }
      this.$board.append(temp);
    }

    isEnd() {
      if (this.scores === this.total) {
        return "win";
      }
      if (this.limit < this.moves) {
        return "defeat";
      }
    }
  }
  // end of class

  const checkCard = (cards) => {
    game.current = [];
    if ("defeat" === game.isEnd()) {
      alert("패배!");
      setTimeout(() => {
        game.resetGame();
        game.resetPoint();
        game.setGame();
      }, 1000 * 1);
    }
    if (cards[0].children[1].className !== cards[1].children[1].className) {
      closeCards(cards);
      return;
    }
    game.addScore();
    game.updatePoint();
    correctCards(cards);
    if ("win" === game.isEnd()) {
      alert("승리!");
    }
  };

  const correctCards = (cards) => {
    // 요소 순회하며 match class 추가
    cards.forEach(($element) => {
      $element.classList.add("match");
    });
  };

  const closeCards = (cards) =>
    cards.forEach(($element) => {
      $element.classList.add("notmatch");
      setTimeout(() => {
        $element.setAttribute("class", "card");
      }, 1000 * 0.5);
    });

  const startGame = (event) => {
    event.target.textContent = "다시 시작";
    game.current = [];
    game.resetGame();
    game.resetPoint();
    game.setGame();
  };

  const playGame = (event) => {
    let $target = event.target;
    if (!$target.classList.contains("card")) {
      return;
    }
    $target.classList.add("flip");
    game.current.push($target);
    game.addMove();
    game.updatePoint();
    $target.removeEventListener("click", playGame, false);
    if (game.current.length < 2) {
      return;
    }
    checkCard(game.current);
  };

  const game = new GameData();
  get(".js-play").addEventListener("click", startGame);
  game.$limit.textContent = game.limit;
  game.$board.addEventListener("click", playGame);
})();
