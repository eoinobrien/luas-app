import React from 'react';
import { useTranslation } from 'react-i18next';
import './alert-bar.scss';
import { ReactComponent as AlertCircle } from './alert-circle.svg';

const AlertBar: React.FC = () => {
   const { t } = useTranslation();

   return (
      <div className="alert-bar">
         <div>
            <AlertCircle></AlertCircle>
         </div>
         <div>
            <h1><b>{t('covid.masks-mandatory')}</b> {t('covid.help-stop-the-spread')} <a href="https://www.transportforireland.ie/covid-19-updates-face-coverings/">{t('learn-more')}</a></h1>
         </div>
      </div>
   );
}

export default AlertBar;
