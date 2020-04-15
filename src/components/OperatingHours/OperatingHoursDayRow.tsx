import React from 'react';
import OperatingHoursDay from '../../models/OperatingHoursDay';
import './OperatingHoursDayRow.scss';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import SplitListItem from '../Forcast/SplitListItem';

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
    <div className="operating-hours-day-row">
      <h4>{props.day}</h4>
      <ul>
        {props.operatingHoursDay.inbound &&
          <SplitListItem key="inbound" left={t(`lines.${props.line}.inbound`)} right={`${formatTime(props.operatingHoursDay.inbound.firstTram) + " - " + formatTime(props.operatingHoursDay.inbound.lastTram)}`} />}

        {props.operatingHoursDay.outbound &&
          <SplitListItem key="outbound" left={t(`lines.${props.line}.outbound`)} right={`${formatTime(props.operatingHoursDay.outbound.firstTram) + " - " + formatTime(props.operatingHoursDay.outbound.lastTram)}`} />}
      </ul>
    </div>
  );
}

export default OperatingHoursDayRow;
