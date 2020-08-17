// 1. imports
import axios from 'axios'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const INIT_DECK = 'deck/INIT_DECK'
const INIT_JS_DECK = 'deck/INIT_JS_DECK'
const INIT_QUIZ_DECK = 'deck/INIT_QUIZ_DECK'
const SELECT_DECK = 'deck/SELECT_DECK'
const SELECT_CARD = 'deck/SELECT_CARD'
const FLIP_CARD = 'deck/FLIP_CARD'
const FORWARD_BACKWARD_CARD = 'deck/FORWARD_BACKWARD_CARD'
const FORWARD_BACKWARD_DECK = 'deck/FORWARD_BACKWARD_DECK'

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
  currentCard: {}
}

// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
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
    // case FORWARD_BACKWARD_CARD:
    //   const indexToTry = state.activeCardIndex + action.diff
    //   let limit = state.currentDeck.cards.length
    //   const allowedToShift = indexToTry >= 0 && indexToTry < limit
    //   const newIndex = allowedToShift ? indexToTry : state.activeCardIndex
    //   return {
    //       ...state,
    //       activeCardIndex: newIndex,
    //       currentCard: state.currentDeck.cards[newIndex],
    //       cardUrl: state.currentDeck.cards[newIndex].id,
    //   }
    // case FORWARD_BACKWARD_DECK:
    //   const deckToTry = state.activeSectionIndex + action.diff
    //   let lim = state.cardGroup.length
    //   const allowed = deckToTry >= 0 && deckToTry < lim
    //   const newI = allowed ? deckToTry : state.activeSectionIndex
    //   return {
    //       ...state,
    //       currentDeck: state.cardGroup[newI],
    //       activeSectionIndex: newI,
    //       activeCardIndex: 0,
    //       currentCard: state.cardGroup[newI].cards[0],
    //       timerRunning: false,
    //       deckUrl: state.cardGroup[newI].id,
    //   }
    default:
      return state
  }
}

// 5. action creators
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

// 6. custom hook
export function useDeck() {
  const dispatch = useDispatch()
  const deck = useSelector(appState => appState.deckState.deck)
  const activeCardIndex = useSelector(appState => appState.deckState.activeCardIndex)
  const activeSectionIndex = useSelector(appState => appState.deckState.activeSectionIndex)
  const currentCard = useSelector(appState => appState.deckState.currentCard)
  const currentSection = useSelector(appState => appState.deckState.deck.sections[activeSectionIndex])
  const setDeckPreview = (d) => dispatch(initDeck('preview', d))
  const selectDeck = (index) => dispatch({type: SELECT_DECK, payload: index})
  const selectCard = (index) => dispatch({type: SELECT_CARD, payload: index})
  const manageSide = () => dispatch({type: FLIP_CARD})
  const initDeck = () => dispatch(init('preview'))
  const cardUrl = useSelector(appState => appState.deckState.cardUrl)
  const sectionUrl = useSelector(appState => appState.deckState.sectionUrl)
  const isPreview = true
  return {
    deck,
    isPreview,
    setDeckPreview,
    initDeck,
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
