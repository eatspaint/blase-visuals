import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Landing from './components/Landing';
import { BoujeeBlaster, NightFlyer, Signal } from './components/tracks';

const App = () => (
  <Router baseName='/'>
    <Route path='/' exact component={Landing} />
    <Route path='/boujee_blaster' component={BoujeeBlaster} />
    <Route path='/night_flyer' component={NightFlyer} />
    <Route path='/signal' component={Signal} />
  </Router>
)

export default App;
