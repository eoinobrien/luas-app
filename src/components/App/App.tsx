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
  favoriteStations: Station[];
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      favoriteStations: [] as Station[]
    }
  }

  addToFavoriteStations(station: Station): void {
    if (this.state.favoriteStations.filter(s => s.abbreviation === station.abbreviation).length === 0) {
      this.setState({
        favoriteStations: [...this.state.favoriteStations, station]
      })
    }
    else {
      let updatedFavoriteStations = this.state.favoriteStations.filter(s => s.abbreviation !== station.abbreviation);
      this.setState({
        favoriteStations: updatedFavoriteStations
      })
    }
  }

  render(): ReactElement {
    return (
      <Router>
        <div className="app">
          <div className="main-content">
            <Switch>
              <Route exact path="/station/:abbreviation" component={Forecast} />

              <Route exact
                path="/line/:line"
                render={() => <StationList favouriteClick={this.addToFavoriteStations.bind(this)} favouriteStations={this.state.favoriteStations} />} />

              <Route exact path="/">
                <Redirect to="/line/Red" />
              </Route>
            </Switch>
          </div>
          <NavBar favoriteStations={this.state.favoriteStations} />
        </div>
      </Router>
    );
  }
}

export default App;
