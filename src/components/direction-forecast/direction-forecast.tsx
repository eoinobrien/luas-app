import React from 'react';
import moment, { Moment } from 'moment';
import { useTranslation } from 'react-i18next';
import './direction-forecast.scss';
import SplitListItem from '../split-list-item/split-list-item';
import { BankHolidays } from '../../models/BankHolidays';
import OperatingHoursDirection from '../../models/OperatingHoursDirection';
import OperatingHoursDay from '../../models/OperatingHoursDay';
import OperatingHoursModel from '../../models/OperatingHoursModel';
import TramForecast from '../../models/TramForecast';

interface DirectionForecastsProps {
   isInbound: boolean;
   direction: string;
   forecasts: TramForecast[];
   operatingHours: OperatingHoursModel;
}

function getOperatingHoursDirectionForToday(operatingHours: OperatingHoursModel, isInbound: boolean): [OperatingHoursDirection, OperatingHoursDirection] {
   let now: Moment = moment().hour() <= 2 ? moment(-1, 'day') : moment();

   var todayOperatingHoursDay: OperatingHoursDay;
   let weekday = now.isoWeekday();

   if (BankHolidays.includes(now.format("YYYY-MM-DD"))) {
      weekday = 7;
   }

   todayOperatingHoursDay = getOperatingHours(weekday, operatingHours);


   let nextDay: Moment = now.add(1, 'day');
   let nextOperatingHoursDay: OperatingHoursDay = getOperatingHours(nextDay.isoWeekday(), operatingHours);

   return isInbound ?
      [todayOperatingHoursDay.inbound, nextOperatingHoursDay.inbound] :
      [todayOperatingHoursDay.outbound, nextOperatingHoursDay.outbound];
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

   if (moment().diff(lastTramMoment, 'hours', true) > 12) {
      if (lastTramMoment.hours() >= 0 && lastTramMoment.hours() <= 2) {
         return lastTramMoment.add(1, 'day');
      }
      else {
         return lastTramMoment.add(-1, 'day');
      }
   }

   return lastTramMoment;
}

const timeToLastTram = (lastTram: Moment) => {
   let now: Moment = moment();
   let lastTramDifference = now.diff(lastTram, 'hours', true);

   console.log("Time until last tram: " + lastTramDifference + " hours");
   return lastTramDifference;
}

const servicesFinishedForDay = (lastTram: Moment) => {
   return timeToLastTram(lastTram) > 0;
}

const shouldShowLastTramTime = (lastTram: Moment) => {
   return timeToLastTram(lastTram) > -1.5;
}

const formatTime = (time: string) => {
   return moment(time, "HH:mm").format("h:mm a");
}

const DirectionForecasts: React.FC<DirectionForecastsProps> = (props: DirectionForecastsProps) => {
   let enabled: boolean = ((props.isInbound && props.operatingHours.weekdays.inbound !== null)
      || (!props.isInbound && props.operatingHours.weekdays.outbound !== null));
   let operatingHours: [OperatingHoursDirection, OperatingHoursDirection] = getOperatingHoursDirectionForToday(props.operatingHours, props.isInbound);
   let lastTramTime: Moment = enabled ? getLastTramMoment(operatingHours[0].lastTram) : moment(0);
   let areServicesFinishedForDay: boolean = enabled && servicesFinishedForDay(lastTramTime);
   let shouldShowLastTram: boolean = enabled && !areServicesFinishedForDay && shouldShowLastTramTime(lastTramTime);
   const { t } = useTranslation();

   const minutesDue = (minutes: number, due: boolean) => {
      return due ? t('forecast.time.due') : t('forecast.time.minutes', { minutes: minutes });
   }

   const getMinutes = (minutes: number, due: boolean) => {
      return (minutes !== undefined && due !== undefined && minutesDue(minutes, due)) || undefined;
   }

   return (
      <section className="direction-forecast">
         <div className="direction">
            <h2>{props.direction}</h2>
            {shouldShowLastTram && <h3 className="direction-last-tram">Last tram is at {formatTime(operatingHours[0].lastTram)}</h3>}
         </div>
         <ul>
            {enabled && props.forecasts.length === 0 && (
               (areServicesFinishedForDay &&
                  <SplitListItem key="ServicesFinished" left={"Services resume in this direction at " + formatTime(operatingHours[1].firstTram)} />) ||
               (!areServicesFinishedForDay &&
                  <SplitListItem key="NoTramsForecast" left={"No trams forecast"} />))}
            {enabled &&
               props.forecasts.map((tram, index) =>
                  <SplitListItem key={index} left={tram.destinationStation.name} right={getMinutes(tram.minutes, tram.isDue)} />)}
            {!enabled &&
               <SplitListItem key="NoTramsDirection" left={"Trams do not run from this stop in this direction."} />}
         </ul>
      </section>
   );
}

export default DirectionForecasts;