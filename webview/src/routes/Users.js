import React from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, Spin, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import KForm from '../components/KoalaLibs/KForm';
import styles from './Users.less';

const columns = [{
  title: 'ID',
  dataIndex: 'Id',
  sorter: false,
  render: Id => `${Id}`,
  width: '5%',
}, {
  title: '账号',
  dataIndex: 'Username',
  sorter: false,
  render: Username => Username,
  width: '10%',
}, {
  title: '昵称',
  dataIndex: 'Nickname',
  sorter: false,
  render: Nickname => Nickname,
  width: '10%',
}, {
  title: '备注',
  dataIndex: 'Remark',
  sorter: false,
  render: Remark => Remark,
  width: '20%',
}, {
  title: '创建时间',
  dataIndex: 'Createtime',
  sorter: false,
  render: Createtime => (moment(Createtime).format('YYYY-MM-DD HH:mm:ss')),
  width: '15%',
}, {
  title: '状态',
  dataIndex: 'Status',
  sorter: false,
  render: Status => (Status === 2 ? '启用' : '禁用'),
  width: '5%',
}, {
  title: '操作',
  dataIndex: 'operation',
  sorter: false,
  render: () => {
    return (
      <div className="row-operations">
        <span>
          <a>更新信息</a>
          <a>修改密码</a>
          <Popconfirm title="确定删除?">
            <a>删除</a>
          </Popconfirm>
        </span>
      </div>
    );
  },
  width: '20%',
}];

const schemaAddUser = {
  layout: 'horizontal',
  itemLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  },
  children: [
    {
      name: 'Username',
      label: '用户名',
      required: true,
      message: '请输入用户名',
      placeholder: '用户名',
    },
    {
      name: 'Nickname',
      label: '昵称',
      required: true,
      message: '请输入昵称',
      placeholder: '昵称',
    },
    {
      name: 'Password',
      label: '密码',
      required: true,
      message: '请输入密码',
      placeholder: '密码',
    },
    {
      name: 'Repassword',
      label: '重复密码',
      required: true,
      message: '请输入密码',
      placeholder: '密码',
    },
    {
      name: 'Email',
      label: '邮箱',
      required: true,
      message: '请输入邮箱',
      placeholder: 'Email',
    },
    {
      name: 'Remark',
      label: '备注',
      required: false,
      message: '请输入备注',
      placeholder: '备注',
    },
    {
      name: 'Status',
      type: 'select',
      label: '状态',
      placeholder: '状态',
      required: true,
      options: [
        { key: '1', value: '禁用' },
        { key: '2', value: '启用' },
      ],
      defaultValue: '2',
    },
  ],
};

class Users extends React.Component {
  static contextTypes = {
    testObject: PropTypes.any,
  }

  state = {
    loading: false,
    visible: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'user/queryUsers' });
  }

  refreshUsers = () => {
    this.props.dispatch({ type: 'user/queryUsers' });
  }

  handleTableChange = () => {
    // const pager = { ...this.state.pagination };
    // pager.current = pagination.current;
    // this.setState({
    //   pagination: pager,
    // });
    // this.fetch({
    //   results: pagination.pageSize,
    //   page: pagination.current,
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   ...filters,
    // });
  }

  tableTitle = () => {
    return (
      <div>
        <Button onClick={this.showModal}>添加</Button>
        <Button onClick={this.refreshUsers}>刷新</Button>
      </div>
    );
  }

  showModal = () => {
    this.props.dispatch({ type: 'user/setVisible', payload: true });
  }

  handleOk = () => {
    this.addUserForm.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({ type: 'user/addUser', payload: values });
      } else {
        message.error(err.message);
      }
    });
  }

  handleCancel = () => {
    this.props.dispatch({ type: 'user/setVisible', payload: false });
  }

  render() {
    return (
      <div className={styles.normal}>
        <Table
          columns={columns}
          rowKey="Id"
          dataSource={this.props.user.data}
          pagination={this.props.user.pagination}
          loading={this.props.loading}
          onChange={this.handleTableChange}
          size="small"
          title={this.tableTitle}
        />
        <Modal
          title="添加用户"
          visible={this.props.user.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={this.props.user.confirmLoading}
        >
          <Spin spinning={false} tip="Loading...">
            <KForm schema={schemaAddUser} ref={(elem) => { this.addUserForm = elem; }} />
          </Spin>
        </Modal>
      </div>
    );
  }
}

export default connect(({ user, loading }) => ({ user, loading: loading.models.user }))(Users);
