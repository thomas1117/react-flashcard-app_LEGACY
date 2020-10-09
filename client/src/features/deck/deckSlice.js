import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

import cardData from '../../seed/js/dynamic-seed'

// strip away class...
const SECTIONS = cardData.sections.map((item) => {
  return { ...item, cards: item.cards.map((x) => ({ ...x })) }
})

export const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    activeTheme: 'dark-mode',
    activeSectionIndex: 0,
    activeCardIndex: 0,
    activeCard: SECTIONS[0].cards[0],
    sections: SECTIONS,
    cyclingSection: false,
    timeCycleFront: 3,
    timeCycleBack: 5,
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
  },
})

const {
  setTheSection,
  setTheCard,
  manageCardSide,
  setSectionCycle,
  toggleTheTheme,
} = deckSlice.actions
export const selectCount = (state) => state.deck.value

export const useDeck = () => {
  const dispatch = useDispatch()

  const {
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
  const setSection = (id) => dispatch(setTheSection(id))
  const setCard = (id) => dispatch(setTheCard(id))
  const manageSide = () => dispatch(manageCardSide())
  const cycleSection = (bool) => dispatch(setSectionCycle(bool))
  const toggleTheme = () => dispatch(toggleTheTheme())
  return {
    activeSection,
    activeSectionIndex,
    activeCardIndex,
    sections,
    atSectionEnd,
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
  }
}

export default deckSlice.reducer
