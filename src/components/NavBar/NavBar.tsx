import React, { ReactElement } from 'react';
import './NavBar.scss';
import Station from '../../models/Station';
import NavBarLink from './NavBarLink';
import Line from '../../models/Line';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface NavBarProps extends RouteComponentProps {
  favouriteStations: Station[];
}

class NavBar extends React.Component<NavBarProps, {}> {
  render(): ReactElement {
    return (
      <nav className="navbar">
        <div className="line-section">
          <h1>Line</h1>

          <div className="line-section-links">
            <NavBarLink className="line" value="Red" to="/line/Red" colour="#f44336" />
            <NavBarLink className="line" value="Green" to="/line/Green" colour="#4caf50" />
          </div>
        </div>

        <div>
          <h1>Favourite Stations</h1>

          <div className="line-section-links">
            {this.props.favouriteStations.map(station =>
              <NavBarLink
                className="stations"
                value={station.name}
                to={`/station/${station.abbreviation}`}
                colour={station.line.toString() === Line[Line.Red] ? '#f44336' : '#4caf50'}
                key={station.abbreviation} />
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
