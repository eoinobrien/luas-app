import React from 'react';
import './DirectionForecastsItem.scss';

interface DirectionForecastsItemProps {
  destination: string;
  minutes?: number;
  due?: boolean;
}

function minutesDue(minutes?: number, due?: boolean): string {
  return due ? "Due" : minutes + " mins";
}

const DirectionForecastsItem: React.FC<DirectionForecastsItemProps> = (props: DirectionForecastsItemProps) => {
  return (
    <li className="direction-forcast-item">
      <div className="destination">{props.destination}</div>
      <div className="minutes">{props.minutes !== undefined && minutesDue(props.minutes, props.due)}</div>
    </li>
  );
}

export default DirectionForecastsItem;
