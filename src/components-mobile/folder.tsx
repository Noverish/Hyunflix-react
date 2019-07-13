import React from 'react';
import { List } from 'antd-mobile';
import './folder.css';

import { File, typeToSVG } from '../models';

const Item = List.Item;

const style = {
  "flex-basis": "auto"
}

export default (file: File) => (
  <Item
    extra={file.size}
    onClick={() => {}}
    thumb={typeToSVG(file.type)}
    wrap
  >
    {file.name}
  </Item>
)