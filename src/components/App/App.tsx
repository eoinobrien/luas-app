import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Forecast from '../Forcast/Forecast';
import StationList from '../StationList/StationList';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/station/:abbreviation" component={Forecast} />

          <Route exact path="/line/:line" component={StationList} />

          <Route exact path="/">
            <Redirect to="/line/Red" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
