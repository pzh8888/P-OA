import http from '../../modules/http'
import { CHANGE_USER_STATE } from './const'

const actionCreator = {
    login ({username, password, success, fail}) {
        return dispatch => {
            http.ajax({
                url: '/api/login.json',
                params: {username, password}
            }).then(res => {
                let action = { type: CHANGE_USER_STATE, user_state: res}
                dispatch (action)
                if (success) success()
            }).catch(err => {
                if (fail) fail()
            })
        }
    }
}   

export default actionCreator
