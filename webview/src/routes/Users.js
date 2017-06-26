import React from 'react';
import { connect } from 'dva';
import { Table, Button, Modal } from 'antd';
import moment from 'moment';
import KForm from '../components/KoalaLibs/KForm';

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
  title: '上次登录时间',
  dataIndex: 'Lastlogintime',
  sorter: false,
  render: Lastlogintime => Lastlogintime,
  width: '20%',
}, {
  title: '创建时间',
  dataIndex: 'Createtime',
  sorter: false,
  render: Createtime => (moment(Createtime).format('YYYY-MM-DD HH:mm:ss')),
  width: '20%',
}, {
  title: '状态',
  dataIndex: 'Status',
  sorter: false,
  render: Status => (Status === 2 ? '启用' : '禁用'),
  width: '5%',
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
      name: 'username',
      label: '用户名',
      required: true,
      message: '请输入用户名',
      placeholder: '用户名',
    },
    {
      name: 'password',
      label: '密码',
      required: true,
      message: '请输入密码',
      placeholder: '密码',
    },
    {
      name: 'checked',
      type: 'select',
      label: '选项',
      placeholder: '选项1',
      required: true,
      options: [
        { key: '1', value: '类型1' },
        { key: '2', value: '类型2' },
        { key: '3', value: '类型3' },
        { key: '4', value: '类型4' },
      ],
      defaultValue: '1',
    },
  ],
};

class Users extends React.Component {
  state = {
    loading: false,
    visible: false,
  };

  componentDidMount() {
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
        <Button>删除</Button>
      </div>
    );
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div style={{ padding: '0px 16px' }}>
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
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <KForm schema={schemaAddUser} />
        </Modal>
      </div>
    );
  }
}

export default connect(({ user, loading }) => ({ user, loading: loading.models.user }))(Users);
