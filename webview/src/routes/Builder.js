import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input, Select, Button, Icon, Upload, message } from 'antd';
import { post } from '../utils/request';
import { Line } from '../components/Layout';
import styles from './Builder.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 14 },
  },
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isPNG = file.type === 'image/png';
  if (!isPNG) {
    message.error('只能使用PNG图片');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小必须小于2M');
  }

  return isPNG && isLt2M;
}

class Builder extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        post('/api/v1/upload/build', values);
      }
    });
  }

  handleIconChange = (info) => {
    if (info.file.status === 'done') {
      message.error(info.file.response.response.message);
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.props.dispatch({ type: 'builder/setIconImageUrl', payload: imageUrl });
      });
      this.props.form.setFieldsValue({ icon: info.file.response.response.url });
    }
  }

  handleRoundIconChange = (info) => {
    if (info.file.status === 'done') {
      message.error(info.file.response.response.message);
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.props.dispatch({ type: 'builder/setRoundImageUrl', payload: imageUrl });
      });
      this.props.form.setFieldsValue({ round_icon: info.file.response.response.url });
    }
  }

  handleSplashChange = (info) => {
    if (info.file.status === 'done') {
      message.error(info.file.response.response.message);
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.props.dispatch({ type: 'builder/setSplashImageUrl', payload: imageUrl });
      });
      this.props.form.setFieldsValue({ splash: info.file.response.response.url });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const { iconImageUrl, roundImageUrl, splashImageUrl } = this.props.builder;

    return (
      <Form >
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="游戏名称" hasFeedback>
              {getFieldDecorator('gamename', {
                rules: [{ required: true, message: '请输入游戏名称', whitespace: true }],
              })(<Input style={{ width: '90%' }} />)}
            </FormItem>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="应用包名" hasFeedback>
              {getFieldDecorator('packagename', {
                rules: [{ required: true, message: '请输入包名', whitespace: true }],
              })(<Input style={{ width: '90%' }} />)}
            </FormItem>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="游戏链接" hasFeedback>
              {getFieldDecorator('gameurl', {
                rules: [{ required: true, message: '请游戏链接', whitespace: true }],
              })(<Input style={{ width: '90%' }} />)}
            </FormItem>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="TalkingAD AppID" hasFeedback>
              {getFieldDecorator('talkingad_appid', {
                rules: [{ required: true, message: '请输入TalkingAD 应用ID', whitespace: true }],
              })(<Input style={{ width: '90%' }} />)}
            </FormItem>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="TalkingAD 渠道" hasFeedback>
              {getFieldDecorator('talkingad_channel', {
                rules: [{ required: true, message: '请输入TalkingAD 渠道', whitespace: true }],
                initialValue: 'GooglePlay',
              })(<Input style={{ width: '90%' }} />)}
            </FormItem>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="屏幕方向" >
              <Select defaultValue="0" style={{ width: 120 }} >
                <Select.Option value="0">竖屏</Select.Option>
                <Select.Option value="1">横屏</Select.Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Line />
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="图标" readonly="readonly" hasFeedback>
              {getFieldDecorator('icon', {
                rules: [{ required: true, message: '请上传256x256的png图标', whitespace: true }],
              })(<Input style={{ width: '90%' }} disabled />)}
            </FormItem>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="点击上传" hasFeedback>
              <Upload
                className={styles.avatarUploader}
                name="icon_image"
                showUploadList={false}
                action="/api/v1/upload/icon?icon_type=icon"
                beforeUpload={beforeUpload}
                onChange={this.handleIconChange}
              >
                {
                  iconImageUrl !== '' ?
                    <img src={iconImageUrl} alt="" className={styles.avatar} /> :
                    <Icon type="plus" className={styles.avatarUploaderTrigger} />
                }
              </Upload>
            </FormItem>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="圆型图标" readonly="readonly" hasFeedback>
              {getFieldDecorator('round_icon', {
                rules: [{ required: true, message: '请上传256x256的png图标', whitespace: true }],
              })(<Input style={{ width: '90%' }} disabled />)}
            </FormItem>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="点击上传" hasFeedback>
              <Upload
                className={styles.avatarUploader}
                name="round_icon_image"
                showUploadList={false}
                action="/api/v1/upload/icon?icon_type=round_icon"
                beforeUpload={beforeUpload}
                onChange={this.handleRoundIconChange}
              >
                {
                  roundImageUrl !== '' ?
                    <img src={roundImageUrl} alt="" className={styles.avatar} /> :
                    <Icon type="plus" className={styles.avatarUploaderTrigger} />
                }
              </Upload>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="闪屏" hasFeedback>
              {getFieldDecorator('splash', {
                rules: [{ required: true, message: '请上传768x1280的png闪屏图片', whitespace: true }],
              })(<Input style={{ width: '90%' }} disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="点击上传" hasFeedback>
              <Upload
                className={styles.splashUploader}
                name="splash_image"
                showUploadList={false}
                action="/api/v1/upload/icon?icon_type=splash"
                beforeUpload={beforeUpload}
                onChange={this.handleSplashChange}
              >
                {
                  splashImageUrl !== '' ?
                    <img src={splashImageUrl} alt="" className={styles.splash} /> :
                    <Icon type="plus" className={styles.splashUploaderTrigger} />
                }
              </Upload>
            </FormItem>
          </Col>
        </Row>
        <Line />
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <FormItem label="">
              <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                生成
                </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default connect(({ builder }) => ({ builder }))(Form.create()(Builder));
