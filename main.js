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
    this.cards = this.createCards();
    this.shuffle();
    this.shuffle();
    this.shuffle();

  }
  createCards(){
    var cards = [];
    var value = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var suit = ["Spades", "Clubs", "Diamonds", "Hearts"];
    var card = ["2","3","4","5","6","7","8","9","10","Jack","Queen","King","Ace"];
    for(let i = 0, cardVal = 0, suitVal = 0; i<52; i++){
      if(cardVal === 13){
        cardVal = 0;
        suitVal ++;
      }
      var newCard = new Card(suit[suitVal],card[cardVal],value[cardVal]);
      cards.push(newCard);
      cardVal++;
    }
    return cards;
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
  constructor(numberOfPlayers, runWholeGame = false){
    console.log(`%%%%%%%%%%%%% THE GAME OF WAR HAS BEGUN: FIRST TURN %%%%%%%%%%%%%%%%%%%%%%%%%`);
    console.log("Below is a key display what contents are displayed each turn")
    console.log(`P<player index>:<length of player's deck>:<score of card>:<rank and suit>|`)
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
    this.runWholeGame = runWholeGame;
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

    if(this.warDeclared){
      this.numberOfWars++;

      this.determineActiveWarPlayers();
      let thereAreEnoughPlayersForWar = this.activeWarPlayers.length > 1;
      let thereIsOnlyOnePlayerForWar = this.activeWarPlayers.length === 1;
      let thereAreNoWarPlayersForWar = this.activeWarPlayers.length === 0;
      if(thereAreEnoughPlayersForWar){
        this.addSpoilsOfWar();
        this.conductTurn();

      }else if(thereIsOnlyOnePlayerForWar){
        this.winnerOfRound = this.activeWarPlayers[0];
        this.assignWinnerCards();
        this.finishTurn();
      }else if(thereAreNoPlayersForWar){
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

  getPlayerStats(){
    let playerString = "";
    let totalCards;
    for(let i = 0; i < this.players.length; i++){
      playerString = playerString + `\nP${i}: ${this.players[i].cards.length}:`+
      `${this.players[i].cards.length > 0 ? this.players[i].cards[this.players[i].cards.length-1].score+":"+
      this.players[i].cards[this.players[i].cards.length-1].rank+" of "+
      this.players[i].cards[this.players[i].cards.length-1].suit : "No Cards"}|`;
      totalCards += this.players[i].cards.length;
    }
    return playerString;
  }

  getCardsLength(){
    let playerString = "";
    let totalCards;
    for(let i = 0; i < this.players.length; i++){
      playerString = playerString + `\nP${i} Cards: ${this.players[i].cards.length}`;
    }
    return playerString;
  }

  getWarPlayerStats(){
    let playerString = '';
    let totalCards;
    for(let i = 0; i < this.activeWarPlayers.length; i++){

      playerString = playerString + `\nP${this.activeWarPlayers[i]}: ${this.players[this.activeWarPlayers[i]].cards.length}:`+
      `${this.players[this.activeWarPlayers[i]].cards.length > 0 ? this.players[this.activeWarPlayers[i]].cards[this.players[this.activeWarPlayers[i]].cards.length-1].score+": "+
      this.players[this.activeWarPlayers[i]].cards[this.players[this.activeWarPlayers[i]].cards.length-1].rank+" of "+
      this.players[this.activeWarPlayers[i]].cards[this.players[this.activeWarPlayers[i]].cards.length-1].suit : "No Cards"}|`;
      totalCards += this.players[this.activeWarPlayers[i]].cards.length;
    }
    return playerString;
  }

  getPlayerCardCount(){
    let totalCards = 52;
    let playerString = '';

    if(!this.warDeclared){
      console.log(this.getPlayerStats());
    }else{
      console.log("War Round");
      console.log(this.getWarPlayerStats());
    }
    let thereAreNot52Cards = totalCards !== 52 && this.warDeclared === false;
    if(thereAreNot52Cards){
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
    let onlyOnePlayerHasCards = this.activePlayers.length === 1;
    let multiplePlayersHaveCards = this.activePlayers.length > 1;
    console.log(`Winner of Round is Player: ${this.winnerOfRound}`);
    console.log("Cards at end of Turn");
    console.log(this.getCardsLength());
    if(onlyOnePlayerHasCards){

      this.endGame();
    }else if(multiplePlayersHaveCards){
      this.winnerOfRound = null;
      this.activeWarPlayers = [];
      this.warDeclared = false;
      this.warCandidates = [];

      console.log(`------------------ New Turn -----------------------`)
      if(this.runWholeGame){
        this.conductTurn();
      }
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

function runGame(players){
  var war = new WarGame(players, true);
  war.runwholeGame = true;
  war.conductTurn();
}
