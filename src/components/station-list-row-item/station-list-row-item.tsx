import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './station-list-row-item.scss';
import FavouriteStar from '../favourite-star/favourite-star';
import Station from '../../models/Station';
import Line from '../../models/Line';

interface StationListRowItemProps {
   station: Station;
   favouriteClick: (station: Station) => void;
   isFavourite: boolean;
}

const StationListRowItem: React.FC<StationListRowItemProps> = (props: StationListRowItemProps) => {
   const { i18n } = useTranslation();

   const favouriteStationClick = (): void => {
      props.favouriteClick(props.station);
   }

   return (
      <li className="station-list-row" style={props.station.line.toString() === Line[Line.Red] ? { borderLeftColor: '#f44336' } : { borderLeftColor: '#00af00' }}>
         <Link to={`/station/${props.station.abbreviation}`}>
            {(i18n.language === "ga" && props.station.irishName) || props.station.name}
            <span> {(i18n.language === "ga" && props.station.name) || props.station.irishName}</span>
         </Link>
         <FavouriteStar
            name={props.station.name}
            isFavourite={props.isFavourite}
            favouriteClick={favouriteStationClick} />
      </li>
   );
}

export default StationListRowItem;
