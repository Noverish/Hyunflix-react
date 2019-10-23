import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { UserVideoList } from 'components';
import { UserVideo } from 'models';
import { userVideoList } from 'api';

interface Props {
  userId: number;
}

const UserVideoPage: React.FunctionComponent<Props> = (props) => {
  const { userId } = props;
  const [userVideos, setUserVideos] = useState(null as UserVideo[] | null);
  const [checklist, setChecklist] = useState(undefined as UserVideo[] | undefined);

  useEffect(() => {
    userVideoList(userId)
      .then(userVideos => setUserVideos(userVideos))
      .catch();
  }, [userId]);

  const toggleMode = () => {
    setChecklist(checklist === undefined ? [] : undefined);
  };

  const deleteUserVideos = () => {
    console.log('Delete User Videos!', checklist);
  };

  const onItemCheck = (userVideo: UserVideo, checked: boolean) => {
    if (checklist) {
      if (checked) {
        setChecklist([...checklist, userVideo]);
      } else {
        setChecklist(checklist.filter(v => v !== userVideo));
      }
    }
  };

  const extra = (checklist !== undefined)
    ? (
      <React.Fragment>
        <Button type="danger" onClick={deleteUserVideos}>삭제</Button>
        <Button onClick={toggleMode}>취소</Button>
      </React.Fragment>
    )
    : <Button type="danger" onClick={toggleMode}>삭제</Button>;

  return (
    <UserVideoList
      userVideos={userVideos || []}
      loading={userVideos === null}
      checklist={checklist}
      onItemCheck={onItemCheck}
      headerExtra={extra}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(UserVideoPage);
