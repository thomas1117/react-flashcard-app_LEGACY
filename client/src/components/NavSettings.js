import React from 'react'
import SettingsNav from './SettingsNav'
import { useDeck, useSetting } from '../hooks'

export default ({ timeCycleFront, timeCycleBack }) => {
    const { toggleTheme } = useSetting()
    const {
        title,
        sections,
        activeSectionIndex,
        updateSettings,
        selectDeck,
      } = useDeck()
    return (
        <>
            <div className="Dash-Nav-desktop">
                <SettingsNav
                    frontTime={timeCycleFront}
                    backTime={timeCycleBack}
                    onChange={() => toggleTheme()}
                    updateSettings={(settings) => updateSettings(settings)} />
                </div>
                <div className="Dash-Nav-mobile">
                <ul className="Dash-Nav-mobile-left">
                    {sections.map((deck, index) => (
                    <li
                        key={'mobile-link-' + index}
                        className={`Dash-Nav-mobile-link ` + (index === activeSectionIndex ? 'active' : '')}
                        onClick={() => selectDeck(index)}>{deck.title}</li>)
                    )}
                </ul>
                <SettingsNav
                    frontTime={timeCycleFront}
                    backTime={timeCycleBack}
                    onChange={() => toggleTheme()}
                    updateSettings={(settings) => updateSettings(settings)} />
            </div>
        </>
    )
}