import React, { ReactElement } from 'react';
import OperatingHoursModel from '../../models/OperatingHoursModel';

interface OperatingHoursProps {
  operatingHours: OperatingHoursModel;
}

function OperatingHours(props: OperatingHoursProps): ReactElement {
  return (
    <p>{props.operatingHours.weekdays.inbound.lastTram}</p>
  );
}

export default OperatingHours;
