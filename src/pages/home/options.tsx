import React from 'react';
import { connect } from 'react-redux';
import { setDiff } from 'actions';

interface Props {
  onUpdateDiff
}

interface State {
  diff
}

class Option extends React.Component<Props, State> {
  state = {
    diff: '1'
  }

  render() {
    return (
      <div>
        <input type="text" value={ this.state.diff } onChange={this.onChangeDiff}></input>
      </div>
    );
  }

  onChangeDiff = (e) => {
    if(isNaN(e.target.value))
      return;
    
    this.setState({ diff: e.target.value });
    
    if(e.target.value==='') {
      this.setState({ diff: '0' });
    }
    
    this.props.onUpdateDiff(parseInt(e.target.value));
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onUpdateDiff: (value) => dispatch(setDiff(value))
  };
}

export default connect(undefined, mapDispatchToProps)(Option);
