import React from 'react';
import './DirectionForecasts.scss';
import TramForecast from '../../models/TramForecast';
import DirectionForecastsItem from './DirectionForecastsItem';
import OperatingHoursDirection from '../../models/OperatingHoursDirection';
import OperatingHoursDay from '../../models/OperatingHoursDay';
import OperatingHoursModel from '../../models/OperatingHoursModel';

interface DirectionForecastsProps {
  isInbound: boolean;
  direction: string;
  forecasts: TramForecast[];
  operatingHours: OperatingHoursModel;
}

function getOperatingHoursDirectionForToday(operatingHours: OperatingHoursModel, isInbound: boolean): [OperatingHoursDirection, OperatingHoursDirection] {
  let now: Date = new Date();
  let dayOfWeek: number = now.getDay();

  if (now.getHours() < 2) {
    dayOfWeek = (dayOfWeek - 1);
    dayOfWeek = dayOfWeek < 0 ? 6 : dayOfWeek;
  }

  let currentDay: OperatingHoursDay = getOperatingHours(dayOfWeek, operatingHours);

  let nextDayOfWeek = dayOfWeek + 1;
  nextDayOfWeek = nextDayOfWeek > 6 ? 0 : nextDayOfWeek;
  let nextDay: OperatingHoursDay = getOperatingHours(nextDayOfWeek, operatingHours);

  return isInbound ? [currentDay.inbound, nextDay.inbound] : [currentDay.outbound, nextDay.outbound];
}

function getOperatingHours(dayOfWeek: number, operatingHours: OperatingHoursModel): OperatingHoursDay {
  switch (dayOfWeek) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return operatingHours.weekdays;

    case 6:
      return operatingHours.saturday;

    case 0:
      return operatingHours.sunday;

    default:
      return operatingHours.sunday;
  }
}

function servicesFinishedForDay(lastTram: string): boolean {
  let time: number[] = lastTram.split(':').map(num => +num);
  let now: Date = new Date();

  return (time[0] > now.getHours())
    || (time[0] === now.getHours() && time[1] > now.getMinutes());
}

const DirectionForecasts: React.FC<DirectionForecastsProps> = (props: DirectionForecastsProps) => {
  let enabled: boolean = ((props.isInbound && props.operatingHours.weekdays.inbound !== null)
    || (!props.isInbound && props.operatingHours.weekdays.outbound.firstTram !== null));
  let operatingHours: [OperatingHoursDirection, OperatingHoursDirection] = getOperatingHoursDirectionForToday(props.operatingHours, props.isInbound);
  let isServicesFinishedForDay: boolean = servicesFinishedForDay(operatingHours[0].lastTram);

  return (
    <section className="direction-forecast">
      <h2>{props.direction}</h2>
      <ul>
        {enabled && props.forecasts.length === 0 && (
          (isServicesFinishedForDay &&
            <DirectionForecastsItem key="ServicesFinished" destination={"Services will resume in morning in this direction at " + operatingHours[1].firstTram + " a.m."} />) ||
          (!isServicesFinishedForDay &&
            <DirectionForecastsItem key="NoTramsForecast" destination={"No trams forecast"} />))}
        {enabled &&
          props.forecasts.map((tram, index) =>
            <DirectionForecastsItem key={index} destination={tram.destinationStation.name} minutes={tram.minutes} due={tram.isDue} />)}
        {!enabled &&
          <DirectionForecastsItem key="NoTramsDirection" destination={"There is no trams from this stop " + props.direction.toLowerCase() + "."} />}
      </ul>
    </section>
  );
}

export default DirectionForecasts;
