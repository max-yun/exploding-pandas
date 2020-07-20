import Deck from './deck';
import { TurnOrder } from 'boardgame.io/core';
import { playRegular, playSkip, playShuffle, playReverse } from './helpers';

export function drawCard(G, ctx) {
    let currentPlayer = ctx.currentPlayer;
    const card = G.deck.pop();
    G.players[currentPlayer].hand.push(card);
    ctx.events.endTurn();
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
    G.lastCard = card;
    // Deletes the card at the given index.
    G.players[currentPlayer].hand.splice(index, 1);
}

// Activates effect of card that was set after modal prompt
export function playTargetedCard(G, ctx) {
    const card = G.lastCard;
    const target = G.target;
    switch (card) {
        case 'attack':
            G.players[target].hand.push(G.deck.pop());
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
    } else {
        playTargetedCard();
    }
    ctx.events.endStage();
}

export const Game = {
    setup: () => ({
        deck: new Deck().getCards(),
        players: {
            '0': {
                hand: [],
                alive: true
            },
            '1': {
                hand: [],
                alive: true
            },
            '2': {
                hand: [],
                alive: true
            },
            '3': {
                hand: [],
                alive: true
            },
        },
        lastCard: null,
        target: null,
    }),
    moves: { drawCard, playCard, playTargetedCard, setTargetPlayer },
    turn: {
        order: TurnOrder.DEFAULT,
        stages: {
            nope: {
                moves: { handleNope }
            },
            attack1: {

            },
            attack2: {

            },
        },
    }
}

