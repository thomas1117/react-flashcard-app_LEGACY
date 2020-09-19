import { useSelector, useDispatch } from 'react-redux'

const SELECT_CARD = 'card/SELECT_CARD'
const FORWARD_BACKWARD_CARD = 'card/FORWARD_BACKWARD_CARD'
const FLIP_CARD = 'card/FLIP_CARD'
const SET_LAST_CARD_INDEX = 'card/SET_LAST_CARD_INDEX'

const initialState = {
  activeCardIndex: 0,
  lastCardIndex: null,
  cardUrl: null,
  currentCard: {
    side: '',
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CARD: {
      return {
        ...state,
        activeCardIndex: action.payload.index,
        currentCard: action.payload.card,
      }
    }
    case SET_LAST_CARD_INDEX: {
      return {
        ...state,
        lastCardIndex: action.payload,
      }
    }
    case FORWARD_BACKWARD_CARD: {
      const newIndex = state.activeCardIndex + action.diff
      return {
        ...state,
        activeCardIndex: newIndex,
      }
    }
    case FLIP_CARD: {
      return {
        ...state,
        currentCard: {
          ...state.currentCard,
          side: state.currentCard.side === 'front' ? 'back' : 'front',
        },
      }
    }
    default:
      return state
  }
}

export function useCard() {
  const dispatch = useDispatch()
  const activeSectionIndex = useSelector(
    (appState) => appState.deckState.activeSectionIndex
  )
  const currentSection =
    useSelector(
      (appState) => appState.deckState.sections[activeSectionIndex]
    ) || {}
  const activeCardIndex = useSelector(
    (appState) => appState.cardState.activeCardIndex
  )
  const side = useSelector((appState) => appState.cardState.side)
  const lastCardIndex = useSelector(
    (appState) => appState.cardState.lastCardIndex
  )
  const currentCard = useSelector((appState) => appState.cardState.currentCard)

  const selectCard = (index, card) =>
    dispatch({ type: SELECT_CARD, payload: { index, card } })
  const handleCardIndexChange = (diff) =>
    dispatch({
      type: FORWARD_BACKWARD_CARD,
      diff,
    })
  const manageSide = () => dispatch({ type: FLIP_CARD })
  return {
    activeCardIndex,
    currentCard,
    cardUrl: currentCard.id,
    selectCard,
    lastCardIndex,
    handleCardIndexChange,
    manageSide,
  }
}
