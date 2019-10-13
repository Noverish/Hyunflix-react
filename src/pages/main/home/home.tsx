import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { logoutAsync, userVideoList } from 'actions';
import { UserVideo, VideoArticle } from 'models';
import { VideoArticleList } from 'components';
import './home.css';

interface Props extends RouteComponentProps {
  logoutAsyncRequest(): ReturnType<typeof logoutAsync.request>;
  userVideoList(): ReturnType<typeof userVideoList.request>;
  userVideos: UserVideo[];
}

interface State {

}

class HomePage extends React.Component<Props, State> {
  componentDidMount() {
    this.props.userVideoList();
  }

  onClick = (e) => {
    this.props.logoutAsyncRequest();
  }

  render() {
    const articles = this.props.userVideos.map(v => v.article);

    return (
      <React.Fragment>
        <button type="button" onClick={this.onClick}>logout</button>
        <VideoArticleList articles={articles} onItemClick={this.onItemClick} title={'시청 기록'} />
      </React.Fragment>
    );
  }

  onItemClick = (article: VideoArticle) => {
    const userVideo = this.props.userVideos.find(v => v.article === article);
    this.props.history.push(`/videos/articles/${article.id}?t=${userVideo!.time}`);
  }
}

const mapStateToProps = state => ({
  userVideos: state.user.userVideos,
});

const mapDispatchToProps = {
  logoutAsyncRequest: logoutAsync.request,
  userVideoList: userVideoList.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
