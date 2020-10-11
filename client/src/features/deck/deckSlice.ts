import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import cardData from '../../seed/js/dynamic-seed'
import { RootState } from '../../app/store'
import { DeckState, CardSetting, DeckIds, DeckMeta } from './interfaces'

// strip away legacy class definition...
// TODO: remove es6 model classes in favor of interface object casting or some shit like that...
const manageCards = (deck: any) => {
  return { ...deck, cards: deck.cards.map((x: any) => ({ ...x })) }
}
const SECTIONS = cardData.sections.map(manageCards)

const indexOrDefault = (index: number, defaultValue = 0) =>
  index === -1 ? defaultValue : index
// TODO: dumb console.log hack due to proxy issue of immer
const logger = (v: any) => console.log(JSON.parse(JSON.stringify(v)))
// TODO: abstract storage mechanism into service
const settings: string | any = localStorage.getItem('CARD_SETTINGS')
const cardSettings: CardSetting = JSON.parse(settings) || {}

const initialState: DeckState = {
  deckId: 'js',
  decks: [],
  sectionMap: {},
  activeTheme: 'dark-mode',
  activeSectionIndex: 0,
  activeCardIndex: 0,
  activeSection: {
    id: 1,
    title: '',
    cards: []
  },
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
  cardTimeFront: cardSettings.frontTime || 3,
  cardTimeBack: cardSettings.backTime || 5,
}

export const deckSlice = createSlice({
  name: 'deck',
  initialState: initialState,
  reducers: {
    setTheSection: (state, action: PayloadAction<number>) => {
      state.activeSection = state.sectionMap[action.payload]
      state.activeCardIndex = 0
      state.activeCard = state.activeSection.cards[0]
      if (state.cyclingSection) {
        state.cyclingSection = false
      }
    },
    setTheSectionByIndex: (state, action: PayloadAction<number>) => {
      state.activeSectionIndex = action.payload
      state.activeSection = state.sections[action.payload]
    },
    setTheCard: (state, action: PayloadAction<number>) => {
      state.activeCardIndex = action.payload
      state.activeCard =
        state.sections[state.activeSectionIndex].cards[state.activeCardIndex]
    },
    setTheCardByIndex: (state, action: PayloadAction<number>) => {
      state.activeCardIndex = action.payload
      state.activeCard = state.activeSection.cards[action.payload]
    },
    setTheDeck: (state, action: PayloadAction<DeckMeta>) => {
      const { cardId, sectionId, deckId, sections } = action.payload
      state.deckId = deckId
      state.sections = sections
      const sectionIndex = indexOrDefault(
        state.sections.findIndex((section) => section.id == sectionId)
      )
      const cardIndex = indexOrDefault(
        state.sections[sectionIndex]?.cards.findIndex(
          (card) => card.id == cardId
        )
      )
      state.activeSectionIndex = sectionIndex
      state.activeCardIndex = cardIndex
      const newCard =
        state.sections[sectionIndex]?.cards[cardIndex]
      // TODO: probably should look into some default ts obj cast on this or something...
      state.activeCard = { ...newCard, side: 'front' }
      // make sections easily accessible
      state.sectionMap = state.sections.reduce((map: any, obj) => {
        map[obj.id] = obj
        return map
      }, {})
      state.activeSection = state.sectionMap[sectionId]
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
      state.cardTimeFront = action.payload.frontTime
      state.cardTimeBack = action.payload.backTime
    },
  },
})

const {
  setTheSection,
  setTheSectionByIndex,
  setTheCardByIndex,
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

export const useDeck = () => {
  const dispatch = useDispatch()
  const deckState = useSelector((app: RootState) => app.deck)
  const stateToExpose = {
    deckId: deckState.deckId,
    decks: deckState.decks,
    atDeckEnd: deckState.activeSectionIndex === deckState.sections.length - 1,
    cyclingSection: deckState.cyclingSection,
    sections: deckState.sections,
    activeSection: deckState.activeSection,
    activeSectionIndex: deckState.activeSectionIndex,
    atSectionEnd: deckState.activeCardIndex === deckState.activeSection?.cards?.length - 1,
    activeCard: deckState.activeCard,
    activeCardIndex: deckState.activeCardIndex,
    cardTimeFront: deckState.cardTimeFront,
    cardTimeBack: deckState.cardTimeBack,
    activeTheme: deckState.activeTheme,
  }
  const methodsToExpose = {
    getDeck: (params: DeckIds) => dispatch(getTheDeck(params)),
    getDecks: () => dispatch(getTheDecks()),
    setSection: (id: number) => dispatch(setTheSection(id)),
    setSectionByIndex: (index: number) => dispatch(setTheSectionByIndex(index)),
    setCard: (id: number) => dispatch(setTheCard(id)),
    setCardByIndex: (index: number) => dispatch(setTheCardByIndex(index)),
    manageSide: () => dispatch(manageCardSide()),
    cycleSection: (bool: boolean) => dispatch(setSectionCycle(bool)),
    toggleTheme: () => dispatch(toggleTheTheme()),
    updateSettings: (settings: CardSetting) =>
    dispatch(updateTheSettings(settings)),
  }
  return {
    ...stateToExpose,
    ...methodsToExpose
  }
}

export default deckSlice.reducer
