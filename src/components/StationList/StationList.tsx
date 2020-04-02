import React, { ReactElement } from 'react';
import './StationList.scss';
import { RouteComponentProps, withRouter, NavLink } from 'react-router-dom';
import Station from '../../models/Station';
import Line from '../../models/Line';
import StationListRow from './StationListRow';


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
    fetch(`https://luasapifunction.azurewebsites.net/api/stations`)
      .then(response => response.json())
      .then(response =>
        this.setState({
          loading: false,
          stations: response
        }))
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
        <nav className="colour-nav">
          <NavLink exact to={`/line/${this.GetLineName(true)}`} activeClassName="active-line">{this.GetLineName(true)}</NavLink>
          <NavLink exact to={`/line/${this.GetLineName(false)}`} activeClassName="active-line">{this.GetLineName(false)}</NavLink>
        </nav>
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
