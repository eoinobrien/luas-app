import React, { useState, useEffect } from 'react';
import './station-list.scss';
import { RouteComponentProps, withRouter, NavLink, Link } from 'react-router-dom';
import Station from '../../models/Station';
import Line from '../../models/Line';
import StationListRowItem from '../station-list-row-item/station-list-row-item';
import { ReactComponent as MoreIcon } from './more-vertical.svg';
import { useTranslation } from 'react-i18next';

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
   }, [cookiesAccepted]);

   const GetLineName = (line: string, active: boolean): string => {
      if (active) {
         return line;
      }
      else {
         return line === Line[Line.Red] ? Line[Line.Green] : Line[Line.Red];
      }
   }

   const GetLocalizedStringFromLine = (line: string, active: boolean): string => {
      return t(`lines.${GetLineName(line, active).toLowerCase()}.colour`);
   }

   return (
      <div className="station-list">
         <header>
            <nav className="colour-nav">
               <NavLink
                  exact to={`/${i18n.language}/line/${GetLineName(props.match.params.line, true)}`}
                  activeClassName="active-line"
                  style={props.match.params.line === Line[Line.Red] ? { color: '#f44336' } : { color: '#00af00' }}>
                  {GetLocalizedStringFromLine(props.match.params.line, true)}
               </NavLink>
               <NavLink
                  exact to={`/${i18n.language}/line/${GetLineName(props.match.params.line, false)}`}
                  activeClassName="active-line">
                  {GetLocalizedStringFromLine(props.match.params.line, false)}
               </NavLink>
            </nav>
            <Link to={`/${i18n.language}/help`} aria-label="Learn More"><MoreIcon /></Link>
         </header>
         <h2>{loading && "Loading..."}</h2>
         <nav className="list">
            <ul>
               {error && <h1>Error</h1>}
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
