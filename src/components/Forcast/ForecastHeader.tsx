import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Forecast.scss';
import { ReactComponent as LeftArrow } from '../../arrow-left-circle.svg';
import Line from '../../models/Line';
import FavouriteStar from '../shared/FavouriteStar';
import Station from '../../models/Station';

interface ForecastHeaderProps {
  loading: boolean;
  station: Station;
  abbreviation: string;
  favouriteStations: Station[];
  favouriteClick: any;
}

const ForecastHeader: React.FC<ForecastHeaderProps> = (props: ForecastHeaderProps) => {
  const { i18n } = useTranslation();

  function favouriteStationClick() {
    props.favouriteClick(props.station)
  }

  return (
    <header style={(props.loading && { borderColor: '#424242' }) || (props.station.line.toString() === Line[Line.Red] ? { borderColor: '#f44336' } : { borderColor: '#00af00' })}>
      <Link
        className="back-arrow"
        aria-label="Go Back to the list of Stations"
        to={`/${i18n.language}/line/${!props.loading && props.station.line}`}>
        <LeftArrow />
      </Link>
      <h1>
        {(props.loading && props.abbreviation)
          || ((i18n.language === "ga" && props.station.irishName) || props.station.name)}
        <span> {!props.loading && ((i18n.language === "ga" && props.station.name) || props.station.irishName)}</span></h1>

      {!props.loading &&
        <FavouriteStar
          name={props.station.name}
          isFavourite={props.favouriteStations.filter(s => s.abbreviation === props.abbreviation).length !== 0}
          favouriteClick={favouriteStationClick} />}
    </header>
  );
};

export default ForecastHeader;
