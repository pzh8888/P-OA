import React, { Component } from 'react';
import { Layout } from 'antd';
import LeftNav from './components/items/LeftNav'
import BreadNav from './components/items/BreadNav'
import connect from './modules/connect'

const { Header, Content, Footer, Sider } = Layout;


class Admin extends Component {
    state = {
        collapsed: false,
        ccc: 11,
        asd: "123123123"
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed })
    }
    componentDidMount () {
        if (!this.props.commons.menu_lists) {
            this.props.commons_actions.getMenuLists()
        }
    }
    render () {
        return(
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo">P-OA</div>
                    <LeftNav menu_lists={this.props.commons.menu_lists} />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <BreadNav/>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>           
        )
    }
}

export default connect(Admin, 'commons')
