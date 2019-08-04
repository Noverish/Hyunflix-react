import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

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
      <div className="home-container">
        <a className="home-link" href="/" onClick={this.onClick}>영화</a>
        <a className="home-link" href="/" onClick={this.onClick}>예능</a>
        <a className="home-link" href="/" onClick={this.onClick}>다큐멘터리</a>
        <a className="home-link" href="/" onClick={this.onClick}>드라마</a>
      </div>
    )
  }
}

export default withRouter(HomePage);
