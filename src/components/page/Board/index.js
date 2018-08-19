import React, { Component } from 'react'
import './index.scss'
import connect from '../../../modules/connect'
import { Table, Button, Divider, Select, Modal } from 'antd'

const Option = Select.Option


class Board extends Component {
    constructor (props) {
        super(props)
        this.searchChange = this.searchChange.bind(this)
        this.checkDetail = this.checkDetail.bind(this)
        this.changeVisible = this.changeVisible.bind(this)
    }
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        visible: false,
        data: [],
        check_data: [],
        types: [],
        columns: [{
            title: 'Title',
            dataIndex: 'title',
        }, {
            title: 'Content',
            dataIndex: 'content',
        }, {
            title: 'Type',
            dataIndex: 'type',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={this.checkDetail.bind(this, record.id)}>Check</a>
                    <Divider type="vertical" />
                    <a>Edit</a>
                    <Divider type="vertical" />
                    <a onClick={this.deleteData.bind(this, record.id)}>Delete</a>
                </span>
            ),
        }]
    };

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    searchChange = (value) => {
        this.getData(value)
    }
    checkDetail (id) {
        // this.setState({check_data: record})
        //再去获取更详细的数据
        for (let i = 0; i < this.state.data.length; i++) {
            const item = this.state.data[i];
            if ( item.id === id ) {
                this.setState({ check_data: item });
                break;
            }
        }
        this.changeVisible()
    }
    deleteData (id) {
        let canDo = this.checkPermission('delete')
        if (!canDo) {
            alert('你没有权限')
            this.props.history.replace('/login')
            return false
        }
        this.setState({data: this.state.data.filter(item => item.id !== id)})
    }
    checkPermission (type) {
        if (!this.props.commons.user_state) return false
        let { permission } = this.props.commons.user_state
        return permission.some(item => item === type)
    }
    changeVisible () {
        this.setState({visible: !this.state.visible})
    }
    getData (type_id = 0) {
        this.$http.ajax({
            url: '/api/board-' + type_id + '.json'
        }).then(res => {
            this.setState({data: res.boardlist.map(item => {
                item.key = item.id
                return item
            })})
        })
    }
    getTypes () {
        this.$http.ajax({
            url: '/api/board-types.json'
        }).then(res => {
            this.setState({types: res.boardtypes})
        })
    }
    componentDidMount () {
        this.getData()
        this.getTypes()
        this.checkPermission()
    }
    render () {
        const { loading, selectedRowKeys, data, types, columns, visible, check_data } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="board">
                <div style={{ marginBottom: 16 }}>
                    <Select defaultValue="全部" style={{ width: 120, marginRight: 10 }} onChange={this.searchChange}>
                        <Option key={0} value="0">全部</Option>
                        {types.map(type => (
                            <Option key={type.id} value={type.id}>{type.title}</Option>
                        ))}
                    </Select>
                    <Button 
                        type="primary"
                        onClick={this.start}
                        disabled={!hasSelected}
                        loading={loading}
                    >
                        Reload
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false}/>
                <Modal
                    title={check_data.title}
                    visible={visible}
                    onOk={this.changeVisible}
                    onCancel={this.changeVisible}
                >
                    <p>{check_data.content}</p>
                </Modal>
            </div>
        );
    }
}

export default connect(Board, 'commons')
