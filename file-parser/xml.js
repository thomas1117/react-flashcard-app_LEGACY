const fs = require('fs')
const path = require('path')

const parseXMLToString = require('xml2js').parseString

const SEED_PATH = path.join(__dirname, '../src/seed/js/dynamic-seed.json')

function safelyEncodeXML(m) {
  return encodeURIComponent(m)
}

function decodeXML(m) {
  return decodeURIComponent(m)
}

function escapeInvalidXML(text) {
    const regex = /(?<=\<back\>)[\s\S]*?(?=\<\/back\>)/g
    const parsed = String(text).replace(regex, safelyEncodeXML)
    const regex2 = /(?<=\<front\>)[\s\S]*?(?=\<\/front\>)/g
    const parsed2 = String(parsed).replace(regex2, safelyEncodeXML)
    return parsed2
}

function buildDeckFromXMLRoot(deckRoot) {
  return deckRoot.map(d => {
    const deckTitle = d.$.title
    const language = d.$.language
    const deck = {
      title: deckTitle,
      language: language,
      // map over deck cards and convert values from array to string
      cards: d.card.map(item => {
          return {
              front: decodeXML(item.front.join('')),
              back: decodeXML(item.back.join('')),
              meta: item.meta.join(''),
              language: item.language || language
          }
      })
    }
    return deck
  })
}

function storeToJSONSeed(decks) {
  const deckToStore = JSON.stringify(decks, null, 4)
  fs.writeFileSync(SEED_PATH, deckToStore)
}

fs.readFile(path.join(__dirname, './deck.xml'), 'utf8', (err, contents) => {
    const parsed = escapeInvalidXML(contents)
    parseXMLToString(parsed, function (err, result) {
      const decks = buildDeckFromXMLRoot(result.decks.deck)
      storeToJSONSeed(decks)
    })
})