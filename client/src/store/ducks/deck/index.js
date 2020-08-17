// 1. imports
import axios from 'axios'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const INIT_DECK = 'deck/INIT_DECK'
const INIT_JS_DECK = 'deck/INIT_JS_DECK'
const INIT_QUIZ_DECK = 'deck/INIT_QUIZ_DECK'
const SELECT_DECK = 'deck/SELECT_DECK'

// 3. initial state
const initialState = {
  deck: {
    "title": "title",
    "sections": [
      {
        "id": "c884d55d-4cf9-4cb8-8e8b-cdead07b793a",
        "title": "cool",
        "cards": [
          {
            "front": "#front",
            "back": "#back",
            "meta": "meta",
            "language": "js",
            "id": "90bb4d90-0f4a-4592-bbd9-c5d5579b3516",
            "side": "front"
          }
        ]
      },
      {
        "id": "c884d55d-4cf9-4cb8-8e8b-cdead07b793a",
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
  activeDeckIndex: 0,
  activeCardIndex: 0
}

// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_DECK:
      return {
        ...state,
        activeDeckIndex: action.payload,
        activeCardIndex: 0
      }
    case INIT_DECK:
      return {
        ...state,
      }
    default:
      return state
  }
}

// 5. action creators
export function initDeck(deckId, deck) {
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
  const activeDeckIndex = useSelector(appState => appState.deckState.activeDeckIndex)
  const currentCard = useSelector(appState => {
    const sections = appState.deckState.deck.sections
    const deckIndex = appState.deckState.activeDeckIndex
    const cardIndex = appState.deckState.activeCardIndex
    return sections[deckIndex].cards[cardIndex]
  })
  const currentSection = useSelector(appState => appState.deckState.deck.sections[activeDeckIndex])
  const setDeckPreview = (d) => dispatch(initDeck('preview', d))
  const selectDeck = (index) => dispatch({type: SELECT_DECK, payload: index})
  return { deck, setDeckPreview, activeCardIndex, currentCard, activeDeckIndex, selectDeck, currentSection }
}
