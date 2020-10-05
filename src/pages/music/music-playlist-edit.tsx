import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

import { updateMusicPlaylist, getMusicPlaylist } from 'src/api';
import { MusicPlaylist } from 'src/models';
import { PageHeader } from 'src/components';

const TITLE_FIELD = 'title';

// TODO 다른데 보관
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const buttonItemLayout = {
  wrapperCol: { span: 14, offset: 4 },
};

const MusicPlaylistEditPage = (props: RouteComponentProps) => {
  const [playlist, setPlaylist] = useState(undefined as MusicPlaylist | undefined);
  const [loading, setLoading] = useState(false);
  const playlistId: number = parseInt(props.match.params['playlistId']);

  useEffect(() => {
    setLoading(true);
    getMusicPlaylist(playlistId)
      .then(setPlaylist)
      .then(setLoading.bind(null, false))
      .catch(props.history.goBack);
  }, [playlistId, props.history]);

  const onFinish = useCallback((values) => {
    const title = values[TITLE_FIELD];

    setLoading(true);
    updateMusicPlaylist(playlistId, title)
      .then(props.history.goBack)
      .catch(() => {
        setLoading(false);
      });
  }, [props.history, playlistId]);

  return (
    <>
      <PageHeader
        title="음악 플레이리스트 수정"
        className="border-top border-bottom"
        style={{ marginBottom: '32px' }}
        onBack={props.history.goBack}
      />
      <Spin spinning={loading}>
        <Form
          className="border-bottom"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ [TITLE_FIELD]: playlist ? playlist.title : '' }}
        >
          <Form.Item
            label="제목"
            name={TITLE_FIELD}

            rules={[{ required: true, message: '제목을 입력해주세요' }]}
            {...formItemLayout}
          >
            <Input />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">확인</Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default MusicPlaylistEditPage;
