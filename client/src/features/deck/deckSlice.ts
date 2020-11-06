import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import JS_SEED_DATA from '../../seed/js/dynamic-seed'
import { RootState } from '../../app/store'
import { DeckState, DeckIds, DeckMeta } from './interfaces'
import UUID from '../../utils/id';

// strip away legacy class definition...
// TODO: remove es6 model classes in favor of interface object casting or some shit like that...
const manageCards = (deck: any) => {
  return { ...deck, cards: deck.cards.map((x: any) => ({ ...x })) }
}
const SECTIONS = JS_SEED_DATA.sections.map(manageCards)
const initialState: DeckState = {
  deckId: 'js',
  deckTitle: '',
  decks: [],
  sectionMap: {},
  cardMap: {},
  activeSectionIndex: 0,
  activeCardIndex: 0,
  activeSection: {
    id: '',
    title: '',
    cards: []
  },
  activeCard: {
    id: '',
    side: 'front',
    meta: '',
    front: '',
    back: '',
    language: '',
  },
  sections: [],
  sectionIds: [],
  activeCardIds: [],
  cyclingSection: false,
}

export const deckSlice = createSlice({
  name: 'deck',
  initialState: initialState,
  reducers: {
    createSection: (state, action) => {
      const sectionId = UUID()
      const newSection = {
        id: sectionId,
        title: action.payload,
        cards: [
          // {
          //   id: UUID(),
          //   side: 'front',
          //   meta: 'start',
          //   front: '# front side',
          //   back: '## back side',
          //   language: 'markdown',
          // }
        ]
      }
      state.sections.push(newSection)
      state.sectionMap[sectionId] = newSection
      state.activeSection = state.sectionMap[sectionId]
      state.activeCardIndex = 0
      // state.activeCard = state.activeSection.cards[0]
    },
    activeCardFront: (state, action: PayloadAction<string>) => {
      state.activeCard.front = action.payload
    },
    activeCardBack: (state, action: PayloadAction<string>) => {
      state.activeCard.back = action.payload
    },
    activeCardLanguage: (state, action: PayloadAction<string>) => {
      state.activeCard.language = action.payload
    },
    createCard: (state,action) => {
      const cardId = UUID()
      const newCard = {
        id: cardId,
        side: 'front',
        meta: action.payload,
        front: '# front side',
        back: '## back side',
        language: 'markdown',
      }
      state.activeSection.cards.push(newCard)
      state.sectionMap[state.activeSection.id].cards.push(newCard)
      state.cardMap[cardId] = newCard
      state.activeCard = newCard
    },
    setDeckTitle: (state, action: PayloadAction<string>) => {
      state.deckTitle = action.payload
    },
    setTheSection: (state, action: PayloadAction<string>) => {
      state.activeSection = state.sectionMap[action.payload]
      state.activeCardIndex = 0
      if (state.activeSection.cards.length) {
        state.activeCard = state.activeSection.cards[0]
        state.activeCardIds = state.activeSection.cards.map(c => c.id)
      }
      const index = state.sections.findIndex(c => c.id == action.payload)
      state.activeSectionIndex = index > - 1 ? index : 0
      if (state.cyclingSection) {
        state.cyclingSection = false
      }
    },
    setTheCard: (state, action: PayloadAction<string>) => {
      state.activeCard = state.cardMap[action.payload]
      const index = state.activeSection.cards.findIndex(c => c.id == action.payload)
      state.activeCardIndex = index > - 1 ? index : 0
    },
    setTheDeck: (state, action: PayloadAction<DeckMeta>) => {
      const { cardId, sectionId, deckId, deckTitle, sections } = action.payload
      state.deckId = deckId
      state.sections = sections
      state.sectionMap = state.sections.reduce((map: any, obj) => {
        map[obj.id] = obj
        return map
      }, {})
      state.cardMap = state.sections.reduce((map: any, obj) => {
        obj.cards.forEach(card => {
          map[card.id] = card
        })
        return map
      }, {})
      state.deckTitle = deckTitle || state.deckId
      state.activeSection = state.sectionMap[sectionId] || state.sections[0]
      state.sectionIds = state.sections.map(x => x.id)
      state.activeCardIds = state.activeSection.cards.map(x => x.id)
      const findItemInList = (list: any, id: any) => list?.findIndex((x: any) => x.id == id)
      const indexOrZero = (index: number) => index === -1 ? 0 : index
      const itemIndexOrZero = (list: any, id: any) => indexOrZero(findItemInList(list, id))
      const sectionIndex = itemIndexOrZero(state.sections, sectionId)
      const potentialCardList = state.activeSection?.cards
      const cardIndex = itemIndexOrZero(potentialCardList, cardId)
      state.activeSectionIndex = sectionIndex
      state.activeCardIndex = cardIndex
      const newCard = potentialCardList[cardIndex]
      // TODO: probably should look into some default ts obj cast on this or something...
      state.activeCard = { ...newCard, side: 'front' }
      // make sections easily accessible
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
  },
})

const {
  setTheSection,
  setTheCard,
  setTheDeck,
  setTheDecks,
  manageCardSide,
  setSectionCycle,
  createSection,
  createCard,
  setDeckTitle,
  activeCardFront,
  activeCardBack,
  activeCardLanguage
} = deckSlice.actions

function getTheDeck(params: DeckIds) {
  const { deckId, cardId, sectionId } = params
  return async (dispatch: any) => {
    if (deckId === 'js') {
      dispatch(setTheDeck({ deckId, cardId, sectionId, sections: SECTIONS, deckTitle: 'js' }))
    } else {
      const res = await axios.get(`/api/decks/${deckId}`)
      dispatch(
        setTheDeck({ deckId, cardId, sectionId, sections: res.data.sections, deckTitle: res.data.title })
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
    sectionIds: deckState.sectionIds,
    activeCardIds: deckState.activeCardIds,
    deckTitle: deckState.deckTitle
  }
  const methodsToExpose = {
    getDeck: (params: DeckIds) => dispatch(getTheDeck(params)),
    getDecks: () => dispatch(getTheDecks()),
    setSection: (id: string) => dispatch(setTheSection(id)),
    setCard: (id: string) => dispatch(setTheCard(id)),
    manageSide: () => dispatch(manageCardSide()),
    cycleSection: (bool: boolean) => dispatch(setSectionCycle(bool)),
    setDeck: (deck) => dispatch(setTheDeck(deck)),
    addSection: (title: string) => dispatch(createSection(title)),
    addCard: (title: string) => dispatch(createCard(title)),
    setActiveCardFront: (code: string) => dispatch(activeCardFront(code)),
    setActiveCardBack: (code: string) => dispatch(activeCardBack(code)),
    setActiveCardLanguage: (lang: string) => dispatch(activeCardLanguage(lang)),
    addDeckTitle: (title: string) => dispatch(setDeckTitle(title))
  }
  return {
    ...stateToExpose,
    ...methodsToExpose
  }
}

export default deckSlice.reducer
