import React from 'react';
import { connect } from 'dva';
import { Layout, BackTop, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import { Header, LayoutMenu } from '../components/Layout';
import { MenuTree } from '../utils/menu';
import styles from './App.css';

const { Footer, Sider, Content } = Layout;

class App extends React.Component {
  static childContextTypes = {
    testObject: PropTypes.any,
  }

  getChildContext() {
    return {
      testObject: 32,
    };
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className={styles.logo} />
          <LayoutMenu Location={this.props.location} MenuTree={MenuTree} />
        </Sider>
        <Layout>
          <Header routes={this.props.routes} params={this.props.params} style={{ position: 'fixed' }} />
          <Content style={{ margin: '0px 0px 0', borderBottom: '1px solid #b9b9b9', borderTop: '1px solid #b9b9b9' }}>
            <BackTop />
            <div style={{ paddingLeft: 24, paddingTop: 8 }}>
              <Breadcrumb routes={this.props.routes} params={this.props.params} />
            </div>
            <div
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8,
                paddingBottom: 16,
                minHeight: 600,
              }}
            >
              <div className={styles.contentBody}>
                { this.props.children }
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', background: '#fff' }}>
            H5AppBuilder ©2017 Created by <a href="https://github.com/taodev" target="_blank" rel="noopener noreferrer"><span>taodev</span></a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(({ app }) => ({ app }))(App);
