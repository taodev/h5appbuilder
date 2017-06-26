import React from 'react';
import { connect } from 'dva';
import { Layout, BackTop, Breadcrumb } from 'antd';
import { Header, LayoutMenu } from '../components/Layout';
import { MenuTree } from '../utils/menu';
import styles from './App.css';

const { Footer, Sider, Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className={styles.logo} />
          <LayoutMenu Location={this.props.location} MenuTree={MenuTree} />
        </Sider>
        <Layout>
          <Header routes={this.props.routes} params={this.props.params} />
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
            H5AppBuilder ©2017 Created by taodev
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(({ app }) => ({ app }))(App);
