import React from 'react';
import { useTranslation } from 'react-i18next';
import './alert-bar.scss';
import { ReactComponent as AlertCircle } from './alert-circle.svg';

interface AlertBarProps {
}

const AlertBar: React.FC<AlertBarProps> = (props: AlertBarProps) => {
   const { t } = useTranslation();
   
   return (
      <div className="alert-bar">
         <AlertCircle></AlertCircle>
         <h1><b>{t('covid.masks-mandatory')}</b> {t('covid.help-stop-the-spread')} <a href="https://www.transportforireland.ie/covid-19-updates-face-coverings/">{t('learn-more')}</a></h1>
      </div>
   );
}

export default AlertBar;
