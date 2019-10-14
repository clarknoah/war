

class Player{
  constructor(){
    this.cards = [];
    this.roundsWon = 0;
  }
  addRoundWon(){
    this.roundsWon++;
  }
}

class Card{
  constructor(suit, rank, score){
    this.suit = suit;
    this.rank = rank;
    this.score = score;
  }


}

class Deck{
  constructor(){
    this.cards = [];
    this.createCards();
    this.shuffle();
    this.shuffle();
    this.shuffle();

  }
  createCards(){
    var value = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var suit = ["Spades", "Clubs", "Diamonds", "Hearts"];
    var card = ["2","3","4","5","6","7","8","9","10","Jack","Queen","King","Ace"];
    for(let i = 0, cardVal = 0, suitVal = 0; i<52; i++){
      if(cardVal === 13){
        cardVal = 0;
        suitVal ++;
      }
      var newCard = new Card(suit[suitVal],card[cardVal],value[cardVal]);
      this.cards.push(newCard);
      cardVal++;
    }
  }
  draw(){
    var deckSize = this.cards.length;
    var randomNumber = Math.floor(Math.random()*deckSize);
    return this.cards[randomNumber];
  }
  shuffle(){
    var shuffledDeck = [];
    for(let i = 0; i < 52; i++){
      var deckSize = this.cards.length;
      var randomNumber = Math.floor(Math.random()*deckSize);
      var shuffledCard = this.cards.splice(randomNumber, 1)[0];
      shuffledDeck.push(shuffledCard);
    }
    this.cards = shuffledDeck;
  }
}

class WarGame{
  constructor(numberOfPlayers){
    this.spoilsOfWar = [];
    this.players = [];
    this.deck = new Deck();
    this.warDeclared = false;
    this.warCandidates = [];
    this.activePlayers = [];
    this.activeWarPlayers = [];
    this.inactivePlayers = [];
    this.winnerOfRound = null;
    this.numberOfRounds = 0;
    this.numberOfWars = 0;
    for(let i = 0; i < numberOfPlayers; i++){
      this.createPlayer();
    }
    this.distributeCards();
    this.determineActivePlayers();
  }

  createPlayer(){
    this.players.push(new Player());
  }
  distributeCards(){
    for(let i=0, j=0; i < this.deck.cards.length; i++){
      if(j===this.players.length){
        j=0;
      }
      var card = this.deck.cards[i];
      this.players[j].cards.push(card);
      j++;
    }
  }

  determineActivePlayers(){
    this.activePlayers = [];
    for(let i = 0; i<this.players.length;i++){
      if(this.players[i].cards.length > 0){
        this.activePlayers.push(i);
      }else{
        this.inactivePlayers.push(i);
      }
    }
  }

  removeLosers(removeList){
    //console.log(removeList);
    for(let i = 0; i < removeList.length; i++){
      //console.log("Removing Players");
      this.activePlayers.splice(removeList[i], 1);
    }
  }

  determineActiveWarPlayers(){
    this.activeWarPlayers = [];
    var removePlayers = [];
    for(let i = 0; i < this.warCandidates.length; i++){
      var playerId = this.warCandidates[i];
      var playerHasEnoughCards = this.players[playerId].cards.length >= 4;
      if(playerHasEnoughCards){
        this.activeWarPlayers.push(playerId);
      }else{


        this.spoilsOfWar.push(... this.players[playerId].cards);
        this.players[playerId].cards = [];
        //removePlayers.push(playerId);
      }
    }
    if(this.warCandidates.length === removePlayers.length){
      console.log("Uhh, both players ran out of cards, wtf");
      for(let i = 0; i < this.players.length; i++){


      }
    }

    this.removeLosers(removePlayers);
  }

  compareCards(){
    if(this.warDeclared){
      //console.log(`War Players (declared): ${this.activeWarPlayers.toString()}`)
      this.activePlayers = [];
      this.activePlayers.push(... this.activeWarPlayers);
    }
    this.winnerOfRound = -1;
    var highestCard = -1;
    this.warCandidates = [];
    //console.log(`Active Players: ${this.activePlayers.toString()}`);
    for(let i = 0; i<this.activePlayers.length;i++){
      var playerId = this.activePlayers[i];
      var cardLength = this.players[playerId].cards.length-1;
      var currentCard = this.players[playerId].cards[cardLength];
      var currentCardIsGreater = highestCard < currentCard.score;
      var cardsAreEqual = highestCard === currentCard.score;
      //console.log(`Player ${playerId} has card of score ${currentCard.score}`)
      if(currentCardIsGreater){
        this.winnerOfRound = playerId;
        highestCard = currentCard.score;
        this.warCandidates = [playerId];
        this.warDeclared = false;
      }else if(cardsAreEqual){
        this.warCandidates.push(playerId);
        this.winnerOfRound = null;
        this.warDeclared = true;

      }
    }
    //console.log(`Current highest card: ${highestCard}`);
    //console.log(`War Candidates: ${this.warCandidates}; War Status: ${this.warDeclared}`);
    //console.log(`Winner of round is ${this.winnerOfRound}`);
  }

