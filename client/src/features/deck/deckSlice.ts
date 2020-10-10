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

interface DeckMeta extends DeckIds {
  sections: Section[]
}

const indexOrDefault = (index: number, defaultValue = 0) =>
  index === -1 ? defaultValue : index

const logger = (v: any) => console.log(JSON.parse(JSON.stringify(v)))
const settings: string | any = localStorage.getItem('CARD_SETTINGS')
const cardSettings: CardSetting = JSON.parse(settings) || {}

interface Section {
  id: number
  title: string
  cards: Card[]
}

interface Deck {
  id: number
  title: string
}

interface DeckState {
  deckId: number | string
  decks: Deck[]
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
  decks: [],
  activeTheme: 'dark-mode',
  activeSectionIndex: 0,
  activeCardIndex: 0,
  activeCard: {
    id: 1,
    side: 'front',
    meta: '',
    front: '',
    back: '',
    language: '',
  },
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
    setTheDeck: (state, action: PayloadAction<DeckMeta>) => {
      const { cardId, sectionId, deckId } = action.payload
      state.sections = action.payload.sections
      const sectionIndex = indexOrDefault(
        state.sections.findIndex((section) => section.id == sectionId)
      )
      const cardIndex = indexOrDefault(
        state.sections[sectionIndex].cards.findIndex(
          (card) => card.id == cardId
        )
      )
      state.activeSectionIndex = sectionIndex
      state.activeCardIndex = cardIndex
      const newCard =
        state.sections[state.activeSectionIndex].cards[state.activeCardIndex]
      state.activeCard = { ...newCard, side: 'front' }
      state.deckId = deckId
    },
    setTheDecks: (state, action) => {
      state.decks = action.payload
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
  },
})

const {
  setTheSection,
  setTheCard,
  setTheDeck,
  setTheDecks,
  manageCardSide,
  setSectionCycle,
  toggleTheTheme,
  updateTheSettings,
} = deckSlice.actions

function getTheDeck(params: DeckIds) {
  const { deckId, cardId, sectionId } = params
  return async (dispatch: any) => {
    if (deckId === 'js') {
      dispatch(setTheDeck({ deckId, cardId, sectionId, sections: SECTIONS }))
    } else {
      const res = await axios.get(`/api/decks/${deckId}`)
      dispatch(
        setTheDeck({ deckId, cardId, sectionId, sections: res.data.sections })
      )
    }
  }
}

function getTheDecks() {
  return async (dispatch: any) => {
    const res = await axios.get(`/api/decks`)
    dispatch(setTheDecks(res.data))
  }
}

export const selectCount = (state: any) => state.deck.value

export const useDeck = () => {
  const dispatch = useDispatch()

  const {
    deckId,
    decks,
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
  const getDeck = (params: DeckIds) => dispatch(getTheDeck(params))
  const getDecks = () => dispatch(getTheDecks())
  return {
    deckId,
    decks,
    activeSection,
    activeSectionIndex,
    activeCardIndex,
    sections,
    atSectionEnd,
    atDeckEnd,
    activeCard,
    activeTheme,
    cyclingSection,
    timeCycleFront,
    timeCycleBack,
    getDeck,
    getDecks,
    setSection,
    setCard,
    manageSide,
    cycleSection,
    toggleTheme,
    updateSettings,
  }
}

export default deckSlice.reducer
