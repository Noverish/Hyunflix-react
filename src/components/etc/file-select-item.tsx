import React from 'react';
import { Icon } from 'antd';
import * as classnames from 'classnames';

import { File } from 'models';

interface Props {
  file: File;
  onClick(file: File): void;
  selected: boolean;
}

const FileSelectItem: React.FunctionComponent<Props> = (props) => {
  const { file, onClick, selected } = props;
  const iconType = file.isdir ? 'folder' : 'file';
  const className = classnames('article-item', { selected });

  return (
    <div className={className} onClick={_ => onClick(file)}>
      <div className="first section">
        <Icon type={iconType} />
        <span>{file.name}</span>
      </div>
      <div className="second section">
        <div className="article-date">{file.size}</div>
      </div>
    </div>
  );
};

export default FileSelectItem;