  conductTurn(){
    this.getPlayerCardCount();


    this.compareCards();
    this.popPlayersLastCard();
    if(this.warDeclared===true){
      this.numberOfWars++;

      this.determineActiveWarPlayers();
      if(this.activeWarPlayers.length > 1){

        this.addSpoilsOfWar();
        this.conductTurn();
      }else if(this.activeWarPlayers.length ===1){
        this.winnerOfRound = this.activeWarPlayers[0];
        this.assignWinnerCards();
        this.finishTurn();
      }else if(this.activeWarPlayers.length === 0){
        console.log(this.warCandidates);
        this.winnerOfRound = parseInt(prompt(`Players ${this.warCandidates.toString()} ran out of cards on war, which should win?`));
        this.assignWinnerCards();
        this.finishTurn();
      }
    }else{
      this.assignWinnerCards();
      this.finishTurn();
    }
  }

  getPlayerCardCount(){
    let totalCards = 0;
    let playerString = '';
      for(let i = 0; i < this.players.length; i++){
        playerString = playerString + `P${i}: ${this.players[i].cards.length}:`+
        `${this.players[i].cards.length > 0 ? this.players[i].cards[this.players[i].cards.length-1].score : -1}|`;
        totalCards += this.players[i].cards.length;
      }
    console.log(playerString);
    if(totalCards !== 52 && this.warDeclared === false){
      console.log(`$$$$$$$$$$$$$$$$$$$$$$$$$  ERRROR FOUND  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`)
      for(let i = 0; i < this.players.length; i++){
        console.log(`Player ${i} has ${this.players[i].cards.length} left`);
      }
    }
  }

  popPlayersLastCard(){
    for(let i = 0; i< this.activePlayers.length; i++){
      var playerId = this.activePlayers[i];

      var lastCard = this.players[playerId].cards.pop();
      this.spoilsOfWar.push(lastCard);
    }
  }

  addSpoilsOfWar(){
    //console.log("Running Add Spoils");
    //console.log(this.spoilsOfWar.length);
    for(let i = 0; i < this.activeWarPlayers.length; i++){
      var playerId = this.activeWarPlayers[i];
      var positionToRemove = this.players[playerId].cards.length - 3;
      //console.log(`Player ${playerId} Length before: ${this.players[playerId].cards.length}`);
      var warSpoils = this.players[playerId].cards.splice(positionToRemove, 3);
      this.spoilsOfWar.push(... warSpoils);
      //console.log(`Player ${playerId} Length after: ${this.players[playerId].cards.length}`);
    }
    //console.log(this.spoilsOfWar.length);
  }

  receiveSpoilsOfWar(){
    this.warDeclared = false;
    //console.log(`Spoils before distribution: ${this.spoilsOfWar.length}`);
    this.players[this.winnerOfRound].cards.unshift(... this.spoilsOfWar);
    this.spoilsOfWar = [];
  }

  determineWinner(){}

  assignWinnerCards(){
    this.receiveSpoilsOfWar();
    this.players[this.winnerOfRound].addRoundWon();

  }

  finishTurn(){
    this.determineActivePlayers();
    this.numberOfRounds++;
    if(this.activePlayers.length === 1){

      this.endGame();
    }else if(this.activePlayers.length > 1){
      this.winnerOfRound = null;
      this.activeWarPlayers = [];
      this.warDeclared = false;
      this.warCandidates = [];

      console.log(`------------------ New Turn -----------------------`)
      this.conductTurn();
    }
  }
  endGame(){
    console.log(`------------ Game Ends ---------------`);
    console.log(`Number of Rounds: ${this.numberOfRounds}`);
    console.log(`Number of Wars: ${this.numberOfWars}`);
    console.log(`Game Winner: Player ${this.winnerOfRound}`);
    let totalRounds = 0;
    for(let i = 0; i < this.players.length; i++){
      totalRounds += this.players[i].roundsWon;
      console.log(`P${i} won ${this.players[i].roundsWon}`);
    }
    console.log(`Player Rounds: ${totalRounds}, Total Rounds: ${this.numberOfRounds}`);
    console.log(`------------ Game Ends ---------------`);
  }
}

var war = new WarGame(10);
war.conductTurn();
