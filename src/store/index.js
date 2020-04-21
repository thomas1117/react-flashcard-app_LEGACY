import { combineReducers, createStore } from 'redux'
import { topic } from './reducers'

const flashcardApp = combineReducers({
    topic,
})

export default createStore(
    flashcardApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)