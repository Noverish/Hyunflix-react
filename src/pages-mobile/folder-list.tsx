import React from 'react';

import FolderList from '../components-mobile/folder-list';
import { get } from '../services';
import { ServerResponse, File } from '../models';

interface Props {
  path: string;
}

interface State {
  files: File[]
}

export default class FolderListPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      files: []
    }
  }
  
  componentDidMount() {
    get(this.props.path)
      .then((res: ServerResponse) => {
        console.log(res);
        
        this.setState({
          files: res.payload as File[]
        })
      })
  }
  
  render() {
    return (
      <FolderList files={this.state.files} />
    )
  }
}