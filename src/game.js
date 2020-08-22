import Deck from './deck';
import { TurnOrder } from 'boardgame.io/core';
import { generatePlayedText } from './generateText';
import { Stage } from 'boardgame.io/core';
import { ActivePlayers } from 'boardgame.io/core';
let indefinite = require('indefinite');

let reversed = false;
let numPlayers = 2;

export function drawCard(G, ctx) {
    let currentPlayer = ctx.currentPlayer;
    let playerObject = G.players[currentPlayer];
    const card = G.deck.pop();
    G.messages.unshift(`${playerObject.name} drew a card.`)
    if (card === 'Bomb') {
        G.messages.unshift(`${playerObject.name} drew an exploding panda!`);
        G.exploding = currentPlayer;
        let defuseIndex = playerObject.hand.indexOf('Defuse');
        if (defuseIndex >= 0) {
            removeCard(playerObject, 'Defuse');
            G.messages.unshift(`${playerObject.name} defused the bomb and put it back somewhere!`);
            // let defuseObject = {};
            // defuseObject[currentPlayer] = { stage: 'defusing' }
            // ctx.events.setActivePlayers({
            //     value: defuseObject,
            // });
        } else {
            G.messages.unshift(`${playerObject.name} doesn't have a defuse card... RIP.`);
        }
    } else {
        playerObject.hand.push(card);
        playerObject.cardsToDraw--;
        if (playerObject.cardsToDraw <= 0) {
            playerObject.cardsToDraw = 1;
            G.messages.unshift(`${playerObject.name} safely ended their turn.`)
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
    const card = cardID.split('-')[0];
    // Separate handling of cards with and without special effects
    if (card.includes('Regular')) {
        G.regularInitiator = currentPlayer;
        played = playRegularCard(G, ctx, card, playerObject);
    } else {
        played = playSpecialCard(G, ctx, card, playerObject);
    }
    if (played) {
        G.playedCards.push(card);
        removeCard(playerObject, card);
    }
}

// Sets player up as target, for modal prompt to play 'nope'
export function setTargetPlayer(G, ctx, target, val=0, card=null) {
    G.target = target;
    G.initiator = null;
    G.regularInitiator = null;
    let playerObject = G.players[ctx.currentPlayer];
    let targetPlayerObject = G.players[target];
    // Handling for case of playing regular cards
    if (val === 2) {
        removeCard(playerObject, card);
        G.messages.unshift(generatePlayedText(getLastCard(G), playerObject.name, 2));
    } else if (val === 3) {
        removeCard(playerObject, card);
        removeCard(playerObject, card);
        G.steal = card;
        G.messages.unshift(generatePlayedText(getLastCard(G), playerObject.name, 3));
    }
    if (!G.counterNope) {
        G.messages.unshift(`${playerObject.name} targeted ${targetPlayerObject.name}.`);
    }
    G.regular = val;
    // let targetObject = {};
    // targetObject[target] = { stage: 'nope' }
    // ctx.events.setActivePlayers({
    //     value: targetObject,
    // });
}

export function handleDefuse(G, ctx, position) {
    removeCard(G.players[ctx.currentPlayer], 'Defuse');
    G.playedCards.push('Defuse');
    G.deck.splice(G.deck.length - position, 0, 'Bomb');
    G.exploding = null;
    ctx.events.endStage();
    customEndTurn(G, ctx);
}

export function handleNope(G, ctx, played=false) {
    if (G.counterNope) {
        if (played) {
            let playerObject = G.players[ctx.currentPlayer];
            removeCard(playerObject, 'Nope');
            G.playedCards.push('Nope');
            G.messages.unshift(`${playerObject.name} countered with their own Nope!`);
            setTargetPlayer(G, ctx, G.target);
        } else {
            G.target = null;
        }
        G.counterNope = null;
        ctx.events.endStage();
    } else {
        let targetPlayer = G.players[G.target];
        if (played) {
            removeCard(targetPlayer, 'Nope');
            G.playedCards.push('Nope');
            sendMessage(G, ctx, generatePlayedText('Nope', targetPlayer.name));
            G.counterNope = ctx.currentPlayer;
            // ctx.events.endStage();
            // let playerObject = {};
            // playerObject[ctx.currentPlayer] = { stage: 'nope' }
            // ctx.events.setActivePlayers({
            //     value: playerObject,
            // });
        } else {
            sendMessage(G, ctx, `${targetPlayer.name} didn't stop the action.`);
            playTargetedCard(G, ctx);
            // ctx.events.endStage();
        }
    }
}

export function acceptFate(G, ctx, currentPlayer) {
    G.exploding = null;
    G.losers.push(currentPlayer);
    G.players[currentPlayer].alive = false;
    customEndTurn(G, ctx);
}

export function sendMessage(G, ctx, message, playerID=null) {
    if (playerID) {
        G.messages.unshift(G.players[playerID].name + ': ' + message);
    } else {
        G.messages.unshift(message);
    }
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
    return true;
}

function playSpecialCard(G, ctx, card, playerObject) {
    switch(card) {
        case 'Defuse':
            return;
        case 'Skip':
            playerObject.cardsToDraw--;
            if (playerObject.cardsToDraw <= 0) {
                playerObject.cardsToDraw = 1;
                customEndTurn(G, ctx);
            }
            break;
        case 'Shuffle':
            G.deck = shuffle(G);
            break;
        case 'Reverse':
            reversed = true;
            playerObject.cardsToDraw--;
            if (playerObject.cardsToDraw <= 0) {
                playerObject.cardsToDraw = 1;
                customEndTurn(G, ctx);
            }
            break;
        case 'Future':
            let end = G.deck.length;
            G.future = [G.deck[end - 1], G.deck[end - 2], G.deck[end - 3]];
            break;
        case 'Nope':
            return;
        // This will be the default case for all targeting cards
        default:
            G.initiator = ctx.currentPlayer;
            break;
    }
    sendMessage(G, ctx,`${playerObject.name} played ${indefinite(card)} card.`);
    return true;
}

// Activates effect of card that was set after modal prompt
function playTargetedCard(G, ctx) {
    const card = getLastCard(G);
    const target = G.target;
    const initPlayer = G.players[ctx.currentPlayer];
    const targetPlayer = G.players[target];
    switch (card) {
        case 'Attack':
            ctx.events.endTurn({ next: target });
            // Add however many cards the initiator had to draw to the target's draw count.
            // This allows attack cards to stack upon one another.
            targetPlayer.cardsToDraw = initPlayer.cardsToDraw * 2;
            // But reset the cardsToDraw for the initiator.
            initPlayer.cardsToDraw = 1;
            break;
        case 'Steal':
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
                initHand.push(randomCard);
                sendMessage(G, ctx, `${initPlayer.name} stole a card from ${targetPlayer.name}.`);
            } else if (G.regular === 3) {
                let initHand = initPlayer.hand;
                let targetHand = targetPlayer.hand;
                let index = targetHand.indexOf(G.steal);
                if (index !== -1) {
                    targetHand.splice(index, 1);
                    initHand.push(G.steal);
                    sendMessage(G, ctx, `${initPlayer.name} stole a ${G.steal} card from ${targetPlayer.name}.`);
                } else {
                    sendMessage(G, ctx, `${targetPlayer.name} didn't have a ${G.steal} card.`);
                }
                G.steal = null;
            }
            G.regular = 0;
            break;
    }
    G.target = null;
}

export const ExplodingPandas = {
    name: 'exploding-pandas',
    setup: () => ({
        deck: new Deck().getCards(),
        players: {
            '0': {
                hand: ['Regular_Giant_Panda', 'Nope', 'Attack'],
                cardsToDraw: 1,
                alive: true,
                name: 'Jeremy',
            },
            '1': {
                hand: ['Regular_Giant_Panda', 'Regular_Giant_Panda', 'Attack', 'Shuffle', 'Nope'],
                cardsToDraw: 1,
                alive: true,
                name: 'Alex',
            },
            // '2': {
            //     hand: ['Regular_Giant_Panda'],
            //     cardsToDraw: 1,
            //     alive: true,
            //     name: 'Jessie',
            // },
            // '3': {
            //     hand: ['Regular_Giant_Panda'],
            //     cardsToDraw: 1,
            //     alive: true,
            //     name: 'Ariana',
            // },
        },
        playedCards: [],
        messages: ['Game has begun.'],
        losers: [],
        initiator: null,
        target: null,
        counterNope: null,
        exploding: null,
        future: [],
        regular: 0,
        regularInitiator: null,
        steal: null,
    }),
    moves: { drawCard, playCard, setTargetPlayer, acceptFate, sendMessage, handleNope, handleDefuse },
    turn: {
        activePlayers: ActivePlayers.ALL,
        order: TurnOrder.DEFAULT,
        // stages: {
        //     nope: {
        //         moves: { handleNope, sendMessage },
        //         next: Stage.NULL,
        //     },
        //     defusing: {
        //         moves: { handleDefuse, sendMessage },
        //         next: Stage.NULL,
        //     },
        // },
    },
    minPlayers: 2,
    maxPlayers: 4,
    endIf: (G, ctx) => {
        if (gameOver(G)) {
            return { winner: ctx.currentPlayer }
        }
    }
}

/* HELPER FUNCTIONS */

function customEndTurn(G, ctx) {
    let currentPlayer = parseInt(ctx.currentPlayer);
    let losers = G.losers;
    if (reversed) {
        for (let i = currentPlayer - 1; i > currentPlayer - numPlayers; i--) {
            let nextPlayer = (i % numPlayers).toString();
            if (!losers.includes(nextPlayer)) {
                ctx.events.endTurn({ next: nextPlayer });
                break;
            }
        }
    } else {
        for (let i = currentPlayer + 1; i < currentPlayer + numPlayers; i++) {
            let nextPlayer = (i % numPlayers).toString();
            if (!losers.includes(nextPlayer)) {
                ctx.events.endTurn({ next: nextPlayer });
                break;
            }
        }
    }
}

function gameOver(G) {
    return G.losers.length === numPlayers;
}

function removeCard(playerObject, card) {
    let hand = playerObject.hand;
    hand.splice(hand.indexOf(card), 1);
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

function getLastCard(G) {
    for (let i = G.playedCards.length - 1; i >= 0; i--) {
        if (G.playedCards[i] !== 'Nope') {
            return G.playedCards[i];
        }
    }
}
