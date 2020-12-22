const express = require('express')
const router = express.Router()
const { xmlToJSON } = require('../../file-parser/xml')
const xmlparser = require('express-xml-bodyparser')
const attachUser = require('../middleware/attachUser')
const DeckController = require('../controllers/deck')

router.get('/decks', DeckController.fetchDecks)
router.get('/decks/:id', DeckController.fetchDeckById)
router.get(`/decks/users/:userId`, attachUser, DeckController.fetchDeckByUserId)
router.get('/decks/exports/:id', DeckController.exportDeck)
router.post('/deck', DeckController.createDeck)
router.patch('/deck/:id', DeckController.updateDeck)
router.delete('/deck/:id', DeckController.deleteDeckById)
router.delete('/deck/section/:id', DeckController.deleteSectionById)
router.delete('/deck/card/:id', DeckController.deleteCardById)

router.post('/xml', DeckController.postXML)
module.exports = router
