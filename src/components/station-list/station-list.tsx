import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './station-list.scss';
import { ReactComponent as MoreIcon } from './more-vertical.svg';
import StationListRowItem from '../station-list-row-item/station-list-row-item';
import Station from '../../models/Station';

interface StationListRouteProps {
    line: string;
}

interface StationListProps extends RouteComponentProps<StationListRouteProps> {
    favouriteClick: any;
    favouriteStations: Station[];
}

const StationList: React.FC<StationListProps> = (props: StationListProps) => {
    const cookiesAccepted = document.cookie.split(';').some((item) => item.trim().startsWith('cookies-accepted-all=true'));
    const [stations, setStations] = useState<Station[]>([] as Station[]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (cookiesAccepted) {
            localStorage.setItem('mostRecentLine', props.match.params.line);
            const localStorageStations: string = localStorage.getItem('allStations') || "";

            if (localStorageStations !== "") {
                const allStations: Station[] = JSON.parse(localStorageStations);

                setLoading(false);
                setStations(allStations);
            }
        }

        fetch(`https://luasapifunction.azurewebsites.net/api/stations`)
            .then(response => response.json())
            .then(response => {
                setLoading(false);
                setStations(response);

                if (cookiesAccepted) {
                    localStorage.setItem('allStations', JSON.stringify(response));
                }
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    }, [cookiesAccepted, props.match.params.line]);

    return (
        <div className="station-list">
            <header
                className="page-header"
                style={{ borderColor: '#424242' }}>
                <h1>{t('luasDueNow')}</h1>

                    <Link to={`/${i18n.language}/help`} aria-label="Help and Settings"><MoreIcon /></Link>
            </header>
            {loading && <h2>{t('loading')}</h2>}
            <nav className="list">
                <ul>
                    {error && <h2>{t('error:loading')}</h2>}
                    {
                        !loading &&
                        stations
                            .filter(s => s.line.toString().toLowerCase() === props.match.params.line.toString().toLowerCase())
                            .map(station =>
                                <StationListRowItem
                                    key={station.abbreviation}
                                    station={station}
                                    favouriteClick={props.favouriteClick}
                                    isFavourite={props.favouriteStations.filter(s => s.abbreviation === station.abbreviation).length !== 0} />)
                    }
                </ul>
            </nav>
        </div>
    );
};

export default withRouter(StationList);
