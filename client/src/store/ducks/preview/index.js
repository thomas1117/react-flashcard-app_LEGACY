// 1. imports
import axios from 'axios'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const SYNC_ACTION = 'example/SYNC'

// 3. initial state
const initialState = {
  preview: []
}

// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SYNC_ACTION:
        return {...state, example: 'sync'}
    default:
      return state
  }
}

// 5. action creators
function someSyncAction() {
  return {
    type: SYNC_ACTION
  }
}

// 6. custom hook
export function useExample() {
  const dispatch = useDispatch()
  const preview = useSelector(appState => appState.previewState.preview)
  return { preview }
}
