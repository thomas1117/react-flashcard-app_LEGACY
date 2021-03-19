import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import deckReducer from '../features/deck/deckSlice'
import sectionReducer from '../features/deck/sectionSlice'
import settingReducer from '../features/settings/settingsSlice'
import authReducer from '../features/auth/auth'
export const store = configureStore({
  reducer: {
    authState: authReducer,
    deck: deckReducer,
    section: sectionReducer,
    setting: settingReducer,
    deckState: () => ({ sections: [] }),
    cardState: () => ({}),
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
