import React from 'react';
import { Tag, Progress } from 'antd';
import { basename } from 'path';

import { Encode } from 'models';
import './encode-item.css';

interface Props {
  encode: Encode;
}

const encodeItem: React.FunctionComponent<Props> = ({ encode }) => {
  const progress = parseFloat(encode.progress.toFixed(2));
  const progressStatus = (progress < 0) ? 'exception' : undefined;

  return (
    <div className="article-item encode-item">
      <div className="first section">
        <div className="article-id">{encode.id}</div>
        <div className="article-title">{basename(encode.inpath)}</div>
      </div>
      <div className="second section">
        {progress2tag(encode.progress)}
        <Progress className="progress" percent={progress} size="small" status={progressStatus} />
        <div className="article-date">{encode.date}</div>
      </div>
    </div>
  );
};

export default encodeItem;

function progress2tag(progress: number): React.ReactElement {
  if (progress === 0.0) {
    return <Tag className="status" color="orange">queued</Tag>;
  } else if (progress < 0.0) {
    return <Tag className="status" color="red">failed</Tag>;
  } else if (progress >= 100.0) {
    return <Tag className="status" color="green">done</Tag>;
  } else {
    return <Tag className="status" color="cyan">processing</Tag>;
  }
}
