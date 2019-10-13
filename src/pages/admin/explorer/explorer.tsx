import React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Result } from 'antd';

import { readdir } from 'actions';
import FolderPage from './folder-page';
import { File } from 'models';

interface Props extends RouteComponentProps {
  readdir(path: string): ReturnType<typeof readdir.request>;
  files: File[] | null;
}

interface State {

}

class ExplorerPage extends React.Component<Props, State> {
  path: string = '';

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    this.refresh();
  }

  refresh = () => {
    const params = this.props.match.params[0];
    const path = (params) ? params : '/';

    if (this.path !== path) {
      this.props.readdir(path);
      this.path = path;
    }
  }

  render() {
    console.log(this.props);

    const files: File[] | null = this.props.files;

    if (!files) {
      return (
        <Result
          status="404"
          title="404"
          subTitle="존재하지 않는 경로입니다"
        />
      );
    }

    if (files) {
      return (
        <FolderPage files={files} />
      );
    }

    return (
      <div>ERROR CODE 1002</div>
    );
  }
}

const mapDispatchToProps = {
  readdir: readdir.request,
};

const mapStateToProps = (state) => {
  return {
    files: state.etc.files,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerPage);
