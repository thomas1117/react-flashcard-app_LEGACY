import React, { useEffect, useState } from 'react'

export default function TitleInput({title, onChange}) {
    const [sectionTitle, setTheTitle] = useState('')
    useEffect(() => {
        setTheTitle(title)
    }, [title])
    return (
        <input style={{background: 'transparent', border: 'none', outline: 'none'}} value={sectionTitle.trim()} onChange={onChange} />
    )
}