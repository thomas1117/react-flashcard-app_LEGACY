// 1. imports
import axios from 'axios'

import cardData from '../../../seed/js/dynamic-seed'

import {
  INIT_SECTION_CARD,
  INIT_JS_DECK,
  SET_LAST_CARD_INDEX,
  SELECT_CARD,
  INIT_QUIZ_DECK,
} from './actions'
console.log(cardData)
function manageAsync(deckId, cardId, sectionId) {
  return (dispatch) => {
    return axios.get(`/api/decks/${deckId}`).then((resp) => {
      const initDeck = {
        ...resp.data,
        cardId,
        deckId,
        sectionId,
        side: 'front',
      }
      dispatch({
        type: INIT_SECTION_CARD,
        payload: initDeck,
      })
      const sectionIndex = initDeck.sections.findIndex((x) => x.id == sectionId)
      const secIndex = sectionIndex > -1 ? sectionIndex : 0
      const cardIndex = initDeck.sections[secIndex].cards.findIndex((x) => {
        return x.id == cardId
      })
      const newIndex = cardIndex > -1 ? cardIndex : 0
      dispatch({
        type: SELECT_CARD,
        payload: {
          index: newIndex,
          card: {
            ...initDeck.sections[secIndex].cards[newIndex],
            side: 'front',
          },
        },
      })
    })
  }
}

function jsPreviewManager(deckId, cardId, sectionId) {
  // TODO: watch out for /js path.
  const sectionIndex = cardData.sections.findIndex((x) => x.id == sectionId)
  return (dispatch) => {
    dispatch({
      type: INIT_JS_DECK,
      payload: { deckId, cardId, sectionId },
    })
    dispatch({
      type: SET_LAST_CARD_INDEX,
      payload: cardData.sections[sectionIndex].cards.length - 1,
    })
    if (cardId) {
      const cardIndex = cardData.sections[sectionIndex].cards.findIndex(
        (x) => x.id == cardId
      )
      dispatch({
        type: SELECT_CARD,
        payload: {
          index: cardIndex,
          card: cardData.sections[sectionIndex].cards[cardIndex],
        },
      })
    }
  }
}

export function initSectionCardItem(i) {
  const { cardId, deckId, sectionId } = i
  const deck = {}
  if (deckId === 'js') {
    return jsPreviewManager(deckId, cardId, sectionId)
  } else if (deckId === 'quiz') {
    return {
      type: INIT_QUIZ_DECK,
      payload: deckId,
    }
  } else if (deckId === 'preview') {
    return {
      type: INIT_SECTION_CARD,
      payload: deck,
    }
  } else {
    return manageAsync(deckId, cardId, sectionId)
  }
}
