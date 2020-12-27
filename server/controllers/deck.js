// const db = require('../database/models')
const deckService = require('../services/deck')

// const { Deck } = db

class DeckController {
    static async fetchDecks(req, res, next) {
        try {
            const decks = await deckService.getAllDecks()
            res.send(decks)
        } catch {
            res.json({message: 'user not found'})
        }
    }
    
    static async fetchDeckById(req, res, next) {
        const deck = await deckService.getFullDeckById(req.params.id)
        res.send(deck)
    }
    static async fetchDeckByUserId(req, res) {
        const decks = await deckService.getDecksByUserId(req.user.id)
        res.json(decks)
    }

    static async createDeck(req, res) {
        const { title, sections } = req.body
        const deck = await deckService.createDeck({title, sections})
        res.json({ message: 'deck created successfully', deck})
    }

    static async updateDeck(req, res) {
        const deckId = Number(req.params.id)
        const {deck, card, section} = req.body
        await deckService.updateDeck({deckId, deckTitle: deck?.title, card, section})
        res.json({id: deckId, message:' deck updated'})
    }

    static async deleteDeckById(req, res) {
        await deckService.deleteDeckById(req.params.id)
        res.json({message: 'deck deleted'})
    }

    static async deleteSectionById(req, res) {
        await deckService.deleteSectionById(req.params.id)
        res.json({message: 'section deleted'})
    }

    static async deleteCardById(req, res) {
        await deckService.deleteCardById(req.params.id)
        res.json({message: 'card deleted'})
    }

    static async exportDeck(req, res) {
        const deck = await deckService.getFullDeckById(req.params.id)
        const file = deckService.convertToXML(deck)
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