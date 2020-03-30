import React from 'react';
import './StationList.scss';
import { Link, RouteComponentProps, withRouter, NavLink } from 'react-router-dom';
import Station from '../../models/Station';
import Line from '../../models/Line';


interface StationListRouteProps {
  line: string,
}

interface StationListProps extends RouteComponentProps<StationListRouteProps> {
}

interface StationListState {
  stations: Station[],
  loading: boolean,
  error: boolean
}


class StationList extends React.Component<StationListProps, StationListState> {
  constructor(props: any) {
    super(props);

    this.state = {
      stations: [] as Station[],
      loading: true,
      error: false
    }
  }

  componentDidMount() {
    fetch(`https://luasapifunction.azurewebsites.net/api/stations`)
      .then(response => response.json())
      .then(response =>
        this.setState({
          loading: false,
          stations: response
        }))
      .catch(error =>
        this.setState({
          loading: false,
          error: true
        }));
  }

  render() {
    return (
      <div className="station-list">
        <nav className="colour-nav">
          <NavLink exact to={'/line/Red'} activeClassName="active-line">Red</NavLink>
          <NavLink exact to={'/line/Green'} activeClassName="active-line">Green</NavLink>
        </nav>
        <h2>{this.state.loading && "Loading..."}</h2>
        <nav className="list">
          <ul>
            {
              !this.state.loading &&
              this.state.stations
                .filter(s => s.line.toString().toLowerCase() === this.props.match.params.line.toString().toLowerCase())
                .map(station =>
                  <Link to={`/station/${station.abbreviation}`} key={station.abbreviation}>
                    <li style={station.line.toString() === Line[Line.Red] ? { borderLeftColor: '#f44336' } : { borderLeftColor: '#4caf50' }}>
                      {station.name}
                    </li>
                  </Link>)
            }
          </ul>
        </nav>
      </div>
    );
  }
};

export default withRouter(StationList);
