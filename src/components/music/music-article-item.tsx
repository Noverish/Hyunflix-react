import React from 'react';
import { Checkbox, Tag, Icon } from 'antd';
import { connect } from 'react-redux';

import { Music } from 'models';
import { time } from 'utils';

interface Props {
  music: Music;
  onClick(music: Music): void;
  checked: boolean;

  // Redux Props
  tags: Map<string, string>;
}

const renderTags = (props: Props) => {
  const { music, tags } = props;

  return music.tags.map(t => (
    <Tag color={tags.get(t)} key={t}>{t}</Tag>
  ));
};

const MusicItem: React.FunctionComponent<Props> = (props) => {
  const { music, checked, onClick } = props;
  // TODO const link = `/musics/articles/${music.id}`;
  // TODO const youtubeUrl = music.youtube && `https://www.youtube.com/watch?v=${music.youtube}`;

  const onClick2 = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onClick(music);
  };

  return (
    <div className="article-item" onClick={onClick2}>
      <div className="first section">
        <Checkbox className="check-box" checked={checked} />
        <span className="article-id">{music.id}</span>
        {renderTags(props)}
        <span className="article-title">{music.title}</span>
        {music.youtube && <Icon type="youtube" style={{ color: '#f5222d' }} />}
      </div>
      <div className="second section">
        <span className="article-date">{time.second2String(music.duration)}</span>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  tags: state.music.tags,
});

export default connect(mapStateToProps)(MusicItem);
