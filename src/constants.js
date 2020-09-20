export const ItemTypes = {
    CARD: 'card'
};

export const MAX_NUM_PLAYERS = 4;

export const CARDS = [
    { value: 'Regular_Cyborg', weight: 13},
    { value: 'Regular_Ghost', weight: 13},
    { value: 'Regular_Lonely', weight: 13},
    { value: 'Regular_Pandacow', weight: 13},
    { value: 'Attack', weight: 8},
    { value: 'Future', weight: 8},
    { value: 'Nope', weight: 8},
    { value: 'Reverse', weight: 8},
    { value: 'Shuffle', weight: 8},
    { value: 'Skip', weight: 8},
];

export const SERVER_PORT = process.env.SERVER_PORT || 8000;
export const API_PORT = process.env.API_PORT || 8001;
export const INTERNAL_API_PORT = process.env.INTERNAL_API_PORT || 8002;

