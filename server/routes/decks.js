const express = require('express')
const router = express.Router()
const multer = require('multer')
const { Deck, Section, Card } = require('../database/models')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.xml')
  },
})

const upload = multer({ storage: storage })

router.get('/decks', async (req, res) => {
  const decks = await Deck.findAll()
  res.send(decks)
})

// https://sequelize.org/master/manual/eager-loading.html
router.get('/decks/:id', async (req, res) => {
  const deck = await Deck.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Section,
        as: 'sections',
        include: [
          {
            model: Card,
            as: 'cards',
          },
        ],
      },
    ],
  })
  res.send(deck)
})

/*

<decks>
    <deck title="variables" language="js">
        <card>
            <front>
            ## variable declaration
            </front>
            <back>
            var x = 1
            let y = 'a'
            const b = [1,2,3]
            </back>
            <meta>variable declaration</meta>
        </card>
    </deck>
</decks
*/

router.get('/decks/exports/:id', async (req, res) => {
  const deck = await Deck.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Section,
        as: 'sections',
        include: [
          {
            model: Card,
            as: 'cards',
          },
        ],
      },
    ],
  })
  const file = `
<deck title="${deck.title}">
    ${deck.sections
      .map(
        (section) =>
          `<section title="${section.title}" language="js">
            ${section.cards.map(
              (card) =>
                `<card>
                    <front>${card.front}</front>
                    <back>${card.back}</back>
                    <meta>${card.meta}</meta>
                </card>`
            )}
        </section>`
      )
      .join('')}
</decks>
    `
  res.setHeader('Content-type', 'text/xml')
  res.setHeader('Content-disposition', 'attachment; filename=file.xml')
  res.send(file)
})

router.post('/deck', async (req, res) => {
  const { title, sections } = req.body
  const deck = await Deck.create({
    title,
  })
  for (let section of sections) {
    const { title } = section
    const s = await Section.create({
      title,
      deckId: deck.id,
    })

    for (let card of section.cards) {
      const { front, back, meta, language } = card
      await Card.create({
        front,
        back,
        meta,
        language,
        sectionId: s.id,
      })
    }
  }
  res.json({ message: 'deck created successfully', data: { title, sections } })
})

router.post('/xml', upload.single('xml'), async function (req, res, next) {
  xmlToJSON(req.file.path, async (resp) => {
    const deck = await Deck.create({
      title: 'markdown',
    })
    resp.map(async (item) => {
      const section = await Section.create({
        title: item.title,
        deckId: deck.id,
      })
      item.cards.map(async (card) => {
        await Card.create({
          front: card.front,
          back: card.back,
          meta: card.meta,
          language: card.language,
          sectionId: section.id,
        })
      })
    })
  })
})
module.exports = router
