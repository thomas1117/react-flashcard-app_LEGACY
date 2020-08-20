import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'
import * as duckReducers from './ducks'
import { loadState, saveState } from './storage'

const flashcardApp = combineReducers({
    topic: reducers.topic,
    settings: reducers.settings,
    ...duckReducers,
})

const cachedState = loadState()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    flashcardApp,
    cachedState,
    composeEnhancer(applyMiddleware(thunk)),
)

store.subscribe(() => {
    const s = store.getState()
    saveState({
        settingState: {
            timeCycleFront: s.settingState.timeCycleFront,
            timeCycleBack: s.settingState.timeCycleBack,
            activeTheme: s.settingState.activeTheme
        }
    })
})

export default store