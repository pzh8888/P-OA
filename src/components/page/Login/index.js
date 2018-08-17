import React, { Component } from 'react'
import connect from '../../../modules/connect'

import './index.scss'

class Login extends Component {

    constructor (props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit (e) {
        e.preventDefault()
        let username = this.username.value
        let password = this.password.value
        this.props.commons_actions.login({
            username,
            password,
            success: () => {
                this.props.history.replace('/')
            }
        })
    }

    render() {
        return (
            <div className="app-login">
                <div className="login">
                    <div className="box png">
                        <div className="logo png"></div>
                        <div className="input">
                            <form onSubmit={this.handleSubmit} className="log">
                                <div className="name">
                                    <label>用户名</label><input type="text" className="text" id="value_1" placeholder="用户名" ref={el => this.username = el}/>
                                </div>
                                <div className="pwd">
                                    <label>密　码</label><input type="password" className="text" id="value_2" placeholder="密码" ref={el => this.password = el}/>
                                    <input type="submit" className="submit" value="登录"/>
                                    <div className="check"></div>
                                </div>
                                <div className="tip"></div>
                            </form>
                        </div>
                    </div>
                    <div className="footer"></div>
                </div>
                <div style={ {textAlign: "center", margin:"50px 0", font :"normal 14px/24px 'MicroSoft YaHei'"} }>
                    <p>适用浏览器：360、FireFox、Chrome、Safari、Opera、傲游、搜狗、世界之窗. 不支持IE8及以下浏览器。</p>
                    <p>More Templates <a href="http://www.cssmoban.com/" title="模板之家">模板之家</a> - Collect from <a href="http://www.cssmoban.com/" title="网页模板">网页模板</a></p>
                </div>    
            </div>
        )
    }
}
export default connect(Login, 'commons')
