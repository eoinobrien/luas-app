import React, { ReactElement } from 'react';
import './StationListRow.scss';
import { Link } from 'react-router-dom';
import Station from '../../models/Station';
import { ReactComponent as Star } from '../../star.svg';
import { ReactComponent as StarFill } from '../../star-fill.svg';
import Line from '../../models/Line';


interface StationListRowProps {
  station: Station;
  favouriteClick: any;
  favourite: boolean;
}


function StationListRow(props: StationListRowProps): ReactElement {
  return (
    <li className="station-list-row" style={props.station.line === Line.Red ? { borderLeftColor: '#f44336' } : { borderLeftColor: '#4caf50' }}>
      <Link to={`/station/${props.station.abbreviation}`}>
        {props.station.name}
      </Link>
      <button onClick={() => props.favouriteClick(props.station)}>{props.favourite ? <StarFill /> : <Star />}</button>
    </li>
  );
}

export default StationListRow;
