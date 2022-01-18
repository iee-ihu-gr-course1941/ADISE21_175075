# ADISE21_175075

### Play the game here! https://users.it.teithe.gr/~it175075/

## Card game called Moutzouris

- ## **Target of the game**
   The object of the game is to run out of cards. The one who will be left with a card is the loser.

- ## **Preparation**
   Before you start, remove all the figures from the deck and hold only Riga Bastouni.

- ## **Game process**
   After mixing well, we deal the whole deck to the players so that they all have the same number of cards (or + - 1). Each player removes from the cards he has in his hands the pairs, that is, 2 Aces 2 doubles 2 threes etc. We hold the rest in our hands like fans so that the other child can choose, without seeing them, one of them. The first player draws a card from the one sitting to his left, if he pairs the new card with some of his own then he throws them, otherwise he holds them and the reason is on his right. Whoever pairs all his cards leaves the game. Whoever stays last with King of Spades (Moutzouris) in his hand is the loser, and the other players decide his penalty. 

# **Ρequirements**
- Apache 2
- Mysql Server
- php

# **Installation instructions**
Clone the project to a folder
$ git clone https://github.com/iee-ihu-gr-course1941/ADISE_175075

Make sure the folder is accessible from Apache Server. you may need to specify the following settings.

You need to create the database named 'database' in Mysql and upload the data from the schema.sql file to this database

## **Database description**
## **clients**
 Table clients for keeping information for the players.
   | Attribute  | Description | Values |
   | --- | --- | --- |
   | client_id  | unique id for every client (Primary key)  | varchar(13)  |
   | time  | the time the connection was made   | current_timestamp()  |
   | state  | saves his status  | enum('initializing', 'ready', 'inGame')  |
   
## **game**
 Table game for keeping information for the games.
   | Attribute  | Description | Values |
   | --- | --- | --- |
   | game_id  | unique id for every game (Primary key)  | varchar(13)  |
   | client_1  | first player (Index)   | varchar(13)  |
   | client_2  | second player (Index)  | varchar(13)  |
   | isOver  | saves if the game is over  | tinyint(1)  |
   | turn  | 1 if is the turn for first player to play, else 2  | enum('1', '2')  |
   | last_move  |  time of the last move  | current_timestamp()  |
   
## **cards** 
 Table cards for keeping information for the cards for each player and game.
   | Attribute  | Description | Values |
   | --- | --- | --- |
   | game_id  | unique id for every client (Primary key)  | varchar(13)  |
   | client_id  | the time the connection was made   | current_timestamp()  |
   | num  | number of the card  | tinyint  |
   | suit  | suit of the card  | enum('S', 'H', 'D', 'C')  |
   | burned  | if the card is no longer playable  | tinyint(1)  |
   
   # **API**
   ## **Methods**
   ```
   GET /client/
   ```
   >returns clients informations
   ```
   GET /all-clients/
   ```
   >returns all clients with all the informations
   ```
   POST /create-client/
   ```
   >create client
   ```
   POST /create-game/
   ```
   >create the game
   ```
   POST /isGameReady/
   ```
   >return if the game is ready
   ```
   GET /isGameExist/
   ```
   >return if a game exist
   ```
   POST /connectSecondPlayer/
   ```
   >put second player in the game
   ```
   POST /cardSharing/
   ```
   >create a deck of cards
   ```
   POST /getTurn/
   ```
   >returns whose turn it is to play
   ```
   POST /sendCards/
   ```
   >sends the cards to the player
   ```
   POST /getEnemy/
   ```
   >returns the number of enemies cards
   ```
   POST /pickedCard/
   ```
   >returns the picked card
   ```
   POST /changeTurn/
   ```
   >change the turn
   ```
   POST /removeCards/
   ```
   >removes the same cards from the players hand
   
   
   
   
