import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import { FaCopy } from 'react-icons/fa'
import copy from 'copy-to-clipboard'
import { Radio, RadioGroup, Stack, Button } from '@chakra-ui/core'

import { useDeck } from './deckSlice'

export default function Card(props) {
  const { activeCard, manageSide } = useDeck()
  console.log(activeCard)
  const { meta, front, back, side, language, answers } = activeCard
  //   const { meta, front, back, side, language, answers } = props.currentCard
  const {
    onClick,
    leftDisabled,
    rightDisabled,
    title,
    number,
    goBack,
    advance,
    correct,
    incorrect,
  } = props
  const [question, setQuestion] = useState({
    canAdvance: false,
    submitted: false,
    incorrect: false,
    selectedAnswer: (answers && answers[0].id) || null,
    correctAnswer:
      answers && answers.length && answers.find((a) => a.correct).id,
    disabled: false,
  })
  const isQuiz = answers && answers.length

  function handleQuizSubmit(e) {
    e.stopPropagation()
    e.preventDefault()
    // if it wasnt submitted - validate form

    if (!question.submitted) {
      setQuestion({ ...question, submitted: true, disabled: true })
      if (question.selectedAnswer !== question.correctAnswer) {
        setQuestion({
          ...question,
          incorrect: true,
          submitted: true,
          disabled: true,
        })
      }
    } else {
      setQuestion({
        ...question,
        incorrect: false,
        submitted: false,
        disabled: false,
      })
      advance()
    }

    // if it was submitted already
  }

  function handleCheck(e) {
    e.stopPropagation()
    // keep it as number
    setQuestion({ ...question, selectedAnswer: +e.target.value })
  }

  const handleColor = (id) => {
    const { submitted, selectedAnswer, correctAnswer } = question
    if (id === correctAnswer && submitted) {
      return {
        color: 'green',
      }
    }
    return {
      color: submitted && selectedAnswer == id ? 'red' : 'inherit',
    }
  }

  function RadioButton() {
    return (
      <div>
        <form onSubmit={handleQuizSubmit}>
          <RadioGroup
            style={{ margin: '20px 0' }}
            variantColor="blue"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleCheck(e)}
            value={question.selectedAnswer}
          >
            {answers.map((answer) => (
              <Radio
                size="lg"
                name="question"
                value={answer.id}
                isDisabled={question.disabled}
                style={handleColor(answer.id)}
                key={answer.id}
              >
                {answer.text}
              </Radio>
            ))}
          </RadioGroup>
          <Button type="submit" style={{ background: '#ddd' }}>
            Submit
          </Button>
        </form>
      </div>
    )
  }

  function handle(e, cb) {
    e.stopPropagation()
    cb()
  }

  function copyToClipboard(e) {
    e.stopPropagation()
    copy(window.location)
  }
  function handleCardClick() {
    if (isQuiz) {
      return
    }
    onClick()
  }
  return (
    <div className="Card" onClick={() => manageSide()}>
      {!isQuiz && (
        <div className="Card-actions">
          <button
            disabled={leftDisabled}
            className="Card-button Card-button-back"
            onClick={(e) => handle(e, goBack)}
          >
            &#x2190;
          </button>
          <button
            disabled={rightDisabled}
            className="Card-button Card-button-advance"
            onClick={(e) => handle(e, advance)}
          >
            &#x2192;
          </button>
        </div>
      )}
      <span className="Card-deck">
        {title}
        {side === 'back' && ' | ' + meta}
      </span>
      <FaCopy className="Card-copy" onClick={(e) => copyToClipboard(e)} />
      <span className="Card-number">{number}</span>
      <div className={'Card-front ' + (side !== 'back' ? 'visible' : '')}>
        <ReactMarkdown source={front} />
        {isQuiz && <RadioButton />}
      </div>

      <div className={'Card-back ' + (side !== 'front' ? 'visible' : '')}>
        {language !== 'md' ? (
          <CodeBlock language={language} value={back} />
        ) : (
          <ReactMarkdown source={back} />
        )}
      </div>
    </div>
  )
}
