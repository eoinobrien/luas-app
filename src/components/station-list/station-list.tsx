import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './station-list.scss';
import { ReactComponent as SettingsIcon } from './settings.svg';
import StationListRowItem from '../station-list-row-item/station-list-row-item';
import Station from '../../models/Station';
import AlertBar from '../alert-bar/alert-bar';

interface StationListRouteProps {
    line: string;
}

interface StationListProps extends RouteComponentProps<StationListRouteProps> {
    favouriteClick: (station: Station) => void;
    favouriteStations: Station[];
    allStations: Station[];
    loading: boolean;
    error: boolean;
}

const StationList: React.FC<StationListProps> = (props: StationListProps) => {
    const { t } = useTranslation();

    useEffect(() => {
        localStorage.setItem('mostRecentLine', props.match.params.line);
    }, [props.match.params.line]);

    return (
        <div className="station-list">
            <header
                className="page-header"
                style={{ borderColor: '#424242' }}>
                <h1>{t('luasAppName')}</h1>

                <Link to={`/help`} aria-label="Help and Settings"><SettingsIcon /></Link>
            </header>
            <AlertBar />
            {props.loading && <h2>{t('loading')}</h2>}
            <nav className="list">
                <ul>
                    {props.error && <h2>{t('error:loading')}</h2>}
                    {
                        !props.loading &&
                        props.allStations
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
