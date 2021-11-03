import React from 'react'
import { Router as ReachRouter } from '@reach/router'

import Login from '_views/login'
import User from '_views/user'
import NotFoundPage from '_views/not-found'

const Router = () => (
  <ReachRouter>
    <Login path="login" />
    <User path="/" />
    <NotFoundPage default />
  </ReachRouter>
)

export default Router
