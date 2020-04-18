import Station from "./Station";

interface TramForecast {
   destinationStation: Station;
   isDue: boolean;
   minutes: number;
}

export default TramForecast;
