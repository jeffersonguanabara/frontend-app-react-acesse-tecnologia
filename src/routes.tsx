import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Processes from './pages/Processes';
import SignIn from './pages/SignIn';
import Users from './pages/Users';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SignIn} />
      <Route path="/usuarios" component={Users} />
      <Route path="/processos" component={Processes} />
    </BrowserRouter>
  );
}

export default Routes;