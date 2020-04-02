import React, { ReactElement } from 'react';
import './NavBarLink.scss';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

interface NavBarLinkProps extends RouteComponentProps {
  value: string;
  to: string;
  colour: string;
  className: string;
}

class NavBarLink extends React.Component<NavBarLinkProps, {}> {
  render(): ReactElement {
    return (
      <Link className={'navbar-link ' + this.props.className!} to={this.props.to} style={{borderColor: this.props.colour}}>
        {this.props.value}
      </Link>
    );
  }
}

export default withRouter(NavBarLink);
