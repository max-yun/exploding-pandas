import { CARDS } from './constants';

export function setupPlayers(numPlayers, playerName) {
    let players = {
        '0': {
            hand: getRandomHand(),
            cardsToDraw: 1,
            alive: true,
            name: playerName,
        },
        '1': {
            hand: getRandomHand(),
            cardsToDraw: 1,
            alive: true,
            name: null,
        },
    }
    if (numPlayers === 3) {
        let nextPlayer = {
            '2': {
                hand: getRandomHand(),
                cardsToDraw: 1,
                alive: true,
                name: null,
            }
        }
        players = Object.assign(nextPlayer, players);
    }
    else if (numPlayers === 4) {
        let nextPlayer = {
            '2': {
                hand: getRandomHand(),
                cardsToDraw: 1,
                alive: true,
                name: null,
            },
            '3': {
                hand: getRandomHand(),
                cardsToDraw: 1,
                alive: true,
                name: null,
            }
        }
        players = Object.assign(nextPlayer, players);
    }
    return players;
}

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
    let hand = ['Reverse', 'Skip'];
    for (let i = 0; i < 5; i++) {
        hand.push(randomSample(CARDS));
    }
    return hand;
}

export function modulo(n, m) {
    return ((n % m) + m) % m;
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