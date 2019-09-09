import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { TVProgram } from 'models';

interface Props extends RouteComponentProps {
  tvProgram: TVProgram
}

interface State {
  
}

class EpisodeItem extends React.Component<Props, State> {
  
  onClick = (e) => {
    const link = `/tv-programs/${this.props.tvProgram.seriesName}/${this.props.tvProgram.episodeNumber}`;
    e.preventDefault();
    this.props.history.push(link);
  }
  
  render() {
    const link = `/tv-programs/${this.props.tvProgram.seriesName}/${this.props.tvProgram.episodeNumber}`;
    
    return (
      <a href={link} onClick={this.onClick}>
        <div>
          {this.props.tvProgram.episodeName}
        </div>
      </a>
    )
  }
}

export default withRouter(EpisodeItem);