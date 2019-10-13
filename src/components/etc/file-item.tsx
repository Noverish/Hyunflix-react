import React from 'react';
import { Button, Icon } from 'antd';
import { extname } from 'path';

import { File } from 'models';
import './file-item.css';

interface Props {
  file: File;
  onClick: (file: File) => void;
  onRenameClick: (file: File) => void;
  onEncodeClick: (file: File) => void;
}

interface State {

}

class Fileitem extends React.Component<Props, State> {

  render () {
    const isVideo = ['.mp4', '.avi', '.mkv'].includes(extname(this.props.file.name));
    const isMP4 = extname(this.props.file.name) === '.mp4';

    const link: React.ReactNode = (this.props.file.isdir || isMP4)
      ? (
        <a
          className="file-item-name"
          href={this.props.file.path}
          onClick={this.onClick}
        >
          <span>{this.props.file.name}</span>
        </a>
      ) : (
        <a
          className="file-item-name"
          href={this.props.file.url}
        >
          <span>{this.props.file.name}</span>
        </a>
      );

    return (
      <div className="file-item">
        <div className="file-item-name-layout">
          {link}
        </div>
        <div className="file-item-etc-layout">
          <div className="file-item-size">{this.props.file.size}</div>
          <Button className="file-item-button" onClick={this.onRenameClick}><Icon type="edit"/></Button>
          <Button className="file-item-button" onClick={this.onEncodeClick} disabled={!isVideo}><Icon type="filter"/></Button>
          <Button className="file-item-button"><Icon type="delete"/></Button>
        </div>
      </div>
    );
  }

  onClick = (e) => {
    e.preventDefault();
    this.props.onClick(this.props.file);
  }

  onRenameClick = (e) => {
    this.props.onRenameClick(this.props.file);
  }

  onEncodeClick = (e) => {
    this.props.onEncodeClick(this.props.file);
  }
}

export default Fileitem;
