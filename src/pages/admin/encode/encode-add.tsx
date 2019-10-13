import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Steps, Button, Input, Radio, Result } from 'antd';
import { extname, dirname, basename } from 'path';

import * as Api from 'api';
import { FileSelectList } from 'components';
import { File } from 'models';
const { Step } = Steps;

interface Props extends RouteComponentProps {

}

interface State {
  file: File | null;
  step: number;
  options: string;
  encodes: string[];
}

class EcodeAddPage extends React.Component<Props, State> {
  encodePresets = {};
  optionsTextArea;

  state = {
    file: null,
    step: 0,
    options: '',
    encodes: [],
  };

  componentDidMount() {
    Api.encodePresets()
      .then(presets => this.encodePresets = presets);
  }

  render() {
    const { step, options, encodes } = this.state;
    const { encodePresets: presets } = this;

    const radioButtons = Object.keys(presets).map((k: string) => {
      return <Radio.Button value={presets[k]} key={k}>{k}</Radio.Button>;
    });

    const tmp: File | null = this.state.file;
    let firstNextButtonEnabled = false;
    if (tmp !== null) {
      const file: File = tmp;
      firstNextButtonEnabled = file.isdir || ['.mp4', '.avi', '.mkv'].includes(extname(file.name));
    }

    return (
      <div>
        <Steps className="border-top" style={{ padding: '24px 0' }} current={step}>
          <Step title="1. 폴더/파일 선택" />
          <Step title="2. 인코딩 옵션" />
          <Step title="3. 목록 추가 완료" />
        </Steps>
        { step === 0 &&
          <FileSelectList
            onSelect={this.onSelect}
            topRight={<Button type="primary" disabled={!firstNextButtonEnabled} onClick={this.onNext}>Next</Button>}
          />
        }
        { step === 1 &&
          <div className="border-top">
            <Radio.Group value="large" onChange={this.onPresetSelect} style={{ margin: '12px 0' }}>
              {radioButtons}
            </Radio.Group>
            <Input.TextArea
              autosize={true}
              ref={ref => this.optionsTextArea = ref}
              placeholder="options"
              value={this.state.options}
              onChange={this.onChange}
            />
            <Button type="primary" disabled={!options} onClick={this.onNext} style={{ margin: '12px 0' }}>Next</Button>
          </div>
        }
        { step === 2 &&
          <Result
            className="border-top"
            status="success"
            title="목록 추가 완료"
            subTitle={
              <div>
                {encodes.join(', ')}
              </div>
            }
            extra={
              <Link to="/admin/encode">
                <Button type="primary" key="console">목록 보기</Button>
              </Link>
            }
          />
        }
      </div>
    );
  }

  onSelect = (file: File) => {
    this.setState({ file });
  }

  onNext = () => {

    if (this.state.step === 1) {
      this.process();
    } else {
      this.setState({ step: this.state.step + 1 });
    }
  }

  onPresetSelect = (e) => {
    this.setState({ options: e.target.value });
  }

  onChange = (e) => {
    this.setState({ options: e.target.value });
  }

  process = async () => {
    const { options } = this.state;

    const file: File = this.state.file!;

    let videos: File[] = [];
    if (file.isdir) {
      const files = await Api.readdir(file.path);
      videos = files.filter(f => ['.mp4', '.avi', '.mkv'].includes(extname(f.name)));
    } else {
      videos.push(file);
    }

    for (const video of videos) {
      const inpath = video.path;
      const outpath = dirname(inpath) + '/' + basename(inpath, extname(inpath)) + '.mp4';

      await Api.encodeFile(inpath, options, outpath);
    }

    this.setState({
      encodes: videos.map(v => basename(v.path)),
      step: this.state.step + 1,
    });
  }
}

const mapDispatchToProps = {

};

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EcodeAddPage);
