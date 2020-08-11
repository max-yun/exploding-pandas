let indefinite = require('indefinite');

export function generatePlayedText(card, player, count=0) {
    if (card) {
        if (card.includes('Regular')) {
            if (count === 2) {
                return `${player} played ${count} ${getRegularName(card)} cards.`
            } else if (count === 3) {
                return `${player} played ${count} ${getRegularName(card)} cards.`
            }
        }
        return `${player} played ${indefinite(card)} card.`
    }
}
export function generateNopeText(card, player, count=0, cardToSteal=null) {
    if (card) {
        if (card.includes('Regular')) {
            if (count === 2) {
                return `${player} played ${count} ${getRegularName(card)} cards. 
            This will steal a random card from your hand.`
            } else if (count === 3) {
                return `${player} played ${count} ${getRegularName(card)} cards, 
                allowing them to name any card to steal from your hand. 
                They want to steal ${indefinite(cardToSteal)} card.`
            }
        }
        switch (card) {
            case 'Attack':
                break;
            case 'Nope':
                break;
        }
    }
    return null;
}

function getRegularName(card) {
    let x = card.split('_');
    x.shift();
    return x[0] + ' ' + x[1];
}