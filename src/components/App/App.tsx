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
import Station from '../../models/Station';

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
    console.log(station.name);
    console.log(this.state.favoriteStations)

    if (this.state.favoriteStations.filter(s => s.abbreviation === station.abbreviation).length === 0) {
      this.setState({
        favoriteStations: [...this.state.favoriteStations, station]
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
                render={() => <StationList favouriteAppClick={this.addToFavoriteStations.bind(this)} />} />

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

              {this.state.favoriteStations.map(s =>
                <li key={s.abbreviation}>
                  <Link to={`station/${s.abbreviation}`}>{s.name}</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </Router>
    );
  }
}

export default App;
