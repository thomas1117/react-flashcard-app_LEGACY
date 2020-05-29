import cardData from '../../seed/js/dynamic-seed';

const topicState = {
    activeCardIndex: 0,
    activeDeckIndex: 0,
    cardGroup: [],
    currentDeck: { cards: [] },
    currentCard: {},
    timerRunning: false,
    deckUrl: null,
    cardUrl: null,
}

export default function topic(state = topicState, action) {
    switch (action.type) {
        case 'INIT_DECK_CARD':
            const d = state.cardGroup.find(x => x.id == action.payload.deck)
            if (!d) {
                return { ...state }
            }
            return {
                ...state,
                currentDeck: d,
                currentCard: d.cards.find(x => x.id == action.payload.card) || d.cards[0]
            }
        case 'INIT_JS_DECK':
            const curr = cardData[state.activeDeckIndex]
            return {
                ...state,
                currentDeck: curr,
                cardGroup: cardData,
                currentCard: curr.cards[state.activeCardIndex]
            }
        case 'INIT_DECK':
            const currDeck = state.cardGroup[state.activeDeckIndex]
            return {
                ...state,
                currentDeck: currDeck,
                currentCard: currDeck.cards[state.activeCardIndex]
            }
        case 'SELECT_DECK':
            return {
                ...state,
                currentDeck: state.cardGroup[action.index],
                activeDeckIndex: action.index,
                activeCardIndex: 0,
                currentCard: state.cardGroup[action.index].cards[0],
                timerRunning: false,
                deckUrl: state.cardGroup[action.index].id,
                cardUrl: null
            }
        case 'SELECT_CARD':
            const selectCard = state.currentDeck.cards[action.index]
            return {
                ...state,
                currentCard: selectCard,
                activeCardIndex: action.index,
                timerRunning: false,
                cardUrl: selectCard.id,
            }
        case 'FLIP_CARD':
            const card = state.currentCard
            return {
                ...state,
                currentCard: { ...card, side: card.side === 'front' ? 'back' : 'front' },
            }
        case 'FORWARD_BACKWARD_CARD':
            const indexToTry = state.activeCardIndex + action.diff
            const limit = state.currentDeck.cards.length
            const allowedToShift = indexToTry >= 0 && indexToTry < limit
            const newIndex = allowedToShift ? indexToTry : state.activeCardIndex
            return {
                ...state,
                activeCardIndex: newIndex,
                currentCard: state.currentDeck.cards[newIndex],
            }
        case 'FORWARD_BACKWARD_DECK': {
            const deckToTry = state.activeDeckIndex + action.diff
            const limit = state.cardGroup.length
            const allowedToShift = deckToTry >= 0 && deckToTry < limit
            const newIndex = allowedToShift ? deckToTry : state.activeDeckIndex
            return {
                ...state,
                currentDeck: state.cardGroup[newIndex],
                activeDeckIndex: newIndex,
                activeCardIndex: 0,
                currentCard: state.cardGroup[newIndex].cards[0],
                timerRunning: false,
            }
        }
        case 'START_DECK_CYCLE':
            return {
                ...state,
                timerRunning: true,
            }
        case 'STOP_DECK_CYCLE':
            return {
                ...state,
                timerRunning: false,
            }
        default:
            return state
    }
}