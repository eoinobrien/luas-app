import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './page-header.scss';
import { ReactComponent as LeftArrow } from './arrow-left-circle.svg';
import FavouriteStar from '../favourite-star/favourite-star';

interface PageHeaderProps {
    headerTitle: string;
    headerTitleIrish?: string;
    color: string;
    loading: boolean;
    isFavourite?: boolean;
    favouriteClick?: any;
}

const PageHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => {
    const { i18n } = useTranslation();

    return (
        <header
            className="page-header"
            style={{borderColor: props.color}}>
            <Link
                className="back-arrow"
                aria-label="Go Back to the list of Stations"
                to={'/'}>
                <LeftArrow />
            </Link>
            <h1>
                {(i18n.language === "ga" && props.headerTitleIrish) || props.headerTitle}
                <span> {!props.loading && props.headerTitleIrish !== undefined && ((i18n.language === "ga" && props.headerTitle) || props.headerTitleIrish)}</span></h1>

            {props.favouriteClick !== undefined &&
                props.isFavourite !== undefined &&
                !props.loading &&
                <FavouriteStar
                    name={(i18n.language === "ga" && props.headerTitleIrish) || props.headerTitle}
                    isFavourite={props.isFavourite ?? false}
                    favouriteClick={props.favouriteClick} />}
        </header>
    );
};

export default PageHeader;
