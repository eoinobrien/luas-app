import React, { useState, useEffect, useRef } from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './forecast.scss';
import DirectionForecast from '../direction-forecast/direction-forecast';
import OperatingHours from '../operating-hours/operating-hours';
import PageHeader from '../page-header/page-header';
import NavBarLink from '../nav-bar-link/nav-bar-link';
import StationForecast from '../../models/StationForecast';
import Station from '../../models/Station';
import Line from '../../models/Line';
import { ReactComponent as Bike } from './bike.svg';
import { ReactComponent as Car } from './car.svg';

interface ForecastRouteProps {
    abbreviation: string;
}

interface ForecastProps extends RouteComponentProps<ForecastRouteProps> {
    favouriteClick: any;
    favouriteStations: Station[];
    allStations: Station[];
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
    const { t, i18n } = useTranslation();

    useEffect(() => {
        let abbreviation: string = props.match.params.abbreviation;
        getForecastFromApi(abbreviation);
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
                setError(false);
                localStorage.setItem('mostRecentLine', response.station.line.toString());
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

    function favouriteStationClick() {
        props.favouriteClick(forecast.station)
    }

    function getStatusMessage(line: string, message: string): string {
        if (message.toLowerCase() === line + " line services operating normally") {
            return t(`forecast.operatingNormally.${line}`);
        }

        return message;
    }

    function getWalkingTransferStations(walkingTransfers: string[]): Station[] {
        var transferStations = walkingTransfers
            .map(walkingTransfer => props.allStations.filter(s => s.abbreviation === walkingTransfer));

        return ([] as Station[]).concat(...transferStations);
    }

    return (
        <div className="forecast">
            <PageHeader
                headerTitle={(loading && props.match.params.abbreviation) || forecast.station.name}
                headerTitleIrish={(!loading && forecast.station.irishName) || undefined}
                color={(loading && '#424242') || (forecast.station.line.toString() === Line[Line.Red] ? '#f44336' : '#00af00')}
                loading={loading}
                isFavourite={props.favouriteStations.filter(s => s.abbreviation === props.match.params.abbreviation).length !== 0}
                favouriteClick={favouriteStationClick} />

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

                        <section className="section">
                            <h3>{t('forecast.status')}</h3>
                            <p>{getStatusMessage(forecast.station.line.toString().toLowerCase(), forecast.message)}</p>
                        </section>

                        {
                            forecast.station.walkingTransfer.length > 0 &&
                            <section className="section">
                                <h3>{t('forecast.walkingTransfer')}</h3>
                                <div className="walking-transfer">
                                    {
                                        getWalkingTransferStations(forecast.station.walkingTransfer)
                                            .map(station =>
                                                <NavBarLink
                                                    value={i18n.language === "ga" ? station.irishName : station.name}
                                                    to={`/station/${station.abbreviation}`}
                                                    colour={station.line.toString() === Line[Line.Red] ? '#f44336' : '#00af00'}
                                                    key={station.abbreviation} />)
                                    }
                                </div>
                            </section>
                        }

                        <OperatingHours operatingHours={forecast.station.operatingHours} line={forecast.station.line.toString().toLowerCase()} />

                        {(forecast.station.hasCycleParking || forecast.station.hasParking) &&
                            <section className="section">
                                <h3>Station Facilities</h3>
                                {forecast.station.hasCycleParking &&
                                    <div className="facility">
                                        <Bike />
                                        <span>Bicycle Parking Available</span>
                                    </div>}
                                {forecast.station.hasParking &&
                                    <div className="facility">
                                        <Car />
                                        <span>Car Parking Available</span>
                                    </div>}
                            </section>
                        }
                    </div>}
            </main>
        </div>
    );
};

export default withRouter(Forecast);
