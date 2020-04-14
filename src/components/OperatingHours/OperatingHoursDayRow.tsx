import React from 'react';
import OperatingHoursDay from '../../models/OperatingHoursDay';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

interface OperatingHoursDayRowProps {
  day: string;
  operatingHoursDay: OperatingHoursDay;
  line: string;
}

const OperatingHoursDayRow: React.FC<OperatingHoursDayRowProps> = (props: OperatingHoursDayRowProps) => {
  const { t } = useTranslation();

  const formatTime = (time: string) => {
    return moment(time, "HH:mm").format("h:mm a");
  }

  return (
    <div>
      <div>{props.day}</div>
      <ul>
        {props.operatingHoursDay.inbound &&
          <li>{t(`lines.${props.line}.inbound`)}: <span>{formatTime(props.operatingHoursDay.inbound.firstTram)} - {formatTime(props.operatingHoursDay.inbound.lastTram)}</span></li>}

        {props.operatingHoursDay.outbound &&
          <li>{t(`lines.${props.line}.outbound`)}: <span>{formatTime(props.operatingHoursDay.outbound.firstTram)} - {formatTime(props.operatingHoursDay.outbound.lastTram)}</span></li>}
      </ul>
    </div>
  );
}

export default OperatingHoursDayRow;
