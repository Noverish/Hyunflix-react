import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Music } from 'models';
import { connect } from 'react-redux';

const TITLE_FIELD = 'title';
const PATH_FIELD = 'path';
const TAGS_FIELD = 'tags';

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

interface Props extends FormComponentProps {
  music: Music;
  visible: boolean;
  callback: (music: Partial<Music> | undefined) => void;

  // redux
  tags: Map<string, string>;
}

const MusicEditModal: React.FunctionComponent<Props> = (props: Props) => {
  const { music, visible, callback, tags, form } = props;
  const { getFieldDecorator } = props.form;

  const options = Array.from(tags.keys()).map(t => <Select.Option key={t}>{t}</Select.Option>);

  const titleField = getFieldDecorator(TITLE_FIELD, { initialValue: music[TITLE_FIELD] })(<Input />);
  const pathField = getFieldDecorator(PATH_FIELD, { initialValue: music[PATH_FIELD] })(<Input />);
  const tagsField = getFieldDecorator(TAGS_FIELD, { initialValue: music[TAGS_FIELD] })(
    <Select mode="tags" tokenSeparators={[',']}>
      {options}
    </Select>,
  );

  return (
    <Modal
      title="음악 수정"
      visible={visible}
      onOk={callback.bind(null, form.getFieldsValue())}
      onCancel={callback.bind(null, undefined)}
    >
    <Form {...formItemLayout}>
      <Form.Item label={TITLE_FIELD}>
        {titleField}
      </Form.Item>
      <Form.Item label={PATH_FIELD}>
        {pathField}
      </Form.Item>
      <Form.Item label={TAGS_FIELD} style={{ marginBottom: 0 }}>
        {tagsField}
      </Form.Item>
    </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    tags: state.music.tags,
  };
};

export default connect(mapStateToProps)(Form.create<Props>()(MusicEditModal));
