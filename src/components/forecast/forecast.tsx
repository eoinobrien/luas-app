import React, { useState, useEffect, useRef } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
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
import AlertBar from '../alert-bar/alert-bar';

interface ForecastRouteProps {
    abbreviation: string;
}

interface ForecastProps extends RouteComponentProps<ForecastRouteProps> {
    favouriteClick: any;
    favouriteStations: Station[];
    allStations: Station[];
}


function useInterval(callback: any, delay: number): void {
    const savedCallback = useRef<any | null>();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick(): void {
            if (savedCallback) {
                savedCallback.current();
            }
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const Forecast: React.FC<ForecastProps> = (props: ForecastProps) => {
    const [forecast, setForecast] = useState<StationForecast>({} as StationForecast);
    const [stationDetails, setStationDetails] = useState<Station>(props.allStations.filter(s => s.abbreviation === props.match.params.abbreviation)[0]);
    const [error, setError] = useState<boolean>(false);
    const [haveForecast, setHaveForecast] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);
    const [secondsUntilUpdate, setSecondsUntilUpdate] = useState<number>(0);
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
    const { t, i18n } = useTranslation();

    const updateFrequencySeconds = 15;

    useEffect(() => {
        const abbreviation: string = props.match.params.abbreviation;

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
                setStationDetails(response.station);
                setLastUpdate(new Date());
                setUpdating(false);
                setError(false);
                setHaveForecast(true);
                localStorage.setItem('mostRecentLine', response.station.line.toString());
            })
            .catch(() => {
                console.error("Something went wrong fetching real time information.");

                setError(true);
                setLastUpdate(new Date());
                setUpdating(false);
            });
    }

    function getSecondsToUpdate(): void {
        const secondsToUpdate: number = updateFrequencySeconds - Math.ceil((Date.now() - lastUpdate.getTime()) / 1000);
        setSecondsUntilUpdate(secondsToUpdate)
    }

    function favouriteStationClick(): void {
        props.favouriteClick(forecast.station)
    }

    function operatingNormally(line: string, message: string): boolean {
        return message.toLowerCase() === line + " line services operating normally";
    }

    function getStatusMessage(line: string, message: string): string {
        if (operatingNormally(line, message)) {
            return t(`forecast.operatingNormally.${line}`);
        }

        return message;
    }

    function getWalkingTransferStations(walkingTransfers: string[]): Station[] {
        const transferStations = walkingTransfers
            .map(walkingTransfer => props.allStations.filter(s => s.abbreviation === walkingTransfer));

        return ([] as Station[]).concat(...transferStations);
    }

    return (
        <div className="forecast">
            <PageHeader
                headerTitle={stationDetails ? stationDetails.name : props.match.params.abbreviation}
                headerTitleIrish={stationDetails ? stationDetails.irishName : undefined}
                color={stationDetails ? (stationDetails.line.toString() === Line[Line.Red] ? '#f44336' : '#00af00') : '#424242'}
                isFavourite={props.favouriteStations.filter(s => s.abbreviation === props.match.params.abbreviation).length !== 0}
                favouriteClick={favouriteStationClick} />
            <AlertBar />

            <main>
                {/* {loading && !error &&
                    <h1>{t('loading')}</h1>} */}

                {error && !haveForecast &&
                    <h1>{t('error:loading')}</h1>}

                <div>
                    <h4 className="updating">
                        {updating ?
                            t('forecast.updating.now') :
                            (error ?
                                t('error:loadingAndUpdating', { count: secondsUntilUpdate }) :
                                t('forecast.updating.in', { count: secondsUntilUpdate }))}
                    </h4>

                    <section>
                        <DirectionForecast
                            isInbound={true}
                            direction={t(`lines.${stationDetails.line.toString().toLowerCase()}.inbound`)}
                            forecasts={forecast.inboundTrams}
                            haveForecast={haveForecast}
                            operatingHours={stationDetails.operatingHours} />

                        <DirectionForecast
                            isInbound={false}
                            direction={t(`lines.${stationDetails.line.toString().toLowerCase()}.outbound`)}
                            forecasts={forecast.outboundTrams}
                            haveForecast={haveForecast}
                            operatingHours={stationDetails.operatingHours} />
                    </section>

                    <section className="section">
                        <h3>{t('forecast.status')}</h3>
                        <p>{
                            haveForecast ?
                                getStatusMessage(stationDetails.line.toString().toLowerCase(), forecast.message) :
                                t('loading')}</p>
                    </section>

                    {
                        stationDetails && stationDetails.walkingTransfer.length > 0 &&
                        <section className="section">
                            <h3>{t('forecast.walkingTransfer')}</h3>
                            <div className="walking-transfer">
                                {
                                    getWalkingTransferStations(stationDetails.walkingTransfer)
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

                    {
                        stationDetails &&
                        <OperatingHours operatingHours={stationDetails.operatingHours} line={stationDetails.line.toString().toLowerCase()} />}

                    {
                        stationDetails && (stationDetails.hasCycleParking || stationDetails.hasParking) &&
                        <section className="section">
                            <h3>Station Facilities</h3>
                            {stationDetails.hasCycleParking &&
                                <div className="facility">
                                    <Bike />
                                    <span>Bicycle Parking Available</span>
                                </div>}
                            {stationDetails.hasParking &&
                                <div className="facility">
                                    <Car />
                                    <span>Car Parking Available</span>
                                </div>}
                        </section>
                    }
                </div>
            </main>
        </div>
    );
};

export default withRouter(Forecast);
