const DeckService = require('../services/deck')
const db = require('../database/models')

describe('it should test deck service', () => {
  it('should fetch a list of decks', async (done) => {
    const decks = await DeckService.getAllDecks()
    expect(Array.isArray(decks)).toBe(true)
    done()
  })

  it('should fetch a single deck', async (done) => {
    const deck = await DeckService.getFullDeckById(1)
    expect(typeof deck).toBe('object')
    done()
  })

  it('should fetch a list of decks by user id', async (done) => {
    const decks = await DeckService.getDecksByUserId(1)
    expect(Array.isArray(decks)).toBe(true)
    done()
  })

  it('should parse a deck into an xml string', async (done) => {
    const deck = await DeckService.getFullDeckById(1)
    const xml = DeckService.convertToXML(deck)
    expect(typeof xml).toBe('string')
    done()
  })
})

afterAll(async done => {
  await db.sequelize.close()
  done()
});