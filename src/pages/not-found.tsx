import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Result, Button } from 'antd';

const style = {
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
}

const NotFoundPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  const onClick = () => {
    props.history.push('/');
  }
  
  return (
    <div style={style}>
      <Result
        status="404"
        title="404"
        subTitle="해당 페이지가 존재하지 않습니다."
        extra={<Button type="primary" onClick={onClick}>홈으로 가기</Button>}
      />
    </div>
  )
}

export default withRouter(NotFoundPage);