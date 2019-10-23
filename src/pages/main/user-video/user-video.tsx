import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { UserVideoList } from 'components';
import { UserVideo } from 'models';
import { userVideoList } from 'api';

interface Props {
  userId: number;
}

interface State {
  userVideos: UserVideo[];
  loading: boolean;
}

const UserVideoPage: React.FunctionComponent<Props> = (props) => {
  const { userId } = props;
  const [state, setState] = useState({
    userVideos: [],
    loading: true,
  } as State);

  useEffect(() => {
    userVideoList(userId)
      .then(userVideos => setState({ userVideos, loading: false }) )
      .catch();
  }, [userId]);

  return (
    <UserVideoList
      userVideos={state.userVideos}
      loading={state.loading}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(UserVideoPage);
