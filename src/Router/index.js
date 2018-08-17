import React, { Component } from 'react'

import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'

import App from '../App'
import Home from '../components/page/Home'
import Login from '../components/page/Login'

export default class extends Component {
    render () {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/" component={Home} />
                    </Switch>
                </App>
            </Router>
        )
    }
}
