import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import OperatingHoursModel from '../../models/OperatingHoursModel';
import OperatingHoursDayRow from './OperatingHoursDayRow';

interface OperatingHoursProps {
  operatingHours: OperatingHoursModel;
}

const OperatingHours: React.FC<OperatingHoursProps> = (props: OperatingHoursProps) => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <OperatingHoursDayRow day={t('Weekdays')} operatingHoursDay={props.operatingHours.weekdays} />
      <OperatingHoursDayRow day={t('Saturday')} operatingHoursDay={props.operatingHours.saturday} />
      <OperatingHoursDayRow day={t('Sunday')} operatingHoursDay={props.operatingHours.sunday} />
    </div>
  );
}

export default OperatingHours;
