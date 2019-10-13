import React from 'react';
import { Modal, List, Icon, Breadcrumb } from 'antd';
import { dirname } from 'path';

import { File } from 'models';
import * as Api from 'api';
import './file-select-modal.css';

interface Props {
  visible: boolean;
  onClose: (file: File | null) => void;
}

interface State {
  path: string;
  files: File[];
  selected: File | null;
}

class VideoEditModal extends React.Component<Props, State> {
  state = {
    path: '/',
    files: [],
    selected: null,
  };

  componentDidMount() {
    const { path } = this.state;
    Api.readdir(path)
      .then((files: File[]) => {
        this.setState({ files, path, selected: null });
      });
  }

  renderBreadcrumb = () => {
    const { path } = this.state;
    const items = path.split('/').map(p => (
      <Breadcrumb.Item key={p}>{p}</Breadcrumb.Item>
    ));

    return (
      <Breadcrumb>
        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
        {items}
      </Breadcrumb>
    );
  }

  renderFileItem = (f: File) => {
    const { selected } = this.state;
    const iconType = f.isdir ? 'folder' : 'file';
    const className = (selected === f)
      ? 'modal-file-item selected'
      : 'modal-file-item';

    return (
      <div className={className} onClick={() => this.onClick(f)} key={f.name}>
        <Icon type={iconType} />
        <span>{f.name}</span>
      </div>
    );
  }

  render() {
    const files: File[] = this.state.files;

    return (
      <Modal
        className="file-select-modal"
        title="파일 선택"
        visible={this.props.visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        {this.renderBreadcrumb()}
        <List
          bordered={true}
          dataSource={files}
          renderItem={(f: File) => this.renderFileItem(f)}
        />
      </Modal>
    );
  }

  onOk = () => {
    this.props.onClose(this.state.selected);
  }

  onCancel = () => {
    this.props.onClose(null);
  }

  onClick = (file: File) => {
    const selected: File | null = this.state.selected;
    const path: string = file.path;
    const isdir: boolean = file.isdir;

    if (selected === file) {
      if (!isdir) {
        this.props.onClose(this.state.selected);
        return;
      }

      Api.readdir(path)
        .then((files: File[]) => {
          if (path !== '/') {
            files.unshift({
              path: dirname(path),
              name: '../',
              isdir: true,
              size: '',
              url: '',
            });
          }

          this.setState({ files, path, selected: null });
        });
    } else {
      this.setState({ selected: file });
    }
  }
}

export default VideoEditModal;
