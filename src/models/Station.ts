import Line from "./Line";

interface Station {
    name : string,
    pronunciation : string,
    abbreviation : string,
    line : Line,
    hasParking : boolean,
    hasCycleParking : boolean,
    latitude : number,
    longitude : number,
    inboundStations : Array<string>,
    outboundStations : Array<string>,
    walkingTransfer : Array<string>,
    isInUse : boolean
}

export default Station;
