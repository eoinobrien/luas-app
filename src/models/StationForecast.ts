import Station from "./Station";
import TramForecast from "./TramForecast";

interface StationForecast {
   station: Station;
   inboundTrams: Array<TramForecast>;
   outboundTrams: Array<TramForecast>;
   message: string;
   created: string;
}

export default StationForecast;
