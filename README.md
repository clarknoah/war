# War
Welcome to my Javascript War game!

This game is separated into four different classes:

## Player Class
The player class is responsible for holding the cards the player has in the `Player.cards` array.

This class also has `Player.addRoundWon` to count how many times player wins a round.

## Card Class
This class simply holds three properties for the Card class, which determines suit, rank, and the score of the card.

## Deck Class
The `Deck` class is responsible for creating a shuffled card deck upon instantiation.


## WarGame Class
The `WarGame` class is responsible for manipulating the other three classes, and contains all of the game logic. Upon instantiation, the `WarGame` class accepts a number of players in the constructor, and creates that many players for the game, then distributes the cards and assigns the variable `activePlayers` which is designed to keep track of which player still have cards to play with.

The `WarGame.conductTurn()` function is responsible for handling all of the control flow logic.

# How Play Game

> git clone https://github.com/clarknoah/war.git

> Open `index.html`

> Open browser console and type: `var war = new WarGame(numberOfPlayers);`

> Run function `war.conductTurn();`
