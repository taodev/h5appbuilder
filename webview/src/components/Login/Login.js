import React from 'react';
import { connect } from 'dva';
import { Button, Row, Form, Input, Alert } from 'antd';
import reqwest from 'reqwest';
import { loginInfo } from '../../services/login';

import styles from './Login.less';

const FormItem = Form.Item;

class Login extends React.Component {
  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.props.dispatch({ type: 'login/login', payload: {...values} });
        // westRequest('http://localhost:8080/api/v1/auth/login', values);
        this.props.dispatch({ type: 'login/showLoginLoading' });

        loginInfo.username = values.username;

        reqwest({
          url: '/api/v1/auth/login',
          method: 'post',
          data: { ...values },
          type: 'json',
        }).then((data) => {
          this.props.dispatch({ type: 'login/onLogin', payload: data });
        })
        .fail(() => {
          this.props.dispatch({ type: 'login/hideLoginLoading' });
        })
        .always(() => {
          this.props.dispatch({ type: 'login/hideLoginLoading' });
        });
      }
    });
  }
  renderMessage() {
    const { errorCode, errorMessage } = this.props.login;
    if (errorCode !== 0) {
      return (
        <Alert message={errorMessage} type="error" showIcon />
      );
    }

    return (<div />);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loginLoading } = this.props.login;

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

export default connect(({ login }) => ({ login }))(Form.create()(Login));
