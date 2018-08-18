import React, { Component } from 'react'
import Admin from '../Admin'

import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'

import App from '../App'
import Home from '../components/page/Home'
import Mine from '../components/page/Mine'
import Board from '../components/page/Board'
import Leave_And_OT from '../components/page/Leave_And_OT'
import Login from '../components/page/Login'

export default class extends Component {
    render () {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/" render={() => (
                            <Admin>
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/attend/mine" component={Mine}/>
                                    <Route path="/board" component={Board}/>
                                    <Route path="/attend/leave-and-work" component={Leave_And_OT}/>
                                </Switch>
                            </Admin>
                        )} />
                    </Switch>
                </App>
            </Router>
        )
    }
}
