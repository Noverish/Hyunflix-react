import React from 'react';
import { Checkbox, Tag, Icon } from 'antd';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import withList, { InjectedProps, Options } from 'components/hoc/list';
import { Music } from 'models';
import { second2String } from 'utils';
import { RootState } from 'reducers';

interface ReduxProps {
  tags: Map<string, string>;
  isMobile: boolean;
}

interface OriginalProps {

}

type Props = OriginalProps & InjectedProps<Music> & ReduxProps;

const renderTags = (props: Props) => {
  const { item, tags } = props;

  return item.tags.map(t => (
    <Tag color={tags.get(t)} key={t}>{t}</Tag>
  ));
};

const MusicItem: React.FC<Props> = (props) => {
  const { item, checked, isMobile } = props;
  const time = second2String(item.duration);

  if (isMobile) {
    return (
      <div className={classnames('item mobile', { selected: checked })}>
        <div className="first-row">
          {checked !== undefined && <Checkbox checked={checked} />}
          <span className="title">{item.title}</span>
          {item.youtube && <Icon type="youtube" style={{ color: '#f5222d' }} />}
        </div>
        <div className="last-row">
          {renderTags(props)}
          <span className="gray float-right">{time}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="item desktop">
        {checked !== undefined && <Checkbox checked={checked} />}
        <span className="id">{item.id}</span>
        {renderTags(props)}
        <span className="title">{item.title}</span>
        {item.youtube && <Icon type="youtube" style={{ color: '#f5222d' }} />}
        <span className="gray float-right">{time}</span>
      </div>
    );
  }
};

// TODO state to type
const mapStateToProps = (state: RootState) => ({
  tags: state.music.tags,
  isMobile: state.etc.isMobile,
});

const options: Options<Music> = {
  compare: (t1, t2) => t1.id === t2.id,
};

const connected = connect(mapStateToProps)(MusicItem);
export default withList<Music>(options)<OriginalProps>(connected);

// TODO const youtubeUrl = music.youtube && `https://www.youtube.com/watch?v=${music.youtube}`;
