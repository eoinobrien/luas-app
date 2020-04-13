import React from 'react';
import './NavBar.scss';
import Station from '../../models/Station';
import NavBarLink from './NavBarLink';
import Line from '../../models/Line';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavBarProps extends RouteComponentProps {
  favouriteStations: Station[];
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="line-section">
        <h1>{t('lines.line')}</h1>

        <div className="line-section-links">
          <NavBarLink className="line" value={t('lines.red.colour')} to="/line/Red" colour="#f44336" />
          <NavBarLink className="line" value={t('lines.green.colour')} to="/line/Green" colour="#00af00" />
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
                value={station.name}
                to={`/station/${station.abbreviation}`}
                colour={station.line.toString() === Line[Line.Red] ? '#f44336' : '#00af00'}
                key={station.abbreviation} />
            )}
        </div>
      </div>
    </nav>
  );
}

export default withRouter(NavBar);
