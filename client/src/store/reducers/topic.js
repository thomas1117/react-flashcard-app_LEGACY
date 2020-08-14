import cardData from '../../seed/js/dynamic-seed';
import { Deck, Card } from '../../models'
import { 
    INIT_DECK_CARD,
    INIT_JS_DECK,
    INIT_QUIZ_DECK,
    INIT_DECK,
    SELECT_DECK,
    SELECT_CARD,
    FLIP_CARD,
    UPDATE_SCORE,
    FORWARD_BACKWARD_CARD,
    FORWARD_BACKWARD_DECK,
    START_DECK_CYCLE,
    STOP_DECK_CYCLE
} from '../actionTypes'

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
    score: {
        correct: 0,
        incorrect: 0
    }
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
        case INIT_DECK_CARD:
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
        case INIT_JS_DECK:
            const curr = cardData[state.activeDeckIndex]
            // debugger
            return {
                ...state,
                currentDeck: curr,
                cardGroup: cardData,
                currentCard: curr.cards[state.activeCardIndex]
            }
        case INIT_QUIZ_DECK:
            const quizDeck = {
                title: 'q',
                cards: [
                    {
                        front: 'what is the purpose of life?',
                        back: '42 is the purpose of lfe',
                        meta: 'the ultimate answer',
                        language: 'english',
                        question: 'what is the purpose of life?',
                        mode: 'multiple',
                        side: 'front',
                        answers: [
                            {
                                id: 1,
                                text: '69',
                                correct: false
                            },
                            {
                                id: 2,
                                text: '42',
                                correct: true
                            }
                        ]
                    },
                    {
                        front: 'who is batman?',
                        back: 'bruce',
                        meta: 'joker has a question',
                        language: 'english',
                        question: 'who is batman?',
                        mode: 'multiple',
                        side: 'front',
                        answers: [
                            {
                                id: 1,
                                text: 'bruce',
                                correct: true
                            },
                            {
                                id: 2,
                                text: 'alfred',
                                correct: false
                            }
                        ]
                    }
                ]
            }
            return {
                ...state,
                activeCardIndex: 0,
                currentDeck: quizDeck, // update transfom... deckMaker
                currentCard: quizDeck.cards[0]

            }
        case UPDATE_SCORE:
            const isAnswerCorrect = action.payload.correct
            const scoreState = state.score
            return {
                ...state,
                score: {
                    correct: isAnswerCorrect ? scoreState.correct + 1 : scoreState.correct,
                    incorrect: !isAnswerCorrect ? scoreState.incorrect + 1 : scoreState.incorrect,
                }
            }
        case INIT_DECK:
            const sections = deckMaker(action.payload.sections)
            const x = sections[0]
            // debugger
            return {
                ...state,
                currentDeck: x,
                cardGroup: sections,
                currentCard: x.cards[state.activeCardIndex]
            }
        case SELECT_DECK:
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
        case SELECT_CARD:
            const selectCard = state.currentDeck.cards[action.index]
            return {
                ...state,
                currentCard: selectCard,
                activeCardIndex: action.index,
                timerRunning: false,
                cardUrl: selectCard.id,
            }
        case FLIP_CARD:
            const card = state.currentCard
            return {
                ...state,
                currentCard: { ...card, side: card.side === 'front' ? 'back' : 'front' },
                isBack: card.side === 'back'
            }
        case FORWARD_BACKWARD_CARD:
            const indexToTry = state.activeCardIndex + action.diff
            let limit = state.currentDeck.cards.length
            const allowedToShift = indexToTry >= 0 && indexToTry < limit
            const newIndex = allowedToShift ? indexToTry : state.activeCardIndex
            return {
                ...state,
                activeCardIndex: newIndex,
                currentCard: state.currentDeck.cards[newIndex],
                cardUrl: state.currentDeck.cards[newIndex].id,
            }
        case FORWARD_BACKWARD_DECK:
            const deckToTry = state.activeDeckIndex + action.diff
            let lim = state.cardGroup.length
            const allowed = deckToTry >= 0 && deckToTry < lim
            const newI = allowed ? deckToTry : state.activeDeckIndex
            return {
                ...state,
                currentDeck: state.cardGroup[newI],
                activeDeckIndex: newI,
                activeCardIndex: 0,
                currentCard: state.cardGroup[newI].cards[0],
                timerRunning: false,
                deckUrl: state.cardGroup[newI].id,
            }
        case START_DECK_CYCLE:
            return {
                ...state,
                timerRunning: true,
            }
        case STOP_DECK_CYCLE:
            return {
                ...state,
                timerRunning: false,
            }
        default:
            return state
    }
}