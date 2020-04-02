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
    if (this.state.favouriteStations.filter(s => s.abbreviation === station.abbreviation).length === 0) {
      this.setState({
        favouriteStations: [...this.state.favouriteStations, station]
      })
    }
    else {
      let updatedFavouriteStations = this.state.favouriteStations.filter(s => s.abbreviation !== station.abbreviation);
      this.setState({
        favouriteStations: updatedFavouriteStations
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
                render={() => <Forecast />} />

              <Route exact
                path="/line/:line"
                render={() => <StationList favouriteClick={this.addToFavouriteStations.bind(this)} favouriteStations={this.state.favouriteStations} />} />

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
