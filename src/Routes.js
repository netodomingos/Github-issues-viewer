import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Main from './pages/Main/Main'
import Repository from './pages/Repository/Repository'

export default function src() {
  return (
    <Router>
        <Switch>
            <Route path='/' exact component={Main} />
            <Route path='/repository/:repository' component={Repository} />
        </Switch>
    </Router>
  );
}
