import { Deck, Card } from '../../models'
import seed from './dynamic-seed.json'
const decks = JSON.stringify(seed)
const parsedDecks = JSON.parse(decks)

export function makeSection(section) {
    // return deck
    let d = new Deck(section.title, [])
    d.cards = section.cards.map(item => {
        const card = new Card(
            item.front,
            item.back,
            item.meta,
            item.language,
        )
        return card
    })
    return d
}

export function deckMaker(decks) {
    return decks.map(deck => {
        let d = new Deck(deck.title, [])
        d.cards = deck.cards.map(item => {
            const card = new Card(
                item.front,
                item.back,
                item.meta,
                item.language,
            )
            return card
        })
        return d
    })
}

export default deckMaker(parsedDecks)