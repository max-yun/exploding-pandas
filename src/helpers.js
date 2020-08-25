import { CARDS } from './constants';

export function removeCard(playerObject, card) {
    let hand = playerObject.hand;
    hand.splice(hand.indexOf(card), 1);
}

export function shuffle(G) {
    let cards = G.deck;
    let j, x, i;
    for (i = cards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = cards[i];
        cards[i] = cards[j];
        cards[j] = x;
    }
    return cards;
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getLastCard(G) {
    for (let i = G.playedCards.length - 1; i >= 0; i--) {
        if (G.playedCards[i] !== 'Nope') {
            return G.playedCards[i];
        }
    }
}

export function getRandomHand() {
    let hand = ['Defuse'];
    for (let i = 0; i < 5; i++) {
        hand.push(randomSample(CARDS));
    }
    return hand;
}

function randomSample(samples) {
    let sample =
        Math.random() *
        samples.reduce((sum, { weight }) => sum + weight, 0);

    const { value } = samples.find(
        ({ weight }) => (sample -= weight) < 0
    );

    return value;
}