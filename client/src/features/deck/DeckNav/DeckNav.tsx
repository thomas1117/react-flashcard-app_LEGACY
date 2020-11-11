import React, { useEffect } from 'react'
import { useDeck } from '../deckSlice'
import { useSettings } from '../../settings/settingsSlice'
import SectionAdd from './SectionAdd'
import DeckTitle from './DeckTitle'
import { Section } from './Section'
// import { MdFlipToBack } from 'react-icons/md'
interface P {
  keyboardDisabled?: boolean,
  editable?: boolean,
}
export default function DeckNav(props: P) {
  const {
    activeSection,
    activeSectionIndex,
    activeCardIndex,
    activeCard,
    sections,
    cyclingSection,
    atSectionEnd,
    atDeckEnd,
    sectionIds,
    activeCardIds,
    setSection,
    setCard,
    cycleSection,
    manageSide,
  } = useDeck()
  const {
    cardTimeFront,
    cardTimeBack,
  } = useSettings()

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (cyclingSection || props.keyboardDisabled) {
        return
      }
      const key = e.code
      // e.preventDefault()
      if (key === 'Space') {
        manageSide()
      }
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        let diff = key === 'ArrowLeft' ? -1 : 1
        const outOfZeroBound = key === 'ArrowLeft' && activeCardIndex === 0
        const outOfEndBound = key === 'ArrowRight' && atSectionEnd
        const canMove = !outOfZeroBound && !outOfEndBound
        if (canMove) {
          setCard(activeCardIds[activeCardIndex + diff])
        }
      }
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        let diff = key === 'ArrowUp' ? -1 : 1
        const outOfZeroBound = key === 'ArrowUp' && activeSectionIndex === 0
        const outOfEndBound = key === 'ArrowDown' && atDeckEnd
        const canMove = !outOfZeroBound && !outOfEndBound
        if (canMove) {
          setSection(sectionIds[activeSectionIndex + diff])
        }
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [
    cycleSection,
    manageSide,
    setCard,
    setSection,
    cyclingSection,
    activeCardIndex,
    activeSectionIndex,
    atSectionEnd,
    atDeckEnd,
    props.keyboardDisabled,
    activeCardIds,
    sectionIds
  ])

  useEffect(() => {
    let interval: any = null
    if (cyclingSection) {
      interval = setTimeout(() => {
        if (activeCard.side === 'front') {
          manageSide()
        } else {
          if (atSectionEnd) {
            clearInterval(interval)
            cycleSection(false)
            setCard(activeSection.cards[0].id)
            return
          }
          setCard(activeSection.cards[activeCardIndex + 1].id)
        }
      }, (activeCard.side === 'front' ? cardTimeFront : cardTimeBack) * 1000)
    } else {
      clearTimeout(interval)
    }
    return () => clearInterval(interval)
  }, [
    activeCard,
    activeCardIndex,
    cyclingSection,
    atSectionEnd,
    cardTimeFront,
    cardTimeBack,
    manageSide,
    setCard,
    cycleSection,
    activeSection.cards
  ])

  return (
    <nav className="Nav">
      <div className="Nav-children DeckNav-children">
        {/* <h2 className="Nav-title">Decks</h2> */}
        {props.editable && <DeckTitle />}

        <ul className="Nav-deck">
          {sections.map((section, sectionIndex) => {
            const isActive = activeSection.id === section.id;
            const active = isActive ? 'active' : ''
            return (
            <Section
              key={'section-' + section.id}
              section={section}
              sectionIndex={sectionIndex}
              isActive={isActive}
              active={active}
              editable={props.editable}
            />)})}
        </ul>
        {props.editable && <SectionAdd />}
      </div>
    </nav>
  )
}
