import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

export default function Card(props) {
    function handle(e, cb) {
        e.stopPropagation()
        cb()
    }
    return (
    <div className="Card" onClick={props.onClick}>
        <span className="Card-number">{props.number}</span>
            <div className={"Card-front " + (props.side !== 'back' ? 'visible' : '')}><ReactMarkdown source={props.front} /></div>
            
            <div className={"Card-back " + (props.side !== 'front' ? 'visible' : '')}>
                <div className="Card-actions">
                    <button className="Card-button Card-button-back" onClick={e => handle(e, props.goBack)}>&#x2190;</button>
                    <button className="Card-button Card-button-advance" onClick={e => handle(e, props.advance)}>&#x2192;</button>
                </div>

                {props.language !== 'md' ? 
                <CodeBlock language={props.language} value={props.back} /> : 
                <ReactMarkdown source={props.back} />}
            </div>
    </div>)
}