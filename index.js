const sName = process.argv[2]
const fs = require('fs')

const slice = sName
const dir = `client/src/features/${slice}`

const sliceName = `${slice}Slice`
const titleCase = (name) => name.charAt(0).toUpperCase() + name.slice(1)
const sliceTemplate = `

import { createSlice } from '@reduxjs/toolkit'

export const ${sliceName} = createSlice({
  name: '${slice}',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = ${sliceName}.actions;
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
export const selectCount = state => state.${slice}.value;
export default ${sliceName}.reducer;
`

const componentTemplate = `
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './todoSlice'
export default () => {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)
  return (
    <div>
      <button onClick={() => dispatch(increment())}>{count}</button>
    </div>
  )
}
`

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
  fs.appendFile(
    dir + '/' + `${titleCase(slice)}.js`,
    `${componentTemplate}`,
    () => {}
  )
  fs.appendFile(dir + '/' + `${titleCase(slice)}.module.css`, ``, () => {})
  fs.appendFile(dir + '/' + `${slice}Slice.js`, `${sliceTemplate}`, () => {})
}
