import React from 'react'
import { useDeck } from '../deckSlice'
import ActiveCardSection from './ActiveCardSection'
import CardAdd from './CardAdd'
import PausePlay from './PausePlay'

export function Section({ section, sectionIndex, isActive, active, editable}) {
    const {
        activeSection,
        cyclingSection,
        setSection,
        cycleSection,
      } = useDeck()
    return (
        <li
        className="Nav-section-item"
        key={sectionIndex}
        onClick={() => setSection(section.id)}
        >
            <p
                className={
                'Nav-deck-item-inner d-flex space-between ' + active
                }
            >
                <span>{section.title}</span>
                <PausePlay
                cyclingSection={cyclingSection}
                isActive={isActive}
                cycleSection={cycleSection}
                section={section}
                setSection={setSection}
                activeSection={activeSection}
                />
            </p>
            <div>
                {isActive && <ActiveCardSection />}
                {/* activeSectionIndex == sectionIndex || !activeSection.id && */}
                {editable && isActive && <CardAdd />}
            </div>
        </li>
    )
}