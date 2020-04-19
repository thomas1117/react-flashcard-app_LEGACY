import React, { useState } from 'react'

export default function Settings(props) {
    const [visible, setVisible] = useState(false)
    const [frontTime,setFrontTime] = useState(3)
    const [backTime, setBackTime] = useState(3)
    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateSettings({frontTime, backTime})
        setVisible(false)
    }
    const handleFront = (e) => {
        console.log(e)
        setFrontTime(e.target.value)
    }
    const handleBack = (e) => {
        setBackTime(e.target.value)
    }
    return <div>
        {
            visible ?
            <button 
            className="Settings-toggle"
            onClick={() => setVisible(v => !v)}>&times;</button>
            :
            <button 
            className="Settings-toggle"
            onClick={() => setVisible(v => !v)}>&#9881;</button>
        }
        <div className="Settings-toggle-overlay" style={{visibility: visible ? 'visible' : 'hidden'}}>
            <form onSubmit={handleSubmit}>
                <div className="Settings-time-container">
                    <fieldset>
                        <label htmlFor="Front">Front time (seconds)</label>
                        <input 
                            id="front"
                            className="Settings-front-time Settings-time"
                            value={frontTime}
                            onChange={handleFront}
                            placeholder="Front card time" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="Back">Back time (seconds)</label>
                        <input 
                            id="back"
                            className="Settings-back-time Settings-time"
                            value={backTime}
                            onChange={handleBack}
                            placeholder="Back card time" />
                    </fieldset>
                    <fieldset>
                        <div className="Settings-submit-container">
                            <button className="Settings-submit">Submit</button>
                        </div>
                    </fieldset>
                </div>
            </form>
        </div>
    </div>
}