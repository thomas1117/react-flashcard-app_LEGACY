export interface Section {
  id: number
  title: string
  cards: Card[]
}

export interface Deck {
  id: number
  title: string
}

interface SectionMap {
  [id: number]: Section
}

interface CardMap {
  [id: number]: Card
}

export interface DeckState {
  deckId: number | string
  decks: Deck[]
  sectionMap: SectionMap
  cardMap: CardMap
  activeSectionIndex: number
  activeCardIndex: number
  activeSection: Section
  activeCard: Card
  sections: Section[]
  sectionIds: number[]
  activeCardIds: number[]
  cyclingSection: boolean
}

export interface DeckIds {
  cardId: number
  sectionId: number
  deckId: number | string
}

export interface DeckMeta extends DeckIds {
  sections: Section[]
}

export type Card = {
  id: number
  front: string
  back: string
  side: string
  language: string
  meta: string
}
