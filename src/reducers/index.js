import { combineReducers } from 'redux'
import {
  RECEIVED_POSTS, RECEIVED_USER,
} from '../actions'

const receiveItems = (state={items:[]}, action) => {
  switch (action.type) {
    case RECEIVED_POSTS:
      return Object.assign({},state,{
          items: action.posts
      })
    default:
      return state
  }
}

const userInfo = (state={},action) => {
  switch (action.type) {
    case RECEIVED_USER:
      return Object.assign({},state,{
        user : action.user,
        isLoggedIn : true
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  receiveItems,
  userInfo
})

export default rootReducer
