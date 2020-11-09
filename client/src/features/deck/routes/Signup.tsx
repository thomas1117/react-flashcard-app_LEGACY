import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import request from '../../../utils/request'
import { Input, Button, Form } from 'antd';

export default function Signup() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        request.post('/registration', {email, password}).then(r => {
            history.push('/decks/js')
        })
    }
    return (
        <form onSubmit={handleSubmit} style={{padding: '2rem', maxWidth: '500px', margin: '0 auto'}}>
            <h2>Signup</h2>
            <Form.Item>
                <Input 
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>
            <Button type="default" htmlType="submit">Signup</Button>
        </form>
    )
}