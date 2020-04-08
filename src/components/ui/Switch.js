import React from 'react'
export default function Switch(props) {
    return (
        <label className="theme-toggler switch">
            <input type="checkbox" onChange={props.onChange} checked={props.activeTheme === 'dark-mode'}/>
            <span className="slider round"></span>
        </label>
    )
}