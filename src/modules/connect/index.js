import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from './actionCreators'

const _connect = (UIComponent, ...reducerOptions) => {
    
    let mapStateToProps = (state) => {
        if (!reducerOptions) return state
        let _state = {}
        reducerOptions.forEach(item => {
            if (typeof(item) === 'string') {
                if (state[item]) {
                    // 键值对
                    _state[item] = state[item]
                }
            } else {
                if (state[item.reducer]) {
                    if (!item.state || !item.state.length) {
                        _state[item.reducer] = state[item.reducer]
                    } else {
                        item.state.forEach(ele => {
                            _state[item.reducer][ele] = state[item.reducer][ele]
                        })
                    }
                }
            }
        })
        return _state
    }

    let mapDispatchToProps = (dispatch) => {
        if (!reducerOptions) return {}
        let actions = {}
        reducerOptions.forEach(item => {
            if (typeof(item) === 'string') {
                if (actionCreators[item]) {
                    // 键值对
                    actions[item + '_actions'] = bindActionCreators(actionCreators[item], dispatch)
                }
            } else {
                if (actionCreators[item.reducer]) {
                    actions[item.reducer + '_actions'] = bindActionCreators(actionCreators[item.reducer], dispatch)
                    
                }
            }
        })
        return actions
    }

    return  connect(mapStateToProps, mapDispatchToProps)(UIComponent)
}

export default _connect