function makeId() {
    let id = 0
    return () => id++
}
let id = makeId()

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

class Card {
    constructor(front, back, meta) {
        this.id = id()
        this.front = normalize(front)
        this.back = normalize(back)
        this.side = 'front'
        this.meta = meta
    }
}

export class Deck {
    constructor(title, cards) {
        this.id = id()
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