import { useSelector, useDispatch } from "react-redux"

const TOGGLE_THEME = 'setting/TOGGLE_THEME'
const UPDATE_TIME_CYCLE = 'setting/UPDATE_TIME_CYCLE'

const settingState = {
    timeCycleFront: 3,
    timeCycleBack: 5,
    activeTheme: 'light-mode',
}

export default function settings(state = settingState, action) {
    switch(action.type) {
        case UPDATE_TIME_CYCLE:
            return {
                ...state,
                timeCycleFront: action.settings.frontTime,
                timeCycleBack: action.settings.backTime,
            }
        case TOGGLE_THEME:
            return {
                ...state,
                activeTheme: state.activeTheme === 'dark-mode' ? 'light-mode' : 'dark-mode'
            }
        default:
            return state
    }
}

export function toggle() {
    return {
        type: TOGGLE_THEME,
    }
}

export function timeCycle() {
    return {
        type: UPDATE_TIME_CYCLE,
    }
}

export function useSetting() {
    const dispatch = useDispatch()
    const activeTheme = useSelector(appState => appState.settingState.activeTheme)
    const toggleTheme = () => dispatch(toggle())
    const updateTimeCycle = () => dispatch(timeCycle())
    const timeCycleFront = useSelector(appState => appState.settingState.timeCycleFront)
    const timeCycleBack = useSelector(appState => appState.settingState.timeCycleBack)
    return { activeTheme, toggleTheme, updateTimeCycle, timeCycleBack, timeCycleFront, timeCycleFront}
}