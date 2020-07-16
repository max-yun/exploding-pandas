// Contains all card functions that don't target a player

export function playRegular() {

}

export function playSkip(ctx) {
    ctx.events.endTurn();
}

export function playShuffle(G) {
    G.deck = shuffle(G.deck);
}

export function playReverse(ctx) {
    ctx.playOrder = ctx.playOrder.reverse();
    ctx.events.endTurn();
}

function shuffle(cards) {
    let j, x, i;
    for (i = cards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = cards[i];
        cards[i] = cards[j];
        cards[j] = x;
    }
    return cards;
}