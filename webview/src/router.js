import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import { isLogin } from './services/login';

import Login from './components/Login';

import App from './routes/App.js';

import Builder from './routes/Builder.js';

import Users from './routes/Users.js';

const checkLogin = (next, replace, callback) => {
  const logined = isLogin();
  if (!logined) {
    if (next.location.pathname !== '/login') {
      replace('/login');
    }
  } else if (next.location.pathname === '/login') {
    replace('/');
  }

  callback();
};

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} onEnter={checkLogin} breadcrumbName="首页">
        <IndexRedirect to="/app/builder" />
        <Route path="/app/builder" component={Builder} breadcrumbName="微端生成" />
        <Route path="/system/log" component={Users} breadcrumbName="日志查看" />
        <Route path="/system/users" component={Users} breadcrumbName="用户管理" />
      </Route>
      <Route path="/login" component={Login} onEnter={checkLogin} />
    </Router>
  );
}

export default RouterConfig;
