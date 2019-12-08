import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, PageHeader, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';

import { updateMusicPlaylist, getMusicplaylist } from 'api';
import { MusicPlaylist } from 'models';

const TITLE_FIELD = 'title';

// TODO 다른데 보관
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const buttonItemLayout = {
  wrapperCol: { span: 14, offset: 4 },
};

const MusicPlaylistEditPage = (props: FormComponentProps & RouteComponentProps) => {
  const [playlist, setPlaylist] = useState(undefined as MusicPlaylist | undefined);
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = props.form;
  const playlistId: number = parseInt(props.match.params['playlistId']);

  useEffect(() => {
    getMusicplaylist(playlistId)
      .then(setPlaylist)
      .catch(props.history.goBack);
  }, [playlistId, props.history]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    props.form.validateFields({ force: true }, (err, values) => {
      if (err) {
        return;
      }

      const title = values[TITLE_FIELD];

      setLoading(true);
      updateMusicPlaylist(playlistId, title)
        .then(props.history.goBack)
        .catch(() => {
          setLoading(false);
        });
    });
  }, [props.form, props.history, playlistId]);

  const titleField = getFieldDecorator(TITLE_FIELD, {
    initialValue: playlist ? playlist.title : '',
    rules: [
      {
        required: true,
        message: '제목을 입력해주세요',
      },
    ],
  })(<Input />);

  return (
    <React.Fragment>
      <PageHeader
        title="음악 플레이리스트 수정"
        className="border-top border-bottom"
        style={{ marginBottom: '32px' }}
        onBack={props.history.goBack}
      />
      <Spin spinning={loading}>
        <Form className="border-bottom" layout="vertical" onSubmit={onSubmit}>
          <Form.Item label="제목" {...formItemLayout}>
            {titleField}
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">확인</Button>
          </Form.Item>
        </Form>
      </Spin>
    </React.Fragment>
  );
};

export default Form.create()(MusicPlaylistEditPage);
