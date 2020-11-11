import React from 'react'

export default function PausePlay({cyclingSection, isActive, cycleSection, section, setSection, activeSection}) {
    return (
        cyclingSection && isActive ? (
            <span
              onClick={(e) => {
                e.stopPropagation()
                cycleSection(false)
              }}
              className="Nav-deck-pause"
            >
              &#9611;&#9611;
            </span>
          ) : (
            <span
              className="Nav-deck-item-inner-icon"
              onClick={(e) => {
                e.stopPropagation()
                if (section.id === activeSection.id) {
                  cycleSection(!cyclingSection)
                } else {
                  setSection(section.id)
                  cycleSection(!cyclingSection)
                }
              }}
            >
              &#8634;
            </span>
          )
    )
}