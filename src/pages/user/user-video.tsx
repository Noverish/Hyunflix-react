import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';

import { UserVideoList } from 'components';
import withContainer from 'components/hoc/container';
import { UserVideo } from 'models';
import { deleteUserVideoBulk, userVideoList } from 'api';

interface State {
  checklist: UserVideo[];
  checkable: boolean;
  loading: boolean;
}

class UserVideoListContainer extends withContainer<UserVideo>()(UserVideoList) {}
const link = (userVideo: UserVideo) => `/videos/${userVideo.video.id}`;

class UserVideoPage extends React.Component<RouteComponentProps, State> {
  userVideoListContainer = React.createRef<UserVideoListContainer>();

  state: State = {
    checklist: [],
    checkable: false,
    loading: false,
  };

  render() {
    const { checklist, checkable, loading } = this.state;

    const headerExtra = (checkable)
      ? (
        <React.Fragment>
          <Button type="danger" onClick={this.deleteUserVideos} disabled={checklist.length === 0}>삭제</Button>
          <Button onClick={this.toggleMode}>취소</Button>
        </React.Fragment>
      )
      : <Button type="danger" onClick={this.toggleMode}>삭제</Button>;

    return (
      <UserVideoListContainer
        title="시청 기록"
        ref={this.userVideoListContainer}
        checklist={checkable ? checklist : undefined}
        onItemClick={checkable ? this.onItemClick : undefined}
        headerExtra={headerExtra}
        search={userVideoList}
        link={link}
        loading={loading}
        history={this.props.history}
      />
    );
  }

  toggleMode = () => {
    const { checkable } = this.state;
    this.setState({ checkable: !checkable });
  }

  deleteUserVideos = () => {
    const { checklist } = this.state;

    const videoIds = checklist.map(v => v.video.id);

    this.setState({ loading: true });

    deleteUserVideoBulk(videoIds)
      .then(() => {
        this.setState({
          checklist: [],
          loading: false,
        });
        this.userVideoListContainer.current!.refresh();
      })
      .catch();
  }

  onItemClick = (userVideo: UserVideo) => {
    const { checklist } = this.state;

    const newChecklist = (checklist.includes(userVideo))
      ? checklist.filter(v => v !== userVideo)
      : [...checklist, userVideo];

    this.setState({ checklist: newChecklist });
  }
}

export default UserVideoPage;
