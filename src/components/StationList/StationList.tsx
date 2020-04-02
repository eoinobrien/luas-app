import React, { ReactElement } from 'react';
import './StationList.scss';
import { RouteComponentProps, withRouter, NavLink, Link } from 'react-router-dom';
import Station from '../../models/Station';
import Line from '../../models/Line';
import StationListRow from './StationListRow';
import { ReactComponent as MoreIcon } from './more-vertical.svg';


interface StationListRouteProps {
  line: string;
}

interface StationListProps extends RouteComponentProps<StationListRouteProps> {
  favouriteClick: any;
  favouriteStations: Station[];
}

interface StationListState {
  stations: Station[];
  loading: boolean;
  error: boolean;
}


class StationList extends React.Component<StationListProps, StationListState> {
  constructor(props: StationListProps) {
    super(props);

    this.state = {
      stations: [] as Station[],
      loading: true,
      error: false
    }
  }

  componentDidMount(): void {
    let localStorageStations: string = localStorage.getItem('allStations') || "";

    if (localStorageStations !== "") {
      console.log("Updating")
      let allStations: Station[] = JSON.parse(localStorageStations);

      this.setState({
        loading: false,
        stations: allStations
      })
    }

    fetch(`https://luasapifunction.azurewebsites.net/api/stations`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          loading: false,
          stations: response
        });

        localStorage.setItem('allStations', JSON.stringify(response));
      })
      .catch(() =>
        this.setState({
          loading: false,
          error: true
        }));
  }

  GetLineName(active: boolean): string {
    if (active) {
      return this.props.match.params.line;
    }
    else {
      return this.props.match.params.line === Line[Line.Red] ? Line[Line.Green] : Line[Line.Red]
    }
  }

  render(): ReactElement {
    return (
      <div className="station-list">
        <header>
          <nav className="colour-nav">
            <NavLink exact to={`/line/${this.GetLineName(true)}`} activeClassName="active-line" style={this.GetLineName(true) === Line[Line.Red] ? { color: '#f44336' } : { color: '#00af00' }}>{this.GetLineName(true)}</NavLink>
            <NavLink exact to={`/line/${this.GetLineName(false)}`} activeClassName="active-line">{this.GetLineName(false)}</NavLink>
          </nav>
          <Link to="/help"><MoreIcon /></Link>
        </header>
        <h2>{this.state.loading && "Loading..."}</h2>
        <nav className="list">
          <ul>
            {
              !this.state.loading &&
              this.state.stations
                .filter(s => s.line.toString().toLowerCase() === this.props.match.params.line.toString().toLowerCase())
                .map(station =>
                  <StationListRow
                    key={station.abbreviation}
                    station={station}
                    favouriteClick={this.props.favouriteClick}
                    isFavourite={this.props.favouriteStations.filter(s => s.abbreviation === station.abbreviation).length !== 0} />)
            }
          </ul>
        </nav>
      </div>
    );
  }
};

export default withRouter(StationList);
