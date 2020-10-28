import React from 'react'
import ReactMarkdown from 'react-markdown'

const CardFront = (props: any) => {
    return (
        <div className={'Card-front'}>
        <ReactMarkdown source={props.front} />
      </div>
    )
}

export default CardFront