import { configureStore } from '@reduxjs/toolkit'
import deckReducer from '../features/deck/deckSlice'
export default configureStore({
  reducer: {
    deck: deckReducer,
    settingState: () => ({}),
    deckState: () => ({ sections: [] }),
    cardState: () => ({}),
  },
})
