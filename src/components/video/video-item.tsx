import React from 'react';
import { Tag, Tooltip, Checkbox } from 'antd';
import { connect } from 'react-redux';

import { Video } from 'models';
import { resolution2Color } from 'utils';

interface Props {
  onClick(video: Video): void;
  onCheck(video: Video, checked: boolean): void;
  highlight: string;
  video: Video;
  checkable: boolean;
  checked: boolean;

  // Redux Props
  tags: Map<string, string>;
}

class VideoItem extends React.Component<Props> {
  renderTitle = (title: string) => {
    const { highlight } = this.props;

    // TODO const index = title.search(new RegExp(highlight, 'i'));
    const index = title.indexOf(highlight);
    const beforeStr = title.substr(0, index);
    const matchStr = title.substr(index, highlight.length);
    const afterStr = title.substr(index + highlight.length);
    return (index > -1)
      ? (
        <span className="article-title">
          {beforeStr}
          <span style={{ color: '#f50' }}>{matchStr}</span>
          {afterStr}
        </span>
      )
      : (
        <span className="article-title">{title}</span>
      );
  }

  renderTags = () => {
    const { video, tags } = this.props;

    return video.tags.map(t => (
      <Tag color={tags.get(t)} key={t}>{t}</Tag>
    ));
  }

  render() {
    const { video, checkable, checked } = this.props;

    // TODO 여러 비디오 지원
    const color = resolution2Color(video.resolution);

    return (
      <div className="article-item" onClick={this.onClick}>
        <div className="first section">
          {checkable && <Checkbox className="check-box" checked={checked} />}
          <span className="article-id">{video.id}</span>
          {this.renderTags()}
          {this.renderTitle(video.title)}
        </div>
        <div className="second section">
          <span className="article-date">{video.durationString}</span>
          <Tooltip placement="top" title={`${video.width}x${video.height}`}>
            <Tag className="resolution" color={color}>{video.resolution}</Tag>
          </Tooltip>
          <span className="article-date">{video.date}</span>
        </div>
      </div>
    );
  }

  onClick = () => {
    const { checkable, video, checked } = this.props;

    if (checkable) {
      this.props.onCheck(video, !checked);
    } else {
      this.props.onClick(video);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.video.tags,
    checkedList: state.video.check,
  };
};

export default connect(mapStateToProps)(VideoItem);
