import Deck from './deck';
import { TurnOrder } from 'boardgame.io/core';
import { generatePlayedText } from './generateText';
import { ActivePlayers } from 'boardgame.io/core';
import { removeCard, shuffle, getRandomInt, getLastCard, modulo } from './helpers';
import { MAX_NUM_PLAYERS } from './constants';
let indefinite = require('indefinite');

let reversed = false;

export function startGame(G, ctx) {
    G.started = true;
    G.messages.unshift(`Game has begun!`)
}

export function setName(G, ctx, playerID, newName) {
    G.players[playerID].name = newName;
}

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
        } else {
            sendMessage(G, ctx, `${targetPlayer.name} didn't stop the action.`);
            playTargetedCard(G, ctx);
        }
    }
}

export function acceptFate(G, ctx, currentPlayer) {
    G.exploding = null;
    customEndTurn(G, ctx);
    G.players[currentPlayer].alive = false;
    G.losers.push(currentPlayer);
}

export function sendMessage(G, ctx, message, playerID=null) {
    if (playerID) {
        G.messages.unshift(G.players[playerID].name + ': ' + message);
    } else {
        G.messages.unshift(message);
    }
}

function playRegularCard(G, ctx, card, player) {
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

function customEndTurn(G, ctx) {
    let currentPlayer = parseInt(ctx.currentPlayer);
    let numPlayers = ctx.numPlayers;
    let losers = G.losers;

    if (reversed) {
        for (let i = currentPlayer - 1; i > currentPlayer - numPlayers; i--) {
            let nextPlayer = modulo(i, numPlayers).toString();
            if (!losers.includes(nextPlayer)) {
                ctx.events.endTurn({ next: nextPlayer });
                break;
            }
        }
    } else {
        for (let i = currentPlayer + 1; i < currentPlayer + numPlayers; i++) {
            let nextPlayer = modulo(i, numPlayers).toString();
            if (!losers.includes(nextPlayer)) {
                ctx.events.endTurn({ next: nextPlayer });
                break;
            }
        }
    }
}

function gameOver(G, ctx) {
    return G.losers.length === ctx.numPlayers - 1;
}

export const ExplodingPandas = {
    name: 'exploding-pandas',
    setup: (ctx, setupData) => ({
        deck: new Deck(Object.keys(setupData).length - 1).getCards(),
        players: setupData,
        started: false,
        playedCards: [],
        messages: ['Game has been created.'],
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
    moves: { startGame, setName, drawCard, playCard, setTargetPlayer, acceptFate, sendMessage, handleNope, handleDefuse },
    turn: {
        activePlayers: ActivePlayers.ALL,
        order: TurnOrder.DEFAULT,
    },
    minPlayers: 2,
    maxPlayers: MAX_NUM_PLAYERS,
    endIf: (G, ctx) => {
        if (gameOver(G, ctx)) {
            for (let i = 0; i < ctx.numPlayers; i++) {
                if (!G.losers.includes(i.toString())) {
                    return { winner: i.toString() }
                }
            }
        }
    }
}
