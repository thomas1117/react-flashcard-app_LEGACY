export interface Section {
  id: string
  title: string
  cards: Card[]
}

export interface Deck {
  id: string
  title: string
}

interface SectionMap {
  [id: string]: Section
}

interface CardMap {
  [id: string]: Card
}

export interface DeckState {
  deckId: string
  deckTitle: string
  decks: Deck[]
  sectionMap: SectionMap
  cardMap: CardMap
  activeSectionIndex: number
  activeCardIndex: number
  activeSection: Section
  activeCard: Card
  sections: Section[]
  sectionIds: string[]
  activeCardIds: string[]
  cyclingSection: boolean
}

export interface DeckIds {
  cardId: string
  sectionId: string
  deckId: string
}

export interface DeckMeta extends DeckIds {
  sections: Section[]
}

export type Card = {
  id: string
  front: string
  back: string
  side: string
  language: string
  meta: string
}
