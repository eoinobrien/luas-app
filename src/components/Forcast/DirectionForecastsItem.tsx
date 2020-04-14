import React from 'react';
import './DirectionForecastsItem.scss';
import { useTranslation } from 'react-i18next';

interface DirectionForecastsItemProps {
  destination: string;
  minutes?: number;
  due?: boolean;
}

const DirectionForecastsItem: React.FC<DirectionForecastsItemProps> = (props: DirectionForecastsItemProps) => {
  const { t } = useTranslation();

  const minutesDue = (minutes: number, due: boolean) => {
    return due ? t('forecast.time.due') : t('forecast.time.minutes', {minutes: minutes});
  }

  return (
    <li className="direction-forcast-item">
      <div className="destination">{props.destination}</div>
      <div className="minutes">{props.minutes !== undefined && props.due !== undefined && minutesDue(props.minutes, props.due)}</div>
    </li>
  );
}

export default DirectionForecastsItem;
