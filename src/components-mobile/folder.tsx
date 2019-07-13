import React from 'react';
import { List } from 'antd-mobile';

import { File } from '../models';

const Item = List.Item;

export default (file: File) => (
  <Item
    extra={file.size}
    arrow="horizontal"
    onClick={() => {}}
    thumb="/icons/folder.svg"
  >
    {file.name}
  </Item>
)
