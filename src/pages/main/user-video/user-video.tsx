import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { UserVideoList } from 'components';
import { UserVideo } from 'models';
import { userVideoList } from 'api';

interface Props {
  userId: number;
}

const UserVideoPage: React.FunctionComponent<Props> = (props) => {
  const { userId } = props;
  const [userVideos, setUserVideos] = useState([] as UserVideo[]);

  useEffect(() => {
    userVideoList(userId)
      .then(userVideos => setUserVideos(userVideos))
      .catch();
  }, [userId]);

  return (
    <UserVideoList
      userVideos={userVideos}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(UserVideoPage);
