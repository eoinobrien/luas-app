import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './privacy-prompt.scss';

interface PrivacyPromptProps {
   cookieName: string;
   header: string;
   bodyText: string;
}

const PrivacyPrompt: React.FC<PrivacyPromptProps> = (props: PrivacyPromptProps) => {
   const [showPrompt, setPromptVisibility] = useState<boolean>(
      !document.cookie.split(';').some((item) => item.trim().startsWith(props.cookieName + '=true')));
   const { i18n } = useTranslation();

   const setCookie = () => {
      document.cookie = props.cookieName + '=true;max-age=31536000;';
      setPromptVisibility(false)
   }

   const removeCookie = () => {
      document.cookie = props.cookieName + '=false;expires=Thu, 01 Jan 1970 00:00:00 UTC;'
      setPromptVisibility(false)
   }

   return (
      <div>
         {showPrompt &&
            <div className="privacy-prompt">
               <h1>{props.header}</h1>
               <p>{props.bodyText}</p>
               <p><Link to={`/${i18n.language}/help`} aria-label="Learn More">You can find more information and update your preferences on our help page</Link></p>
               <button onClick={() => setCookie()}>Accept</button>
               <button onClick={() => removeCookie()}>Not now</button>
            </div>
         }
      </div>
   );
}

export default PrivacyPrompt;
