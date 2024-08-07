import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage, ProfilePage } from './pages';
import { PrivateRoute } from './components';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <PrivateRoute path="/profile" component={ProfilePage} />
    </Switch>
  );
}

export default AppRoutes;
