import React, { ReactElement } from 'react';
import './DirectionForecastsItem.scss';
import TramForecast from '../../models/TramForecast';


interface DirectionForecastsItemProps {
  destination: string;
  minutes?: number;
  due?: boolean;
}

function minutesDue(minutes?: number, due?: boolean): string {
  return due ? "Due" : minutes + " mins";
}

function DirectionForecastsItem(props: DirectionForecastsItemProps): ReactElement {
  return (
    <li className="direction-forcast-item">
      <div className="destination">{props.destination}</div>
      <div className="minutes">{props.minutes !== undefined && minutesDue(props.minutes, props.due)}</div>
    </li>
  );
}

export default DirectionForecastsItem;
