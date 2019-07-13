import React from 'react';
import { List } from 'antd-mobile';

import Folder from './folder';

export default ({ files }) => {
  const folders = files.map((file) => (
    <Folder key={file.name} {...file} />
  ));
  
  return (
    <div>
      <List renderHeader={() => 'Subtitle'} className="my-list">
        { folders }
      </List>
    </div>
  )
}
