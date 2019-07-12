import React from 'react';
import { List } from 'antd-mobile';

import { File } from '../models';

const Item = List.Item;
const Brief = Item.Brief;

export default (file: File) => (
  <Item
    arrow="horizontal"
    multipleLine
    onClick={() => {}}
  >
    {file.name}<Brief>{file.size}</Brief>
  </Item>
)
