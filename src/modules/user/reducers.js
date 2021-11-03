import cookies from 'react-cookies'

import { createReducer } from '_utils/redux'

import { LOGIN, UPDATE, GET_USER, LOGOUT } from './actions'

const INITIAL_STATE = {
  loading: false,
  loadingPicture: false,
  error: '',
}

const INVALID_CREDENTIALS = 'Unable to log in with provided credentials.'
const BLANK_FIELD = 'This field may not be blank.'

const userReducer = createReducer(INITIAL_STATE, {
  [LOGIN.FULFILLED]: (state, { payload }) => {
    const { user, key } = payload
    cookies.save('key', payload.key, { path: '/' })
    cookies.save('user', JSON.stringify(user), { path: '/' })
    return {
      ...user,
      key,
      loading: false,
      error: '',
    }
  },
  [LOGIN.PENDING]: state => ({ ...state, loading: true }),
  [LOGIN.REJECTED]: (state, { payload }) => ({
    ...state,
    loading: false,
    error:
      payload.non_field_errors[0] === INVALID_CREDENTIALS
        ? 'Invalid email or password'
        : payload.non_field_errors[0],
  }),
  [UPDATE.FULFILLED]: (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false,
    loadingPicture: false,
    error: '',
  }),
  [UPDATE.PENDING]: state => ({ ...state, loading: true, loadingPicture: true }),
  [UPDATE.REJECTED]: (state, { payload }) => ({
    ...state,
    loading: false,
    error:
      payload.first_name[0] || payload.first_name[0] === BLANK_FIELD
        ? 'You must add a first and last name.'
        : `${payload.first_name[0]} ${payload.first_name[0]}`,
  }),
  [GET_USER.REJECTED]: () => {
    return INITIAL_STATE
  },
  [LOGOUT]: () => {
    cookies.remove('key', { path: '/' })
    cookies.remove('user', { path: '/' })
    return INITIAL_STATE
  },
})

export default userReducer
