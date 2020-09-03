const settingsState = {
  timeCycleFront: 3,
  timeCycleBack: 5,
  activeTheme: 'light-mode',
}

export default function settings(state = settingsState, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        timeCycleFront: action.settings.frontTime,
        timeCycleBack: action.settings.backTime,
      }
    case 'TOGGLE_THEME':
      return {
        ...state,
        activeTheme:
          state.activeTheme === 'dark-mode' ? 'light-mode' : 'dark-mode',
      }
    default:
      return state
  }
}
