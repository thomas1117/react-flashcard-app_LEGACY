import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import cardData from '../../seed/js/dynamic-seed'
import { RootState } from '../../app/store'
// import { Card } from '../../models'

type Card = {
  id: number
  front: string
  back: string
  side: string
  language: string
  meta: string
}

// strip away class...
const SECTIONS = cardData.sections.map((item) => {
  return item
})

export interface CardSetting {
  frontTime: number
  backTime: number
}

interface DeckIds {
  cardId: number
  sectionId: number
  deckId: number | string
}

const logger = (v: any) => console.log(JSON.parse(JSON.stringify(v)))
const settings: string | any = localStorage.getItem('CARD_SETTINGS')
const cardSettings: CardSetting = JSON.parse(settings) || {}

interface Section {
  title: string
  id: number
  cards: Card[]
}

interface DeckState {
  deckId: number | string
  activeTheme: string
  activeSectionIndex: number
  activeCardIndex: number
  activeCard: Card
  sections: Section[]
  cyclingSection: boolean
  timeCycleFront: number
  timeCycleBack: number
}

const initialState: DeckState = {
  deckId: 'js',
  activeTheme: 'dark-mode',
  activeSectionIndex: 0,
  activeCardIndex: 0,
  activeCard: { id: 1, side: '', meta: '', front: '', back: '', language: '' },
  sections: [],
  cyclingSection: false,
  timeCycleFront: cardSettings.frontTime || 3,
  timeCycleBack: cardSettings.backTime || 5,
}

export const deckSlice = createSlice({
  name: 'deck',
  initialState: initialState,
  reducers: {
    setTheSection: (state, action: PayloadAction<number>) => {
      state.activeSectionIndex = action.payload
      state.activeCardIndex = 0
      state.activeCard = state.sections[state.activeSectionIndex].cards[0]
      // TODO: should I move this?
      if (state.cyclingSection) {
        state.cyclingSection = false
      }
    },
    setTheCard: (state, action: PayloadAction<number>) => {
      state.activeCardIndex = action.payload
      state.activeCard =
        state.sections[state.activeSectionIndex].cards[state.activeCardIndex]
    },
    setTheDeck: (state, action: PayloadAction<Section[]>) => {
      state.sections = action.payload
    },
    manageCardSide: (state) => {
      state.activeCard = {
        ...state.activeCard,
        side: state.activeCard.side === 'front' ? 'back' : 'front',
      }
    },
    setSectionCycle: (state, action: PayloadAction<boolean>) => {
      state.cyclingSection = action.payload
    },
    toggleTheTheme: (state) => {
      state.activeTheme =
        state.activeTheme === 'dark-mode' ? 'light-mode' : 'dark-mode'
    },
    updateTheSettings: (state, action: PayloadAction<CardSetting>) => {
      state.timeCycleFront = action.payload.frontTime
      state.timeCycleBack = action.payload.backTime
    },
    initTheDeck: (state, action: PayloadAction<DeckIds>) => {
      const { cardId, sectionId, deckId } = action.payload
      const sectionIndex =
        state.sections.findIndex((section) => section.id == sectionId) || 0
      const cardIndex =
        state.sections[sectionIndex].cards.findIndex(
          (card) => card.id == cardId
        ) || 0
      state.activeSectionIndex = sectionIndex === -1 ? 0 : sectionIndex
      state.activeCardIndex = cardIndex
      logger(state.sections)
      state.activeCard =
        state.sections[state.activeSectionIndex].cards[state.activeCardIndex]
      state.deckId = deckId
    },
    setTheDeckId: (state, action: PayloadAction<number | string>) => {
      state.deckId = action.payload
    },
  },
})

const {
  setTheSection,
  setTheCard,
  setTheDeck,
  setTheDeckId,
  initTheDeck,
  manageCardSide,
  setSectionCycle,
  toggleTheTheme,
  updateTheSettings,
} = deckSlice.actions

function getTheDeck(id: string | number) {
  return async (dispatch: any) => {
    if (id === 'js') {
      dispatch(setTheDeck(SECTIONS))
    } else {
      const res = await axios.get(`/api/decks/${id}`)
      dispatch(setTheDeckId(id))
      dispatch(setTheDeck(res.data.sections))
    }
  }
}

export const selectCount = (state: any) => state.deck.value

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
  } = useSelector((app: RootState) => app.deck)

  // TODO: come back to this.
  const activeSection = SECTIONS[activeSectionIndex] || {}
  const atSectionEnd = activeCardIndex === activeSection?.cards?.length - 1
  const atDeckEnd = activeSectionIndex === SECTIONS.length - 1
  const setSection = (id: number) => dispatch(setTheSection(id))
  const setCard = (id: number) => dispatch(setTheCard(id))
  const manageSide = () => dispatch(manageCardSide())
  const cycleSection = (bool: boolean) => dispatch(setSectionCycle(bool))
  const toggleTheme = () => dispatch(toggleTheTheme())
  const updateSettings = (settings: CardSetting) =>
    dispatch(updateTheSettings(settings))
  const getDeck = (id: number | string) => dispatch(getTheDeck(id))
  const initDeck = (params: DeckIds) => dispatch(initTheDeck(params))
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
