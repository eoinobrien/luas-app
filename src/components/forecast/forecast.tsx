import React, { useState, useEffect, useRef } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './forecast.scss';
import DirectionForecast from '../direction-forecast/direction-forecast';
import OperatingHours from '../operating-hours/operating-hours';
import ForecastHeader from '../forecast-header/forecast-header';
import StationForecast from '../../models/StationForecast';
import Station from '../../models/Station';

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
            if (savedCallback) {
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
    var updateFrequencySeconds: number = 15;
    const { t } = useTranslation();

    useEffect(() => {
        let abbreviation: string = props.match.params.abbreviation;
        getForecastFromApi(abbreviation)
    }, [props.match.params.abbreviation]);

    useInterval(() => getForecastFromApi(props.match.params.abbreviation), updateFrequencySeconds * 1000);
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

    function getSecondsToUpdate(): void {
        let secondsToUpdate: number = updateFrequencySeconds - Math.ceil((Date.now() - lastUpdate.getTime()) / 1000);
        setSecondsSinceUpdate(secondsToUpdate)
    }

    return (
        <div className="forecast">
            <ForecastHeader
                loading={loading}
                station={forecast.station}
                abbreviation={props.match.params.abbreviation}
                favouriteStations={props.favouriteStations}
                favouriteClick={props.favouriteClick} />

            <main>
                {loading && !error &&
                    <h1>{t('loading')}</h1>}

                {error &&
                    <h1>{t('error:loading')}</h1>}

                {!loading && !error &&
                    <div>
                        <h4 className="updating">{updating ? t('forecast.updating.now') : t('forecast.updating.in', { count: secondsSinceUpdate })}</h4>
                        <div>
                            <DirectionForecast
                                isInbound={true}
                                direction={t(`lines.${forecast.station.line.toString().toLowerCase()}.inbound`)}
                                forecasts={forecast.inboundTrams}
                                operatingHours={forecast.station.operatingHours} />

                            <DirectionForecast
                                isInbound={false}
                                direction={t(`lines.${forecast.station.line.toString().toLowerCase()}.outbound`)}
                                forecasts={forecast.outboundTrams}
                                operatingHours={forecast.station.operatingHours} />
                        </div>

                        <section className="message">
                            <h3 className="message">{forecast.message}</h3>
                        </section>

                        <OperatingHours operatingHours={forecast.station.operatingHours} line={forecast.station.line.toString().toLowerCase()} />
                    </div>}
            </main>
        </div>
    );
};

export default withRouter(Forecast);
