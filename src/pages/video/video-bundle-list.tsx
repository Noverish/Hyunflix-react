import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { MainLayout, VideoBundleList } from 'components';
import { VideoBundle } from 'models';
import { videoBundleList } from 'api';

interface Props extends RouteComponentProps {
  
}

interface State {
  bundles: VideoBundle[];
}

class VideoBundleListPage extends React.Component<Props, State> {
  state = {
    bundles: [],
  }
  
  componentDidMount() {
    const category: string = this.props.match.params['category'];
    
    videoBundleList(category)
      .then(bundles => this.setState({ bundles }));
  }
  
  render() {
    const { bundles } = this.state;
    
    return (
      <MainLayout>
        <VideoBundleList bundles={bundles}/>
      </MainLayout>
    )
  }
}

let mapDispatchToProps = {
  
}

let mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoBundleListPage);