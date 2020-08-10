require('dotenv').config()
const { Deck, Section, Card } = require('./database/models')
const express = require('express')
const app = express()
const PORT = 3001

// https://sequelize.org/master/manual/eager-loading.html
app.get('/decks/:id', async (req, res) => {
    const deck = await Deck.findOne({where: {id: req.params.id}, include: [
        {
            model: Section,
            as: 'sections',
            include: [
                {
                    model: Card,
                    as: 'cards',
                }
            ]
        }
    ]})
    res.send(deck)
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})