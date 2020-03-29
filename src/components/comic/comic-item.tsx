import React from 'react';
import { Tag } from 'antd';

import { Comic } from 'src/models';
import withLink from '../hoc/with-link';

interface Props {
  item: Comic;
}

const renderTags = (item: Comic) => (
  item.tags.map(t => (
    <Tag color="red" key={t}>{t}</Tag>
  ))
);

const ComicItem = ({ item }: Props) => (
  <div className="item desktop">
    <span className="id">{item.id}</span>
    {renderTags(item)}
    <span className="title">{item.title}</span>
    <span className="gray float-right">{item.date}</span>
  </div>
);

export default withLink<Comic, Props>(ComicItem);
