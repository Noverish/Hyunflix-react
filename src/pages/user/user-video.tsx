import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { UserVideoList } from 'components';
import { UserVideo } from 'models';
import { userVideoList, deleteUserVideoBulk } from 'api';

interface Props {
  userId: number;
}

interface State {
  userVideos: UserVideo[];
  loading: boolean;
  checklist: UserVideo[];
  checkable: boolean;
}

class UserVideoPage extends React.Component<Props, State> {
  state: State = {
    userVideos: [],
    loading: true,
    checklist: [],
    checkable: false,
  };

  componentDidMount() {
    const { userId } = this.props;
    userVideoList(userId)
      .then(userVideos => this.setState({ userVideos, loading: false }))
      .catch();
  }

  render() {
    const { userVideos, loading, checklist, checkable } = this.state;

    const extra = (checkable)
      ? (
        <React.Fragment>
          <Button type="danger" onClick={this.deleteUserVideos} disabled={checklist.length === 0}>삭제</Button>
          <Button onClick={this.toggleMode}>취소</Button>
        </React.Fragment>
      )
      : <Button type="danger" onClick={this.toggleMode}>삭제</Button>;

    const link = userVideo => `/videos/${userVideo.video.id}`;

    return (
      <UserVideoList
        userVideos={userVideos || []}
        loading={loading}
        link={link}
        checklist={checkable ? checklist : undefined}
        onItemCheck={this.onItemCheck}
        headerExtra={extra}
      />
    );
  }

  toggleMode = () => {
    const { checkable } = this.state;
    this.setState({ checkable: !checkable });
  }

  deleteUserVideos = () => {
    const { userId } = this.props;
    const { userVideos, checklist } = this.state;

    const videoIds = checklist.map(v => v.video.id);
    const afterDelete = userVideos.filter(v => !checklist.includes(v));

    this.setState({ loading: true });

    deleteUserVideoBulk(userId, videoIds)
      .then(() => {
        this.setState({
          userVideos: afterDelete,
          checklist: [],
          loading: false,
        });
      })
      .catch();
  }

  onItemCheck = (userVideo: UserVideo, checked: boolean) => {
    const { checklist } = this.state;

    const newChecklist = (checked)
      ? [...checklist, userVideo]
      : checklist.filter(v => v !== userVideo);

    this.setState({ checklist: newChecklist });
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(UserVideoPage);
