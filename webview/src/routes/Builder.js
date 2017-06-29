import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input, Button, Icon, Upload, Radio, message } from 'antd';
import { post } from '../utils/request';
import { Line } from '../components/Layout';
import styles from './Builder.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
      } else {
        message.error(err.message);
      }
    });
  }

  handleIconChange = (info) => {
    if (info.file.status === 'done') {
      message.error(info.file.response.message);
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.props.dispatch({ type: 'builder/setIconImageUrl', payload: imageUrl });
      });
    }
  }

  uploadFile = (e) => {
    if (e.file.response) {
      return e.file.response.url;
    }

    return '';
  }

  handleRoundIconChange = (info) => {
    if (info.file.status === 'done') {
      message.error(info.file.response.message);
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.props.dispatch({ type: 'builder/setRoundImageUrl', payload: imageUrl });
      });
    }
  }

  handleSplashChange = (info) => {
    if (info.file.status === 'done') {
      message.error(info.file.response.message);
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.props.dispatch({ type: 'builder/setSplashImageUrl', payload: imageUrl });
      });
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
                rules: [{ required: true, message: '请输入游戏链接', whitespace: true }],
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
              {getFieldDecorator('screen', {
                initialValue: '0',
              })(<RadioGroup>
                <RadioButton value="0">竖屏</RadioButton>
                <RadioButton value="1">横屏</RadioButton>
              </RadioGroup>)}
            </FormItem>
          </Col>
        </Row>
        <Line />
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="图标" hasFeedback>
              {getFieldDecorator('icon', {
                rules: [{ required: true, message: '请上传游戏图标(256x256)或者(512x512)', whitespace: true }],
                getValueFromEvent: this.uploadFile,
              })(<Upload
                className={styles.avatarUploader}
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
              </Upload>)}
            </FormItem>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="圆形图标" hasFeedback>
              {getFieldDecorator('round_icon', {
                rules: [{ required: true, message: '请上传游戏圆形图标(256x256)或者(512x512)', whitespace: true }],
                getValueFromEvent: this.uploadFile,
              })(<Upload
                className={styles.avatarUploader}
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
              </Upload>)}
            </FormItem>
          </Col>
        </Row>
        <Line />
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem {...formItemLayout} label="闪屏" hasFeedback>
              {getFieldDecorator('splash', {
                rules: [{ required: true, message: '请上传闪屏图片(768x1280)', whitespace: true }],
                getValueFromEvent: this.uploadFile,
              })(<Upload
                className={styles.splashUploader}
                showUploadList={false}
                action="/api/v1/upload/icon?icon_type=splash"
                beforeUpload={beforeUpload}
                onChange={this.handleSplashChange}
              >
                {splashImageUrl !== '' ?
                  <img src={splashImageUrl} alt="" className={styles.splash} /> :
                  <Icon type="plus" className={styles.splashUploaderTrigger} />}
              </Upload>)}
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
