import React from 'react'
import { Link as L } from 'react-router-dom'

export default function Link(props: any) {
    const styles = {
        color: '#fff',
        textDecoration: 'none'
    }
    return <L to={props.to} style={styles}>{props.children}</L>
}