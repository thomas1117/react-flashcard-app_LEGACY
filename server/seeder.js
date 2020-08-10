const seed = require('./SEED.json')
const { Deck, Section, Card } = require('./database/models');
(async () => {
    const deck = await Deck.create({
        title: 'js'
    })
    seed.map(async item => {
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
})()
