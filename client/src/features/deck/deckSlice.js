import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

import cardData from '../../seed/js/dynamic-seed'

// strip away class...
const SECTIONS = cardData.sections.map((item) => {
  return { ...item, cards: item.cards.map((x) => ({ ...x })) }
})

const cardSettings = JSON.parse(localStorage.getItem('CARD_SETTINGS')) || {}

export const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    deckId: 'js',
    activeTheme: 'dark-mode',
    activeSectionIndex: 0,
    activeCardIndex: 0,
    activeCard: {},
    sections: [],
    cyclingSection: false,
    timeCycleFront: cardSettings.frontTime || 3,
    timeCycleBack: cardSettings.backTime || 5,
  },
  reducers: {
    setTheSection: (state, action) => {
      state.activeSectionIndex = action.payload
      state.activeCardIndex = 0
      state.activeCard = state.sections[state.activeSectionIndex].cards[0]
      // TODO: should I move this?
      if (state.cyclingSection) {
        state.cyclingSection = false
      }
    },
    setTheCard: (state, action) => {
      state.activeCardIndex = action.payload
      state.activeCard =
        state.sections[state.activeSectionIndex].cards[state.activeCardIndex]
    },
    setTheDeck: (state, action) => {
      state.sections = action.payload
    },
    manageCardSide: (state, action) => {
      state.activeCard.side =
        state.activeCard.side === 'front' ? 'back' : 'front'
    },
    setSectionCycle: (state, action) => {
      state.cyclingSection = action.payload
    },
    toggleTheTheme: (state, action) => {
      state.activeTheme =
        state.activeTheme === 'dark-mode' ? 'light-mode' : 'dark-mode'
    },
    updateTheSettings: (state, action) => {
      state.timeCycleFront = action.payload.frontTime
      state.timeCycleBack = action.payload.backTime
    },
    initTheDeck: (state, action) => {
      const { cardId, sectionId } = action.payload
      const sectionIndex =
        state.sections.findIndex((section) => section.id == sectionId) || 0
      const cardIndex =
        state.sections[sectionIndex].cards.findIndex(
          (card) => card.id == cardId
        ) || 0
      state.activeSectionIndex = sectionIndex
      state.activeCardIndex = cardIndex
      state.activeCard = state.sections[sectionIndex].cards[cardIndex] || {}
    },
  },
})

const {
  setTheSection,
  setTheCard,
  setTheDeck,
  initTheDeck,
  manageCardSide,
  setSectionCycle,
  toggleTheTheme,
  updateTheSettings,
} = deckSlice.actions

function getTheDeck(id) {
  return (dispatch) => {
    if (id === 'js') {
      dispatch(setTheDeck(SECTIONS))
    }
  }
}

export const selectCount = (state) => state.deck.value

export const useDeck = () => {
  const dispatch = useDispatch()

  const {
    deckId,
    activeSectionIndex,
    activeCardIndex,
    sections,
    activeCard,
    activeTheme,
    cyclingSection,
    timeCycleFront,
    timeCycleBack,
  } = useSelector((app) => app.deck)

  // TODO: come back to this.
  const activeSection = SECTIONS[activeSectionIndex]
  const atSectionEnd = activeCardIndex === activeSection.cards.length - 1
  const atDeckEnd = activeSectionIndex === SECTIONS.length - 1
  const setSection = (id) => dispatch(setTheSection(id))
  const setCard = (id) => dispatch(setTheCard(id))
  const manageSide = () => dispatch(manageCardSide())
  const cycleSection = (bool) => dispatch(setSectionCycle(bool))
  const toggleTheme = () => dispatch(toggleTheTheme())
  const updateSettings = (settings) => dispatch(updateTheSettings(settings))
  const getDeck = (id) => dispatch(getTheDeck(id))
  const initDeck = (params) => dispatch(initTheDeck(params))
  return {
    deckId,
    getDeck,
    initDeck,
    activeSection,
    activeSectionIndex,
    activeCardIndex,
    sections,
    atSectionEnd,
    atDeckEnd,
    setSection,
    setCard,
    activeCard,
    activeTheme,
    manageSide,
    cycleSection,
    toggleTheme,
    cyclingSection,
    timeCycleFront,
    timeCycleBack,
    updateSettings,
  }
}

export default deckSlice.reducer
