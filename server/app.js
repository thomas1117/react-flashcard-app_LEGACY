require('dotenv').config()
const { Deck, Section, Card } = require('./database/models')
const express = require('express')
const path = require('path')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.xml')
    }
  })
  
const upload = multer({ storage: storage })

const { xmlToJSON } = require('../file-parser/xml')
const app = express()
app.use(express.json())
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

app.get('/decks/exports/:id', async (req, res) => {
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
    console.log(deck)
    res.send(deck)
})

app.post('/deck', async (req, res) => {
    const { title, sections } = req.body
    const deck = await Deck.create({
        title
    })
    for (let section of sections) {
        const { title } = section
        const s = await Section.create({
            title,
            deckId: deck.id
        })

        for (let card of section.cards) {
            const { front, back, meta, language } = card
            await Card.create({
                front,
                back,
                meta,
                language,
                sectionId: s.id
            })
        }
    }
    res.json({message: 'deck created successfully', data: {title, sections}})
})

app.post('/xml', upload.single('xml'), async function (req, res, next) {
    xmlToJSON(req.file.path, async (resp) => {
        const deck = await Deck.create({
            title: 'markdown'
        })
        resp.map(async item => {
            const section = await Section.create({
                title: item.title,
                deckId: deck.id
            })
            item.cards.map(async card => {
                await Card.create({
                    front: card.front,
                    back: card.back,
                    meta: card.meta,
                    language: card.language,
                    sectionId: section.id
                })
            })
        })
    })
})

// used for deployment...
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });
  }

app.listen(process.env.PORT || PORT, () => {
    console.log('listening on port', PORT)
})