import {
  INIT_DECK,
  INIT_SECTION_CARD,
  INIT_JS_DECK,
  SELECT_SECTION,
  FORWARD_BACKWARD_DECK,
  START_DECK_CYCLE,
  STOP_DECK_CYCLE,
  GET_DECKS,
} from './actions'

import cardData from '../../../seed/js/dynamic-seed'

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
      const { sectionId } = action.payload
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
        currentSection,
      } = fetchMetaFromDeck(sectionItems, action.payload)
      return {
        ...state,
        activeSectionIndex,
        sectionUrl,
        title,
        sections,
        currentSection,
      }
    }
    case SELECT_SECTION: {
      const currentSection = state.sections[action.payload.index]
      return {
        ...state,
        activeSectionIndex: action.payload.index,
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
        activeSectionIndex: newIndex,
        currentSection: currSection,
        sectionUrl: currSection.id,
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
