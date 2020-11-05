import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeEditor from './CodeEditor'

const CardFront = (props: any) => {
    return (
        <div className={'Card-front'}>
          {
            props.previewMode ?
            <ReactMarkdown source={props.front} />
            :
            <CodeEditor 
              language={props.language}
              init={() => {}}
              incomingCode={props.front}
              onCodeChange={props.onCodeChange} 
            />
          }
        </div>
    )
}

export default CardFront