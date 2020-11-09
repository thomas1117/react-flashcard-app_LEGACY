import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './auth'

export default (props) => {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
        return <Redirect to="login"/>
        }
        return <Route {...props} />
}