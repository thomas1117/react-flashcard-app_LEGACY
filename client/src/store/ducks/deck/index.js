// 1. imports
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import cardData from '../../../seed/js/dynamic-seed'

// 2. action definitions
import {
  INIT_DECK,
  INIT_SECTION_CARD,
  INIT_JS_DECK,
  SET_LAST_CARD_INDEX,
  INIT_QUIZ_DECK,
  SELECT_SECTION,
  FORWARD_BACKWARD_DECK,
  START_DECK_CYCLE,
  STOP_DECK_CYCLE,
  GET_DECKS,
} from './actions'

// 3. initial state
const initialState = {
  title: '',
  sections: [],
  activeSectionIndex: 0,
  lastSectionIndex: null,
  sectionUrl: null,
  currentSection: [],
  timerRunning: false,
  decks: [],
}

function fetchMetaFromDeck(sections, deckMeta) {
  const { title, sectionId } = deckMeta
  const activeSectionIndex = sections.findIndex((x) => x.id == sectionId)
  const newSectionIndex = activeSectionIndex === -1 ? 0 : activeSectionIndex
  const currentSection = sections[newSectionIndex]
  return {
    title,
    sections,
    sectionUrl: currentSection.id,
    activeSectionIndex: newSectionIndex,
    currentSection,
  }
}

// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DECKS: {
      return {
        ...state,
        decks: action.payload,
      }
    }
    case INIT_JS_DECK: {
      const jsDeck = {
        title: 'js',
        sections: cardData.sections,
      }
      const { sectionId, cardId } = action.payload
      const {
        title,
        sections,
        currentSection,
        activeSectionIndex,
        sectionUrl,
      } = fetchMetaFromDeck(jsDeck.sections, {
        ...action.payload,
        title: jsDeck.title,
        sectionId,
      })
      return {
        ...state,
        title,
        sections,
        currentSection,
        sectionUrl,
        activeSectionIndex,
        lastSectionIndex: sections.length - 1,
      }
    }
    case INIT_SECTION_CARD: {
      const sectionItems = action.payload.sections
      const {
        title,
        sections,
        sectionUrl,
        activeSectionIndex,
      } = fetchMetaFromDeck(sectionItems, action.payload)
      return {
        ...state,
        activeSectionIndex,
        sectionUrl,
        title,
        sections,
      }
    }
    case SELECT_SECTION: {
      const currentSection = state.sections[action.payload.index]
      return {
        ...state,
        activeSectionIndex: action.payload.index,
        activeCardIndex: 0,
        sectionUrl: currentSection.id,
        currentSection: currentSection,
      }
    }
    case INIT_DECK: {
      const sections = state.sections
      const deckIndex = state.activeSectionIndex
      const cardIndex = state.activeCardIndex
      return {
        ...state,
      }
    }
    case FORWARD_BACKWARD_DECK: {
      const newIndex = state.activeSectionIndex + action.diff
      const currSection = state.sections[newIndex]
      return {
        ...state,
        activeCardIndex: 0,
        activeSectionIndex: newIndex,
        currentSection: currSection,
        sectionUrl: currSection.id,
        activeCardIndex: 0,
        timerRunning: false,
      }
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

export function initSectionCardItem(i) {
  const { cardId, deckId, sectionId } = i
  const deck = {}
  const sectionIndex = cardData.sections.findIndex((x) => x.id == sectionId)
  if (deckId === 'js') {
    return (dispatch) => {
      dispatch({
        type: INIT_JS_DECK,
        payload: { deckId, cardId, sectionId },
      })
      dispatch({
        type: SET_LAST_CARD_INDEX,
        payload: cardData.sections[sectionIndex].cards.length - 1,
      })
    }
  } else if (deckId === 'quiz') {
    return {
      type: INIT_QUIZ_DECK,
      payload: deckId,
    }
  } else if (deckId === 'preview') {
    return {
      type: INIT_SECTION_CARD,
      payload: deck,
    }
  } else {
    return (dispatch) => {
      return axios.get(`/api/decks/${deckId}`).then((resp) => {
        const initDeck = {
          ...resp.data,
          cardId,
          deckId,
          sectionId,
          side: 'front',
        }
        dispatch({
          type: INIT_SECTION_CARD,
          payload: initDeck,
        })
      })
    }
  }
}

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
