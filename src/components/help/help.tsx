import React from 'react';
import { useTranslation } from 'react-i18next';
import './help.scss';
import PageHeader from '../page-header/page-header';

const Help: React.FC<{}> = () => {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <PageHeader
                headerTitle={t('settings')}
                headerTitleIrish={undefined}
                color='#424242'
                loading={false}
                isFavourite={false} />

            <section className="settings">
                <h2>Choose Language</h2>

                <div className="language-selector">
                    <label className={i18n.language === "en" ? 'active' : ''}>
                        <input type="radio" id="en" name="language" value="en" onClick={() => i18n.changeLanguage("en")} defaultChecked={i18n.language === "en"} />
                        English
                    </label>

                    <label className={i18n.language === "ga" ? 'active' : ''}>
                        <input type="radio" id="ga" name="language" value="ga" onClick={() => i18n.changeLanguage("ga")} defaultChecked={i18n.language === "ga"} />
                        Gaeilge
                    </label>
                </div>
            </section>

            <section>
                <h1>Help</h1>
                <p>You can visit a station by clicking on a station on the previous page.</p>

                <h2>About this app</h2>
                <p>You can find the code for this site on <a href="https://github.com/eoinobrien/luas-app/">Github</a></p>
            </section>
        </div>
    );
}

export default Help;
