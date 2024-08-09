import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage, ProfilePage, PublicUserPage, ViewBlogPage, WriteBlogPage } from './pages'
import { PrivateRoute } from './components'

function AppRoutes() {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/user/:alias' component={PublicUserPage} />
      <Route exact path='/read-blog/:blogId' component={ViewBlogPage} />
      <PrivateRoute exact path='/write-blog' component={WriteBlogPage} />
      <PrivateRoute exact path='/profile' component={ProfilePage} />
    </Switch>
  )
}

export default AppRoutes
