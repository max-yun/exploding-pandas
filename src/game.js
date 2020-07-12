import Deck from './deck';
import { PlayerView } from "boardgame.io/core";

function drawCard(G, ctx) {
    let currentPlayer = ctx.currentPlayer;
    const card = G.deck.pop();
    G.players[currentPlayer].hand.push(card);
    ctx.events.endTurn();
}

export const Game = {
    setup: () => ({
        deck: new Deck().getCards(),
        players: {
            '0': {
                hand: []
            },
            '1': {
                hand: []
            }
        },
    }),

    moves: { drawCard },
    playerView: PlayerView.STRIP_SECRETS
}

