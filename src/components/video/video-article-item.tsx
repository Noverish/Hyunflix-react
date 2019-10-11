import React from 'react';
import { Tag, Tooltip, Checkbox } from 'antd';
import { connect } from 'react-redux';

import { VideoArticle } from 'models';
import { time } from 'utils';

interface Props {
  onClick(article: VideoArticle): void;
  onCheck(article: VideoArticle, checked: boolean): void;
  highlight: string;
  article: VideoArticle;
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
    const { article, tags } = this.props;
    
    return article.tags.map(t => (
      <Tag color={tags.get(t)} key={t}>{t}</Tag>
    ))
  }
  
  render() {
    const { article, checkable, checked } = this.props;
    
    // TODO 여러 비디오 지원
    const video = article.videos[0];
    const { resolution, color } = widthToResolutionAndColor(video.width);
    
    return (
      <div className="article-item" onClick={this.onClick}>
        <div className="first section">
          { checkable && <Checkbox className="check-box" checked={checked} /> }
          <span className="article-id">{article.id}</span>
          { this.renderTags() }
          { this.renderTitle(article.title) }
        </div>
        <div className="second section">
          <span className="article-date">{time.second2String(video.duration)}</span>
          <Tooltip placement="top" title={`${video.width}x${video.height}`}>
            <Tag className="resolution" color={color}>{resolution}</Tag>
          </Tooltip>
          <span className="article-date">{article.date}</span>
        </div>
      </div>
    )
  }
  
  onClick = () => {
    const { checkable, article, checked } = this.props;
    
    if (checkable) {
      this.props.onCheck(article, !checked);
    } else {
      this.props.onClick(article);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.video.tags,
    checkedList: state.video.check,
  }
}

export default connect(mapStateToProps)(VideoItem);

function widthToResolutionAndColor(width: number) {
  const list = {
    1920: { resolution: '1080p', color: 'purple' },
    1280: { resolution: '720p', color: 'geekblue' },
    854: { resolution: '480p', color: 'green' },
    640: { resolution: '360p', color: 'red' },
  }
  
  let diff = 10000;
  let key = 0;
  Object.keys(list).forEach(n => {
    const d = Math.abs(parseInt(n) - width);
    if (d < diff) {
      diff = d;
      key = parseInt(n);
    }
  })
  
  return list[key];
}
