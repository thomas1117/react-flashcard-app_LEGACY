// const db = require('../database/models')
const DeckService = require('../services/deck')

// const { Deck } = db

class DeckController {
    static async fetchDecks(req, res, next) {
        const decks = await DeckService.getAllDecks()
        res.send(decks)
    }
    
    static async fetchDeckById(req, res, next) {
        const deck = await DeckService.getFullDeckById(req.params.id)
        res.send(deck)
    }
    
    static async fetchDeckByUserId(req, res) {
        const decks = await DeckService.getDecksByUserId(req.user.id)
        res.json(decks)
    }

    static async createDeck(req, res) {
        const { title, sections } = req.body
        const deck = await DeckService.createDeck({title, sections})
        res.json({ message: 'deck created successfully', deck})
    }

    static async updateDeck(req, res) {
        const deckId = Number(req.params.id)
        const {deck, card, section} = req.body
        await DeckService.updateDeck({deckId, deckTitle: deck?.title, card, section})
        res.json({id: deckId, message:' deck updated'})
    }

    static async deleteDeckById(req, res) {
        await DeckService.deleteDeckById(req.params.id)
        res.json({message: 'deck deleted'})
    }

    static async deleteSectionById(req, res) {
        await DeckService.deleteSectionById(req.params.id)
        res.json({message: 'section deleted'})
    }

    static async deleteCardById(req, res) {
        await DeckService.deleteCardById(req.params.id)
        res.json({message: 'card deleted'})
    }

    static async exportDeck(req, res) {
        const deck = await DeckService.getFullDeckById(req.params.id)
        const file = DeckService.convertToXML(deck)
        res.setHeader('Content-type', 'text/xml')
        res.setHeader('Content-disposition', 'attachment; filename=file.xml')
        res.send(file)
    }

    static async postXML(req, res) {
        res.json({ message: 'xml created successfully' })
        // xmlToJSON(req.body.xml, async (resp) => {
        //   console.log(resp)
        //   const deck = await Deck.create({
        //     title: 'markdown',
        //   })
        //   resp.map(async (item) => {
        //     const section = await Section.create({
        //       title: item.title,
        //       deckId: deck.id,
        //     })
        //     item.cards.map(async (card) => {
        //       await Card.create({
        //         front: card.front,
        //         back: card.back,
        //         meta: card.meta,
        //         language: card.language,
        //         sectionId: section.id,
        //       })
        //     })
        //   })
        //   res.json({ message: 'deck created successfully', data: resp })
        // })
    }
}

module.exports = DeckController