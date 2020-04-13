import React, { useState, useEffect } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Forecast from '../Forcast/Forecast';
import StationList from '../StationList/StationList';
import Station from '../../models/Station';
import NavBar from '../NavBar/NavBar';
import Help from '../Help/Help';

const App: React.FC = () => {
  const [favouriteStations, setFavouriteStations] = useState<Station[]>([] as Station[]);
  const { i18n } = useTranslation();

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

  const getLanguageFromLocalStorage = () => {
    return localStorage.getItem('i18nextLng') || "";
  }

  return (
    <Router>
      {i18n.language} - {i18n.options.whitelist}
      <div className="app">
        <div className="main-content">
          <Switch>
            <Route
              path="/:lng(en|ga)/station/:abbreviation"
              render={() => <Forecast favouriteClick={addToFavouriteStations} favouriteStations={favouriteStations} />} />

            <Route
              path="/:lng(en|ga)/line/:line"
              render={() => <StationList favouriteClick={addToFavouriteStations} favouriteStations={favouriteStations} />} />

            <Route path="/:lng(en|ga)/help">
              <Help />
            </Route>

            <Route
              exact
              path="/:lng(en|ga)"
              render={props => (
                <Redirect to={`/${props.match.params.lng}/line/Red`} />
              )}
            />

            <Route
              exact
              path="/"
              render={() => {
                let lang: string = getLanguageFromLocalStorage();

                if (lang !== "") {
                  return <Redirect to={`/${lang}/line/Red`} />
                }

                return <Redirect to="/en/line/Red" />
              }}
            />
          </Switch>
        </div>
        <NavBar favouriteStations={favouriteStations} />
      </div>
    </Router>
  );
}

export default App;
