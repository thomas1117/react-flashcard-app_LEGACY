import cardData from '../../seed/js/dynamic-seed';
import { Deck, Card } from '../../models'

const topicState = {
    activeCardIndex: 0,
    activeDeckIndex: 0,
    cardGroup: [],
    currentDeck: { cards: [] },
    currentCard: {},
    timerRunning: false,
    deckUrl: null,
    cardUrl: null,
    isBack: false,
}

function deckMaker(decks) {
    return decks.map(deck => {
        let d = new Deck(deck.title, [])
        d.cards = deck.cards.map(item => {
            const card = new Card(
                item.front,
                item.back,
                item.meta,
                item.language,
            )
            return card
        })
        return d
    })
}

export default function topic(state = topicState, action) {
    switch (action.type) {
        case 'INIT_DECK_CARD':
            let initIndex = null
            const d = state.cardGroup.find((x, index) => {
                if (x.id === Number(action.payload.deck)) {
                    initIndex = index
                    return true
                }
                return false
            })
            if (!d) {
                return { ...state }
            }
            const c = d.cards.find(x => x.id === Number(action.payload.card)) || d.cards[0]
            return {
                ...state,
                currentDeck: d,
                activeDeckIndex: initIndex,
                currentCard: { ...c, side: action.payload.side }
            }
        case 'INIT_JS_DECK':
            const curr = cardData[state.activeDeckIndex]
            // debugger
            return {
                ...state,
                currentDeck: curr,
                cardGroup: cardData,
                currentCard: curr.cards[state.activeCardIndex]
            }
        case 'INIT_DECK':
            const sections = deckMaker(action.payload.sections)
            const x = sections[0]
            // debugger
            return {
                ...state,
                currentDeck: x,
                cardGroup: sections,
                currentCard: x.cards[state.activeCardIndex]
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
                isBack: card.side === 'back'
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
                cardUrl: state.currentDeck.cards[newIndex].id,
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
                deckUrl: state.cardGroup[newIndex].id,
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