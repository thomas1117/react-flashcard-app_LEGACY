import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../../../ui/CodeBlock'

const CardBack = (props: any) => {
    const {language, back} = props
    console.log('a', language)
    return (
        <div className={'Card-back'}>
        {language !== 'md' && language !== 'markdown' ? (
          <CodeBlock 
            language={language} 
            value={back} 
          />
        ) : (
          <ReactMarkdown 
            source={back} 
          />
        )}
      </div>
    )
}

export default CardBack