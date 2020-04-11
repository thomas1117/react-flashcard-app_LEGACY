const fs = require('fs')
const util = require('util')

const deckCommands = ['START DECK', 'TITLE', 'START CARDS', 'END CARDS', 'END DECK']
const cardCommands = ['FRONT', 'BACK', 'META', 'LANGUAGE']

let deckManager = {
    manageDeckStart: function (item) {
        if (item === 'START DECK') {
            this.decks.push({})
            return true
        }
        if (item === 'TITLE') {
            this.lastCommand = 'TITLE'
            return true
        }
        if (this.lastCommand === 'TITLE' && item !== 'TITLE') {
            this.decks[this.deckIndex].title = item
            this.lastCommand = 'END_DECK_START'
            return true
        }
        if (item === 'START CARDS') {
            this.decks[this.deckIndex].cards = []
            this.lastCommand = 'START CARDS'
            this.cardStage = true
            return true
        }
    },
    deckEnded: function (item) {
        if (item === 'END CARDS' || item === 'END DECK') {
            this.lastCommand = item
            return true
        }
    },
    buildDeck: function (contents) {
        this.lines = contents.split('\n')

        for (let item of this.lines) {
            if (this.deckEnded(item)) {
                continue
            }
            if (!this.cardStage) {
                let shouldContinue = this.manageDeckStart(item)
                if (shouldContinue) {
                    continue
                }
            }
            
            if (this.lastCommand === 'START CARDS') {
                if (item === '-') {
                    this.decks[this.deckIndex].cards[this.cardIndex] = {
                        front: ``,
                        back: ``,
                    }
                    this.lastCommand = 'BEGIN_CARD'
                    continue
                }
            }
            let currentCard = this.decks[this.deckIndex].cards[this.cardIndex]
            if (this.lastCommand === 'BEGIN_CARD') {
                if (item === 'FRONT') {
                    this.lastCommand = 'FRONT'
                    continue
                }
            }
    
            if (this.lastCommand === 'FRONT') {
                if (item === 'BACK') {
                    this.lastCommand = 'BACK'
                    continue
                }
                currentCard.front = currentCard.front + item
            }
    
            if (this.lastCommand === 'BACK') {
                if (item === 'META') {
                    this.lastCommand = 'META'
                    continue
                }
                currentCard.back = currentCard.back + item
                continue
            }
    
            if (this.lastCommand === 'META') {
                currentCard.meta = item
                this.lastCommand = 'LANGUAGE'
                continue
            }
            if (item !== 'LANGUAGE' && this.lastCommand === 'LANGUAGE') {
                currentCard.language = item
                this.lastCommand = 'LANGUAGE_END'
                continue
            }

            if (item === '-') {
                this.cardIndex++
                this.lastCommand = 'START CARDS'
            }
        }
        fs.writeFileSync('../src/seed/js/dynamic-seed.json', JSON.stringify(this.decks))
    },
    lines: [],
    decks: [],
    lastCommand: null,
    deckIndex: 0,
    cardIndex: 0,
    cardStage: false,
}

fs.readFile('./index.txt', 'utf8', (err, contents) => deckManager.buildDeck(contents));