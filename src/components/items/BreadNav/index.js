import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd';

class BreadNav extends Component {
    constructor (props) {
        super(props)
        this.renderBread = this.renderBread.bind(this)
    }
    renderBread () {
        let { pathname } = this.props.location
        let items = [(
            <Breadcrumb.Item key="/">
                <Link to={"/"}>后台首页</Link>
            </Breadcrumb.Item>
        )]
        let arr = []
        if (pathname !== '/') {
            pathname = pathname.slice(1)
            arr = pathname.split('/')
            arr.map((item, i) => {
                let path = i > 0 ? `/${arr[i-1]}/${item}` : `/${item}`
                return items.push(
                    <Breadcrumb.Item key={path}>
                        {i > 0 ? <Link to={path}>{item}</Link> : item}
                    </Breadcrumb.Item>
                )
            })
        }
        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                {items}
            </Breadcrumb>
        )
    }
    render () {
        return (
            <div className="bread-nav">
                {this.renderBread()}
            </div>
        )
    }
}
export default withRouter(BreadNav)
