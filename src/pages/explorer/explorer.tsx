import React from 'react';
import { RouteComponentProps } from 'react-router';

import { MainLayout, FileItem } from 'components';
import { readdir } from 'api';
import { File } from 'models';
import './explorer.css';

interface Props extends RouteComponentProps {
  
}

interface State {
  shouldRefresh: boolean,
  nowPath: string,
  files: File[]
}

class ExplorerPage extends React.Component<Props, State> {
  state = {
    shouldRefresh: false,
    nowPath : '',
    files: []
  }
  
  static getDerivedStateFromProps(props: Props, state: State) {
    const path = `/archive/${props.match.params[0] || ''}`;
    
    if(path !== state.nowPath) {
      return { shouldRefresh: true };
    }
    return {};
  }
  
  refresh = () => {
    const path = `/archive/${this.props.match.params[0] || ''}`;
    readdir(path)
      .then((files: File[]) => {
        this.setState({
          shouldRefresh: false,
          nowPath: path,
          files
        })
      })
      .catch((msg) => {
        alert(msg);
        this.setState({
          shouldRefresh: false,
          nowPath: path,
          files: []
        })
      })
  }
  
  componentDidMount() {
    if(this.state.shouldRefresh) {
      this.refresh();
    }
  }
  
  componentDidUpdate() {
    if(this.state.shouldRefresh) {
      this.refresh();
    }
  }
  
  render() {
    const fileItems = this.state.files.map((file, index) => {
      return <FileItem file={file} callback={this.onItemClicked} key={index}/>
    })
    
    return (
      <MainLayout>
        {fileItems}
      </MainLayout>
    )
  }
  
  onBack = () => {
    
  }
  
  onItemClicked = (file: File) => {
    this.props.history.push(`/explorer${file.path}`)
  }
}

export default ExplorerPage;