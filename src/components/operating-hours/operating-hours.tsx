import React from 'react';
import { useTranslation } from 'react-i18next';
import OperatingHoursModel from '../../models/OperatingHoursModel';
import OperatingHoursDayRow from '../operating-hours-day-row/operating-hours-day-row';
import moment, { Moment } from 'moment';
import { BankHolidays } from '../../models/BankHolidays';

interface OperatingHoursProps {
   operatingHours: OperatingHoursModel;
   line: string;
}

const OperatingHours: React.FC<OperatingHoursProps> = (props: OperatingHoursProps) => {
   const { t } = useTranslation();

   const dayOfWeek = () => {
      let now: Moment = moment().hour() <= 2 ? moment(-1, 'day') : moment();

      let weekday = now.isoWeekday();
      if (BankHolidays.includes(now.format("YYYY-MM-DD"))) {
         weekday = 7;
      }

      return weekday;
   }

   return (
      <section>
         <h3>Operating Hours</h3>
         <OperatingHoursDayRow day={t('days.weekdays')} operatingHoursDay={props.operatingHours.weekdays} line={props.line} expanded={dayOfWeek() >= 1 && dayOfWeek() <= 5} />
         <OperatingHoursDayRow day={t('days.saturday')} operatingHoursDay={props.operatingHours.saturday} line={props.line} expanded={dayOfWeek() === 6} />
         <OperatingHoursDayRow day={t('days.sunday')} operatingHoursDay={props.operatingHours.sunday} line={props.line} expanded={dayOfWeek() === 7} />
      </section>
   );
}

export default OperatingHours;
