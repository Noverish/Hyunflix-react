import React from 'react';
import { List } from 'antd';

import { MovieComp } from 'components';
import { MoviePreview } from 'models';

interface Props {
  moviePreviews: MoviePreview[]
}

interface State {
  
}

export default class MoviePreviewListComp extends React.Component<Props, State> {
  render() {
    return (
      <List
        dataSource={this.props.moviePreviews}
        renderItem={ moviePreview => (
          <MovieComp moviePreview={moviePreview}/>
        )}
      />
    )
  }
}
