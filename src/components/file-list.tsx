import React from 'react';
import { List } from 'antd-mobile';

import Folder from './file';

export default ({path, files, callback}) => {
  const folders = files.map((file) => (
    <Folder key={file.name} file={file} callback={callback} />
  ));
  
  return (
    <List renderHeader={() => path} className="my-list">
      { folders }
    </List>
  )
}
