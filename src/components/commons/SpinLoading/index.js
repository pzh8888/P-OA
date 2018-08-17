import React, { Component } from 'react'
import './index.scss'

import { Spin } from 'antd';

class SpinLoading extends Component {
    render () {
        let {isLoading} = this.props
        return (
            <div style={{display: isLoading ? 'block' : 'none'}} className="spin-loading">
                <Spin size="large"  tip="加载中..." spinning={isLoading}/>
            </div>    
        )
    }
}

export default SpinLoading
