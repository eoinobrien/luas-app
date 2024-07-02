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
            <h1><b>{t('developer-messaging.app-broken')}</b> {t('developer-messaging.working-hard-to-fix')}</h1>
         </div>
      </div>
   );
}

export default AlertBar;
