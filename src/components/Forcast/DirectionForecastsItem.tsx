import React from 'react';
import './DirectionForecastsItem.scss';
import TramForecast from '../../models/TramForecast';


interface DirectionForecastsItemProps {
  tram: TramForecast
}

function minutesDue(tram: TramForecast) {
  return tram.isDue ? "Due" : tram.minutes + " mins"
}

function DirectionForecastsItem(props: DirectionForecastsItemProps) {
  return (
    <li className="direction-forcast-item">
      <div className="destination">{props.tram.destinationStation.name}</div>
      <div className="minutes">{minutesDue(props.tram)}</div>
    </li>
  );
}

export default DirectionForecastsItem;
