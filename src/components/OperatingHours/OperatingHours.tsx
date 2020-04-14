import React from 'react';
import { useTranslation } from 'react-i18next';
import OperatingHoursModel from '../../models/OperatingHoursModel';
import OperatingHoursDayRow from './OperatingHoursDayRow';

interface OperatingHoursProps {
  operatingHours: OperatingHoursModel;
  line: string;
}

const OperatingHours: React.FC<OperatingHoursProps> = (props: OperatingHoursProps) => {
  const { t } = useTranslation();

  return (
    <section>
      <h3>Operating Hours</h3>
      <OperatingHoursDayRow day={t('days.weekdays')} operatingHoursDay={props.operatingHours.weekdays} line={props.line} />
      <OperatingHoursDayRow day={t('days.saturday')} operatingHoursDay={props.operatingHours.saturday} line={props.line} />
      <OperatingHoursDayRow day={t('days.sunday')} operatingHoursDay={props.operatingHours.sunday} line={props.line} />
    </section>
  );
}

export default OperatingHours;
