import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import { FaCopy } from 'react-icons/fa'
import copy from 'copy-to-clipboard'
import { Radio, RadioGroup, Stack, Button } from "@chakra-ui/core";

export default function Card(props) {
    const { meta, front, back, side, language, answers } = props.currentCard
    const { onClick, leftDisabled, rightDisabled, deck, number, goBack, advance, correct, incorrect } = props
    const [selectedAnswer, setAnswer] = useState(answers && answers[0].id || null)
    const [correctAnswer] = useState(answers.length && answers.find(a => a.correct))
    const [answerPalette, setAnswerPalette] = useState(false)

    function handleQuizSubmit(e) {
        e.stopPropagation()
        e.preventDefault()
        if (selectedAnswer === correctAnswer.id) {
            correct()
            setAnswerPalette(false)
            setAnswer(null)
        } else {
            // incorrect()
            setAnswerPalette(true)

        }
    }

    function handleCheck(e) {
        e.stopPropagation()
        // keep it as number
        setAnswer(+e.target.value)
    }

    const handleColor = (id) => {
        if (!answerPalette) {
            return {color: 'inherit'}
        }
        const incorrectSelected = id === selectedAnswer
        const correct = correctAnswer.id === id
        return {
            color: incorrectSelected ? 'red' : (correct && 'green')
        }
    }

    function RadioButton() {
        return (
        <div>
            <form onSubmit={handleQuizSubmit}>
                <RadioGroup onClick={e => e.stopPropagation()} onChange={e => handleCheck(e)} value={selectedAnswer}>
                    {answers.map(answer => (
                    <Radio
                        size="lg"
                        name="question"
                        value={answer.id}
                        style={handleColor(answer.id)}
                        key={answer.id}>
                        {answer.text}
                    </Radio>
                    )
                    )}
                </RadioGroup>
                <Button onClick={(e) => e.stopPropagation()} type="submit" style={{background: '#ddd'}}>Submit</Button>
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
            <FaCopy className="Card-copy" onClick={(e) => copyToClipboard(e)} />
            <span className="Card-number">{number}</span>
            <div className={"Card-front " + (side !== 'back' ? 'visible' : '')}>
                {answerPalette && <h2>{correctAnswer.text}</h2>}
                <ReactMarkdown source={front} />
                {
                answers.length && 
                <RadioButton />
              }
                    
            </div>

            <div className={"Card-back " + (side !== 'front' ? 'visible' : '')}>
                {language !== 'md' ?
                    <CodeBlock language={language} value={back} /> :
                    <ReactMarkdown source={back} />}
            </div>
        </div>)
}