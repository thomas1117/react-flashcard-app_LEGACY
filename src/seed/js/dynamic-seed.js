import { Deck, Card } from '../../models'
import seed from './dynamic-seed.json'
const decks = JSON.stringify(seed)
const parsedDecks = JSON.parse(decks)

function removeStrings(str) {
    if (str.charAt(0) === "'" && str.charAt(str.length -1) === "'") {
        console.log(str.substr(1,str.length -2))
        return str.substr(1,str.length -2)
    }
    console.log('string', str)
    return str
}

function deckMaker(decks) {
    // just do one for now...
    let first = decks[0]
    let deck = new Deck(first.title, [])
    deck.cards = first.cards.map(item => {
        const card = new Card(
            removeStrings(item.front),
            removeStrings(item.back),
            removeStrings(item.meta),
            removeStrings(item.language)
        )
        console.log(card)
        return card
    })
    return deck
}

export default [deckMaker(parsedDecks)]