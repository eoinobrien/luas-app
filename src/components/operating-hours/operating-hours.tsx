import React from 'react';
import { useTranslation } from 'react-i18next';
import moment, { Moment } from 'moment';
import OperatingHoursDayRow from '../operating-hours-day-row/operating-hours-day-row';
import { BankHolidays } from '../../models/BankHolidays';
import OperatingHoursModel from '../../models/OperatingHoursModel';

interface OperatingHoursProps {
    operatingHours: OperatingHoursModel;
    line: string;
}

const OperatingHours: React.FC<OperatingHoursProps> = (props: OperatingHoursProps) => {
    const { t } = useTranslation();

    const dayOfWeek = () : number => {
        let operatingDay: Moment = moment();

        if (operatingDay.hour() <= 2) {
            operatingDay = moment(-1, 'day');
        }

        let weekDayOfWeek = operatingDay.isoWeekday();
        if (BankHolidays.includes(operatingDay.format("YYYY-MM-DD"))) {
            weekDayOfWeek = 7;
        }

        return weekDayOfWeek;
    }

    return (
        <section className="section">
            <h3>{t('operating-hours')}</h3>
            <OperatingHoursDayRow day={t('days.weekdays')} operatingHoursDay={props.operatingHours.weekdays} line={props.line} expanded={dayOfWeek() >= 1 && dayOfWeek() <= 5} />
            <OperatingHoursDayRow day={t('days.saturday')} operatingHoursDay={props.operatingHours.saturday} line={props.line} expanded={dayOfWeek() === 6} />
            <OperatingHoursDayRow day={t('days.sunday')} operatingHoursDay={props.operatingHours.sunday} line={props.line} expanded={dayOfWeek() === 7} />
        </section>
    );
}

export default OperatingHours;
