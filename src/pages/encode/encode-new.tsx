import React from 'react';
import { Form, Input, Icon, Button, Row, Col, Menu, Dropdown, Switch } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { MainLayout } from 'components';
import './encode-new.css';

interface Props extends FormComponentProps{
  
}

interface State {
  addedOptions: string[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

interface FFMpeg {
  input?: string;
  map?: string[];
  videoCodec?: string;
  audioCodec?: string;
  audioChannel?: number;
  noChapter?: boolean;
  overwrite?: boolean;
  preset?: string;
  crf?: number;
  videoProfile?: string;
  maxrate?: string;
  videoFilter?: string;
  noAudio?: boolean;
  format?: string;
}



let id = 0;

class DynamicFieldSet extends React.Component<Props, State> {
  state = {
    addedOptions: []
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => names[key]));
      }
    });
  };
  
  selectedOptions = {
    
  }

  render() {
    const addedOptions: string[] = this.state.addedOptions;
    const requiredRules = { rules: [{ required: true }] };
    
    const { getFieldDecorator, getFieldValue } = this.props.form;
    
    const optionItems = {
      '-i': (
        <Form.Item label="-i" key="-i" >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('-i', requiredRules)(<Input />)}
            </Col>
            <Col span={12}>
              <Button>Select</Button>
            </Col>
          </Row>
        </Form.Item>
      ),
      '-v:c': (
        <Form.Item label="-v:c" key="-v:c">
          {getFieldDecorator('-v:c', requiredRules)(<Input />)}
        </Form.Item>
      ),
      '-vf': (
        <Form.Item label="-vf" key="-vf">
          {getFieldDecorator('-vf', requiredRules)(<Input />)}
        </Form.Item>
      ),
      '-a:c': (
        <Form.Item label='-a:c' key='-a:c'>
          {getFieldDecorator('-a:c', requiredRules)(<Input />)}
        </Form.Item>
      ),
      '-ac': (
        <Form.Item label='-ac' key='-ac'>
          {getFieldDecorator('-ac', requiredRules)(<Input />)}
        </Form.Item>
      ),
      '-f': (
        <Form.Item label='-f' key='-f'>
          {getFieldDecorator('-f', requiredRules)(<Input />)}
        </Form.Item>
      ),
      '-map_chapters -1': (
        <Form.Item label='-map_chapters -1' key='-map_chapters -1'>
          {getFieldDecorator('-map_chapters -1', { valuePropName: 'checked' })(<Switch />)}
        </Form.Item>
      ),
      '-y': (
        <Form.Item label='-y' key='-y'>
          {getFieldDecorator('-y', { valuePropName: 'checked' })(<Switch />)}
        </Form.Item>
      ),
      '-an': (
        <Form.Item label='-an' key='-an'>
          {getFieldDecorator('-an', { valuePropName: 'checked' })(<Switch />)}
        </Form.Item>
      )
    }
    
    const formItems = addedOptions.map((option: string) => (
      <div>
        {optionItems[option]}
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          data-option="input"
          onClick={this.removeOptionClicked}
        />
      </div>
    ));
    
    const optionDropdownItems = Object.keys(optionItems)
      .filter((option: string) => !addedOptions.includes(option))
      .map((option: string) => 
        <Menu.Item key={option}>
          <a href="/" onClick={this.addOptionClicked} data-option={option}>
            {option}
          </a>
        </Menu.Item>
      );
    
    const optionDropdown = (
      <Menu>
        {optionDropdownItems}
      </Menu>
    );
    
    return (
      <MainLayout>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Dropdown overlay={optionDropdown} placement="bottomCenter">
              <Button type="dashed" style={{ width: '60%' }}>
                <Icon type="plus" /> Add Option
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </MainLayout>
    );
  }
  
  addOptionClicked = (e) => {
    e.preventDefault();
    const shouldAddOption: string = e.target.getAttribute('data-option');
    this.setState({
      addedOptions: [...this.state.addedOptions, shouldAddOption]
    })
  }
  
  removeOptionClicked = (e) => {
    console.log(e);
  }
}

export default Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);