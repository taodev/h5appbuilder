import React from 'react';
import { Router, Route } from 'dva/router';

import App from './routes/App.js';

import Builder from './routes/Builder.js';

import Log from './routes/Log.js';

import Users from './routes/Users.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} breadcrumbName="首页" >
        <Route path="/builder" component={Builder} breadcrumbName="微端生成" />
        <Route path="/log" component={Log} breadcrumbName="日志查看" />
        <Route path="/users" component={Users} breadcrumbName="用户管理" />
      </Route>
    </Router>
  );
}

export default RouterConfig;
