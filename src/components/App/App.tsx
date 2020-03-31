import React, { ReactElement } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import Forecast from '../Forcast/Forecast';
import StationList from '../StationList/StationList';

function App(): ReactElement {
  return (
    <Router>
      <div className="app">
        <div className="main-content">
          <Switch>
            <Route exact path="/station/:abbreviation" component={Forecast} />

            <Route exact path="/line/:line" component={StationList} />

            <Route exact path="/">
              <Redirect to="/line/Red" />
            </Route>
          </Switch>
        </div>

        <nav className="bottom-nav">
          <ul>
            <li>
              <Link to="/line/Red">Red</Link>
            </li>
            <li>
              <Link to="/line/Green">Green</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
