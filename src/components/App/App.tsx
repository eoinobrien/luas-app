import React, { ReactElement } from 'react';
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

interface AppState {
  favouriteStations: Station[];
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      favouriteStations: [] as Station[]
    }
  }

  addToFavouriteStations(station: Station): void {
    let updatedFavouriteStations: Station[];

    if (this.state.favouriteStations.filter(s => s.abbreviation === station.abbreviation).length === 0) {
      updatedFavouriteStations = [...this.state.favouriteStations, station]
      this.setState({
        favouriteStations: updatedFavouriteStations
      })
    }
    else {
      updatedFavouriteStations = this.state.favouriteStations.filter(s => s.abbreviation !== station.abbreviation);
      this.setState({
        favouriteStations: updatedFavouriteStations
      })
    }

    localStorage.setItem('favouriteStations', JSON.stringify(updatedFavouriteStations));
  }

  componentDidMount(): void {
    let localStorageString: string = localStorage.getItem('favouriteStations') || "";

    if (localStorageString !== "") {
      let stations: Station[] = JSON.parse(localStorageString);

      this.setState({
        favouriteStations: stations
      })
    }
  }

  render(): ReactElement {
    return (
      <Router>
        <div className="app">
          <div className="main-content">
            <Switch>
              <Route
                path="/station/:abbreviation"
                render={() => <Forecast favouriteClick={this.addToFavouriteStations.bind(this)} favouriteStations={this.state.favouriteStations} />} />

              <Route exact
                path="/line/:line"
                render={() => <StationList favouriteClick={this.addToFavouriteStations.bind(this)} favouriteStations={this.state.favouriteStations} />} />

              <Route exact path="/help">
                <Help />
              </Route>

              <Route exact path="/">
                <Redirect to="/line/Red" />
              </Route>
            </Switch>
          </div>
          <NavBar favouriteStations={this.state.favouriteStations} />
        </div>
      </Router>
    );
  }
}

export default App;
