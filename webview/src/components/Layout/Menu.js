import React from 'react';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

class LayoutMenu extends React.Component {
  state = {
    openKey: '',
    activeKey: '',
  }

  getMenus = (menuTreeN) => {
    const { router } = this.context;

    const menu = menuTreeN.map((item) => {
      return (
        <Menu.SubMenu
          key={`sub_${item.id}`}
          title={<span>
            { item.icon && <Icon type={item.icon} /> }
            { item.name }
          </span>}
        >
          {
            item.children && item.children.map((node) => {
              if (node.router && router.isActive(node.router, true)) {
                this.state.activeKey = `menu_${node.id}`;
                this.state.openKey = `sub_${item.id}`;
              }
              return (
                <Menu.Item key={`menu_${node.id}`}>
                  <Link to={node.router}>
                    {node.icon && <Icon type={node.icon} />}
                    {node.name}
                  </Link>
                </Menu.Item>
              );
            })
          }
        </Menu.SubMenu>
      );
    });

    return menu;
  }

  handleMenuClick = (item) => {
    this.setState({
      activeKey: item.id,
    });
  }

  render() {
    const menuItems = this.getMenus(this.props.MenuTree);

    return (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[this.state.activeKey]}
        defaultOpenKeys={[this.state.openKey]}
        onClick={this.handleMenuClick}
      >
        {menuItems}
      </Menu>
    );
  }
}

LayoutMenu.contextTypes = {
  router: PropTypes.object,
};

export default LayoutMenu;
