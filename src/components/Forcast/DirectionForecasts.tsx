import React from 'react';
import moment, { Moment } from 'moment';
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

const BankHolidays: string[] = [
  "2020-04-13",
  "2020-05-04",
  "2020-06-01",
  "2020-08-03",
  "2020-10-26",
  "2020-12-25",
  "2020-12-26",
  "2020-01-01",
  "2020-03-17",
  "2020-04-05",
  "2020-05-03",
  "2020-06-07",
  "2020-07-02",
  "2020-10-25",
  "2020-12-25",
  "2020-12-26",
]

function getOperatingHoursDirectionForToday(operatingHours: OperatingHoursModel, isInbound: boolean): [OperatingHoursDirection, OperatingHoursDirection] {
  let now: Moment = moment().hour() < 2 ? moment(-1, 'day') : moment();

  var todayOperatingHoursDay: OperatingHoursDay;

  if (BankHolidays.map(bh => bh === now.format("YYYY-MM-DD"))) {
    todayOperatingHoursDay = getOperatingHours(7, operatingHours);
  }
  else {
    todayOperatingHoursDay = getOperatingHours(now.isoWeekday(), operatingHours);
  }

  let nextDay: Moment = now.add(1, 'day');
  let nextOperatingHoursDay: OperatingHoursDay = getOperatingHours(nextDay.isoWeekday(), operatingHours);

  return isInbound ? [todayOperatingHoursDay.inbound, nextOperatingHoursDay.inbound] : [todayOperatingHoursDay.outbound, nextOperatingHoursDay.outbound];
}

function getOperatingHours(dayOfWeek: number | Moment, operatingHours: OperatingHoursModel): OperatingHoursDay {
  switch (dayOfWeek) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return operatingHours.weekdays;

    case 6:
      return operatingHours.saturday;

    case 7:
      return operatingHours.sunday;

    default:
      return operatingHours.sunday;
  }
}

const getLastTramMoment = (lastTram: string) => {
  let lastTramMoment: Moment = moment(lastTram, "HH:mm");

  if (lastTramMoment.diff(moment(), 'hours', true) > 12) {
    if (lastTramMoment.hours() >= 0 && lastTramMoment.hours() <= 2) {
      return lastTramMoment.add(1, 'day');
    }
    else {
      return lastTramMoment.add(-1, 'day');
    }
  }


  return lastTramMoment;
}

const servicesFinishedForDay = (lastTram: Moment) => {
  let now: Moment = moment();
  return lastTram.diff(now, 'minutes') < 0
}

const shouldShowLastTramTime = (lastTram: Moment) => {
  let now: Moment = moment();
  return now.diff(lastTram, 'hours', true) < 1.5;
}

const formatTime = (time: string) => {
  return moment(time, "HH:mm").format("h:mm a");
}

const DirectionForecasts: React.FC<DirectionForecastsProps> = (props: DirectionForecastsProps) => {
  let enabled: boolean = ((props.isInbound && props.operatingHours.weekdays.inbound !== null)
    || (!props.isInbound && props.operatingHours.weekdays.outbound.firstTram !== null));
  let operatingHours: [OperatingHoursDirection, OperatingHoursDirection] = getOperatingHoursDirectionForToday(props.operatingHours, props.isInbound);
  let lastTramTime: Moment = enabled ? getLastTramMoment(operatingHours[0].lastTram) : moment(0);
  let areServicesFinishedForDay: boolean = enabled && servicesFinishedForDay(lastTramTime);
  let shouldShowLastTram: boolean = enabled && !areServicesFinishedForDay && shouldShowLastTramTime(lastTramTime);

  return (
    <section className="direction-forecast">
      <div className="direction">
        <h2>{props.direction}</h2>
        {shouldShowLastTram && <h3 className="direction-last-tram">Last tram is at {formatTime(operatingHours[0].lastTram)}</h3>}
      </div>
      <ul>
        {enabled && props.forecasts.length === 0 && (
          (areServicesFinishedForDay &&
            <DirectionForecastsItem key="ServicesFinished" destination={"Services resume in this direction at " + formatTime(operatingHours[1].firstTram)} />) ||
          (!areServicesFinishedForDay &&
            <DirectionForecastsItem key="NoTramsForecast" destination={"No trams forecast"} />))}
        {enabled &&
          props.forecasts.map((tram, index) =>
            <DirectionForecastsItem key={index} destination={tram.destinationStation.name} minutes={tram.minutes} due={tram.isDue} />)}
        {!enabled &&
          <DirectionForecastsItem key="NoTramsDirection" destination={"Trams do not run from this stop in this direction."} />}
      </ul>
    </section>
  );
}

export default DirectionForecasts;
