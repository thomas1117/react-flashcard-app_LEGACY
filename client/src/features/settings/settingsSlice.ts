import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store'

interface CardSetting {
    frontTime: number
    backTime: number
}

// TODO: abstract storage mechanism into service
const settings: string | any = localStorage.getItem('CARD_SETTINGS')
const appSettings: CardSetting = JSON.parse(settings) || {}

interface Settings {
    activeTheme: string
    cardTimeFront: number
    cardTimeBack: number
}

const initialState: Settings = {
  activeTheme: 'dark-mode',
  cardTimeFront: appSettings.frontTime || 3,
  cardTimeBack: appSettings.backTime || 5,
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    updateTheSettings: (state, action: PayloadAction<CardSetting>) => {
      state.cardTimeFront = action.payload.frontTime
      state.cardTimeBack = action.payload.backTime
    },
    toggleTheTheme: (state) => {
        state.activeTheme = state.activeTheme === 'dark-mode' ? 'light-mode' : 'dark-mode'
    },
  },
})

const {
  updateTheSettings,
  toggleTheTheme
} = settingSlice.actions

export const useSettings = () => {
  const dispatch = useDispatch()
  const settingState = useSelector((app: RootState) => app.setting)
  const stateToExpose = {
    cardTimeFront: settingState.cardTimeFront,
    cardTimeBack: settingState.cardTimeBack,
    activeTheme: settingState.activeTheme,
  }
  const methodsToExpose = {
    updateSettings: (settings: CardSetting) => dispatch(updateTheSettings(settings)),
    toggleTheme: () => dispatch(toggleTheTheme()),
  }
  return {
    ...stateToExpose,
    ...methodsToExpose
  }
}

export default settingSlice.reducer
