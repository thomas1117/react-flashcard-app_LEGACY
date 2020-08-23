import { Deck, Section } from '../../models'
import seed from './dynamic-seed.json'
const deck = JSON.stringify(seed)
const parsedDeck = JSON.parse(deck)

function manageDynamic(deck) {
    let d = new Deck(deck.title, [])
    d.sections = deck.sections.map(x => new Section(x.title, x.cards))
    return d
}
export default manageDynamic(parsedDeck)