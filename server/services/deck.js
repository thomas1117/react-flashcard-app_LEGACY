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

const db = require('../database/models')

const { Deck, Card, Section, User } = db

class DeckService {
    static async getAllDecks() {
        const decks = await Deck.findAll()
        return decks
    }

    static async getFullDeck(id) {
        const deck = await Deck.findOne({
            where: { id: id },
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
                {
                model: User,
                as: 'Users',
                }
            ],
        })
        return deck
    }

    static async getDecksByUserId(userId) {
        const user = await User.findOne({
            where: { userId }
        })
        const decks = await user.getDecks()
        return decks
    }

    static convertToXML(deck) {
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
        return file
    }

    static async createDeck(deckDTO) {
        const { title, sections } = deckDTO
        const deck = await Deck.create({
            title,
        })
        const deckSections = []
        for (let section of sections) {
            const sectionItem = {deckId: deck.id, title: null, cards: []}
            const { title } = section
            const s = await Section.create({
                title,
                deckId: deck.id,
            })
            sectionItem.title = s.title
            for (let card of section.cards) {
                const { front, back, meta, language } = card
                const c = await Card.create({
                    front,
                    back,
                    meta,
                    language,
                    sectionId: s.id,
                })
                sectionItem.cards.push(c)
            }
            deckSections.push(sectionItem)
        }
        return {id: deck.id, sections: deckSections}
    }

    static async updateDeck(deckDto) {
        const { deckId, deckTitle, card, section } = deckDto
        const deck = await Deck.findByPk(deckId)
        if (deckTitle) {
            deck.title = deckTitle
            await deck.save()
        }
        for (let key in card) {
            if (card[key].id) {
            const c = await Card.findByPk(card[key].id)
            c.update(card[key])
            await c.save()
            } else {
            await Card.create(card[key]) 
            }
        }
        for (let key in section) {
            if (section[key].id) {
            const s = await Section.findByPk(section[key].id)
            s.update(section[key])
            await s.save()
            } else {
            await Section.create({...section[key], deckId: deckId})
            }
        }
        return deck
    }

    static async deleteDeckById(deckId) {
        const deck = await Deck.destroy({where: {id: deckId}})
        return deck
    }

    static async deleteSectionById(sectionId) {
        const section = Section.destroy({where: {id: sectionId}})
        return section
    }

    static async deleteCardById(cardId) {
        const card = await Card.destroy({where: {id: cardId}})
        return card
    }
}

module.exports = DeckService