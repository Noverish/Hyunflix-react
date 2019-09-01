import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement, incrementAsync, readdir } from 'actions';

interface Props {
  onIncrement;
  onDecrement;
  onIncrementAsync;
  onReaddir;
}

interface State {
    
}

class Buttons extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <button type="button" onClick={ this.props.onIncrement }>+</button>
        <button type="button" onClick={ this.props.onDecrement }>-</button>
        <button type="button" onClick={ this.props.onIncrementAsync }>async +</button>
        <button type="button" onClick={ this.readdirClick }>readdir</button>
      </div>
    )
  }
  
  readdirClick = () => {
    this.props.onReaddir('/archive/Movies')
  }
}


let mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch(increment()),
    onDecrement: () => dispatch(decrement()),
    onIncrementAsync: () => dispatch(incrementAsync()),
    onReaddir: (path) => dispatch(readdir(path)),
  }
}

export default connect(undefined, mapDispatchToProps)(Buttons);