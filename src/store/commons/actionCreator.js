import http from '../../modules/http'
import { 
    CHANGE_USER_STATE, CHANGE_MENU_LISTS 
} from './const'

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
    },
    getMenuLists () {
        return dispatch => {
            http.ajax({
                url: '/api/menu_lists.json'
            }).then(data => {
                let action = { type: CHANGE_MENU_LISTS, menu_lists: data}
                dispatch (action)
            })
        }
    }
}   

export default actionCreator
