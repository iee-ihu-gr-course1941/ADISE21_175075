var id;
var game_id;

function playF(){
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


function createGame(){
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

    var isReady;

    var intervalId = window.setInterval(function(){
        var jsonGID = {
            "game_id": game_id
        };
        console.log("yoyoyo");
        xhr.open('POST', 'http://localhost/adise/index.html/api/isGameReady.php', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onload = function(){
            if(this.status == 200){
                console.log(this.response);
                isReady = JSON.parse(this.response);
            }
    }
    xhr.send(JSON.stringify(jsonGID));

    if(isReady.message==="ready"){
        clearInterval(intervalId);


    }
      }, 2000);
}

function connectToGame(){
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
    console.log(games);
    var result = games.find( ({ game }) => game === game_idFromForm );

    if(result !== undefined){
        console.log(true);

        var json = {
            game_id: game_idFromForm,
            client_2 : id
        }; 

        xhr.open('POST', 'http://localhost/adise/index.html/api/connectSecondPlayer.php', false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function(){
        if(this.status == 200){
            console.log(this.responseText);
            status = JSON.parse(this.responseText);
        }
    }
    xhr.send(JSON.stringify(json));

    if(status.massage === "connected"){
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
            console.log(this.responseText);
            status = JSON.parse(this.responseText);
        }
    }
        xhr.send(JSON.stringify(json));

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