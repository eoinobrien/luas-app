import React, { ReactElement } from 'react';
import OperatingHoursDay from '../../models/OperatingHoursDay';

interface OperatingHoursDayRowProps {
  day: string;
  operatingHoursDay: OperatingHoursDay;
}

function OperatingHoursDayRow(props: OperatingHoursDayRowProps): ReactElement {
  return (
    <div>
      <div>{props.day}</div>
      {props.operatingHoursDay.inbound &&
        <div>
          <div>{props.operatingHoursDay.inbound.firstTram}</div>
          <div>{props.operatingHoursDay.inbound.lastTram}</div>
        </div>}

      {props.operatingHoursDay.outbound &&
        <div>
          <div>{props.operatingHoursDay.outbound.firstTram}</div>
          <div>{props.operatingHoursDay.outbound.lastTram}</div>
        </div>}
    </div>
  );
}

export default OperatingHoursDayRow;
