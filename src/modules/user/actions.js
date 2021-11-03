import { defineAction } from '_utils/redux'
import * as userService from '_services/user'

export const LOGIN = defineAction('LOGIN')
export const UPDATE = defineAction('UPDATE')
export const GET_USER = defineAction('GET_USER')
export const LOGOUT = 'LOGOUT'

export const login = payload => dispatch =>
  dispatch({
    type: LOGIN.ACTION,
    payload: userService.login(payload),
  })

export const update = payload => (dispatch, getState) => {
  return dispatch({
    type: UPDATE.ACTION,
    payload: userService.update(getState().user.key, payload),
  })
}

export const getUser = () => (dispatch, getState) => {
  return dispatch({
    type: GET_USER.ACTION,
    payload: userService.getUser(getState().user.key),
  })
}

export const logout = () => ({
  type: LOGOUT,
})
