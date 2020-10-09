import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

import cardData from '../../seed/js/dynamic-seed'

// strip away class...
cardData.sections = cardData.sections.map((item) => {
  return { ...item, cards: item.cards.map((x) => ({ ...x })) }
})
console.log(cardData.sections)

// const

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

const jsDeck = {
  title: 'js',
  sections: cardData.sections,
}
// const { sectionId } = action.payload
// const {
//   title,
//   sections,
//   currentSection,
//   activeSectionIndex,
//   sectionUrl,
// } = fetchMetaFromDeck(jsDeck.sections, {
//   ...action.payload,
//   title: jsDeck.title,
//   sectionId,
// })

export const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    value: 0,
    activeSectionIndex: 0,
    activeCardIndex: 0,
    activeCard: cardData.sections[0].cards[0],
    sections: cardData.sections,
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
  },
})

export const {
  increment,
  decrement,
  incrementByAmount,
  setTheSection,
  setTheCard,
  manageCardSide,
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
  const setSection = (id) => dispatch(setTheSection(id))
  const setCard = (id) => dispatch(setTheCard(id))
  const manageSide = () => dispatch(manageCardSide())
  return {
    activeSectionIndex,
    activeCardIndex,
    sections,
    setSection,
    setCard,
    activeCard,
    manageSide,
  }
}

export default deckSlice.reducer
