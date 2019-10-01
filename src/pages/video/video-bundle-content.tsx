import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

interface Props extends RouteComponentProps {
  
}

interface State {
  
}

class BoilerPlate extends React.Component<Props, State> {
  state = {
    
  }
  
  componentDidMount() {
    
  }
  
  render() {
    return (
      <div></div>
    )
  }
}

let mapDispatchToProps = {
  
}

let mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoilerPlate);