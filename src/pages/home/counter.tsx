import React from 'react';
import { connect } from 'react-redux';

interface Props {
  value;
}

interface State {
    
}

class Counter extends React.Component<Props, State> {
  render() {
    return (
      <h1>VALUE: { this.props.value }</h1>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    value: state.counter.value
  };
}

export default connect(mapStateToProps)(Counter);