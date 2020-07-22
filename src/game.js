import Deck from './deck';
import { TurnOrder } from 'boardgame.io/core';
import { playRegular, playSkip, playShuffle, playReverse } from './helpers';

export function drawCard(G, ctx) {
    let currentPlayer = ctx.currentPlayer;
    let playerObject = G.players[currentPlayer];
    const card = G.deck.pop();
    playerObject.hand.push(card);
    G.messages.push(`${currentPlayer} drew a card.\n`)
    playerObject.cardsToDraw--;
    if (playerObject.cardsToDraw <= 0) {
        playerObject.cardsToDraw = 1;
        G.messages.push(`${currentPlayer} safely ended their turn.\n`)
        ctx.events.endTurn();
    }
}

export function playCard(G, ctx, cardID) {
    let currentPlayer = ctx.currentPlayer;
    // Cards are, by convention, named according to
    // their type and position in hand, eg. 'regular-0'.
    cardID = cardID.split('-');
    const card = cardID[0];
    const index = cardID[1];
    switch(card) {
        case 'regular':
            playRegular();
            break;
        case 'skip':
            playSkip(ctx);
            break;
        case 'shuffle':
            playShuffle(G);
            break;
        case 'reverse':
            playReverse(ctx);
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
            break;
        default:
            break;
    }
    G.target = null;
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

export function handleNope(G, ctx, played=false) {
    if (played) {
        let hand = G.players[G.target].hand;
        let index = hand.indexOf('nope');
        hand.splice(index, 1);
        G.lastCard = 'nope';
        G.target = null;
        G.messages.push(`${G.target} played a nope card!`);
    } else {
        G.messages.push(`${G.target} took it like a champ.`);
        playTargetedCard(G, ctx);
    }
    ctx.events.endStage();
}

export const Game = {
    setup: () => ({
        deck: new Deck().getCards(),
        players: {
            '0': {
                hand: ['defuse'],
                alive: true,
                cardsToDraw: 1
            },
            '1': {
                hand: ['defuse'],
                alive: true,
                cardsToDraw: 1
            },
            '2': {
                hand: ['defuse'],
                alive: true,
                cardsToDraw: 1
            },
            '3': {
                hand: ['defuse'],
                alive: true,
                cardsToDraw: 1
            },
        },
        lastCard: null,
        target: null,
        messages: ['Game has begun.'],
    }),
    moves: { drawCard, playCard, setTargetPlayer },
    turn: {
        order: TurnOrder.DEFAULT,
        stages: {
            nope: {
                moves: { handleNope }
            },
        },
    }
}

