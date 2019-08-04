import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Empty, Button } from 'antd';

const style = {
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
}

interface Props extends RouteComponentProps {
  
}

interface State {
  
}

class NotFoundPage extends React.Component<Props, State> {
  onClick = (e) => {
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div style={style}>
        <Empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          imageStyle={{
            height: 60,
          }}
          description={
            <span>
              해당 페이지가 존재하지 않습니다.
            </span>
          }
        >
          <Button type="primary" onClick={this.onClick}>홈으로 가기</Button>
        </Empty>
      </div>
    )
  }
}

export default withRouter(NotFoundPage);