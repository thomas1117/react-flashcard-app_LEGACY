import React from 'react'

export function Select({onChange, options }: any, ...restProps: any[]) {
    return (
        <select className="Card-deck-select" onChange={onChange} {...restProps}>
            {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            {/* <option value="markdown">markdown</option>
            <option value="javascript">js</option> */}
        </select>
    )
}