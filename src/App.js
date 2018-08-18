import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from './modules/connect'

import SpinLoading from './components/commons/SpinLoading'

class App extends Component {
  state = {
    isLoading: false
  }
  // componentWillReceiveProps (props) {
  //   let {pathname} = props.location
  //   if (pathname !== this.props.location.pathname) {
  //     this.checkLogin(props)
  //   }
  // }
  // componentWillMount () {
  //   this.checkLogin(this.props)
  //   this.bus.on('change-loading', () => {
  //     this.setState({isLoading: !this.state.isLoading})
  //   })
  // }
  checkLogin (props) {
    let { commons, history } = props
    if (props.location.pathname !== '/login') {
      if (!commons.user_state) {
        history.replace('/login')
      }
    }
  }
  render() {
    let { isLoading } = this.state
    return (
      <div className="App">
        {this.props.children}
        <SpinLoading isLoading={isLoading}/>
      </div>
    );
  }
}

export default withRouter(connect(App, 'commons'));
