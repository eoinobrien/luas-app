import React from 'react';
import './StationListRowItem.scss';
import { Link } from 'react-router-dom';
import Station from '../../models/Station';
import Line from '../../models/Line';
import FavouriteStar from '../favourite-star/favourite-star';
import { useTranslation } from 'react-i18next';

interface StationListRowItemProps {
   station: Station;
   favouriteClick: any;
   isFavourite: boolean;
}

const StationListRowItem: React.FC<StationListRowItemProps> = (props: StationListRowItemProps) => {
   const { i18n } = useTranslation();

   const favouriteStationClick = () => {
      props.favouriteClick(props.station);
   }

   return (
      <li className="station-list-row" style={props.station.line.toString() === Line[Line.Red] ? { borderLeftColor: '#f44336' } : { borderLeftColor: '#00af00' }}>
         <Link to={`/${i18n.language}/station/${props.station.abbreviation}`}>
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
