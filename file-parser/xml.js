const fs = require('fs')
const path = require('path')

const parseXMLToString = require('xml2js').parseString

const SEED_PATH = path.join(__dirname, '../src/seed/js/dynamic-seed.json')
const XML_PATH = path.join(__dirname, './deck.xml')

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
    const regex3 = /(?<=\<meta\>)[\s\S]*?(?=\<\/meta\>)/g
    const parsed3 = String(parsed).replace(regex3, safelyEncodeXML)
    return parsed3
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
              meta: decodeXML(item.meta.join('')),
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

fs.readFile(XML_PATH, 'utf8', (err, contents) => {
    const parsed = escapeInvalidXML(contents)
    parseXMLToString(parsed, function (err, result) {
      if (err) {
        throw new Error(`INVALID XML: ${err}`)
      }
      const decks = buildDeckFromXMLRoot(result.decks.deck)
      storeToJSONSeed(decks)
    })
})