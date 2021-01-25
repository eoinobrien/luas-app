import React from 'react';
import moment, { Moment } from 'moment';
import 'moment-timezone';
import { useTranslation } from 'react-i18next';
import './direction-forecast.scss';
import SplitListItem from '../split-list-item/split-list-item';
import { BankHolidays } from '../../models/BankHolidays';
import OperatingHoursDirection from '../../models/OperatingHoursDirection';
import OperatingHoursDay from '../../models/OperatingHoursDay';
import OperatingHoursModel from '../../models/OperatingHoursModel';
import TramForecast from '../../models/TramForecast';

interface DirectionForecastProps {
    isInbound: boolean;
    direction: string;
    forecasts: TramForecast[];
    haveForecast: boolean;
    operatingHours: OperatingHoursModel;
}

function getOperatingHoursDirectionForToday(operatingHours: OperatingHoursModel, isInbound: boolean): [OperatingHoursDirection, OperatingHoursDirection] {
    let operatingDay: Moment = moment();
    const nextOperatingDay: Moment = moment();

    if (operatingDay.hour() <= 2) {
        operatingDay = moment(-1, 'day');
    }

    let weekDayOfWeek = operatingDay.isoWeekday();
    let nextOperatingDayOfWeek = nextOperatingDay.isoWeekday();

    if (BankHolidays.includes(operatingDay.format("YYYY-MM-DD"))) {
        weekDayOfWeek = 7;
    }

    if (BankHolidays.includes(nextOperatingDay.format("YYYY-MM-DD"))) {
        nextOperatingDayOfWeek = 7;
    }

    const todayOperatingHoursDay: OperatingHoursDay = getOperatingHours(weekDayOfWeek, operatingHours);
    const nextOperatingHoursDay: OperatingHoursDay = getOperatingHours(nextOperatingDayOfWeek, operatingHours);

    return isInbound ?
        [todayOperatingHoursDay.inbound, nextOperatingHoursDay.inbound] :
        [todayOperatingHoursDay.outbound, nextOperatingHoursDay.outbound];
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
        case 7:
            return operatingHours.sunday;
        default:
            return operatingHours.sunday;
    }
}

const getLastTramMoment = (lastTram: string): moment.Moment => {
    const lastTramMoment: Moment = moment.tz(lastTram, "HH:mm", "Europe/Dublin");

    console.log(lastTramMoment)
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

const timeToLastTram = (lastTram: Moment): number => {
    const now: Moment = moment();
    const lastTramDifference = now.diff(lastTram, 'hours', true);

    return lastTramDifference;
}

const servicesFinishedForDay = (lastTram: Moment): boolean => {
    return timeToLastTram(lastTram) > 0;
}

const shouldShowLastTramTime = (lastTram: Moment): boolean => {
    return timeToLastTram(lastTram) > -1.5;
}

const formatTime = (time: string): string => {
    return moment(time, "HH:mm").format("h:mm a");
}

const DirectionForecast: React.FC<DirectionForecastProps> = (props: DirectionForecastProps) => {
    const enabled: boolean = ((props.isInbound && props.operatingHours.weekdays.inbound !== null)
        || (!props.isInbound && props.operatingHours.weekdays.outbound !== null));
    const operatingHours: [OperatingHoursDirection, OperatingHoursDirection] = getOperatingHoursDirectionForToday(props.operatingHours, props.isInbound);
    const lastTramTime: Moment = enabled ? getLastTramMoment(operatingHours[0].lastTram) : moment(0);
    const areServicesFinishedForDay: boolean = enabled && servicesFinishedForDay(lastTramTime);
    const shouldShowLastTram: boolean = enabled && !areServicesFinishedForDay && shouldShowLastTramTime(lastTramTime);
    const { t, i18n } = useTranslation();

    const minutesDue = (minutes: number, due: boolean): string => {
        return due ? t('forecast.time.due') : t('forecast.time.in', { count: minutes });
    }

    const getMinutes = (minutes: number, due: boolean): string|undefined => {
        return (minutes !== undefined && due !== undefined && minutesDue(minutes, due)) || undefined;
    }

    return (
        <section className="direction-forecast">
            <div className="direction">
                <h2>{props.direction}</h2>
                {shouldShowLastTram && <h3 className="direction-last-tram">{t('last-tram-is-at', { lastTram: formatTime(operatingHours[0].lastTram) })}</h3>}
            </div>
            <ul>
                {enabled  && !props.haveForecast && t('loading')}

                {enabled  && props.haveForecast && props.forecasts.length === 0 && (
                    (areServicesFinishedForDay &&
                        <SplitListItem key="ServicesFinished" left={t('services-resume-at', { startTime: formatTime(operatingHours[1].firstTram) })} />) ||
                    (!areServicesFinishedForDay &&
                        <SplitListItem key="NoTramsForecast" left={t('no-trams-forecast')} />))}

                {enabled && props.haveForecast &&
                    props.forecasts.map((tram, index) =>
                        <SplitListItem
                            key={index}
                            left={(i18n.language === "ga" && tram.destinationStation.irishName) || tram.destinationStation.name}
                            right={getMinutes(tram.minutes, tram.isDue)} />)}

                {!enabled &&
                    <SplitListItem key="NoTramsDirection" left={t('no-trams-in-this-direction')} />}
            </ul>
        </section>
    );
}

export default DirectionForecast;
