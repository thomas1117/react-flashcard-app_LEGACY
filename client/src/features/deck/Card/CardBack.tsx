import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../../../ui/CodeBlock'

const CardBack = (props: any) => {
    const {language, back} = props
    return (
        <div className={'Card-back'}>
        {language !== 'md' ? (
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