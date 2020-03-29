import './StationList.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Station from '../../models/Station';

interface StationListProps {
  stations: Station[],
}

function StationList(props: StationListProps) {
  return (
    <nav className="station-list">
      <ul>
        {
          props.stations.map(station =>
            <li key={station.abbreviation}>
              <Link to={`/station/${station.abbreviation}`}>{station.name}</Link>
            </li>)
        }
      </ul>
    </nav>
  );
}

export default StationList;
