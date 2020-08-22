// 1. imports
import axios from 'axios'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const INIT_DECK = 'deck/INIT_DECK'
const INIT_DECK_CARD = 'deck/INIT_DECK_CARD'
const INIT_JS_DECK = 'deck/INIT_JS_DECK'
const INIT_QUIZ_DECK = 'deck/INIT_QUIZ_DECK'
const SELECT_DECK = 'deck/SELECT_DECK'
const SELECT_CARD = 'deck/SELECT_CARD'
const FLIP_CARD = 'deck/FLIP_CARD'
const FORWARD_BACKWARD_CARD = 'deck/FORWARD_BACKWARD_CARD'
const FORWARD_BACKWARD_DECK = 'deck/FORWARD_BACKWARD_DECK'
const START_DECK_CYCLE = 'deck/START_DECK_CYCLE'
const STOP_DECK_CYCLE = 'deck/STOP_DECK_CYCLE'

// 3. initial state
const initialState = {
  deck: {
    "title": "title",
    "sections": [
      {
        "id": "1",
        "title": "cool",
        "cards": [
          {
            "front": "#front",
            "back": "#back",
            "meta": "meta",
            "language": "js",
            "id": "1",
            "side": "front"
          },
          {
            "front": "#front s",
            "back": "#back",
            "meta": "meta",
            "language": "js",
            "id": "2",
            "side": "front"
          }
        ]
      },
      {
        "id": "2",
        "title": "wow",
        "cards": [
          {
            "front": "#front 2",
            "back": "#back 2",
            "meta": "meta 2",
            "language": "js",
            "id": "555",
            "side": "front"
          }
        ]
      }
    ]
  },
  activeSectionIndex: 0,
  activeCardIndex: 0,
  sectionUrl: null,
  cardUrl: null,
  currentCard: {},
  currentDeck: {},
}

// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_DECK_CARD: {
      const { sections } =  state.deck
      const { deck, card } = action.payload
      const activeSectionIndex = sections.findIndex(x => x.id == deck)
      const section = sections[activeSectionIndex]
      let activeCardIndex
      if (activeSectionIndex !== undefined) {
        activeCardIndex = section.cards.findIndex(x => x.id == card)
      } else {
        return state
      }
      const currentCard = section.cards[activeCardIndex]
      return {
        ...state,
        activeSectionIndex,
        activeCardIndex,
        currentCard
      }
    }
    case SELECT_CARD:
      const c = state.deck.sections[state.activeSectionIndex].cards
      return {
        ...state,
        activeCardIndex: action.payload,
        cardUrl: c.find((x, i) => i == action.payload).id,
        currentCard: c.find((x, i) => i == action.payload),
      }
    case SELECT_DECK:
      return {
        ...state,
        activeSectionIndex: action.payload,
        activeCardIndex: 0,
        sectionUrl: state.deck.sections.find((x, i) => i == action.payload).id,
        cardUrl: state.deck.sections[action.payload].cards[0].id,
        currentCard: state.deck.sections[action.payload].cards[0]
      }
    case INIT_DECK:
      const sections = state.deck.sections
      const deckIndex = state.activeSectionIndex
      const cardIndex = state.activeCardIndex
      return {
        ...state,
        currentCard: sections[deckIndex].cards[cardIndex]
      }
    case FLIP_CARD:
      return {
          ...state,
          currentCard: {...state.currentCard, side: state.currentCard.side === 'front' ? 'back' : 'front'}
      }
    case FORWARD_BACKWARD_CARD:
      const indexToTry = state.activeCardIndex + action.diff
      let limit = state.deck.sections[state.activeSectionIndex].cards.length
      const allowedToShift = indexToTry >= 0 && indexToTry < limit
      const newIndex = allowedToShift ? indexToTry : state.activeCardIndex
      return {
          ...state,
          activeCardIndex: newIndex,
          currentCard: state.deck.sections[state.activeSectionIndex].cards[newIndex],
          cardUrl: state.deck.sections[state.activeSectionIndex].cards[newIndex].id,
      }
    case FORWARD_BACKWARD_DECK:
      const deckToTry = state.activeSectionIndex + action.diff
      let lim = state.deck.sections.length
      const allowed = deckToTry >= 0 && deckToTry < lim
      const newI = allowed ? deckToTry : state.activeSectionIndex
      return {
          ...state,
          activeCardIndex: newIndex,
          activeSectionIndex: newI,
          currentCard: state.cardGroup[newI].cards[0],
          deckUrl: state.cardGroup[newI].id,
          activeCardIndex: 0,
          timerRunning: false,
      }
    default:
      return state
  }
}

export function initDeckCardItem(deck, card, side) {
  return {
      type: INIT_DECK_CARD,
      payload: {
          deck,
          card,
          side
      }
  }
}

// 5. action creators
/**
 * @param  {number} deckId
 * @param  {array[]} deck
 */
export function init(deckId, deck) {
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
  } else if (deckId === 'preview') {
    return {
      type: INIT_DECK,
      payload: deck,
    }
  } else {
      return dispatch => {
          axios.get(`/decks/${deckId}`).then(resp => {
              dispatch({
                  type: INIT_DECK,
                  payload: resp.data,
              })
          })
      }
  }
}

export function cycleDeckItem(index) {
  return {
      type: START_DECK_CYCLE
  }
}

export function pauseCycleDeckItem(index) {
  return {
      type: STOP_DECK_CYCLE
  }
}

// 6. custom hook
export function useDeck() {
  const dispatch = useDispatch()
  const deckState = useSelector(appState => appState.deckState)
  const { deck, activeCardIndex, activeDeckIndex, activeSectionIndex, currentCard } = deckState
  const currentSection = useSelector(appState => appState.deckState.deck.sections[activeSectionIndex])
  const setDeckPreview = (d) => dispatch(initDeck('preview', d))
  const selectDeck = (index) => dispatch({type: SELECT_DECK, payload: index})
  const selectCard = (index) => dispatch({type: SELECT_CARD, payload: index})
  const manageSide = () => dispatch({type: FLIP_CARD})
  const initDeck = () => dispatch(init('preview'))
  const initDeckCard = (deck, card, side) => dispatch(initDeckCardItem(deck, card, side))
  const cardUrl = useSelector(appState => appState.deckState.cardUrl)
  const sectionUrl = useSelector(appState => appState.deckState.sectionUrl)
  const updateSettings = () => {}
  const cycleDeck = () => dispatch(cycleDeckItem())
  const pauseCycleDeck = () => dispatch(pauseCycleDeckItem())
  const handleCardIndexChange = (diff) => {
    return {
        type: FORWARD_BACKWARD_CARD,
        diff
    }
}

const handleDeckIndexChange = (diff) => {
    return {
        type: FORWARD_BACKWARD_DECK,
        diff
    }
}
  const answerCorrect = () => {}
  // const initDeckCard = () => {}
  const isPreview = true
  return {
    deck,
    isPreview,
    setDeckPreview,
    initDeck,
    initDeckCard,
    updateSettings,
    cycleDeck,
    pauseCycleDeck,
    handleCardIndexChange,
    handleDeckIndexChange,
    answerCorrect,
    activeCardIndex,
    currentCard,
    activeSectionIndex,
    selectDeck,
    selectCard,
    manageSide,
    currentSection,
    sectionUrl,
    cardUrl
  }
}
 