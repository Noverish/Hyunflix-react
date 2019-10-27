import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Tag, Icon } from 'antd';
import { connect } from 'react-redux';

import { Music } from 'models';
import { time } from 'utils';

interface Props {
  music: Music;
  checked?: boolean;
  link?(music: Music): string;
  onClick?(music: Music): void;

  // Redux Props
  tags: Map<string, string>;
}

const renderTags = (props: Props) => {
  const { music, tags } = props;

  return music.tags.map(t => (
    <Tag color={tags.get(t)} key={t}>{t}</Tag>
  ));
};

const onClick = (props: Props, e: React.MouseEvent<HTMLAnchorElement>) => {
  if (props.onClick !== undefined) {
    e.preventDefault();
    props.onClick(props.music);
  }
};

const MusicItem: React.FunctionComponent<Props> = (props) => {
  const { music, checked, link } = props;
  // TODO const youtubeUrl = music.youtube && `https://www.youtube.com/watch?v=${music.youtube}`;
  
  const _link: string = link ? link(music) : '';

  return (
    <Link to={_link} className="article-item" onClick={onClick.bind(null, props)}>
      <div className="first section">
        {checked !== undefined && <Checkbox className="check-box" checked={checked} />}
        <span className="article-id">{music.id}</span>
        {renderTags(props)}
        <span className="article-title">{music.title}</span>
        {music.youtube && <Icon type="youtube" style={{ color: '#f5222d' }} />}
      </div>
      <div className="second section">
        <span className="article-date">{time.second2String(music.duration)}</span>
      </div>
    </Link>
  );
};

const mapStateToProps = state => ({
  tags: state.music.tags,
});

export default connect(mapStateToProps)(MusicItem);
