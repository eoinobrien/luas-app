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
import PrivacyPrompt from '../privacy-prompt/privacy-prompt';

const App: React.FC = () => {
    const [favouriteStations, setFavouriteStations] = useState<Station[]>([] as Station[]);
    const { i18n } = useTranslation();
    let showFunctionalPrompt: boolean = false;

    document.getElementsByTagName("html")[0].setAttribute("lang", i18n.language);

    const addToFavouriteStations = (station: Station) => {
        showFunctionalPrompt = true;

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
        let localStorageString: string = localStorage.getItem('favouriteStations') || "";

        if (localStorageString !== "") {
            let stations: Station[] = JSON.parse(localStorageString);

            setFavouriteStations(stations);
        }
    }, []);

    const getLanguageFromLocalStorage = () => {
        return localStorage.getItem('i18nextLng') || "";
    }

    return (
        <Router>
            <div className="app">
                {showFunctionalPrompt &&
                    <PrivacyPrompt
                        cookieName="cookies-favourites"
                        header="Cookies"
                        bodyText="We use cookies and local storage to remember your favourite stations and languages and to make the site faster for you." />}
                <div className="main-content">
                    <Switch>
                        <Route
                            path="/:lng(en|ga)/station/:abbreviation"
                            render={() => <Forecast favouriteClick={addToFavouriteStations} favouriteStations={favouriteStations} />} />

                        <Route
                            path="/:lng(en|ga)/line/:line"
                            render={() => <StationList favouriteClick={addToFavouriteStations} favouriteStations={favouriteStations} />} />

                        <Route path="/:lng(en|ga)/help">
                            <Help />
                        </Route>

                        <Route
                            path="/station/:abbreviation"
                            render={props => {
                                let lang: string = getLanguageFromLocalStorage();
                                return <Redirect to={`/${lang}/station/${props.match.params.abbreviation}`} />
                            }} />

                        <Route
                            path="/line/:line"
                            render={props => {
                                let lang: string = getLanguageFromLocalStorage();
                                return <Redirect to={`/${lang}/line/${props.match.params.line}`} />
                            }} />

                        <Route
                            path="/help"
                            render={() => {
                                let lang: string = getLanguageFromLocalStorage();
                                return <Redirect to={`/${lang}/help`} />
                            }} />

                        <Route
                            exact
                            path="/:lng(en|ga)"
                            render={props => (
                                <Redirect to={`/${props.match.params.lng}/line/Red`} />
                            )}
                        />

                        <Route
                            exact
                            path="/"
                            render={() => {
                                let lang: string = getLanguageFromLocalStorage();

                                if (lang !== "") {
                                    return <Redirect to={`/${lang}/line/Red`} />
                                }

                                return <Redirect to="/en/line/Red" />
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
