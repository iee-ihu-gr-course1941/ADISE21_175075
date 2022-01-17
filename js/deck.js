function startGame(client_id, game_id, turn){
	var game_id = game_id;
	var client_id = client_id;
	click = false;
	turn = turn;
	document.getElementById("gameStart").innerHTML = "Το παιχνίδι ξεκίνησε!"
	document.getElementById("c").style.display = "block";
	document.getElementById("c2").style.display = "block";

	var deck = getDeck(client_id, game_id);
	var enemy = getEnemyDeck(client_id, game_id);
	renderMyDeck(deck);
	
	renderEnemyDeck(client_id, game_id);

	var intervalId = window.setInterval(function(){
		var isPlaying;
		
		var json = {
			"game_id": game_id
		};
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost/adise/index.html/api/getTurn.php', false);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.onload = function(){
		if(this.status == 200){
			//console.log(JSON.parse(this.responseText));
			isPlaying = JSON.parse(this.responseText);
			//console.log(isPlaying);
			if(isPlaying == turn){
				document.getElementById("turn").innerHTML = "Είναι η σειρά σου."
			}else{
				document.getElementById("turn").innerHTML = "Είναι η σειρά του αντιπάλου."
			}
			}
		}
			xhr.send(JSON.stringify(json));
			
			deck = getDeck(client_id, game_id);
			enemy = getEnemyDeck(client_id, game_id);
			console.log(enemy);
			if(enemy.number == 0){
				alert("Το παιχνίδι τελείωσε. Έχασες!");
			}

			renderMyDeck(deck);
			renderEnemyDeck(enemy);

			
			var mine = document.querySelector('#deck');
			var enemy = document.querySelector('#deck2');

			removeAllChildNodes(mine, enemy);
			renderMyDeck(deck);
			renderEnemyDeck(enemy);
			findSameCards(deck, client_id, game_id);
			
			if(click){
				getPicked(client_id, game_id, value - 1, isPlaying, turn);
				click = false;
			}
	}, 1000);
}

function getDeck(id, game_id){
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
		return deck;
}


function getEnemyDeck(client_id, game_id){
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

	return enemy;
}

function renderMyDeck(deck){
	for(var i = 0; i < deck.length; i++){
		var card = document.createElement("div");
		var icon = '';
		if (deck[i].suit == 'H'){
			icon='♥';
		}
		else if (deck[i].suit == 'S'){
			icon = '♠';
		}
		else if (deck[i].suit == 'D'){
			icon = '♦';
		}
		else if (deck[i].suit == 'C'){
			icon = '♣';
		}

		if(deck[i].num != '11'){
			card.innerHTML = deck[i].num + ' ' + icon;
		}else{
			card.innerHTML = 'K' + ' ' + icon;
		}
		card.className = 'card';
		document.getElementById("deck").appendChild(card);
	}
}

function renderEnemyDeck(){
	for(var i = 0; i < enemy.number; i++){
		var card = document.createElement("div");
		card.innerHTML = i + 1;
		card.className = 'card2';

		card.onclick = function(){
			value = this.innerHTML;
			click = true;
		};
		document.getElementById("deck2").appendChild(card);
	}
}

function getPicked(client_id, game_id, value, isPlaying, turn){
	if(isPlaying == turn){
		var json = {
			"client_id": client_id,
			"game_id": game_id,
			"value": value
			};
				
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost/adise/index.html/api/pickedCard.php', false);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.onload = function(){
		if(this.status == 200){
			var card;
			card = JSON.parse(this.responseText);
			var icon;
			if (card.suit == 'H'){
				icon='♥';
			}
			else if (card.suit == 'S'){
				icon = '♠';
			}
			else if (card.suit == 'D'){
				icon = '♦';
			}
			else if (card.suit == 'C'){
				icon = '♣';
			}
			if(card.num == 11){
				alert("Διάλεξες: K" + icon);
			}else{
				alert("Διάλεξες: " + card.num + "" + icon);
			}
			}
		}
			xhr.send(JSON.stringify(json));

			var json2 = {
				"game_id": game_id,
				"turn": turn
				};

			xhr.open('POST', 'http://localhost/adise/index.html/api/changeTurn.php', false);
			xhr.setRequestHeader('Content-type', 'application/json');
			xhr.onload = function(){
			if(this.status == 200){
				}
			}
				xhr.send(JSON.stringify(json2))
	}else{
		alert("Είναι η σειρά του αντιπάλου!")
	}
	
}

function removeAllChildNodes(mine, enemy) {
    while (mine.firstChild) {
        mine.removeChild(mine.firstChild);
    }
	while (enemy.firstChild) {
        enemy.removeChild(enemy.firstChild);
    }
}

function findSameCards(deck, client_id, game_id){
	if(deck.length != undefined){
	var shorted = deck;
	shorted = shorted.sort(function (a, b) {
		return a.num - b.num;
	  });
	for(var i = 0; i<2; i++){
		for(var j = 0; j < deck.length - 1; j++){
			if(shorted[j+1].num == shorted[j].num){
				removeSameCards(client_id, game_id, shorted[j].num, shorted[j].suit);
				removeSameCards(client_id, game_id, shorted[j+1].num, shorted[j+1].suit);
				shorted.splice(shorted[j].num, 2);
				// shorted.splice(shorted[j+1].num, 1);
				// console.log(shorted[j+1].num);
				// console.log(shorted[j].num);
			}
		}
	}
	}else{
		alert("Το παιχνίδι τελείωσε. Νίκησες!");

	}
}

function removeSameCards(client_id, game_id, num, suit){
	var json = {
		"client_id": client_id,
		"game_id": game_id,
		"num": num,
		"suit": suit
    }; 
    
	var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/adise/index.html/api/removeCards.php', false);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function(){
    if(this.status == 200){
        //console.log(JSON.parse(this.responseText));
        }
    }
        xhr.send(JSON.stringify(json));		
}

function getDivValue(value){
	
}

function isGameOver(){
	var json = {
		"client_id": client_id,
		"game_id": game_id,
		"num": num,
		"suit": suit
    }; 
    
	var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/adise/index.html/api/removeCards.php', false);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function(){
    if(this.status == 200){
        //console.log(JSON.parse(this.responseText));
        }
    }
        xhr.send(JSON.stringify(json));		
}