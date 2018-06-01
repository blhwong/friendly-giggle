import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Media from './components/Media';
import Identifier from './components/Identifier';
import './index.css';


const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Identifier} />
      <Route path="/media/:identifier" component={Media} />
    </div>
  </Router>
);

export default Routes;
