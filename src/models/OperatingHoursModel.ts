interface OperatingHoursModel {
    weekdays: OperatingHoursDay;
    saturday: OperatingHoursDay;
    sunday: OperatingHoursDay;
}

interface OperatingHoursDay
{
    inbound: OperatingHoursDirection;
    outbound: OperatingHoursDirection;
}

interface OperatingHoursDirection
{
    firstTram: string;
    lastTram: string;
}

export default OperatingHoursModel;