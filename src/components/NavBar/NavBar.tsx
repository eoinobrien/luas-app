import React, { ReactElement } from 'react';
import './NavBar.scss';
import Station from '../../models/Station';
import NavBarLink from './NavBarLink';
import Line from '../../models/Line';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface NavBarProps extends RouteComponentProps {
  favoriteStations: Station[];
}

class NavBar extends React.Component<NavBarProps, {}> {
  render(): ReactElement {
    return (
      <nav className="navbar">
        <NavBarLink value="Red" to="/line/Red" colour="#333" />
        <NavBarLink value="Green" to="/line/Green" colour="#333" />

        {this.props.favoriteStations.map(station =>
          <NavBarLink
            value={station.name}
            to={`/station/${station.abbreviation}`}
            colour={station.line.toString() === Line[Line.Red] ? '#f44336' : '#4caf50'}
            key={station.abbreviation} />
        )}
      </nav>
    );
  }
}

export default withRouter(NavBar);
