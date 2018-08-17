import { ADD_NEW_TODO } from './const'

const actionCreator = {
    addNewTodo (title) {
        // 同步操作
        // let action = {
        //     type: ADD_NEW_TODO,
        //     title
        // }
        // return action
        // 
        // 异步操作
        return (dispatch) => {
            backend.saveTitle(title).then(res => {
                let action = {
                    type: ADD_NEW_TODO,
                    title
                }
                dispatch(action)
            })
        }
    }
}   

export default actionCreator

const backend = {
    saveTitle () {    
        return new Promise ((resolve, rejected) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
    }
}
