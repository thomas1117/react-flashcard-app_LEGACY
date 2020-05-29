const INIT_DECK = 'INIT_DECK'
const INIT_JS_DECK = 'INIT_JS_DECK'
const SELECT_DECK = 'SELECT_DECK'
const SELECT_CARD = 'SELECT_CARD'
const FLIP_CARD = 'FLIP_CARD'
const TOGGLE_THEME = 'TOGGLE_THEME'
const FORWARD_BACKWARD_CARD = 'FORWARD_BACKWARD_CARD'
const START_DECK_CYCLE = 'START_DECK_CYCLE'
const STOP_DECK_CYCLE = 'STOP_DECK_CYCLE'
const UPDATE_SETTINGS = 'UPDATE_SETTINGS'
const FORWARD_BACKWARD_DECK = 'FORWARD_BACKWARD_DECK'
const INIT_DECK_CARD = 'INIT_DECK_CARD'

export function toggleTheme() {
    return {
        type: TOGGLE_THEME,
    }
}

export function initDeck(deckId) {
    if (deckId === 'js') {
        return {
            type: INIT_JS_DECK,
            payload: deckId,
        }
    }
    return {
        type: INIT_DECK,
        payload: deckId,
    }
}

export function selectDeck(index) {
    return {
        type: SELECT_DECK,
        index,
    }
}

export function selectCard(index) {
    return {
        type: SELECT_CARD,
        index,
    }
}

export function updateSettings(settings) {
    return {
        type: UPDATE_SETTINGS,
        settings: {
            frontTime: settings.frontTime,
            backTime: settings.backTime,
        }
    }
}

export function cycleDeck(index) {
    return {
        type: START_DECK_CYCLE
    }
}

export function pauseCycleDeck(index) {
    return {
        type: STOP_DECK_CYCLE
    }
}

export function handleToggleSide() {
    return {
        type: FLIP_CARD,
    }
}

export function handleCardIndexChange(diff) {
    return {
        type: FORWARD_BACKWARD_CARD,
        diff
    }
}

export function handleDeckIndexChange(diff) {
    return {
        type: FORWARD_BACKWARD_DECK,
        diff
    }
}

export function initDeckCard(deck, card) {
    return {
        type: INIT_DECK_CARD,
        payload: {
            deck,
            card
        }
    }
}