import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../../../ui/CodeBlock'
import CodeEditor from './CodeEditor'

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
    const {language, back, previewMode, onCodeChange} = props
    return (
        <div className={'Card-back'}>
          {
          previewMode ? 
          <CardInner language={language} back={back} />
          :
          <CodeEditor 
            language={language}
            init={() => {}}
            incomingCode={back}
            onCodeChange={onCodeChange} 
          />
          }
      </div>
    )
}

export default CardBack