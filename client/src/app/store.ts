import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import deckReducer from '../features/deck/deckSlice'
import settingReducer from '../features/settings/settingsSlice'
export const store = configureStore({
  reducer: {
    deck: deckReducer,
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
