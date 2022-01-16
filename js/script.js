// Functions and variables to handle connections and communication via server and players.

var id;
var game_id;

function playF(){ // Function for the player to choose if he/she wants to create a game or connect to one
    // create random id and send it to the server 
    id = randomClientId();

    var json = {
        "client_id" : id,
        "playWith": 'F'
    };

    console.log(id);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost/adise/index.html/api/create-client.php', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = function(){
        if(this.status == 200){
            console.log(this.response);
        }
    }
    xhr.send(JSON.stringify(json));

    var butFirst = document.getElementById("first");
    butFirst.style.display ="none";

    var butCreate = document.getElementById("create");
    butCreate.style.display ="block";

    var butConnect = document.getElementById("connect");
    butConnect.style.display ="block";
}


function createGame(){// Function for the first player to create the game.
    // create random game id and send it to the server with the client id.
    // Then this happens, the game id with the client id (first player) are stored to the database.
    
    game_id =  randomGameId();
    var json = {
        "game_id": game_id,
        "client_1" : id
    };

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost/adise/index.html/api/create-game.php', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = function(){
        if(this.status == 200){
            console.log(this.response);
        }
    }
    xhr.send(JSON.stringify(json));


    var title = document.getElementById("gameIdTitle");
    title.style.display = "block";

    var showGameId = document.getElementById("gameId");
    showGameId.innerHTML = game_id;

    var butCreate = document.getElementById("create");
    butCreate.style.display ="none";

    var butConnect = document.getElementById("connect");
    butConnect.style.display ="none";

    var gameStart = document.getElementById("gameStart");
    gameStart.style.display = "block";

    var isReady;    var intervalId = window.setInterval(function(){ // Every 2 seconds send a request to server to see 
                                                    //if a second player is connected to the game.
                                                    // The funcions for this, excpects the game_id and returns if the game is ready to begin.
        var jsonGID = {
            "game_id": game_id
        };

        xhr.open('POST', 'http://localhost/adise/index.html/api/isGameReady.php', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onload = function(){
            if(this.status == 200){
                console.log(this.response);
                isReady = JSON.parse(this.response);
            }
    }
    xhr.send(JSON.stringify(jsonGID));

    if(isReady.message === "ready"){     // if the second player is connected stop the interval and ask the server to give you your cards.
        clearInterval(intervalId);
        document.getElementById("gameStart").innerHTML = "Το παιχνίδι ξεκίνησε!";
        hideElements();
    }

    }, 1000);
}

function hideElements(){
    // if a seccond player is connected send the cards to client
    var hideFrom = document.getElementById("Form");
    hideFrom.style.display = "none";

    var hideTitle = document.getElementById("insertCode");
    hideTitle.style.display = "none";

    var form = document.getElementById("inp");
    form.style.display ="block";

    startGame(id, game_id, 1);
    
}

function connectToGame(){ // Function for the seccond player to connect to the game
                          // First, take the input, then check if match with a game_id from the database.
    var game_idFromForm = document.getElementById('form').value;
    var games;
    var status;

    var xhr = new XMLHttpRequest();
    if(game_idFromForm != ''){
        xhr.open('GET', 'http://localhost/adise/index.html/api/isGameExist.php', false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function(){
        if(this.status == 200){
            games = JSON.parse(this.response);
        }
    }
    xhr.send();
    var result = games.find( ({ game }) => game === game_idFromForm );

    if(result !== undefined){ // if the game exist, send to the server the client_id for the second player

        var json = {
            game_id: game_idFromForm,
            client_2 : id
        }; 

        xhr.open('POST', 'http://localhost/adise/index.html/api/connectSecondPlayer.php', false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function(){
        if(this.status == 200){
            status = JSON.parse(this.responseText);
        }
    }
    xhr.send(JSON.stringify(json));

    if(status.massage === "connected"){ // if the client connect to game succesfully then call a function to create the deck
        var shared;

        var title = document.getElementById("gameIdTitle");
        title.style.display = "block";

        var showGameId = document.getElementById("gameId");
        showGameId.innerHTML = game_idFromForm;

        var hideFrom = document.getElementById("Form");
        hideFrom.style.display = "none";

        var hideTitle = document.getElementById("insertCode");
        hideTitle.style.display = "none";

        var json = {
            game_id: game_idFromForm
        }; 

        xhr.open('POST', 'http://localhost/adise/index.html/api/cardSharing.php', false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function(){
        if(this.status == 200){
            shared = JSON.parse(this.responseText);
        }
    }
        xhr.send(JSON.stringify(json));

        if(shared.message === "shared"){// if deck is created in the database, send the cards to client
            var gameStart = document.getElementById("gameStart");
            gameStart.style.display = "block";
            startGame(id, game_idFromForm, 2);
        }

    }

    }else{
        console.log(false);
        document.getElementById('form').style.borderColor = "red";
        document.getElementById('wrong').innerHTML = "Λάθος Κωδικός";
    }
    }else{
        alert("Παρακαλώ συμπληρώστε την φόρμα με τον κωδικό του παιχνιδιού")
    }


}

function showInput(){
    var butCreate = document.getElementById("create");
    butCreate.style.display ="none";

    var butConnect = document.getElementById("connect");
    butConnect.style.display ="none";

    var form = document.getElementById("inp");
    form.style.display ="block";

}


function randomClientId() {
    return 'Cid_' + Math.random().toString(36).substring(2, 9);
}

function randomGameId() {
    return 'Gid_' + Math.random().toString(36).substring(2, 9);
}