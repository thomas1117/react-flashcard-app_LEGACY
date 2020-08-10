import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext'

export default function Page(props) {
  const ctx = useContext(ThemeContext)
  return (
    <div className={ctx.theme === 'dark-mode' ? 'App dark-mode' : 'App light-mode'}>
      {props.loaded ? props.children : null}
    </div>
  )
}