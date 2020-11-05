import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../../../ui/CodeBlock'

const CardInner = ({language, back}) => {
  return (
    language !== 'md' && language !== 'markdown' ? (
      <CodeBlock 
        language={language} 
        value={back} 
      />
    ) : (
      <ReactMarkdown 
        source={back} 
      />
    )
  )
}

const CardBack = (props: any) => {
    const {language, back} = props
    return (
        <div className={'Card-back'}>
        <CardInner language={language} back={back} />
      </div>
    )
}

export default CardBack