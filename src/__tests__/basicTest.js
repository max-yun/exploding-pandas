import { drawCard } from '../game';

it('should draw card', () => {
    const G = {
        deck: [1, 2, 3, 4, 5, 6],
        players: {
            '0': {
                hand: []
            },
            '1': {
                hand: []
            }
        }
    }

    drawCard(G, { currentPlayer: '0'});

    expect(G).toEqual({
        deck: [1, 2, 3, 4, 5],
        players: {
            '0': {
                hand: [6]
            },
            '1': {
                hand: []
            }
        }
    })
})