import React from 'react'
import { Link } from 'react-router-dom'

export default (props: any) => {
    return (
        props.to ? (
            <Link to={props.to} className={"Card " + props.className}>{props.children}</Link>
        ) : (
            <div className={"Card " + props.className} onClick={props.onClick}>
                {props.children}
            </div>
        )
    )
}