function makeId() {
    let id = 1
    return () => id++
}
let cardId = makeId()
let deckId = makeId()

function normalize(str) {
    let strArr = str.split('\n')
    let smallest = Infinity
    let filteredCollection = []
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i].length) {
            let spaceCount = strArr[i].search(/\S|$/)
            smallest = smallest > spaceCount ? spaceCount : smallest
            filteredCollection.push(strArr[i])
        }
    }
    for (let i = 0; i < filteredCollection.length; i++) {
        filteredCollection[i] = filteredCollection[i].slice(smallest)
    }
    return filteredCollection.join('\n')
}

export class Card {
    constructor(front, back, meta, language) {
        this.id = cardId()
        this.front = normalize(front)
        this.back = normalize(back)
        this.side = 'front'
        this.language = language
        this.meta = meta
    }
}

export class Deck {
    constructor(title, cards) {
        this.id = deckId()
        this.title = title
        this.cards = cards
    }
}

export class JSCard extends Card {
    constructor(front, back, meta) {
        super(front, back, meta)
        this.language = 'js'
    }
}