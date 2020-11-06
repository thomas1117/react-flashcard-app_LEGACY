import React from 'react'
// {children}, ...restProps: any
export default function Button({type, onClick, children, ...restProps}) {
    const style = restProps.style || {}
    const styles = {
        padding: '10px 20px',
        background: '#00b7ff',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        margin: (restProps.style && restProps.style.margin) || 0,
        position: restProps.style && restProps.style.position || 'static'
    }
    return <button type={type || 'button'} {...restProps} style={styles} onClick={onClick}>{children}</button>
}