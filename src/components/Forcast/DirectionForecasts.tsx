import React, { ReactElement } from 'react';
import './DirectionForecasts.scss';
import TramForecast from '../../models/TramForecast';
import DirectionForecastsItem from './DirectionForecastsItem';

interface DirectionForecastsProps {
  direction: string;
  forecasts: TramForecast[];
  enabled: boolean;
  servicesFinishedForDay: boolean;
}

function DirectionForecasts(props: DirectionForecastsProps): ReactElement {
  return (
    <section className="direction-forecast">
      <h2>{props.direction}</h2>
      <ul>
        {props.enabled &&
          props.forecasts.length === 0 && (
            (props.servicesFinishedForDay &&
              <DirectionForecastsItem key="ServicesFinished" destination={"The LUAS has finished operating for the day, services will resume tomorrow."} />) ||
            (!props.servicesFinishedForDay &&
              <DirectionForecastsItem key="NoTramsForecast" destination={"No trams forecast"} />))}
        {props.enabled &&
          props.forecasts.map((tram, index) =>
            <DirectionForecastsItem key={index} destination={tram.destinationStation.name} minutes={tram.minutes} due={tram.isDue} />)}
        {!props.enabled &&
          <DirectionForecastsItem key="NoTramsDirection" destination={"There is no trams from this stop " + props.direction.toLowerCase() + "."} />}
      </ul>
    </section>
  );
}

export default DirectionForecasts;
