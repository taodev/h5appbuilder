import React from 'react';
import { connect } from 'dva';
import { Row, Col, Menu, Icon, Select } from 'antd';
import styles from './Header.less';

class Header extends React.Component {
  handleMenuClick = (item) => {
    if (item.key === 'logout') {
      this.props.dispatch({ type: 'auth/logout' });
    }
  }

  render() {
    return (
      <div className={styles.header}>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={6}>
            <div style={{ paddingLeft: 16 }}>
              <Select
                size="large"
                style={{ width: 200 }}
                defaultValue="1"
              >
                <Option key="1"><Icon type="tablet" />传奇世界</Option>
              </Select>
            </div>
          </Col>
          <Col span={4} style={{ float: 'right' }}>
            <div style={{ paddingLeft: 64 }}>
              <Menu mode="horizontal" onClick={this.handleMenuClick}>
                <Menu.SubMenu
                  style={{
                    float: 'right',
                  }}
                  title={<span> <Icon type="user" />Admin </span>}
                >
                  <Menu.Item key="logout">
                    登出
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ app }) => ({ app }))(Header);
