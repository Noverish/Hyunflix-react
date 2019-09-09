import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  series: string
}

interface State {
  
}

class SeriesItem extends React.Component<Props, State> {
  
  onClick = (e) => {
    const link = `/tv-programs/${this.props.series}`;
    e.preventDefault();
    this.props.history.push(link);
  }
  
  render() {
    const link = `/tv-programs/${this.props.series}`;
    
    return (
      <a href={link} onClick={this.onClick}>
        <div>
          {this.props.series}
        </div>
      </a>
    )
  }
}

export default withRouter(SeriesItem);