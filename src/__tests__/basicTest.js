import { Client } from 'boardgame.io/client';
import { Game } from '../game';

it('Basic tests', () => {
    const BasicGame = {
        ...Game,
        setup: () => ({
            deck: ['skip', 'reverse', 'regular'],
            players: {
                '0': {
                    hand: [],
                    cardsToDraw: 1,
                    alive: true
                },
                '1': {
                    hand: [],
                    cardsToDraw: 1,
                    alive: true
                }
            },
            lastCard: null,
            target: null,
            messages: ['Game has begun.'],
            losers: [],
            exploding: null,
        }),
    }

    const client = Client({
        game: BasicGame,
    });

    client.moves.drawCard();
    client.moves.drawCard();
    client.moves.playCard('skip-0');

    const { G, ctx } = client.store.getState();

    expect(G.players['0'].hand).toEqual([]);
    expect(G.players['1'].hand).toEqual(['reverse']);
    expect(ctx.currentPlayer).toEqual('1');
});
