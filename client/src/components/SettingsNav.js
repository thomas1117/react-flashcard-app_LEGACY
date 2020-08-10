import React, { useContext } from 'react';
import Switch from './ui/Switch'
import Settings from './Settings'
import ThemeContext from '../ThemeContext'

export default function SettingsNav(props) {
    const ctx = useContext(ThemeContext)
    return (
        <nav className="SettingsNav">
            <ul>
                <li className="SettingsNav-toggle">
                    <Switch 
                        onChange={props.onChange}
                        checked={ctx.theme === 'dark-mode'}
                    />
                </li>
                <li>
                    <Settings
                        onChange={props.onChange}
                        checked={ctx.theme === 'dark-mode'}
                        frontTime={props.frontTime}
                        backTime={props.backTime}
                        updateSettings={props.updateSettings} 
                    />
                </li>
            </ul>
        </nav>
    )
}