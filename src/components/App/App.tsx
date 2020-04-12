import React, { useState, useEffect } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Forecast from '../Forcast/Forecast';
import StationList from '../StationList/StationList';
import Station from '../../models/Station';
import NavBar from '../NavBar/NavBar';
import Help from '../Help/Help';

const App: React.FC = () => {
  const [favouriteStations, setFavouriteStations] = useState<Station[]>([] as Station[]);

  const addToFavouriteStations = (station: Station) => {
    let updatedFavouriteStations: Station[];

    if (favouriteStations.filter(s => s.abbreviation === station.abbreviation).length === 0) {
      updatedFavouriteStations = [...favouriteStations, station];
      setFavouriteStations(updatedFavouriteStations);
    }
    else {
      updatedFavouriteStations = favouriteStations.filter(s => s.abbreviation !== station.abbreviation);
      setFavouriteStations(updatedFavouriteStations);
    }

    localStorage.setItem('favouriteStations', JSON.stringify(updatedFavouriteStations));
  }

  useEffect(() => {
    let localStorageString: string = localStorage.getItem('favouriteStations') || "";

    if (localStorageString !== "") {
      let stations: Station[] = JSON.parse(localStorageString);

      setFavouriteStations(stations);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="main-content">
          <Switch>
            <Route
              path="/station/:abbreviation"
              render={() => <Forecast favouriteClick={addToFavouriteStations} favouriteStations={favouriteStations} />} />

            <Route exact
              path="/line/:line"
              render={() => <StationList favouriteClick={addToFavouriteStations} favouriteStations={favouriteStations} />} />

            <Route exact path="/help">
              <Help />
            </Route>

            <Route exact path="/">
              <Redirect to="/line/Red" />
            </Route>
          </Switch>
        </div>
        <NavBar favouriteStations={favouriteStations} />
      </div>
    </Router>
  );
}

export default App;
