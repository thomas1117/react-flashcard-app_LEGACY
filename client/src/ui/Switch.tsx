import React, { ChangeEvent, useContext } from 'react'
import ThemeContext from '../ThemeContext'
export default function Switch(props: {
  onChange: (event: ChangeEvent) => void,
  checked?: boolean
}) {
  const ctx = useContext(ThemeContext)
  return (
    <label className="theme-toggler switch">
      <input
        type="checkbox"
        onChange={props.onChange}
        checked={(props.checked === undefined && ctx.theme === 'dark-mode') || props.checked}
      />
      <span className="slider round"></span>
    </label>
  )
}
