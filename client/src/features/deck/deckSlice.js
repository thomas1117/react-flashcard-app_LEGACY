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
    value: 0,
    activeTheme: 'dark-mode',
    activeSectionIndex: 0,
    activeCardIndex: 0,
    activeCard: SECTIONS[0].cards[0],
    sections: SECTIONS,
    cyclingSection: false,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
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
  },
})

export const {
  increment,
  decrement,
  incrementByAmount,
  setTheSection,
  setTheCard,
  manageCardSide,
  setSectionCycle,
} = deckSlice.actions
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}
export const selectCount = (state) => state.deck.value

export const useDeck = () => {
  const dispatch = useDispatch()
  const activeSectionIndex = useSelector((app) => app.deck.activeSectionIndex)
  const activeCardIndex = useSelector((app) => app.deck.activeCardIndex)
  const sections = useSelector((app) => app.deck.sections)
  const activeCard = useSelector((app) => app.deck.activeCard)
  const activeTheme = useSelector((app) => app.deck.activeTheme)
  const cyclingSection = useSelector((app) => app.deck.cyclingSection)
  // TODO: come back to this.
  const activeSection = SECTIONS[activeSectionIndex]
  const atSectionEnd = activeCardIndex === activeSection.cards.length - 1
  const setSection = (id) => dispatch(setTheSection(id))
  const setCard = (id) => dispatch(setTheCard(id))
  const manageSide = () => dispatch(manageCardSide())
  const cycleSection = (bool) => dispatch(setSectionCycle(bool))
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
    cyclingSection,
    timeCycleFront: 3,
    timeCycleBack: 5,
  }
}

export default deckSlice.reducer
