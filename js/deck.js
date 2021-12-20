const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

export function getDeck() {
	let deck = new Array();

	for(let i = 0; i < SUITS.length; i++)
	{
		for(let x = 0; x < VALUES.length; x++)
		{
			let card = {Value: VALUES[x], Suit: SUITS[i]};
			deck.push(card);
		}
	}

    let m = {Value: "K", Suit: "♠"}
    deck.push(m)

    shuffle(deck)

	return deck;
}

function shuffle(deck)
{
	// for 1000 turns
	// switch the values of two random cards
	for (let i = 0; i < 1000; i++)
	{
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}
