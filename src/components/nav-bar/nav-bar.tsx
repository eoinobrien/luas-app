import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './nav-bar.scss';
import NavBarLink from '../nav-bar-link/nav-bar-link';
import Line from '../../models/Line';
import Station from '../../models/Station';

interface NavBarProps extends RouteComponentProps {
   favouriteStations: Station[];
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
   const { t, i18n } = useTranslation();

   return (
      <nav className="navbar">
         <div className="line-section">
            <h1>{t('lines.line')}</h1>

            <div className="line-section-links">
               <NavBarLink className="line" value={t('lines.red.colour')} to={`/${i18n.language}/line/Red`} colour="#f44336" />
               <NavBarLink className="line" value={t('lines.green.colour')} to={`/${i18n.language}/line/Green`} colour="#00af00" />
            </div>
         </div>

         <div>
            <h1>{t('favouriteStations')}</h1>

            <div className="line-section-links">
               {props.favouriteStations.length === 0 ?
                  <p>Starred stations will appear here.</p> :
                  props.favouriteStations.map(station =>
                     <NavBarLink
                        className="stations"
                        value={i18n.language === "ga" ? station.irishName : station.name}
                        to={`/${i18n.language}/station/${station.abbreviation}`}
                        colour={station.line.toString() === Line[Line.Red] ? '#f44336' : '#00af00'}
                        key={station.abbreviation} />
                  )}
            </div>
         </div>
      </nav>
   );
}

export default withRouter(NavBar);
