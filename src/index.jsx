import 'core-js/stable'
import 'regenerator-runtime/runtime'
import cookies from 'react-cookies'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import './bootstrap'
import configureStore from './store/configure-store'
import Router from './router'

const root = () => {
  const storedKey = cookies.load('key', { path: '/' })
  const storedUser =
    cookies.load('user', { path: '/' }) && JSON.parse(cookies.load('user', { path: '/' }))
  const preloadedState = {
    user: {
      key: storedKey,
      ...storedUser,
    },
  }
  const store = configureStore(preloadedState)
  render(
    <Provider store={store}>
      <Router />
    </Provider>,
    document.getElementById('root')
  )
}

root()
