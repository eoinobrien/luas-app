import React, { useState } from 'react';
import { ReactComponent as ChevronUp } from './chevron-up.svg';
import { ReactComponent as ChevronDown } from './chevron-down.svg';
import OperatingHoursDay from '../../models/OperatingHoursDay';
import './OperatingHoursDay.scss';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import SplitListItem from '../split-list-item/split-list-item';

interface OperatingHoursDayProps {
   day: string;
   operatingHoursDay: OperatingHoursDay;
   line: string;
   expanded: boolean;
}

const OperatingHoursDay: React.FC<OperatingHoursDayProps> = (props: OperatingHoursDayProps) => {
   const [open, toggle] = useState<boolean>(props.expanded);
   const { t } = useTranslation();

   const formatTime = (time: string) => {
      return moment(time, "HH:mm").format("h:mm a");
   }

   return (
      <div className="operating-hours-day-row">
         <div className="op-hours-header" onClick={() => toggle(!open)}>
            <h4>{props.day}</h4>
            {open ? <ChevronUp /> : <ChevronDown />}
         </div>
         {open &&
            <ul>
               {props.operatingHoursDay.inbound &&
                  <SplitListItem
                     key="inbound"
                     left={t(`lines.${props.line}.inbound`)}
                     right={`${formatTime(props.operatingHoursDay.inbound.firstTram) + " - " + formatTime(props.operatingHoursDay.inbound.lastTram)}`} />}

               {props.operatingHoursDay.outbound &&
                  <SplitListItem
                     key="outbound"
                     left={t(`lines.${props.line}.outbound`)}
                     right={`${formatTime(props.operatingHoursDay.outbound.firstTram) + " - " + formatTime(props.operatingHoursDay.outbound.lastTram)}`} />}
            </ul>
         }
      </div>
   );
}

export default OperatingHoursDay;
