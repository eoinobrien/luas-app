import React, { useState, useEffect, useRef } from 'react';
import './Forecast.scss';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import StationForecast from '../../models/StationForecast';
import DirectionForecasts from './DirectionForecasts';
import Line from '../../models/Line';
import { ReactComponent as LeftArrow } from '../../arrow-left-circle.svg';
import FavouriteStar from '../shared/FavouriteStar';
import Station from '../../models/Station';
import OperatingHours from '../OperatingHours/OperatingHours';
import OperatingHoursModel from '../../models/OperatingHoursModel';
import OperatingHoursDay from '../../models/OperatingHoursDay';
import { useTranslation } from 'react-i18next';

interface ForecastRouteProps {
  abbreviation: string;
}

interface ForecastProps extends RouteComponentProps<ForecastRouteProps> {
  favouriteClick: any;
  favouriteStations: Station[];
}


function useInterval(callback: any, delay: number) {
  const savedCallback = useRef<any | null>();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if(savedCallback) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


const Forecast: React.FC<ForecastProps> = (props: ForecastProps) => {
  const [forecast, setForecast] = useState<StationForecast>({} as StationForecast);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let abbreviation: string = props.match.params.abbreviation;
    getForecastFromApi(abbreviation)
  }, [props.match.params.abbreviation]);

  useInterval(() => getForecastFromApi(props.match.params.abbreviation), 15000);
  useInterval(() => getSecondsToUpdate(), 1000);

  function getForecastFromApi(abbreviation: string): void {
    setUpdating(true);
    setLastUpdate(new Date());

    fetch(`https://luasapifunction.azurewebsites.net/api/stations/${abbreviation}/forecast`)
      .then(response => response.json())
      .then(response => {
        setForecast(response);
        setLastUpdate(new Date());
        setUpdating(false);
        setLoading(false);
      })
      .catch(() => {
        console.error("Something went wrong fetching real time information.");

        setError(true);
        // setLastUpdate(new Date());
        setLoading(false);
        setUpdating(false);
      });
  }

  function favouriteStationClick() {
    props.favouriteClick(forecast.station)
  }

  function getSecondsToUpdate(): void {
    let secondsToUpdate: number = 15 - Math.ceil((Date.now() - lastUpdate.getTime()) / 1000);
    setSecondsSinceUpdate(secondsToUpdate)
  }

  return (
    <div className="forecast">
      <header style={(loading && { borderColor: '#424242' }) || (forecast.station.line.toString() === Line[Line.Red] ? { borderColor: '#f44336' } : { borderColor: '#00af00' })}>
        <Link
          className="back-arrow"
          aria-label="Go Back to the list of Stations"
          to={`/line/${!loading && forecast.station.line}`}>
          <LeftArrow />
        </Link>
        <h1>
          {(loading && props.match.params.abbreviation)
            || ((i18n.language == "ga" && forecast.station.irishName) || forecast.station.name)}
            <span> {!loading && ((i18n.language == "ga" && forecast.station.name) || forecast.station.irishName)}</span></h1>

        {!loading &&
          <FavouriteStar
            name={forecast.station.name}
            isFavourite={props.favouriteStations.filter(s => s.abbreviation === props.match.params.abbreviation).length !== 0}
            favouriteClick={favouriteStationClick} />}
      </header>

      <main>
        {loading &&
          <h1>{t('loading')}</h1>}

        {error &&
          <h1>Error getting data</h1>}

        {!loading &&
          <div>
            <h4 className="updating">{updating ? t('updating.now') : t('updating.in', {count: secondsSinceUpdate}) }</h4>
            <div>
              <DirectionForecasts
                isInbound={true}
                direction={t(`lines.${forecast.station.line.toString().toLowerCase()}.inbound`)}
                forecasts={forecast.inboundTrams}
                operatingHours={forecast.station.operatingHours} />

              <DirectionForecasts
                isInbound={false}
                direction={t(`lines.${forecast.station.line.toString().toLowerCase()}.outbound`)}
                forecasts={forecast.outboundTrams}
                operatingHours={forecast.station.operatingHours} />
            </div>

            <h3 className="message">{forecast.message}</h3>
            <OperatingHours operatingHours={forecast.station.operatingHours} />
          </div>}
      </main>
    </div>
  );
};

export default withRouter(Forecast);
