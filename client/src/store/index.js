import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'
import * as duckReducers from './ducks'
import { loadState, saveState } from './storage'

const flashcardApp = combineReducers({
    topic: reducers.topic,
    settings: reducers.settings,
    ...duckReducers
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    flashcardApp,
    composeEnhancer(applyMiddleware(thunk)),
    
)

store.subscribe(() => {
    const s = store.getState()
    saveState({
        settings: {
            timeCycleFront: s.settings.timeCycleFront,
            timeCycleBack: s.settings.timeCycleBack,
            activeTheme: s.settings.activeTheme
        }
    })
})

export default store