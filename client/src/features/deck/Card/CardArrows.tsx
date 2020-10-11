import React from 'react'
interface ArrowProps {
    activeCardIndex: number
    atSectionEnd: boolean
    setCard: any
}
const CardArrows = (props: ArrowProps) => {
    return (
        <div className="Card-actions">
        <button
          disabled={props.activeCardIndex === 0}
          className="Card-button Card-button-back"
          onClick={(e) => props.setCard(props.activeCardIndex - 1)}
        >
          &#x2190;
        </button>
        <button
          disabled={props.atSectionEnd}
          className="Card-button Card-button-advance"
          onClick={(e) => props.setCard(props.activeCardIndex + 1)}
        >
          &#x2192;
        </button>
      </div>
    )
}

export default CardArrows