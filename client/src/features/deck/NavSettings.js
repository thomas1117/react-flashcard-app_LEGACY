import React from 'react'
import SettingsNav from './SettingsNav'
import { useDeck } from './deckSlice'

export default () => {
  const {
    deckId,
    sections,
    activeSectionIndex,
    updateSettings,
    selectDeck,
    toggleTheme,
    timeCycleFront,
    timeCycleBack,
  } = useDeck()

  function manageSettingsCache(settings) {
    updateSettings(settings)
    localStorage.setItem('CARD_SETTINGS', JSON.stringify(settings))
  }
  return (
    <>
      <div className="Dash-Nav-desktop">
        <SettingsNav
          deckId={deckId}
          frontTime={timeCycleFront}
          backTime={timeCycleBack}
          onChange={() => toggleTheme()}
          updateSettings={manageSettingsCache}
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
              onClick={() => selectDeck(index)}
            >
              {deck.title}
            </li>
          ))}
        </ul>
        <SettingsNav
          deckId={deckId}
          frontTime={timeCycleFront}
          backTime={timeCycleBack}
          onChange={() => toggleTheme()}
          updateSettings={manageSettingsCache}
        />
      </div>
    </>
  )
}
