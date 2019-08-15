import React from 'react';
import { RouteComponentProps } from 'react-router';

import { MainLayout, EncodeItem } from 'components';
import { Encode } from 'models';
import { encodeStatus } from 'api';
import './encode.css';

interface Props extends RouteComponentProps {
  
}

interface State {
  encodes: Encode[]
}

class EncodePage extends React.Component<Props, State> {
  state = {
    encodes: []
  }
  
  componentDidMount() {
    encodeStatus()
      .then((encodes: Encode[]) => {
        this.setState({ encodes })
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
  }
  
  render() {
    const encodeComps = this.state.encodes.map((encode, index) => {
      return <EncodeItem encode={encode} key={index} />
    })
    
    return (
      <MainLayout>
        {encodeComps}
      </MainLayout>
    )
  }
}

export default EncodePage;