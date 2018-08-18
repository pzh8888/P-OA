import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {  Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class LeftNav extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
            openkeys: [this.getOpenKey()]
        }

        this.renderMenu = this.renderMenu.bind(this)
        this.menuClick = this.menuClick.bind(this)
        this.getOpenKey = this.getOpenKey.bind(this)
        this.handleTitleClick = this.handleTitleClick.bind(this)
    }
    menuClick ({key}) {
        this.props.history.push(key)
    }
    handleTitleClick ({key}) {
        this.setState({openkeys: [key]})
    }
    renderMenu () {
        let { menu_lists } = this.props
        if (!menu_lists) return ''
        return (
            <Menu onClick={this.menuClick} theme="dark" openKeys={this.state.openkeys} selectedKeys={[this.props.location.pathname]} mode="inline">
                {
                    menu_lists.map(menu => {
                        if (menu.children && menu.children.length) {
                            return (
                                <SubMenu
                                    onTitleClick = { this.handleTitleClick }
                                    key={menu.path}
                                    title={<span><Icon type={menu.type} /><span>{menu.title}</span></span>}
                                >
                                    {
                                        menu.children.map(child => (
                                            <Menu.Item key={child.path}>{child.title}</Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                            )
                        }
                        return (
                            <Menu.Item key={menu.path}>
                                <Icon type={menu.type} />
                                <span>{menu.title}</span>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        )
    }
    getOpenKey () {
        let { pathname } = this.props.location
        let { menu_lists } = this.props
        if (!menu_lists) return ''
        for (let i = 0; i < menu_lists.length; i ++) {
            if (menu_lists[i].children) {
                for (let j = 0; j < menu_lists[i].children.length; j ++) {
                    if (menu_lists[i].children[j].path === pathname) {
                        return menu_lists[i].path
                    }
                }
            }
        }
    }
    render () {
        return (
            <div className="left-nav">
                {this.renderMenu()}
            </div>
        )
    }
}
export default withRouter(LeftNav)
