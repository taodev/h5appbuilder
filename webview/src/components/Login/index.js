import React from 'react';
import { connect } from 'dva';
import { Button, Row, Form, Input, Alert } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;

class Login extends React.Component {
  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({ type: 'auth/login', payload: values });
      }
    });
  }

  renderMessage() {
    const { errorCode, errorMessage } = this.props.auth;
    if (errorCode !== 0) {
      return (
        <Alert message={errorMessage} type="error" showIcon />
      );
    }

    return (<div />);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const loginLoading = this.props.loading;

    return (
      <div className={styles.form}>
        <div className={styles.logo} />
        {this.renderMessage()}
        <Form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
              ],
            })(<Input size="large" onPressEnter={this.handleOk} placeholder="用户名" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                },
              ],
            })(<Input size="large" type="password" onPressEnter={this.handleOk} placeholder="密码" />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={this.handleOk} loading={loginLoading}>
              登录
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

export default connect(({
  auth,
  loading,
}) => ({
  auth,
  loading: loading.models.auth,
}))(Form.create()(Login));
