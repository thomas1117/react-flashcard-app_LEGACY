import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

export default function Card(props) {
    function handle(e, cb) {
        e.stopPropagation()
        cb()
    }

    const {meta, front, back, side, language} = props.currentCard
    const { onClick, leftDisabled, rightDisabled, deck, number, goBack, advance} = props
    return (
    <div className="Card" onClick={onClick}>
        <div className="Card-actions">
            <button 
                disabled={leftDisabled}
                className="Card-button Card-button-back"
                onClick={e => handle(e, goBack)}>&#x2190;</button>
            <button 
                disabled={rightDisabled}
                className="Card-button Card-button-advance"
                onClick={e => handle(e, advance)}>&#x2192;</button>
        </div>
        <span className="Card-deck">{deck}{side === 'back' && (' | ' + meta)}</span>
        <span className="Card-number">{number}</span>
            <div className={"Card-front " + (side !== 'back' ? 'visible' : '')}><ReactMarkdown source={front} /></div>
            
            <div className={"Card-back " + (side !== 'front' ? 'visible' : '')}>
                {language !== 'md' ? 
                <CodeBlock language={language} value={back} /> : 
                <ReactMarkdown source={back} />}
            </div>
    </div>)
}