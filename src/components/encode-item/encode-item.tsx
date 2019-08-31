import React from 'react';
import { Tag, Progress } from 'antd';

import { Encode } from 'models';
import './encode-item.css'

interface Props {
  encode: Encode
}

const encodeItem: React.FunctionComponent<Props> = ({ encode }) => {
  return (
    <div className="encode-item">
      <div className="encode-item-id">{encode._id}</div>
      <div className="encode-item-inpath">{encode.inpath}</div>
      <div className="encode-item-etc-layout">
        { progress2tag(encode.progress) }
        <Progress className="encode-item-progress" percent={encode.progress} size="small" />
        <div className="encode-item-date">{encode.date}</div>
      </div>
    </div>
  )
}

export default encodeItem;

function progress2tag(progress: number): React.ReactElement {
  if (progress === 0.0) {
    return <Tag className="encode-item-status" color="red">queued</Tag>
  } else if (progress === 100.0) {
    return <Tag className="encode-item-status" color="green">done</Tag>
  } else {
    return <Tag className="encode-item-status" color="cyan">processing</Tag>
  }
}