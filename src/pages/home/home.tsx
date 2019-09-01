import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from 'actions';
import { MainLayout } from 'components'
import './home.css';

interface Props extends RouteComponentProps {
  onLogout;
}

interface State {
  
}

class HomePage extends React.Component<Props, State> {
  onClick = (e) => {
    this.props.onLogout();
  }
  
  render() {
    return (
      <MainLayout>
        <button type='button' onClick={this.onClick}>logout</button>
      </MainLayout>
    )
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout()),
  }
}

export default connect(undefined, mapDispatchToProps)(withRouter(HomePage));
