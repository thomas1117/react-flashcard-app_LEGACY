// 1. imports
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cardData from '../../../seed/js/dynamic-seed'

// 2. action definitions
import {
  INIT_DECK,
  INIT_SECTION_CARD,
  INIT_JS_DECK,
  INIT_QUIZ_DECK,
  SELECT_DECK,
  SELECT_CARD,
  FLIP_CARD,
  FORWARD_BACKWARD_CARD,
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
  activeCardIndex: 0,
  sectionUrl: null,
  cardUrl: null,
  currentCard: {
    side: '',
  },
  timerRunning: false,
  decks: [],
}

function fetchMetaFromDeck(sections, deckMeta) {
  const { title, cardId, side, sectionId } = deckMeta
  const activeSectionIndex = sections.findIndex((x) => x.id == sectionId)
  const newSectionIndex = activeSectionIndex === -1 ? 0 : activeSectionIndex
  const currentCards = sections[newSectionIndex].cards
  const activeCardIndex = currentCards.findIndex((x) => x.id == cardId)
  const newCardIndex = activeCardIndex === -1 ? 0 : activeCardIndex
  const newCard = { ...currentCards[newCardIndex], side: 'front' }
  const currentSection = sections[newSectionIndex]
  const currentCard = currentSection.cards[newCardIndex]
  return {
    title,
    sections,
    sectionUrl: currentSection.id,
    cardUrl: currentCard.id,
    activeSectionIndex: newSectionIndex,
    activeCardIndex: newCardIndex,
    currentCard: newCard,
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
        activeCardIndex,
        currentCard,
        sectionUrl,
        cardUrl,
      } = fetchMetaFromDeck(jsDeck.sections, {
        ...action.payload,
        title: jsDeck.title,
        sectionId,
        cardId,
      })
      return {
        ...state,
        title,
        sections,
        currentSection,
        sectionUrl,
        cardUrl,
        activeSectionIndex,
        activeCardIndex,
        currentCard,
      }
    }
    case INIT_SECTION_CARD: {
      const sectionItems = action.payload.sections
      const {
        title,
        sections,
        sectionUrl,
        cardUrl,
        activeSectionIndex,
        activeCardIndex,
        currentCard,
      } = fetchMetaFromDeck(sectionItems, action.payload)
      return {
        ...state,
        activeSectionIndex,
        activeCardIndex,
        currentCard,
        cardUrl,
        sectionUrl,
        title,
        sections,
      }
    }
    case SELECT_CARD: {
      const c = state.sections[state.activeSectionIndex].cards
      const currentCard = c.find((x, i) => i === action.payload)
      return {
        ...state,
        activeCardIndex: action.payload,
        cardUrl: currentCard.id,
        currentCard: { ...currentCard, side: 'front' },
      }
    }
    case SELECT_DECK: {
      const currentSection = state.sections[action.payload]
      const currentCard = currentSection.cards[0]
      return {
        ...state,
        activeSectionIndex: action.payload,
        activeCardIndex: 0,
        sectionUrl: state.sections.find((x, i) => i === action.payload).id,
        cardUrl: currentCard.id,
        currentCard: currentCard,
      }
    }
    case INIT_DECK: {
      const sections = state.sections
      const deckIndex = state.activeSectionIndex
      const cardIndex = state.activeCardIndex
      const currentCard = sections[deckIndex].cards[cardIndex]
      return {
        ...state,
        currentCard,
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
    case FORWARD_BACKWARD_CARD: {
      const indexToTry = state.activeCardIndex + action.diff
      const currentSection = state.sections[state.activeSectionIndex]
      let limit = currentSection.cards.length
      const allowedToShift = indexToTry >= 0 && indexToTry < limit
      const newIndex = allowedToShift ? indexToTry : state.activeCardIndex
      const currentCard = currentSection.cards[newIndex]
      return {
        ...state,
        activeCardIndex: newIndex,
        currentCard: currentCard,
        sectionUrl: currentSection.id,
        cardUrl: currentCard.id,
      }
    }
    case FORWARD_BACKWARD_DECK: {
      const deckToTry = state.activeSectionIndex + action.diff
      const sections = state.sections
      let lim = sections.length
      const allowed = deckToTry >= 0 && deckToTry < lim
      const newI = allowed ? deckToTry : state.activeSectionIndex
      const currSection = sections[newI]
      const currentCard = currSection.cards[0]
      return {
        ...state,
        activeCardIndex: 0,
        activeSectionIndex: newI,
        currentCard,
        sectionUrl: currSection.id,
        cardUrl: currentCard.id,
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
  if (deckId === 'js') {
    return {
      type: INIT_JS_DECK,
      payload: { deckId, cardId, sectionId },
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
    activeCardIndex,
    activeSectionIndex,
    currentCard,
    timerRunning,
  } = deckState
  const currentSection =
    useSelector(
      (appState) => appState.deckState.sections[activeSectionIndex]
    ) || {}
  const decks = useSelector((appState) => appState.deckState.decks)
  const setDeckPreview = (d) => dispatch(initDeck('preview', d))
  const selectDeck = (index) => dispatch({ type: SELECT_DECK, payload: index })
  const selectCard = (index) => dispatch({ type: SELECT_CARD, payload: index })
  const manageSide = () => dispatch({ type: FLIP_CARD })
  const initDeck = (id) => {}
  const initSectionCard = (i) => dispatch(initSectionCardItem(i))
  const cardUrl = useSelector((appState) => appState.deckState.cardUrl)
  const sectionUrl = useSelector((appState) => appState.deckState.sectionUrl)
  const updateSettings = () => {}
  const cycleDeck = () => dispatch(cycleDeckItem())
  const pauseCycleDeck = () => dispatch(pauseCycleDeckItem())
  const handleCardIndexChange = (diff) =>
    dispatch({
      type: FORWARD_BACKWARD_CARD,
      diff,
    })

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
    setDeckPreview,
    initDeck,
    getDecks,
    initSectionCard,
    updateSettings,
    cycleDeck,
    pauseCycleDeck,
    handleCardIndexChange,
    handleDeckIndexChange,
    answerCorrect,
    activeCardIndex,
    currentCard,
    decks,
    activeSectionIndex,
    selectDeck,
    selectCard,
    manageSide,
    currentSection,
    sectionUrl,
    timerRunning,
    cardUrl,
  }
}
