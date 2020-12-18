import React from 'react'
import { useHistory } from 'react-router-dom'
import SettingsNav from './SettingsNav'
import { useDeck } from './deckSlice'
import { CardSetting } from '../settings/interfaces'
import { useSettings } from '../settings/settingsSlice'

export default function NavSettings(props: any) {
  const {
    deckTitle,
    sections,
    activeSectionIndex,
    setSection,
    saveDeck,
    deleteDeck
  } = useDeck()
  const history = useHistory()
  const {
    cardTimeFront,
    cardTimeBack,
    updateSettings,
    toggleTheme,
  } = useSettings()

  function manageSettingsCache(settings: CardSetting) {
    updateSettings(settings)
    localStorage.setItem('CARD_SETTINGS', JSON.stringify(settings))
  }
  async function handleDelete(id) {
    await deleteDeck()
    history.push('/decks')
  }
  return (
    <>
      <div className="Dash-Nav-desktop">
        <SettingsNav
          deckId={props.deckId}
          editable={props.editable}
          deckTitle={deckTitle}
          frontTime={cardTimeFront}
          backTime={cardTimeBack}
          onChange={() => toggleTheme()}
          updateSettings={manageSettingsCache}
          saveDeck={saveDeck}
          deleteDeck={handleDelete}
        />
      </div>
      <div className="Dash-Nav-mobile">
        <ul className="Dash-Nav-mobile-left">
          {sections.map((deck, index) => (
            <li
              key={'mobile-link-' + index}
              className={
                `Dash-Nav-mobile-link ` +
                (index === activeSectionIndex ? 'active' : '')
              }
              onClick={() => setSection(deck.id)}
            >
              {deck.title}
            </li>
          ))}
        </ul>
        <SettingsNav
          deckId={props.deckId}
          editable={props.editable}
          deckTitle={deckTitle}
          frontTime={cardTimeFront}
          backTime={cardTimeBack}
          onChange={() => toggleTheme()}
          updateSettings={manageSettingsCache}
          saveDeck={saveDeck}
          deleteDeck={deleteDeck}
        />
      </div>
    </>
  )
}
