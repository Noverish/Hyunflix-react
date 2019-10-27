import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Checkbox } from 'antd';
import { connect } from 'react-redux';

import { UserVideo } from 'models';

interface Props {
  userVideo: UserVideo;
  checked?: boolean;
  link?(userVideo: UserVideo): string;
  onCheck?(userVideo: UserVideo, checked: boolean): void;

  // Redux Props
  tags: Map<string, string>;
}

const UserVideoItem: React.FunctionComponent<Props> = (props) => {
  const renderTags = () => {
    const { userVideo, tags } = props;

    return userVideo.article.tags.map(t => (
      <Tag color={tags.get(t)} key={t}>{t}</Tag>
    ));
  };

  const { userVideo, checked, onCheck, link } = props;
  const article = userVideo.article;
  const video = article.videos[0]; // TODO 여러 비디오 지원

  const percent = Math.floor(userVideo.time / video.duration * 100);

  const _link = link ? link(userVideo) : '';
  const _onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onCheck !== undefined && checked !== undefined) {
      e.preventDefault();
      onCheck(userVideo, !checked);
    }
  };

  return (
    <Link to={_link} className="article-item" onClick={_onClick}>
      <div className="first section">
        {checked !== undefined && <Checkbox checked={checked} />}
        {renderTags()}
        <span className="article-title">{article.title}</span>
      </div>
      <div className="second section">
        <span className="article-date">{percent}% 시청,</span>
        <span className="article-date">총 시간: {video.durationString},</span>
        <span className="article-date">{userVideo.date} 시청</span>
      </div>
    </Link>
  );
};

const mapStateToProps = (state) => {
  return {
    tags: state.video.tags,
  };
};

export default connect(mapStateToProps)(UserVideoItem);
