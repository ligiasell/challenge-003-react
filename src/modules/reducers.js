import { combineReducers } from 'redux'

import user from '_modules/user/reducers'

const rootReducer = combineReducers({ user })

export default rootReducer
