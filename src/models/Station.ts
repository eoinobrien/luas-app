import Line from "./Line";
import OperatingHoursModel from "./OperatingHoursModel";

interface Station {
    name: string;
    irishName: string;
    pronunciation: string;
    abbreviation: string;
    line: Line;
    hasParking: boolean;
    hasCycleParking: boolean;
    latitude: number;
    longitude: number;
    inboundStations: Array<string>;
    outboundStations: Array<string>;
    walkingTransfer: Array<string>;
    isInUse: boolean;
    operatingHours: OperatingHoursModel;
}

export default Station;
