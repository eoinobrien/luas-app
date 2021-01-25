import React, { useState, useEffect } from 'react';
import './App.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Forecast from '../forecast/forecast';
import StationList from '../station-list/station-list';
import Station from '../../models/Station';
import NavBar from '../nav-bar/nav-bar';
import Help from '../help/help';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
    const [favouriteStations, setFavouriteStations] = useState<Station[]>([] as Station[]);
    const [stations, setStations] = useState<Station[]>([] as Station[]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const { i18n } = useTranslation();

    document.getElementsByTagName("html")[0].setAttribute("lang", i18n.language);

    const addToFavouriteStations = (station: Station): void => {
        let updatedFavouriteStations: Station[];

        if (favouriteStations.filter(s => s.abbreviation === station.abbreviation).length === 0) {
            updatedFavouriteStations = [...favouriteStations, station];
            setFavouriteStations(updatedFavouriteStations);
        }
        else {
            updatedFavouriteStations = favouriteStations.filter(s => s.abbreviation !== station.abbreviation);
            setFavouriteStations(updatedFavouriteStations);
        }

        localStorage.setItem('favouriteStations', JSON.stringify(updatedFavouriteStations));
    }

    useEffect(() => {
        const localStorageString: string = localStorage.getItem('favouriteStations') || "";

        if (localStorageString !== "") {
            const stations: Station[] = JSON.parse(localStorageString);

            setFavouriteStations(stations);
        }
    }, []);

    useEffect(() => {
        const localStorageStations = getStationsFromLocalStorage();

        if (localStorageStations !== []) {
            setLoading(false);
            setStations(localStorageStations);
        }


        fetch(`https://luasapifunction.azurewebsites.net/api/stations`)
            .then(response => response.json())
            .then(response => {
                setLoading(false);
                setError(false);
                setStations(response);

                localStorage.setItem('allStations', JSON.stringify(response));
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    }, []);

    const getStationsFromLocalStorage = (): Station[] => {
        const localStorageStations: string = localStorage.getItem('allStations') || "";
        let allStations: Station[] = [];

        if (localStorageStations !== "") {
            allStations = JSON.parse(localStorageStations);
        }

        return allStations;
    }

    const getLanguageFromLocalStorage = (): string => {
        return localStorage.getItem('i18nextLng') || "en";
    }

    const getLineFromLocalStorage = (): string => {
        return localStorage.getItem('mostRecentLine') || "Red";
    }

    return (
        <Router>
            <div className="app">
                <div className="main-content">
                    <Switch>
                        <Route
                            path="/:lng(en|ga)/station/:abbreviation"
                            render={() => <Forecast favouriteClick={addToFavouriteStations} favouriteStations={favouriteStations} allStations={getStationsFromLocalStorage()} />} />

                        <Route
                            path="/:lng(en|ga)/line/:line"
                            render={() => <StationList favouriteClick={addToFavouriteStations} favouriteStations={favouriteStations} allStations={stations} loading={loading} error={error} />} />

                        <Route path="/:lng(en|ga)/help">
                            <Help />
                        </Route>

                        <Route
                            path="/station/:abbreviation"
                            render={props => {
                                const lang: string = getLanguageFromLocalStorage();
                                return <Redirect to={`/${lang}/station/${props.match.params.abbreviation}`} /> // eslint-disable-line react/prop-types
                            }} />

                        <Route
                            path="/line/:line"
                            render={props => {
                                const lang: string = getLanguageFromLocalStorage();
                                return <Redirect to={`/${lang}/line/${props.match.params.line}`} /> // eslint-disable-line react/prop-types
                            }} />

                        <Route
                            path="/help"
                            render={() => {
                                const lang: string = getLanguageFromLocalStorage();
                                return <Redirect to={`/${lang}/help`} />
                            }} />

                        <Route
                            exact
                            path="/:lng(en|ga)"
                            render={props => (
                                <Redirect to={`/${props.match.params.lng}/line/Red`} /> // eslint-disable-line react/prop-types
                            )}
                        />

                        <Route
                            exact
                            path="/"
                            render={() => {
                                const lang: string = getLanguageFromLocalStorage();
                                const line: string = getLineFromLocalStorage();

                                return <Redirect to={`/${lang ?? 'en'}/line/${line ?? 'Red'}`} />
                            }}
                        />
                    </Switch>
                </div>
                <NavBar favouriteStations={favouriteStations} />
            </div>
        </Router>
    );
}

export default App;
