import { Deck, Card } from '../../models'
import seed from './dynamic-seed.json'
const decks = JSON.stringify(seed)
const parsedDecks = JSON.parse(decks)

function removeStrings(str) {
    if (str.charAt(0) === '"' && str.charAt(str.length -1) === '"') {
        return str.substr(1,str.length -2);
    }
    return str
}

function deckMaker(decks) {
    // just do one for now...
    let first = decks[0]
    let deck = new Deck(first.title, [])
    deck.cards = first.cards.map(item => {
        const card = new Card(item.front, item.back, item.meta, item.language)
        return card
    })
    return deck
}

export default [deckMaker(parsedDecks)]