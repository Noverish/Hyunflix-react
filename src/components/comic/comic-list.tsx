import React from 'react';
import { Checkbox, Tag } from 'antd';

import withList, { InjectedProps, Options } from 'components/hoc/list';
import { Comic } from 'models';

interface OriginalProps {

}

type Props = OriginalProps & InjectedProps<Comic>;

const renderTags = (props: Props) => {
  const { item } = props;

  return item.tags.map(t => (
    <Tag color="red" key={t}>{t}</Tag>
  ));
};

const ComicItem = (props: Props) => {
  const { item, checked } = props;

  return (
    <div className="item desktop">
      {checked !== undefined && <Checkbox checked={checked} />}
      <span className="id">{item.id}</span>
      {renderTags(props)}
      <span className="title">{item.title}</span>
      <span className="gray float-right">{item.date}</span>
    </div>
  );
};

const options: Options<Comic> = {
  compare: (t1, t2) => t1.id === t2.id,
};

export default withList<Comic>(options)<OriginalProps>(ComicItem);
