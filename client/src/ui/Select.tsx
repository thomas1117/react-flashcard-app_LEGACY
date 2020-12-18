import React from 'react'

export function Select({onChange, options, value }: any, ...restProps: any[]) {
    return (
        <div className="select">
            <select className="Card-deck-select" onChange={onChange} {...restProps}>
                {options.map(option => <option key={option.value} value={option.value} selected={option.value === value}>{option.label}</option>)}
                {/* <option value="markdown">markdown</option>
                <option value="javascript">js</option> */}
            </select>
        </div>
    )
}