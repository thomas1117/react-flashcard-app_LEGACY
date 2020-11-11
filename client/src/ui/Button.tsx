import React from 'react'
// {children}, ...restProps: any
/* eslint-disable */
export default function Button({type, onClick, children, ...restProps}) {
    const style = restProps.style || {}
    const styles = {
        padding: '10px 20px',
        background: '#00b7ff',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        margin: (style && style.margin) || 0,
        position: style && style.position || 'static'
    }
    return <button type={type || 'button'} {...restProps} style={styles} onClick={onClick ? onClick : () => {}}>{children}</button>
}