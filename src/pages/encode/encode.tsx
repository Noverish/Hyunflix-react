import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'antd';

import { MainLayout, EncodeItem } from 'components';
import { Encode } from 'models';
import { encodeStatus, pauseEncoding, resumeEncoding } from 'api';
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
    this.refresh();
  }
  
  refresh = () => {
    encodeStatus()
      .then((encodes: Encode[]) => {
        this.setState({ encodes })
        setTimeout(() => {
          this.refresh()
        }, 1000);
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
        <Button type="primary" onClick={this.onPauseClicked}>Pause</Button>
        <Button type="primary" onClick={this.onResumeClicked}>Resume</Button>
        {encodeComps}
      </MainLayout>
    )
  }
  
  onPauseClicked = () => {
    pauseEncoding()
      .then(() => {
        alert('success');
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data));
      })
  }
  
  onResumeClicked = () => {
    resumeEncoding()
      .then(() => {
        alert('success');
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data));
      })
    
  }
}

export default EncodePage;