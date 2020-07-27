import Deck from './deck';
import { TurnOrder } from 'boardgame.io/core';

let reversed = false;

export function drawCard(G, ctx) {
    let currentPlayer = ctx.currentPlayer;
    let playerObject = G.players[currentPlayer];
    const card = G.deck.pop();
    G.messages.push(`${currentPlayer} drew a card.`)
    if (card === 'bomb') {
        G.messages.push(`${currentPlayer} drew an exploding panda!`);
        G.exploding = currentPlayer;
        let defuseIndex = playerObject.hand.indexOf('defuse');
        if (defuseIndex >= 0) {
            G.messages.push(`${currentPlayer} defused the bomb and put it back somewhere!`);
            // Remove the defuse card from hand
            let defuseObject = {};
            defuseObject[currentPlayer] = { stage: 'defusing' }
            ctx.events.setActivePlayers({
                value: defuseObject,
            });
        } else {
            G.messages.push(`${currentPlayer} doesn't have a defuse card... RIP.`);
        }
    } else {
        playerObject.hand.push(card);
        playerObject.cardsToDraw--;
        if (playerObject.cardsToDraw <= 0) {
            playerObject.cardsToDraw = 1;
            G.messages.push(`${currentPlayer} safely ended their turn.`)
            customEndTurn(G, ctx);
        }
    }
}

export function playCard(G, ctx, cardID) {
    let currentPlayer = ctx.currentPlayer;
    let playerObject = G.players[currentPlayer];
    // Cards are, by convention, named according to
    // their type and position in hand, eg. 'regular-0'.
    cardID = cardID.split('-');
    const card = cardID[0];
    const index = cardID[1];
    switch(card) {
        case 'defuse':
            // TODO: Add this to warning messages
            console.log('This card will automatically be played if you draw an Exploding Panda.');
            return;
        case 'regular':
            break;
        case 'skip':
            playerObject.cardsToDraw--;
            if (playerObject.cardsToDraw <= 0) {
                playerObject.cardsToDraw = 1;
                customEndTurn(G, ctx);
            }
            break;
        case 'shuffle':
            G.deck = shuffle(G);
            break;
        case 'reverse':
            reversed = true;
            playerObject.cardsToDraw--;
            if (playerObject.cardsToDraw <= 0) {
                playerObject.cardsToDraw = 1;
                customEndTurn(G, ctx);
            }
            break;
        case 'future':
            let end = G.deck.length;
            G.future = [G.deck[end - 1], G.deck[end - 2], G.deck[end - 3]];
            break;
        // This will be the default case for all targeting cards
        default:
            break;
    }
    G.messages.push(`${ctx.currentPlayer} played a ${card} card.`);
    G.lastCard = card;
    // Deletes the card at the given index.
    G.players[currentPlayer].hand.splice(index, 1);
}

// Sets player up as target, for modal prompt to play 'nope'
export function setTargetPlayer(G, ctx, target) {
    G.target = target;
    G.messages.push(`${ctx.currentPlayer} targeted ${target}.`);
    let targetObject = {};
    targetObject[target] = { stage: 'nope' }
    ctx.events.setActivePlayers({
        value: targetObject,
    });
}

export function handleDefuse(G, ctx, position) {
    let playerObject = G.players[ctx.currentPlayer];
    let defuseIndex = playerObject.hand.indexOf('defuse');
    playerObject.hand.splice(defuseIndex, 1);
    G.lastCard = 'defuse';
    G.deck.splice(G.deck.length - position, 0, "bomb");
    G.exploding = null;
    ctx.events.endStage();
    customEndTurn(G, ctx);
}

export function handleNope(G, ctx, played=false) {
    if (played) {
        let hand = G.players[G.target].hand;
        let index = hand.indexOf('nope');
        hand.splice(index, 1);
        G.lastCard = 'nope';
        G.messages.push(`${G.target} played a nope card!`);
        G.target = null;
    } else {
        G.messages.push(`${G.target} took it like a champ.`);
        playTargetedCard(G, ctx);
    }
    ctx.events.endStage();
}

export function acceptFate(G, ctx, currentPlayer) {
    G.exploding = null;
    G.losers.push(currentPlayer);
    G.players[currentPlayer].alive = false;
    customEndTurn(G, ctx);
}

// Activates effect of card that was set after modal prompt
function playTargetedCard(G, ctx) {
    const card = G.lastCard;
    const target = G.target;
    const initPlayer = G.players[ctx.currentPlayer];
    const targetPlayer = G.players[target];
    switch (card) {
        case 'attack':
            ctx.events.endTurn({ next: target });
            // Add however many cards the initiator had to draw to the target's draw count.
            // This allows attack cards to stack upon one another.
            targetPlayer.cardsToDraw = initPlayer.cardsToDraw * 2;
            // But reset the cardsToDraw for the initiator.
            initPlayer.cardsToDraw = 1;
            break;
        case 'steal':
            let targetHand = targetPlayer.hand;
            let randomIndex = Math.random() * targetHand.length;
            let randomCard = targetHand[randomIndex];
            targetHand.splice(randomIndex, 1);
            initPlayer.hand.push(randomCard);
            break;
        default:
            break;
    }
    G.target = null;
}

function customEndTurn(G, ctx) {
    let currentPlayer = parseInt(ctx.currentPlayer);
    let losers = G.losers;
    if (reversed) {
        for (let i = currentPlayer - 1; i > currentPlayer - 4; i--) {
            let nextPlayer = (i % 4).toString();
            if (!losers.includes(nextPlayer)) {
                ctx.events.endTurn({ next: nextPlayer });
                break;
            }
        }
    } else {
        for (let i = currentPlayer + 1; i < currentPlayer + 4; i++) {
            let nextPlayer = (i % 4).toString();
            if (!losers.includes(nextPlayer)) {
                ctx.events.endTurn({ next: nextPlayer });
                break;
            }
        }
    }
}

function shuffle(G) {
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

function gameOver(G) {
    return G.losers.length === 3;
}

export const Game = {
    setup: () => ({
        deck: new Deck().getCards(),
        players: {
            '0': {
                hand: ['defuse'],
                cardsToDraw: 1,
                alive: true,
            },
            '1': {
                hand: ['defuse'],
                cardsToDraw: 1,
                alive: true,
            },
            '2': {
                hand: ['defuse'],
                cardsToDraw: 1,
                alive: true,
            },
            '3': {
                hand: ['defuse'],
                cardsToDraw: 1,
                alive: true,
            },
        },
        lastCard: null,
        target: null,
        messages: ['Game has begun.'],
        losers: [],
        exploding: null,
        future: [],
    }),
    moves: { drawCard, playCard, setTargetPlayer, acceptFate },
    turn: {
        order: TurnOrder.DEFAULT,
        stages: {
            nope: {
                moves: { handleNope }
            },
            defusing: {
                moves: { handleDefuse }
            },
        },
    },
    endIf: (G, ctx) => {
        if (gameOver(G)) {
            return { winner: ctx.currentPlayer }
        }
    }
}

