export default class Deck {
    constructor(numBombs=2) {
        this.numBombs = numBombs;
        this.cards = this.initDeck();
        this.shuffle();
    }

    initDeck() {
        let deck = [];
        let addCards = (count, type) => {
            for (let i = 0; i < count; i++) {
                deck.push(type);
            }
        }

        // addCards(4, 'Regular_Cyborg');
        // addCards(4, 'Regular_Ghost');
        // addCards(4, 'Regular_Lonely');
        // addCards(4, 'Regular_Pandacow');
        // addCards(4, 'Attack');
        // addCards(4, 'Skip');
        // addCards(4, 'Shuffle');
        // addCards(2, 'Defuse');
        // addCards(4, 'Nope');
        // addCards(4, 'Future');
        // addCards(4, 'Reverse');
        addCards(this.numBombs, 'Bomb');
        return deck;
    }

    shuffle() {
        let j, x, i;
        for (i = this.cards.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = x;
        }
    }

    getCards() {
        return this.cards;
    }
}