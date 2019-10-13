import React from 'react';

import { RegCode } from 'models';

interface Props {
  regCode: RegCode;
}

interface State {

}

class RegCodeItem extends React.Component<Props, State> {
  onClick = (e) => {

  }

  render() {
    const { regCode } = this.props;

    return (
      <div className="article-item" onClick={this.onClick}>
        <div>
          <span className="id">{regCode.id}</span>
          <span className="id">{regCode.userId}</span>
          <span className="title">{regCode.realname}</span>
          <span className="">{regCode.code}</span>
          <span className="">{regCode.date}</span>
        </div>
      </div>
    );
  }
}

export default RegCodeItem;
