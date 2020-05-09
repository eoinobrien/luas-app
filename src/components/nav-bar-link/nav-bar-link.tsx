import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import './nav-bar-link.scss';

interface NavBarLinkProps extends RouteComponentProps {
    value: string;
    to: string;
    colour: string;
    className?: string;
}

const NavBarLink: React.FC<NavBarLinkProps> = (props: NavBarLinkProps) => {
    return (
        <div className='navbar-link'>
            <Link className={props.className!} to={props.to} style={{ borderColor: props.colour }}>
                {props.value}
            </Link>
        </div>
    );
}

export default withRouter(NavBarLink);
