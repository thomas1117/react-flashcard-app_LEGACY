import React from 'react'

export default (props: any) => {
    return (
        <div className={"Card " + props.className} onClick={props.onClick}>
            {props.children}
        </div>
    )
}