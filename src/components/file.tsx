import React from 'react';
import { List } from 'antd-mobile';
import './file.css';

import { typeToSVG } from 'models';

const Item = List.Item;

export default ({ file, callback }) => (
  <Item
    extra={file.size}
    onClick={() => { callback(file) }}
    thumb={typeToSVG(file.type)}
    wrap
  >
    {file.name}
  </Item>
)