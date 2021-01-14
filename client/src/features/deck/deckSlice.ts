import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import JS_SEED_DATA from '../../seed/js/dynamic-seed'
import { RootState } from '../../app/store'
import { DeckState, DeckIds, DeckMeta, Section } from './interfaces'
import UUID from '../../utils/id';
import request from '../../utils/request'

// strip away legacy class definition...
// TODO: remove es6 model classes in favor of interface object casting or some shit like that...
const manageCards = (deck: any) => {
  return { ...deck, cards: deck.cards.map((x: any) => ({ ...x })) }
}
const SECTIONS = JS_SEED_DATA.sections.map(manageCards)
const initialState: DeckState = {
  deckId: '',
  deckTitle: '',
  decks: [],
  sectionMap: {},
  cardMap: {},
  sectionCardMap: {},
  activeSectionIndex: 0,
  activeCardIndex: 0,
  activeSection: {
    id: '',
    uiId: '',
    title: '',
    cards: []
  },
  activeCard: {
    id: '',
    uiId: '',
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
  diff: {
    deck: {},
    section: {},
    card: {}
  }
}

export const deckSlice = createSlice({
  name: 'deck',
  initialState: initialState,
  reducers: {
    createSection: (state, action) => {
      const sectionId = UUID()
      const newSection = {
        id: '',
        uiId: sectionId,
        title: action.payload,
        cards: []
      }
      state.sections.push(newSection)
      state.sectionMap[sectionId] = newSection
      state.activeSection = state.sectionMap[sectionId]
      state.activeCardIndex = 0
      state.diff.section[sectionId] = newSection
      // state.activeCard = state.activeSection.cards[0]
    },
    deleteTheSection: (state, action) => {
      delete state.sectionMap[action.payload.uiId]
      state.sections = state.sections.filter(x => x.uiId !== action.payload.uiId)
      state.activeSection = state.sections[0] || []
    },
    deleteTheCard: (state, action) => {
      delete state.cardMap[action.payload.uiId]
      state.sections = state.sections.map(section => {
        return {...section, cards: section.cards.filter(card => card.uiId !== action.payload.uiId)}
      })
      state.activeSection = {...state.activeSection, cards: state.activeSection.cards.filter(x => x.uiId !== action.payload.uiId)}

    },
    setActiveCardFront: (state, action: PayloadAction<string>) => {
      state.activeCard.front = action.payload
      state.cardMap[state.activeCard.uiId] = state.activeCard
      state.activeSection = {...state.activeSection, cards: state.activeSection.cards.map(item => {
        if (item.id === state.activeCard.uiId) {
          return state.activeCard
        } else {
          return item
        }
      })}
      state.diff.card[state.activeCard.uiId] = {
        ...state.activeCard,
        sectionId: state.activeSection.id,
        sectionUiId: state.activeSection.uiId
      }
    },
    setActiveCardBack: (state, action: PayloadAction<string>) => {
      state.activeCard.back = action.payload
      state.cardMap[state.activeCard.uiId] = state.activeCard
      state.activeSection = {...state.activeSection, cards: state.activeSection.cards.map(item => {
        if (item.id === state.activeCard.uiId) {
          return state.activeCard
        } else {
          return item
        }
      })}
      state.diff.card[state.activeCard.uiId] = {
        ...state.activeCard,
        sectionId: state.activeSection.id,
        sectionUiId: state.activeSection.uiId
      }
    },
    activeCardLanguage: (state, action: PayloadAction<string>) => {
      state.activeCard.language = action.payload
      state.diff.card[state.activeCard.uiId] = {
        ...state.activeCard,
        sectionId: state.activeSection.id,
        sectionUiId: state.activeSection.uiId
      }
    },
    createCard: (state,action) => {
      const cardId = UUID()
      const newCard = {
        id: '',
        uiId: cardId,
        side: 'front',
        meta: action.payload,
        front: '# front side',
        back: '## back side',
        language: 'markdown',
        sectionId: state.activeSection.id,
        sectionUiId: state.activeSection.uiId
      }
      state.activeSection.cards.push(newCard)
      state.sectionMap[state.activeSection.uiId].cards.push(newCard)
      state.cardMap[cardId] = newCard
      state.activeCard = newCard
      state.sections = state.sections.map(section => {
        if (section.uiId == state.activeSection.uiId) {
          return state.activeSection
        }
        return section
      })
      state.diff.card[cardId] = newCard
    },
    setDeckTitle: (state, action: PayloadAction<string>) => {
      state.deckTitle = action.payload
      state.diff.deck.title = action.payload
    },
    setTheSection: (state, action: PayloadAction<string>) => {
      state.activeSection = state.sectionMap[action.payload]
      state.activeCardIndex = 0
      if (state.activeSection.cards.length) {
        state.activeCard = state.activeSection.cards[0]
        state.activeCardIds = state.activeSection.cards.map(c => c.id)
      }
      const index = state.sections.findIndex(c => c.id === action.payload)
      state.activeSectionIndex = index > - 1 ? index : 0
      if (state.cyclingSection) {
        state.cyclingSection = false
      }
    },
    setSectionTitle: (state, action: PayloadAction<string>) => {
      state.activeSection.title = action.payload
      state.diff.section[state.activeSection.uiId] = state.activeSection
      state.sectionMap[state.activeSection.uiId] = state.activeSection
      state.sections = state.sections.map(item => {
        if (state.activeSection.uiId === item.uiId) {
          return state.activeSection
        }
        return item
      })
    },
    setTheCard: (state, action: PayloadAction<string>) => {
      state.activeCard = state.cardMap[action.payload]
      const index = state.activeSection.cards.findIndex(c => c.id === action.payload)
      state.activeCardIndex = index > - 1 ? index : 0
    },
    setTheCardTitle: (state, action: PayloadAction<string>) => {
      state.activeSection = {
        ...state.activeSection,
        cards: state.activeSection.cards.map(item => {
          if (state.activeCard.uiId == item.uiId) {
            return {...item, meta: action.payload}
          }
          return item
        })
      }
      state.sections = state.sections.map(section => {
        if (section.uiId === state.activeSection.uiId) {
          return state.activeSection
        }
        return section
      })
      state.sectionMap[state.activeSection.uiId].cards = state.sectionMap[state.activeSection.uiId].cards.map(item => {
        if (state.activeCard.uiId == item.uiId) {
          return {...item, meta: action.payload}
        }
        return item
      })
      state.cardMap[state.activeCard.uiId] = {...state.activeCard, meta: action.payload}
      state.diff.card[state.activeCard.uiId] = {...state.activeCard, meta: action.payload}
    },
    setTheDeck: (state, action: PayloadAction<DeckMeta>) => {
      const { cardId, sectionId, deckId, deckTitle, sections } = action.payload
      state.deckId = deckId
      const mappedSections = sections.map(section => {
        const uiId = UUID()
        return {
          ...section,
          uiId,
          cards: section.cards.map(card => ({...card, uiId: UUID(), sectionId: uiId}))
        }
      })
      state.sectionMap = mappedSections.reduce((map: any, obj) => {
        map[obj.uiId] = obj
        return map
      }, {})
      state.cardMap = mappedSections.reduce((map: any, obj) => {
        obj.cards.forEach(card => {
          map[card.uiId] = card
        })
        return map
      }, {})
      state.sectionCardMap = mappedSections.reduce((map: any, obj) => {
        obj.cards.forEach(card => {

        })
        return map
      })
      state.sectionIds = mappedSections.map(x => x.uiId)
      for (const secId in state.sectionMap) {
        const currObj = state.sectionMap[secId]
        if (currObj.id == sectionId) {
          state.activeSection = currObj
          for (const card of state.activeSection.cards) {
            if (card.id == cardId) {
              state.activeCard = card
            }
          }
        }
      }

      // state.activeSection = state.sectionMap[sectionId] || state.sections[0] || {cards: []}
      // state.activeCardIds = state.activeSection.cards.map(x => x.uiId)


      // state.deckId = deckId
      // state.sections = sections
      // state.sections = state.sections.map(section => (
      //   {
      //     ...section,
      //     uiId: UUID(),
      //     cards: section.cards.map(card => ({...card, uiId: UUID()}))
      //   }
      // ))
      // state.sectionMap = state.sections.reduce((map: any, obj) => {
      //   map[obj.uiId] = obj
      //   return map
      // }, {})
      // state.cardMap = state.sections.reduce((map: any, obj) => {
      //   obj.cards.forEach(card => {
      //     map[card.uiId] = card
      //   })
      //   return map
      // }, {})
      // state.deckTitle = deckTitle || state.deckId
      // state.activeSection = state.sectionMap[sectionId] || state.sections[0] || {cards: []}
      // state.sectionIds = state.sections.map(x => x.uiId)
      // state.activeCardIds = state.activeSection.cards.map(x => x.uiId)
      // const findItemInList = (list: any, id: any) => list?.findIndex((x: any) => x.uiId === id)
      // const indexOrZero = (index: number) => index === -1 ? 0 : index
      // const itemIndexOrZero = (list: any, id: any) => indexOrZero(findItemInList(list, id))
      // const sectionIndex = itemIndexOrZero(state.sections, sectionId)
      // const potentialCardList = state.activeSection?.cards
      // const cardIndex = itemIndexOrZero(potentialCardList, cardId)
      // state.activeSectionIndex = sectionIndex
      // state.activeCardIndex = cardIndex
      // const newCard = potentialCardList[cardIndex]
      // // TODO: probably should look into some default ts obj cast on this or something...
      // state.activeCard = { ...newCard, side: 'front' }
      // // make sections easily accessible
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
  setSectionTitle,
  setTheCard,
  setTheCardTitle,
  setTheDeck,
  setTheDecks,
  manageCardSide,
  setSectionCycle,
  createSection,
  deleteTheSection,
  createCard,
  deleteTheCard,
  setDeckTitle,
  setActiveCardFront,
  setActiveCardBack,
  activeCardLanguage,
} = deckSlice.actions

function getTheDeck(params: DeckIds) {
  const { deckId, cardId, sectionId } = params
  return async (dispatch: any) => {
    if (deckId === 'js') {
      dispatch(setTheDeck({ deckId, cardId, sectionId, sections: SECTIONS, deckTitle: 'js' }))
    } else {
      const res = await request.get(`/decks/${deckId}`)
      dispatch(
        setTheDeck({ deckId, cardId, sectionId, sections: res.data.sections, deckTitle: res.data.title })
      )
    }
  }
}

function getTheDecks() {
  return async (dispatch: any) => {
    const res = await request.get(`/decks`)
    dispatch(setTheDecks(res.data))
  }
}

function getTheUserDecks(id: string) {
  return async (dispatch: any) => {
    const res = await request.get(`/decks/users/` + id)
    dispatch(setTheDecks(res.data))
  }
}

function saveTheDeck(id: string, title: string, sections: Section[], diff: any): any {
  return async () => {
    if (!id) {
      return await request.post('/deck', {title, sections})
    }
    return await request.patch('/deck/' + id, diff)
  }
}

function deleteTheDeck(id: string) {
  return async (dispatch: any) => {
    return await request.delete('/deck/' + id)
  }
}

function deleteSection(section) {
  return async (dispatch: any) => {
    if (section.id) {
      return await request.delete('/deck/section/' + section.id).then(r => {
        dispatch(deleteTheSection(section))
      })
    }
    dispatch(deleteTheSection(section))
  }
}

function deleteCard(card) {
  return async (dispatch: any) => {
    if (card.id) {
      return await request.delete('/deck/card/' + card.id).then(r => {
        dispatch(deleteTheCard(card))
      })
    }
    dispatch(deleteTheCard(card))
  }
}

export const useDeck = () => {
  const dispatch = useDispatch()
  const deckState = useSelector((app: RootState) => app.deck)
  console.log(deckState)
  const stateToExpose = {
    deckId: deckState.deckId,
    decks: deckState.decks,
    deckState: deckState,
    atDeckEnd: deckState.activeSectionIndex === deckState.sections.length - 1,
    cyclingSection: deckState.cyclingSection,
    sections: deckState.sectionIds.map(x => deckState.sectionMap[x]), // deckState.sections,
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
    getUserDecks: (id: string) => dispatch(getTheUserDecks(id)),
    setSection: (id: string) => dispatch(setTheSection(id)),
    setCard: (id: string) => dispatch(setTheCard(id)),
    setCardTitle: (id: string) => dispatch(setTheCardTitle(id)),
    manageSide: () => dispatch(manageCardSide()),
    cycleSection: (bool: boolean) => dispatch(setSectionCycle(bool)),
    setDeck: (deck) => dispatch(setTheDeck(deck)),
    addSection: (title: string) => dispatch(createSection(title)),
    addCard: (title: string) => dispatch(createCard(title)),
    setActiveCardFront: (code: string) => dispatch(setActiveCardFront(code)),
    setActiveCardBack: (code: string) => dispatch(setActiveCardBack(code)),
    setActiveCardLanguage: (lang: string) => dispatch(activeCardLanguage(lang)),
    setSectionTitle: (title: string) => dispatch(setSectionTitle(title)),
    addDeckTitle: (title: string) => dispatch(setDeckTitle(title)),
    saveDeck: () => dispatch(saveTheDeck(deckState.deckId, deckState.deckTitle, deckState.sections, deckState.diff)),
    deleteDeck: () => dispatch(deleteTheDeck(deckState.deckId)),
    deleteSection: (section) => dispatch(deleteSection(section)),
    deleteCard: (card) => dispatch(deleteCard(card))
  }
  return {
    ...stateToExpose,
    ...methodsToExpose
  }
}

export default deckSlice.reducer
