import React from 'react';
import './StationListRow.scss';
import { Link } from 'react-router-dom';
import Station from '../../models/Station';
import Line from '../../models/Line';
import FavouriteStar from '../shared/FavouriteStar';

interface StationListRowProps {
  station: Station;
  favouriteClick: any;
  isFavourite: boolean;
}

const StationListRow: React.FC<StationListRowProps> = (props: StationListRowProps) => {
  function favouriteStationClick() {
    props.favouriteClick(props.station);
  }

  return (
    <li className="station-list-row" style={props.station.line.toString() === Line[Line.Red] ? { borderLeftColor: '#f44336' } : { borderLeftColor: '#00af00' }}>
      <Link to={`/station/${props.station.abbreviation}`}>
        {props.station.name}
        <span> {props.station.irishName}</span>
      </Link>
      <FavouriteStar
        name={props.station.name}
        isFavourite={props.isFavourite}
        favouriteClick={favouriteStationClick} />
    </li>
  );
}

export default StationListRow;
