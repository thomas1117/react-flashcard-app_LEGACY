import { combineReducers, createStore } from 'redux'
import reducers from './reducers/reducers'
import { loadState, saveState } from './storage'

const flashcardApp = combineReducers({
    topic: reducers.topic,
    settings: reducers.settings,
})

const store = createStore(
    flashcardApp,
    loadState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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