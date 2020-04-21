import { dispatch } from 'redux'

const INIT_DECK = 'INIT_DECK'

export function initDeck() {
    return {
        type: INIT_DECK,
    }
}