import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

export default function Card(props) {
    return (
    <div className="Card" onClick={props.onClick}>
        {
            props.side === 'front' ?
            <div className="Card-front"><ReactMarkdown source={props.front} /></div> :
            
            <div className="Card-front">
                {props.language !== 'md' ? 
                <CodeBlock language={props.language} value={props.back} /> : 
                <ReactMarkdown source={props.back} />}
            </div>
        }
    </div>)
}