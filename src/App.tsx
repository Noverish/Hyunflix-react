import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/archive" component={ HomePage }/>
        </Switch>
      </div>
    );
  }
}
 
export default App;