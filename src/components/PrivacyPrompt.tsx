import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PrivacyPrompt: React.FC = () => {
  const [showPrompt, setPromptVisibility] = useState<boolean>(
    !document.cookie.split(';').some((item) => item.trim().startsWith('cookies-accepted-all=true')));
  const { t, i18n } = useTranslation();

  const setCookie = () => {
    document.cookie = "cookies-accepted-all=true;max-age=31536000;";
    setPromptVisibility(false)
  }

  const removeCookie = () => {
    document.cookie = `cookies-accepted-all=false;expires=Thu, 01 Jan 1970 00:00:00 UTC;`
    setPromptVisibility(false)
  }

  return (
    <div>
      {showPrompt &&
        <div>
          <h1>Cookies</h1>
          <p>We use cookies and local storage to remember your favourite stations and languages. We also use it to make using this site faster for you. This information is kept locally on in browser and is not shared to either our services or third part services.</p>
          <p><Link to={`/${i18n.language}/help`} aria-label="Learn More">You can find more information and update your preferences on our help page</Link></p>
          <button onClick={() => setCookie()}>Accept all</button>
          <button onClick={() => removeCookie()}>Not now</button>
        </div>
      }
    </div>
  );
}

export default PrivacyPrompt;
