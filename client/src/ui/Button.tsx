import React from 'react'
// {children}, ...restProps: any
export default function Button(props: any) {
    const styles = {
        padding: '10px 20px',
        background: '#00b7ff',
        color: '#fff',
        border: 'none',
        borderRadius: '3px'
    }
    return <button type={props.type} style={styles} onClick={props.onClick}>{props.children}</button>
}