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

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

function escapeInvalidXML(text) {
    const regex = /(?<=\<back\>)[\s\S]*?(?=\<\/back\>)/g
    const parsed = String(text).replace(regex, safelyEncodeXML)
    const regex2 = /(?<=\<front\>)[\s\S]*?(?=\<\/front\>)/g
    const parsed2 = String(parsed).replace(regex2, safelyEncodeXML)
    return parsed2
}

fs.readFile(path.join(__dirname, './deck.xml'), 'utf8', (err, contents) => {
    const parsed = escapeInvalidXML(contents)
    parseXMLToString(parsed, function (err, result) {
        // store the deck and grab root variables
        const deckRoot = result.deck
        const deckTitle = deckRoot.$.title
        const language = deckRoot.$.language
        const deck = {
            title: deckTitle,
            language: language,
            // map over deck cards and convert values from array to string
            cards: deckRoot.card.map(item => {
                return {
                    front: decodeXML(item.front.join('')),
                    back: decodeXML(item.back.join('')),
                    meta: item.meta.join(''),
                    language: item.language || language
                }
            })
        };
        const deckToStore = JSON.stringify([deck], null, 4)
        fs.writeFileSync(SEED_PATH, deckToStore)
    })
})