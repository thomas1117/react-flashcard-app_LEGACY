import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext'

export default function Page(props) {
  const ctx = useContext(ThemeContext)
  return (
    <div
      style={{ padding: props.padding ? props.padding + 'px' : '0px' }}
      className={ctx.theme === 'dark-mode' ? 'App dark-mode' : 'App light-mode'}
    >
      {props.loaded ? props.children : null}
    </div>
  )
}
