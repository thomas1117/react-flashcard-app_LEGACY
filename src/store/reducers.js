import cardData from '../seed/js/dynamic-seed';

const topicState = {
    activeCardIndex: 0,
    activeDeckIndex: 0,
    cardGroup: cardData,
    currentDeck: {},
    currentCard: {},
    timerRunning: false,
    timeCycleFront: 3000,
    timeCycleBack: 3000,
    // currentCycle: 3000,

}

export function topic(state = topicState, action) {
    switch(action.type) {
        case 'INIT_DECK':
            const currDeck = state.cardGroup[state.activeDeckIndex]
            return {
                ...state,
                currentDeck: currDeck,
                currentCard: currDeck.cards[state.activeCardIndex]
            }
        default:
            return state
    }
}