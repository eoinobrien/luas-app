import React, { ReactElement } from 'react';
import './StationListRow.scss';
import { Link } from 'react-router-dom';
import Station from '../../models/Station';
import Line from '../../models/Line';
import FavouriteStar from '../shared/FavouriteStar';

interface StationListRowProps {
  station: Station;
  favouriteClick: any;
  favourite: boolean;
}

class StationListRow extends React.Component<StationListRowProps, {}> {
  favouriteStationClick() {
    this.props.favouriteClick(this.props.station);
  }

  render(): ReactElement {
    return (
      <li className="station-list-row" style={this.props.station.line.toString() === Line[Line.Red] ? { borderLeftColor: '#f44336' } : { borderLeftColor: '#4caf50' }}>
        <Link to={`/station/${this.props.station.abbreviation}`}>
          {this.props.station.name}
        </Link>
        <FavouriteStar favourite={this.props.favourite} favouriteClick={this.favouriteStationClick.bind(this)} />
      </li>
    );
  }
}

export default StationListRow;
