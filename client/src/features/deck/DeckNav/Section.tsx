import React, { useEffect, useState } from 'react'
import { useDeck } from '../deckSlice'
import ActiveCardSection from './ActiveCardSection'
import TitleInput from './TitleInput'
import CardAdd from './CardAdd'
import PausePlay from './PausePlay'

export function Section({ section, sectionIndex, isActive, active, editable}) {
    const {
        activeSection,
        cyclingSection,
        setSection,
        setSectionTitle,
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
                {editable && <TitleInput title={section.title} onChange={(e) => setSectionTitle(e.target.value)} />}
                {!editable && <span>{section.title}</span>}
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
                {isActive && <ActiveCardSection editable={editable} />}
                {/* activeSectionIndex == sectionIndex || !activeSection.id && */}
                {editable && isActive && <CardAdd />}
            </div>
        </li>
    )
}