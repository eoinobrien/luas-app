import React from 'react';
import { useTranslation } from 'react-i18next';
import './help.scss';
import PageHeader from '../page-header/page-header';

const Help: React.FC = () => {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <PageHeader
                headerTitle={t('settings')}
                headerTitleIrish={undefined}
                color='#424242'
                isFavourite={false} />

            <section className="settings">
                <h2>Language/Teanga</h2>

                <div className="language-selector">
                    <label className={i18n.language === "en" ? 'active' : ''}>
                        <input
                            type="radio"
                            id="en"
                            name="language"
                            value="en"
                            onClick={() => i18n.changeLanguage("en")} defaultChecked={i18n.language === "en"} />
                        English
                    </label>

                    <label className={i18n.language === "ga" ? 'active' : ''}>
                        <input
                            type="radio"
                            id="ga"
                            name="language"
                            value="ga"
                            onClick={() => i18n.changeLanguage("ga")} defaultChecked={i18n.language === "ga"} />
                        Gaeilge
                    </label>
                </div>

                <div className={i18n.language === "ga" ? 'gaeilge-apology show' : 'gaeilge-apology hide'}>
                    Tá brón orm, ach níl an t-eolas thíos ar fáil trí Ghaeilge faoi láthair.
                </div>
            </section>

            <section>
                <h2>Feedback</h2>
                <p>If you have any feedback, good or bad, I would love to hear it. Feel free to contact me at <a href="https://twitter.com/iameoinobrien">@iameoinobrien on Twitter</a></p>

                <h2>Irish Translations</h2>
                <p>If you have better Irish than me, and would like to help improve the translations in this app, I would love the help. Please reach out to me on <a href="https://twitter.com/iameoinobrien">Twitter</a> or <a href="https://github.com/eoinobrien/luas-app/issues">file an issue on Github</a></p>

                <h2>About this app</h2>
                <p>This app was a lockdown project for me, <a href="https://eoinobrien.ie">Eoin O&apos;Brien</a>, and is meant to serve as a simple, quick and reliable Luas application.</p>
                <p>It is licensed under an MIT License you can find the code for this site on <a href="https://github.com/eoinobrien/luas-app/">Github</a>. If you find an issue please <a href="https://github.com/eoinobrien/luas-app/issues">file an issue</a>.</p>

                <h2>Privacy</h2>
                <p>We do not store any personal information about you while you use this app or the API that powers it.</p>
                <p>We do store some non-personal information (e.g. station information and your favorites) in your browser to give you the best experience.</p>
                <p>The app and API is hosted on Microsoft Azure, but we do not log any personal information about your calls, but we do log some information like which station was queried and the time it took place for diagnostics purposes.</p>
                <p>We use <a href="https://plausible.io/">Plausible Analytics</a> to track basic use measurements, like the number of users.</p>
            </section>
        </div>
    );
}

export default Help;
