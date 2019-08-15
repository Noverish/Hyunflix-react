import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { MainLayout } from 'components'
import './home.css';

interface Props extends RouteComponentProps {
  
}

interface State {
  
}

class HomePage extends React.Component<Props, State> {
  onClick = (e) => {
    e.preventDefault();
    this.props.history.push('/movies');
  }
  
  render() {
    return (
      <MainLayout>
        <h1>empty</h1>
      </MainLayout>
    )
  }
}

export default withRouter(HomePage);
