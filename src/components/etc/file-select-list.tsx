import React from 'react';
import { List, Icon, Breadcrumb, PageHeader } from 'antd';
import { dirname } from 'path';

import { FileSelectItem } from 'components';
import { File } from 'models';
import * as Api from 'api';

interface Props {
  onSelect(file: File): void;
  topRight?: React.ReactNode;
}

interface State {
  path: string;
  files: File[];
  selected: File | null;
}

class FileSelectList extends React.Component<Props, State> {
  state = {
    path: '/',
    files: [],
    selected: null,
  };

  componentDidMount() {
    const { path } = this.state;
    this.refresh(path);
  }

  refresh = (path: string) => {
    const parent: File = {
      path: dirname(path),
      name: '../',
      isdir: true,
      size: '',
      url: '',
    };

    Api.readdir(path)
      .then((files: File[]) => {
        if (path !== '/') {
          files.unshift(parent);
        }

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

  render() {
    const { topRight } = this.props;
    const { files } = this.state;

    return (
      <div className="article-list-page">
        <div className="page-header">
          <PageHeader title={this.renderBreadcrumb()} />
          {topRight}
        </div>
        <List
          className="page-content"
          dataSource={files}
          renderItem={(f: File) => (
            <FileSelectItem
              file={f}
              onClick={this.onClick}
              selected={f === this.state.selected}
            />
          )}
        />
      </div>
    );
  }

  onClick = (file: File) => {
    const selected: File | null = this.state.selected;
    const path: string = file.path;

    if (selected === file) {
      this.refresh(path);
    } else {
      this.setState({ selected: file });
      this.props.onSelect(file);
    }
  }
}

export default FileSelectList;
