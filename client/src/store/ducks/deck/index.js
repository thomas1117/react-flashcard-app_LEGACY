// 1. imports
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { initSectionCardItem } from './card-manager'

// 2. action definitions
import {
  SELECT_SECTION,
  FORWARD_BACKWARD_DECK,
  START_DECK_CYCLE,
  STOP_DECK_CYCLE,
  GET_DECKS,
} from './actions'

export { default } from './reducer'

export function getDeckCards() {
  return (dispatch) => {
    return axios.get(`/api/decks`).then((resp) => {
      dispatch({
        type: GET_DECKS,
        payload: resp.data,
      })
    })
  }
}

export function cycleDeckItem(index) {
  return {
    type: START_DECK_CYCLE,
  }
}

export function pauseCycleDeckItem(index) {
  return {
    type: STOP_DECK_CYCLE,
  }
}

// 6. custom hook
export function useDeck() {
  const dispatch = useDispatch()
  const deckState = useSelector((appState) => appState.deckState)
  const {
    title,
    sections,
    activeSectionIndex,
    timerRunning,
    lastSectionIndex,
  } = deckState
  const currentSection =
    useSelector(
      (appState) => appState.deckState.sections[activeSectionIndex]
    ) || {}
  const decks = useSelector((appState) => appState.deckState.decks)
  const setDeckPreview = (d) => dispatch(initDeck('preview', d))
  const selectSection = (index, section) =>
    dispatch({ type: SELECT_SECTION, payload: { index, section } })
  const initDeck = (id) => {}
  const initSectionCard = (i) => dispatch(initSectionCardItem(i))
  const sectionUrl = useSelector((appState) => appState.deckState.sectionUrl)
  const updateSettings = () => {}
  const cycleDeck = () => dispatch(cycleDeckItem())
  const pauseCycleDeck = () => dispatch(pauseCycleDeckItem())
  const handleDeckIndexChange = (diff) =>
    dispatch({
      type: FORWARD_BACKWARD_DECK,
      diff,
    })
  const answerCorrect = () => {}
  const getDecks = () => dispatch(getDeckCards())
  // const initSectionCardItem = () => {}
  return {
    title,
    sections,
    lastSectionIndex,
    decks,
    activeSectionIndex,
    currentSection,
    sectionUrl,
    timerRunning,
    selectSection,
    setDeckPreview,
    initDeck,
    getDecks,
    initSectionCard,
    updateSettings,
    cycleDeck,
    pauseCycleDeck,
    handleDeckIndexChange,
    answerCorrect,
  }
}
