import { dispatch } from 'redux'

const INIT_DECK = 'INIT_DECK'
const SELECT_DECK = 'SELECT_DECK'
const SELECT_CARD = 'SELECT_CARD'
const FLIP_CARD = 'FLIP_CARD'
const TOGGLE_THEME = 'TOGGLE_THEME'
const FORWARD_BACKWARD = 'FORWARD_BACKWARD'

export function toggleTheme() {
    return {
        type: TOGGLE_THEME,
    }
}

export function initDeck() {
    return {
        type: INIT_DECK,
    }
}

export function selectDeck(index) {
    return {
        type: SELECT_DECK,
        index,
    }
}

export function selectCard(index) {
    return {
        type: SELECT_CARD,
        index,
    }
    // setTimerCycle(false)
    // setActiveCardByIndex(index)
}

export function updateSettings(settings) {
// setTimeFront(settings.front)
// setTimeBack(settings.back)
// localStorage.setItem('time', JSON.stringify(settings))
}

export function cycleDeck(index) {
    // setActiveDeckByIndex(() => {
    //     setTimerCycle(true)
    //     return index
    // })
}

export function pauseCycleDeck(index) {
// setTimerCycle(false)
}

export function handleToggleSide() {
    return {
        type: FLIP_CARD,
    }
// setCard(currentCard => {
//     let item = {...currentCard, side: currentCard.side === 'front' ? 'back' : 'front'}
//     if (cb) {
//     cb(item)
//     }
//     return item
// })
}

export function handleCardIndexChange(diff) {
    return {
        type: FORWARD_BACKWARD,
        diff
    }
}

// const [cardIndex, setActiveCardByIndex] = useState(0)
// const [AAA, setActiveDeckByIndex] = useState(0)
// const [cardGroup, setCardGroup] = useState(cardData)
// const [BBB, setDeck] = useState(cardGroup[props.topic.activeDeckIndex])
// const [currentCard, setCard] = useState(BBB.cards[cardIndex])
// const [timerRunning, setTimerCycle] = useState(false)
// const [front, setFront] = useState(true)
// const [timeCycleFront, setTimeFront] = useState(getTimeCycle().frontTime)
// const [timeCycleBack, setTimeBack] = useState(getTimeCycle().backTime)
// const [currentCycle, setCurrentCycle] = useState(getTimeCycle().frontTime)
// const [start, setStart] = useState(true)
// const [activeTheme, setTheme] = useState(getTheme())

// function getTheme() {
// return localStorage.getItem('theme') || 'light-mode'
// }

// function getTimeCycle() {
// const t = localStorage.getItem('time')
// return t ? JSON.parse(t) : {frontTime: 3, backTime: 1}
// }

// function toggleTheme() {
// setTheme(v => {
//     const newTheme = v === 'dark-mode' ? 'light-mode' : 'dark-mode'
//     localStorage.setItem('theme', newTheme)
//     return newTheme
// })
// }

// function handleToggleSide(cb) {
// setCard(currentCard => {
//     let item = {...currentCard, side: currentCard.side === 'front' ? 'back' : 'front'}
//     if (cb) {
//     cb(item)
//     }
//     return item
// })
// }

// function handleCardIndexChange(num, limit, cb) {
// setActiveCardByIndex(currIndex => {
//     if (currIndex + num === limit) {
//     cb()
//     }
//     return currIndex + num
// })
// }

// function handleDeckChange(num) {
// setActiveDeckByIndex(i => i + num)
// }

// function selectDeck(index) {
// // setTimerCycle(false)
// // setActiveDeckByIndex(index)
// }

// function selectCard(index) {
// setTimerCycle(false)
// setActiveCardByIndex(index)
// }

// function handleKeyPress(e) {
// const key = e.code
// // e.preventDefault()
// if (key === 'Space') {
//     handleToggleSide()
// }
// if (key === 'ArrowLeft' || key === 'ArrowRight') {
//     let index = key === 'ArrowLeft' ? -1 : 1
//     handleCardIndexChange(index)
// }
// if (key === 'ArrowUp' || key === 'ArrowDown') {
//     let index = key === 'ArrowUp' ? -1 : 1
//     handleDeckChange(index)
// }
// }

// function cycleDeck(index) {
// setActiveDeckByIndex(() => {
//     setTimerCycle(true)
//     return index
// })
// }

// function pauseCycleDeck(index) {
// setTimerCycle(false)
// }

// function updateSettings(settings) {
// setTimeFront(settings.front)
// setTimeBack(settings.back)
// localStorage.setItem('time', JSON.stringify(settings))
// }

// useEffect(() => {
// let limit = currentDeck.cards.length - 1
// if (cardIndex >= 0 && cardIndex <= limit) {
//     setCard(x => currentDeck.cards[cardIndex])
// }
// if (cardIndex <= 0) {
//     setActiveCardByIndex(0)
// }
// if (cardIndex >= limit) {
//     setActiveCardByIndex(limit)
// }
// }, [cardIndex, currentDeck])

// useEffect(() => {
// const offset = activeDeckIndex
// let index = 0
// if (offset < 0) {
//     index = 0
// } else if (offset > 0 && offset >= cardGroup.length) {
//     index = offset - 1
// } else if (offset > 0 && offset < cardGroup.length) {
//     index = offset
// }
// setDeck(cardGroup[index])
// setActiveCardByIndex(0)
// setActiveDeckByIndex(index)
// }, [props.activeDeckIndex, cardGroup])

// useEffect(() => {
// let interval = null;
// if (timerRunning) {
//     // setTimeout(() => {
//     //   setFront(v => !v)
//     //   handleCardIndexChange(1, currentDeck.cards.length, () => {
//     //     setFront(false)
//     //   })
//     //   setCurrentCycle(() => front ? timeCycleFront : timeCycleBack)
//     // }, currentCycle * 1000)
//     //   handleToggleSide(v => {
//     //     if (v.side === 'front') {
//     //       setFront(false)
//     //       handleCardIndexChange(1, currentDeck.cards.length, () => {
//     //         setTimerCycle(false)
//     //         setActiveCardByIndex(0)
//     //         setFront(true)
//     //       })
//     //     } else {
//     //       handleCardIndexChange(1)
//     //       setFront(true)
//     //     }
//     //     setCurrentCycle(() => v.side === 'front' ? timeCycleFront : timeCycleBack)
//     //   })
//     // }, currentCycle * 1000)
//     interval = setInterval(() => {
//     handleToggleSide(v => {
//         if (v.side === 'front' && !start) {
//         handleCardIndexChange(1, currentDeck.cards.length, () => {
//             setTimerCycle(false)
//             setActiveCardByIndex(0)
//         })
//         } else {
//         setStart(false)
//         }
//     })
//     }, timeCycleFront * 1000);
// } else if (!timerRunning) {
//     clearInterval(interval)
// }
// return () => clearInterval(interval)
// }, [timerRunning, start, currentDeck, front, currentCycle])

// useEffect(() => {
// document.addEventListener('keydown', handleKeyPress);
// return () => document.removeEventListener('keydown', handleKeyPress);
// }, [])