function playF(){
    var butFirst = document.getElementById("first");
    butFirst.style.display ="none";

    var butCreate = document.getElementById("create");
    butCreate.style.display ="block";

    var butConnect = document.getElementById("connect");
    butConnect.style.display ="block";
}

function showInput(){
    var butCreate = document.getElementById("create");
    butCreate.style.display ="none";

    var butConnect = document.getElementById("connect");
    butConnect.style.display ="none";

    var form = document.getElementById("inp");
    form.style.display ="block";

}

function createGame(){

    var id = randomClientId();

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

    insertGame(id);
}

function insertGame(client_1){
    var game_id =  randomGameId();
    var client_id = client_1;
    console.log(game_id)
    var json = {
        "game_id": game_id,
        "client_1" : client_1
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

}



function connectToGame(){

}

function randomClientId() {
    return 'c_id' + Math.random().toString(36);
}

function randomGameId() {
    return 'g_id' + Math.random().toString(36);
}
  