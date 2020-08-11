export default class Deck {
    constructor() {
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

        addCards(10, 'Regular_Giant_Panda');
        addCards(3, 'Attack');
        addCards(3, 'Skip');
        addCards(3, 'Shuffle');
        addCards(1, 'Defuse');
        addCards(3, 'Nope');
        addCards(3, 'Future');

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