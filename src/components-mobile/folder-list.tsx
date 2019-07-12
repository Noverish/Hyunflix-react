import React from 'react';
import { List } from 'antd-mobile';

import Folder from './folder';
import { File } from '../models';

const Item = List.Item;
const Brief = Item.Brief;

export interface FolderListProps {
  files: File[]
}

export default (props: FolderListProps) => {
  const folders = props.files.map((file) => (
    <Folder {...file} />
  ));
  
  return (
    <div>
      <List renderHeader={() => 'Subtitle'} className="my-list">
        { folders }
      </List>
    </div>
  )
}
