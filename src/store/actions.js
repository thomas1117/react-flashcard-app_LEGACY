import { dispatch } from 'redux'

const INIT_DECK = 'INIT_DECK'
const SELECT_DECK = 'SELECT_DECK'
const SELECT_CARD = 'SELECT_CARD'
const FLIP_CARD = 'FLIP_CARD'
const TOGGLE_THEME = 'TOGGLE_THEME'
const FORWARD_BACKWARD = 'FORWARD_BACKWARD'
const START_DECK_CYCLE = 'START_DECK_CYCLE'
const STOP_DECK_CYCLE = 'STOP_DECK_CYCLE'
const UPDATE_SETTINGS = 'UPDATE_SETTINGS'

export function toggleTheme() {
    return {
        type: TOGGLE_THEME,
    }
}

export function initDeck() {
    return {
        type: INIT_DECK,
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
            front: settings.front,
            back: settings.back
        }
    }
// setTimeFront(settings.front)
// setTimeBack(settings.back)
// localStorage.setItem('time', JSON.stringify(settings))
}

export function cycleDeck(index) {
    return {
        type: START_DECK_CYCLE
    }
    // setActiveDeckByIndex(() => {
    //     setTimerCycle(true)
    //     return index
    // })
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
// setCard(currentCard => {
//     let item = {...currentCard, side: currentCard.side === 'front' ? 'back' : 'front'}
//     if (cb) {
//     cb(item)
//     }
//     return item
// })
}

export function handleCardIndexChange(diff) {
    return {
        type: FORWARD_BACKWARD,
        diff
    }
}

// function getTimeCycle() {
// const t = localStorage.getItem('time')
// return t ? JSON.parse(t) : {frontTime: 3, backTime: 1}
// }