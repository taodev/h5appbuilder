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
        <Row type="flex" justify="space-between">
          <Col span={6} style={{ marginLeft: 16, lineHeight: '47px' }}>
            <Select
              size="large"
              style={{ width: 200 }}
              defaultValue="1"
            >
              <Option key="1"><Icon type="tablet" />传奇世界</Option>
            </Select>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Menu mode="horizontal" onClick={this.handleMenuClick} style={{ textAlign: 'left' }}>
              <Menu.SubMenu
                title={<span> <Icon type="user" />Admin </span>}
              >
                <Menu.Item key="logout">
                  登出
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ dispatch }) => ({ dispatch }))(Header);
