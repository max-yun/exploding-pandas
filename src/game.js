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
    let played;
    // Cards are, by convention, named according to
    // their type and position in hand, eg. 'regular-0'.
    cardID = cardID.split('-');
    const card = cardID[0];
    const index = cardID[1];
    // Separate handling of cards with and without special effects
    if (card.includes('Regular')) {
        G.regularInitiator = currentPlayer;
        played = playRegularCard(G, ctx, card, playerObject);
    } else {
        played = playSpecialCard(G, ctx, card, playerObject);
    }
    if (played) {
        G.lastCard = card;
        // Deletes the card at the given index.
        G.players[currentPlayer].hand.splice(index, 1);
    }
}

// Sets player up as target, for modal prompt to play 'nope'
export function setTargetPlayer(G, ctx, target, val=0, card=null) {
    G.target = target;
    G.initiator = null;
    G.regularInitiator = null;
    G.messages.push(`${ctx.currentPlayer} targeted ${target}.`);
    if (val) {
        G.regular = val;
        G.steal = card;
    }
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

function playRegularCard(G, ctx, card, player) {
    // By convention, regular cards are named like 'Regular_Giant_Panda'
    let x = card.split('_');
    x.shift();
    let count = player.hand.filter(each => each === card).length;
    if (count === 1) {
        G.regularInitiator = null;
        return false;
    } else if (count === 2) {
        G.regular = 2;
    } else {
        G.regular = 3;
    }
    G.messages.push(`${ctx.currentPlayer} played a ${x.join(' ')} card.`);
    return true;
}

function playSpecialCard(G, ctx, card, player, playerID) {
    switch(card) {
        case 'defuse':
            // TODO: Add this to warning messages
            console.log('This card will automatically be played if you draw an Exploding Panda.');
            return;
        case 'regular':
            break;
        case 'skip':
            player.cardsToDraw--;
            if (player.cardsToDraw <= 0) {
                player.cardsToDraw = 1;
                customEndTurn(G, ctx);
            }
            break;
        case 'shuffle':
            G.deck = shuffle(G);
            break;
        case 'reverse':
            reversed = true;
            player.cardsToDraw--;
            if (player.cardsToDraw <= 0) {
                player.cardsToDraw = 1;
                customEndTurn(G, ctx);
            }
            break;
        case 'future':
            let end = G.deck.length;
            G.future = [G.deck[end - 1], G.deck[end - 2], G.deck[end - 3]];
            break;
        // This will be the default case for all targeting cards
        default:
            G.initiator = ctx.currentPlayer;
            break;
    }
    G.messages.push(`${ctx.currentPlayer} played a ${card} card.`);
    return true;
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
        // Handles all non-special cards
        default:
            if (G.regular === 2) {
                let initHand = initPlayer.hand;
                let targetHand = targetPlayer.hand;
                let randomIndex = getRandomInt(targetHand.length);
                let randomCard = targetHand[randomIndex];
                targetHand.splice(randomIndex, 1);
                initPlayer.hand.push(randomCard);
                initHand.splice(initHand.indexOf(G.lastCard), 1);
                G.messages.push(`${ctx.currentPlayer} stole a card from ${G.target}.`);
            } else if (G.regular === 3) {
                let initHand = initPlayer.hand;
                let targetHand = targetPlayer.hand;
                let index = targetHand.indexOf(G.steal);
                initHand.splice(initHand.indexOf(G.lastCard), 1);
                initHand.splice(initHand.indexOf(G.lastCard), 1);
                if (index !== -1) {
                    targetHand.splice(index, 1);
                    initHand.push(G.steal);
                    G.messages.push(`${ctx.currentPlayer} stole a ${G.steal} card from ${G.target}.`);
                }
                G.steal = null;
            }
            G.regular = 0;
            G.regularInitiator = null;
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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function gameOver(G) {
    return G.losers.length === 3;
}

export const Game = {
    setup: () => ({
        deck: new Deck().getCards(),
        players: {
            '0': {
                hand: ['Regular_Giant_Panda', 'Regular_Giant_Panda', 'Regular_Giant_Panda',
                    'attack', 'attack', 'attack', 'attack', 'attack', 'attack', 'attack'],
                cardsToDraw: 1,
                alive: true,
            },
            '1': {
                hand: ['Regular_Giant_Panda', 'Regular_Giant_Panda', 'attack'],
                cardsToDraw: 1,
                alive: true,
            },
            '2': {
                hand: ['Regular_Giant_Panda'],
                cardsToDraw: 1,
                alive: true,
            },
            '3': {
                hand: ['Regular_Giant_Panda'],
                cardsToDraw: 1,
                alive: true,
            },
        },
        lastCard: null,
        messages: ['Game has begun.'],
        losers: [],
        initiator: null,
        target: null,
        exploding: null,
        future: [],
        regular: 0,
        regularInitiator: null,
        steal: null,

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
