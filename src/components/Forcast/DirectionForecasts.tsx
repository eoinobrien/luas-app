import React, { ReactElement } from 'react';
import './DirectionForecasts.scss';
import TramForecast from '../../models/TramForecast';
import DirectionForecastsItem from './DirectionForecastsItem';

interface DirectionForecastsProps {
  direction: string;
  forecasts: TramForecast[];
}

function DirectionForecasts(props: DirectionForecastsProps): ReactElement {
  return (
    <section className="direction-forecast">
      <h2>{props.direction}</h2>
      <ul>
        {props.forecasts.length === 0 &&
          <li>No Trams Forcast</li>}
        {props.forecasts.map((tram, index) =>
          <DirectionForecastsItem key={index} tram={tram} />)}
      </ul>
    </section>
  );
}

export default DirectionForecasts;
