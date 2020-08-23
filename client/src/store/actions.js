import axios from 'axios'
import {
    INIT_DECK,
    INIT_JS_DECK,
    SELECT_DECK,
    SELECT_CARD,
    FLIP_CARD,
    TOGGLE_THEME,
    UPDATE_SCORE,
    FORWARD_BACKWARD_CARD,
    START_DECK_CYCLE,
    STOP_DECK_CYCLE,
    UPDATE_SETTINGS,
    FORWARD_BACKWARD_DECK,
    INIT_DECK_CARD,
    INIT_QUIZ_DECK
} from './actionTypes'

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
    } else if (deckId === 'quiz') {
        return {
            type: INIT_QUIZ_DECK,
            payload: deckId,
        }
    } else {
        return dispatch => {
            axios.get(`/api/decks/${deckId}`).then(resp => {
                dispatch({
                    type: INIT_DECK,
                    payload: resp.data,
                })
            })
        }
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

export function initDeckCard(deck, card, side) {
    return {
        type: INIT_DECK_CARD,
        payload: {
            deck,
            card,
            side
        }
    }
}

export function answerCorrect(bool) {
    return {
        type: UPDATE_SCORE,
        payload: {
            correct: bool
        }
    }
}