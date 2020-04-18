import React from 'react';
import { useTranslation } from 'react-i18next';
import './help.scss';

const Help: React.FC<{}> = () => {
   const { t, i18n } = useTranslation();

   return (
      <div>
         <section className="settings">
            <h1>Settings</h1>
            <div>
               <h2>Choose Language</h2>
               <button onClick={() => i18n.changeLanguage("en")}>English</button>
               <button onClick={() => i18n.changeLanguage("ga")}>Gaeilge</button>
            </div>
         </section>


         <h1>Help</h1>
         <p>You can visit a station by clicking on a station on the previous page.</p>

         <h2>About this app</h2>
         <p>You can find the code for this site on <a href="https://github.com/eoinobrien/luas-app/">Github</a></p>
      </div>
   );
}

export default Help;
