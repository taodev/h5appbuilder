import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Menu, Icon, BackTop, Breadcrumb } from 'antd';
import LoginForm from '../components/Login/Login';
import { MenuTree } from '../utils/menu';
import styles from './App.css';

const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {
  getMenus(menuTreeN) {
    return menuTreeN.map((item) => {
      if (item.children && item.children.length) {
        return (
          <Menu.SubMenu
            key={item.id}
            title={<span>
              { item.icon && <Icon type={item.icon} /> }
              { item.name }
            </span>}
          >
            {this.getMenus(item.children)}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item key={item.id}>
          <Link to={item.router}>
            {item.icon && <Icon type={item.icon} />}
            {item.name}
          </Link>
        </Menu.Item>
      );
    });
  }

  render() {
    if (!this.props.app.isLogin) {
      return <LoginForm />;
    }

    const menuItems = this.getMenus(MenuTree);

    // console.log("tree", queryMenuNode(MenuTree, 2001));

    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className={styles.logo} />
          <Menu theme="dark" mode="inline" defaultOpenKeys={['1']}>
            {menuItems}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div style={{ margin: '0px 16px 0' }}>
              <Breadcrumb routes={this.props.routes} params={this.props.params} />
            </div>
          </Header>
          <Content style={{ margin: '16px 16px 0' }}>
            <BackTop />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              { this.props.children }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            H5AppBuilder ©2017 Created by taodev
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(({ app }) => ({ app }))(App);
