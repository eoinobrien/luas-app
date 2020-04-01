import React, { ReactElement } from 'react';
import './NavBarLink.scss';
import { Link } from 'react-router-dom';

interface NavBarLinkProps {
  value: string;
  to: string;
  colour: string;
}

class NavBarLink extends React.Component<NavBarLinkProps, {}> {
  render(): ReactElement {
    return (
      <Link className="navbar-link" to={this.props.to} style={{borderColor: this.props.colour}}>
        {this.props.value}
      </Link>
    );
  }
}

export default NavBarLink;
