import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import JS_SEED_DATA from '../../seed/js/dynamic-seed'
import { RootState } from '../../app/store'
import { DeckIds, DeckMeta, Section } from './interfaces'
import UUID from '../../utils/id';
import request from '../../utils/request'

// strip away legacy class definition...
// TODO: remove es6 model classes in favor of interface object casting or some shit like that...
const manageCards = (deck: any) => {
  return { ...deck, cards: deck.cards.map((x: any) => ({ ...x })) }
}

const SECTIONS = JS_SEED_DATA.sections.map(manageCards)

interface SectionState {
    sectionMap: any,
    activeSectionIndex: number,
    activeSection: any,
    sectionIds: any,
    activeCardIds: any,
    cyclingSection: boolean,
    sections: any
}

const initialState: SectionState = {
  sectionMap: {},
  activeSectionIndex: 0,
  activeSection: {
    id: '',
    uiId: '',
    title: '',
    cards: []
  },
  sectionIds: [],
  activeCardIds: [],
  cyclingSection: false,
  sections: []
}

export const sectionSlice = createSlice({
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
    //   state.activeCardIndex = 0
    //   state.diff.section[sectionId] = newSection
      // state.activeCard = state.activeSection.cards[0]
    },
    deleteTheSection: (state, action) => {
      delete state.sectionMap[action.payload.uiId]
      state.sections = state.sections.filter(x => x.uiId !== action.payload.uiId)
      state.activeSection = state.sections[0] || []
    },
    setSection: (state, action: PayloadAction<string>) => {
      state.activeSection = state.sectionMap[action.payload]
      if (state.activeSection.cards.length) {
        // state.activeCard = state.activeSection.cards[0]
        state.activeCardIds = state.activeSection.cards.map(c => c.uiId)
      }
    //   state.activeCardIndex = 0
      if (state.cyclingSection) {
        state.cyclingSection = false
      }
    },
    setSectionTitle: (state, action: PayloadAction<string>) => {
      state.activeSection.title = action.payload
    //   state.diff.section[state.activeSection.uiId] = state.activeSection
      state.sectionMap[state.activeSection.uiId] = state.activeSection
      state.sections = state.sections.map(item => {
        if (state.activeSection.uiId === item.uiId) {
          return state.activeSection
        }
        return item
      })
    },
    initSection: (state, action: PayloadAction<any>) => {
      const { sectionId, sections } = action.payload
    //   state.deckId = deckId
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
      state.sectionIds = mappedSections.map(x => x.uiId)
      for (const secId in state.sectionMap) {
        const currObj = state.sectionMap[secId]
        if (currObj.id == sectionId) {
          state.activeSection = currObj
          state.activeCardIds = currObj.cards.map(x => x.uiId)
          for (const card of state.activeSection.cards) {
            // if (card.id == cardId) {
            //   state.activeCard = card
            // }
          }
        }
      }
    //   state.deckTitle = deckTitle || state.deckId
    },
    setSectionCycle: (state, action: PayloadAction<boolean>) => {
      state.cyclingSection = action.payload
    },
  },
})

const {
  setSection,
  setSectionTitle,
  setSectionCycle,
  createSection,
  deleteTheSection,
  initSection
} = sectionSlice.actions

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

export const useSection = () => {
  const dispatch = useDispatch()
  const sectionState = useSelector((app: RootState) => app.section)
  const stateToExpose = {
    sectionState: sectionState,
    atDeckEnd: sectionState.activeSectionIndex === sectionState.sections.length - 1,
    cyclingSection: sectionState.cyclingSection,
    sections: sectionState.sectionIds.map(x => sectionState.sectionMap[x]), // sectionState.sections,
    activeSection: sectionState.activeSection,
    activeSectionIndex: sectionState.activeSectionIndex,
    // atSectionEnd: sectionState.activeCardIndex === sectionState.activeSection?.cards?.length - 1,
    sectionIds: sectionState.sectionIds,
    activeCardIds: sectionState.activeCardIds,
  }
  const methodsToExpose = {
    initSection:(sections, sectionId) => dispatch(initSection({sections, sectionId})),
    setSection: (id: string) => dispatch(setSection(id)),
    cycleSection: (bool: boolean) => dispatch(setSectionCycle(bool)),
    addSection: (title: string) => dispatch(createSection(title)),
    setSectionTitle: (title: string) => dispatch(setSectionTitle(title)),
    deleteSection: (section) => dispatch(deleteSection(section)),
  }
  return {
    ...stateToExpose,
    ...methodsToExpose
  }
}

export default sectionSlice.reducer
