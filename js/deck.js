function startGame(client_id, game_id, turn){
	var game_id = game_id;
	var client_id = client_id;
	var deck;
	var enemy;

	var json = {
        "client_id": id,
		"game_id": game_id
    }; 
    
	var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/adise/index.html/api/sendCards.php', false);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function(){
    if(this.status == 200){
        deck = JSON.parse(this.responseText);
        }
    }
        xhr.send(JSON.stringify(json));

		var json2 = {
			"client_id": client_id,
			"game_id": game_id
		};
	
	var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/adise/index.html/api/getEnemy.php', false);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function(){
    if(this.status == 200){
        enemy = JSON.parse(this.responseText);
        }
    }
        xhr.send(JSON.stringify(json2));

	document.getElementById("gameStart").innerHTML = "Το παιχνίδι ξεκίνησε!"
	document.getElementById("c").style.display = "block";
	document.getElementById("c2").style.display = "block";


	renderDeck(deck);
	renderEnemyDeck(enemy);
}

function renderDeck(deck){
	for(var i = 0; i < deck.length; i++){
		var card = document.createElement("div");
		var icon = '';
		if ((JSON.stringify(deck[i])).includes('H')){
			icon='♥';
		}
		else if ((JSON.stringify(deck[i])).includes('S')){
			icon = '♠';
		}
		else if ((JSON.stringify(deck[i])).includes('D')){
			icon = '♦';
		}
		else if ((JSON.stringify(deck[i])).includes('C')){
			icon = '♣';
		}

		card.innerHTML = JSON.stringify(deck[i]).substring(1,).split(" ",1) + ' ' + icon;
		card.className = 'card';
		document.getElementById("deck").appendChild(card);
	}
}

function renderEnemyDeck(enemy){

	for(var i = 0; i < enemy.number; i++){
		var card = document.createElement("div");
		card.innerHTML = i + 1;
		card.className = 'card2';
		document.getElementById("deck2").appendChild(card);
	}
}