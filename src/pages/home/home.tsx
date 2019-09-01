import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { MainLayout } from 'components'
import './home.css';

import { default as Counter } from './counter';
import { default as Option } from './options';
import { default as Buttons } from './buttons';

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
        <div style={ {textAlign: 'center'} }>
            <Counter/>
            <Option/>
            <Buttons/>
        </div>
      </MainLayout>
    )
  }
}

export default withRouter(HomePage);
