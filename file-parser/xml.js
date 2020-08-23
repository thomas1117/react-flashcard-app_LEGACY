const fs = require('fs')
const path = require('path')
const xmlParser = require('xml2js')
const parseXMLToString = xmlParser.parseString

const SEED_PATH = path.join(__dirname, '../client/src/seed/js/dynamic-seed.json')
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
  const deckTitle = deckRoot.$.title
  const deck = {
    title: deckTitle,
    sections: deckRoot.section.map(s => {
      const sectionTitle = s.$.title
      return {
        title: sectionTitle,
        cards: s.card.map(card => {
          return (
            {
              front: decodeXML(card.front.join('')),
              back: decodeXML(card.back.join('')),
              meta: decodeXML(card.meta.join('')),
              language: card.language || 'js'
            }
          )
        })
      }
    })
  }
  return deck
}

function storeToJSONSeed(deck, path) {
  const deckToStore = JSON.stringify(deck, null, 4)
  fs.writeFileSync(path || SEED_PATH, deckToStore)
}

function validate(xpath, currentValue, newValue) {
  // can check xpath to validate structure...
  // /decks/deck/card/front
  return newValue
}

// fs.readFile(XML_PATH, 'utf8', (err, contents) => {
//     const parsed = escapeInvalidXML(contents)
//     parseXMLToString(parsed, {validator: validate}, function (err, result) {
//       if (err) {
//         throw new Error(`INVALID XML: ${err}`)
//       }
//       const decks = buildDeckFromXMLRoot(result.decks.deck)
//       storeToJSONSeed(decks)
//       storeToJSONSeed(decks, '../server/SEED.json')
//     })
// })

function xmlToJSON(path, cb) {
  return fs.readFile(path, 'utf8', (err, contents) => {
    const parsed = escapeInvalidXML(contents)
    return parseXMLToString(parsed, {validator: validate}, function (err, result) {      
      const decks = buildDeckFromXMLRoot(result.deck)
      cb(decks)
      return new Promise((res, rej) => res(decks))
    })
  })
}

module.exports = {
  xmlToJSON
}

xmlToJSON(XML_PATH, function(data) {
  storeToJSONSeed(data)
})