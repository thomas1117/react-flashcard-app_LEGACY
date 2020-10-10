import React, { ChangeEvent, useContext } from 'react'
import ThemeContext from '../../ThemeContext'
export default function Switch(props: {
  onChange: (event: ChangeEvent) => void
}) {
  const ctx = useContext(ThemeContext)
  return (
    <label className="theme-toggler switch">
      <input
        type="checkbox"
        onChange={props.onChange}
        checked={ctx.theme === 'dark-mode'}
      />
      <span className="slider round"></span>
    </label>
  )
}
