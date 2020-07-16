import Deck from './deck';
import { TurnOrder } from 'boardgame.io/core';
import { playRegular, playSkip, playShuffle, playReverse } from './helpers';

export function drawCard(G, ctx) {
    let currentPlayer = ctx.currentPlayer;
    const card = G.deck.pop();
    G.players[currentPlayer].hand.push(card);
    ctx.events.endTurn();
}

export function playCard(G, ctx, cardID, target=null) {
    if (target != null) {
        playTargetCard(G, ctx, cardID, target);
    } else {
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
            default:
                break;
        }
        G.lastCard = card;
        // Deletes the card at the given index.
        G.players[currentPlayer].hand.splice(index, 1);
    }
}

function playTargetCard(G, ctx, cardType, target) {
    if (cardType === 'action') {

    }
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
    }),
    moves: { drawCard, playCard },
    turn: {
        order: TurnOrder.DEFAULT,
        stages: {
            attacked: {
                moves: { drawCard, playCard }
            }
        }
    }
}

