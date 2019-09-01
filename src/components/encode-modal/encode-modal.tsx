import React from 'react';
import { dirname, basename, extname } from 'path';
import { Modal, Input, Radio, message } from 'antd';

import { encodePresets, encodeFile } from 'api';
import './encode-modal.css';

interface Props {
  path: string;
  visible: boolean;
  onClose: () => void;
}

interface State {
  inpath: string;
  outpath: string;
  options: string;
  encodePresets: object;
  confirmLoading: boolean;
}

class EncodeModal extends React.Component<Props, State> {
  inpathTextArea; // TODO Add Type
  optionsTextArea;
  outpathTextArea;
  
  state = {
    inpath: this.props.path,
    outpath: dirname(this.props.path) + '/' + basename(this.props.path, extname(this.props.path)) + '.mp4',
    options: '',
    encodePresets: {},
    confirmLoading: false,
  }
  
  componentDidMount() {
    encodePresets()
      .then(presets => this.setState({ encodePresets: presets }))
      .catch(msg => {
        
      });
  }
  
  render () {
    const presets = this.state.encodePresets;
    const radioButtons = Object.keys(presets).map((k: string) => {
      return <Radio.Button value={presets[k]} key={k}>{k}</Radio.Button>
    });
    
    return (
      <Modal
        title="비디오 인코딩"
        visible={this.props.visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        confirmLoading={this.state.confirmLoading}
      >
        <div className="encode-modal">
          <Radio.Group value="large" onChange={this.onPresetSelect}>
            {radioButtons}
          </Radio.Group>
          <Input.TextArea
            ref={ref => this.inpathTextArea = ref}
            placeholder="inpath"
            value={this.state.inpath}
            onChange={this.onChange} />
            
          <Input.TextArea
            autosize
            ref={ref => this.optionsTextArea = ref}
            placeholder="options"
            value={this.state.options}
            onChange={this.onChange}  />
            
          <Input.TextArea
            ref={ref => this.outpathTextArea = ref}
            placeholder="outpath"
            value={this.state.outpath}
            onChange={this.onChange} />
        </div>
      </Modal>
    )
  }
  
  onPresetSelect = (e) => {
    this.setState({ options: e.target.value });
  }
  
  onChange = (e) => {
    switch (e.target.placeholder) {
      case 'inpath': {
        this.setState({ inpath: e.target.value });
        break;
      }
      case 'outpath': {
        this.setState({ outpath: e.target.value });
        break;
      }
      case 'options': {
        this.setState({ options: e.target.value });
        break;
      }
    }
  }
  
  onOk = (e) => {
    this.setState({ confirmLoading: true });
    const inpath = this.state.inpath;
    const options = this.state.options;
    const outpath = this.state.outpath;
    
    encodeFile(inpath, options, outpath)
      .then(() => {
        this.props.onClose();
        message.success('인코딩 리스트에 추가하였습니다');
      })
      .catch((msg) => {
        this.props.onClose();
      })
  }
  
  onCancel = () => {
    this.props.onClose();
  }
}

export default EncodeModal;
