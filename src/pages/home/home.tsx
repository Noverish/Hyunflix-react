import React from 'react';
import { connect } from 'react-redux';

import { logoutAsync } from 'actions';
import { MainLayout } from 'components'
import './home.css';

interface Props {
  logoutAsyncRequest(): ReturnType<typeof logoutAsync.request>;
}

interface State {
  
}

class HomePage extends React.Component<Props, State> {
  onClick = (e) => {
    this.props.logoutAsyncRequest();
  }
  
  render() {
    return (
      <MainLayout>
        <button type='button' onClick={this.onClick}>logout</button>
      </MainLayout>
    )
  }
}

const mapDispatchToProps = {
  logoutAsyncRequest: logoutAsync.request,
}

export default connect(undefined, mapDispatchToProps)(HomePage);
