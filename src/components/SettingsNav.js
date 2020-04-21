import React from 'react';
import Switch from './ui/Switch'
import Settings from './Settings';

export default function SettingsNav(props) {
    return (
        <nav className="SettingsNav">
            <ul>
                <li>
                    <Switch 
                        onChange={props.onChange}
                        activeTheme={props.activeTheme}
                        checked={props.activeTheme === 'dark-mode'}
                    />
                </li>
                {/* <li>
                    <Settings
                        frontTime={props.frontTime}
                        backTime={props.backTime}
                        updateSettings={props.updateSettings} 
                    />
                </li> */}
            </ul>
        </nav>
    )
}