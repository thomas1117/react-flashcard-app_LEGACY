import React, { useEffect, useState } from 'react'
import { BsTrash2Fill } from 'react-icons/bs'

export default function TitleInput({title, onChange, onDelete}) {
    const [sectionTitle, setTheTitle] = useState('')
    useEffect(() => {
        setTheTitle(title)
    }, [title])
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <input style={{background: 'transparent', border: 'none', outline: 'none'}} value={sectionTitle.trim()} onChange={onChange} />
            <BsTrash2Fill onClick={onDelete}/>
        </div>
    )
}