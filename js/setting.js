class Setting extends React.Component {
  constructor(props){
    super(props);
    this.timer = null;
  }

  state = {
    managerList: [{
      name: '张三',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '张三',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '张三',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    }],
    staffList: [{
      name: '1',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '2',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '3',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '4',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '5',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '6',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '7',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '8',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '9',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '10',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '11',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '12',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '13',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '14',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '15',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '16',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '17',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '18',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '19',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    },{
      name: '20',
      email: '893749234@qq.com',
      phone: '384739284',
      place: '销售部/子部门/子部门/子部门'
    }],
    pageCurrent: 1,
    pageTotal: 50,
    visible: false,
    nomoreStaff: false,
    section: 'staff'
  }

  // 查看文件明细
  showSection = (section) => {
    this.setState({
      section: section
    })
  }

  // 弹出添加文件管理员弹框
  showModal = () => {
    this.setState({
      visible: true,
    })

    this.timer = setInterval(() => {
      const parentElemBottom = $('.ant-table-body')[1].getBoundingClientRect().bottom;
      const elems = $('.ant-table-row');
      const elemBottom = elems[elems.length - 1].getBoundingClientRect().bottom;

      if (elemBottom - parentElemBottom < 50) {
        // 请求下一页数据
        console.log('请求下一页数据')
        const arr = [{
          name: '1',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '2',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '3',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '4',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '5',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '6',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '7',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '8',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '9',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '10',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '11',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '12',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '13',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '14',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '15',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '16',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '17',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '18',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '19',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        },{
          name: '20',
          email: '893749234@qq.com',
          phone: '384739284',
          place: '销售部/子部门/子部门/子部门'
        }];
        this.setState({
          staffList: this.state.staffList.concat(arr)
        })
      }

      if (this.state.nomoreStaff) {
        // 没有更多数据
        clearInterval(this.timer);
      }

    }, 2000)
  }

  // 搜索人员
  onSearchChange = (e) => {
    console.log(e.target.value)
  }

  // 确定添加已选人员
  handleOk = () => {
    clearInterval(this.timer)
  }

  // 取消添加管理员
  handleCancel = () => {
    this.setState({
      visible: false,
    });
    clearInterval(this.timer);

  }

  // 页码-变更
  handlePageChange = (page, pageSize) => {
    this.setState({
      pageCurrent: page,
    })
  }

  render() {
    const columns = [{
      title: '真实姓名',
      dataIndex: 'name',
    }, {
      title: '用户邮箱',
      dataIndex: 'email',
    }, {
      title: '手机',
      dataIndex: 'phone',
    }, {
      title: '部门',
      dataIndex: 'place',
    }, {
      title: '操作',
      dataIndex: 'op',
      render: () => (
        <span>
          <antd.Icon type="swap" style={{ fontSize: '18px', color: '#0692e1', marginRight: '10px' }} />
          <antd.Icon type="delete" style={{ fontSize: '18px', color: '#f74953' }} />
        </span>
      )
    }];

    const staffColumns = [{
      title: '真实姓名',
      dataIndex: 'name',
      width: '115px',
    }, {
      title: '用户邮箱',
      dataIndex: 'email',
      width: '180px',
    }, {
      title: '手机',
      dataIndex: 'phone',
      width: '145px',
    }, {
      title: '部门',
      dataIndex: 'place',
      width: '260px'
    }];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };


    return (
      <div>
        {/*
        <div style={{ margin: '0 0 15px 175px' }}>
          <Capicity showButton={true} switchSection={this.props.switchSection} />
        </div>
        */}
        {
          this.state.section === 'staff' ?
            <div className="set">
              <antd.Breadcrumb>
                <antd.Breadcrumb.Item onClick={this.props.goToHome}>
                  <antd.Icon type="home" />
                  <span>首页</span>
                </antd.Breadcrumb.Item>
                <antd.Breadcrumb.Item>
                  <antd.Icon type="user" />
                  <span>网盘设置</span>
                </antd.Breadcrumb.Item>
              </antd.Breadcrumb>
              <div className="setHeader">
                <h1 style={{ fontSize: '16px' }}>网盘设置</h1>
                <antd.Button type="primary" icon="file-text" className="setHeaderBtn" onClick={this.showSection.bind(this, 'doc')}>文件明细</antd.Button>
              </div>
              <div style={{ border: '1px solid #eaeaea', borderRadius: '5px' }}>
                <div style={{ margin: '10px'}}>
                  <antd.Button icon="plus-square" type="primary" onClick={this.showModal}>添加文件管理员</antd.Button>
                </div>
                <antd.Table
                  columns={columns}
                  dataSource={this.state.managerList}
                  bordered
                  pagination={false}
                  size="small"
                />
                <antd.Pagination
                  size="small"
                  current={this.state.pageCurrent}
                  total={this.state.pageTotal}
                  onChange={this.handlePageChange}
                  style={{ margin: '15px 0', textAlign: 'center'}}
                />

                {/* 添加文件夹管理员Modal */}
                <antd.Modal
                  title="添加文件夹管理员"
                  okText="确定"
                  cancelText="取消"
                  width="800px"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  className="setModal"
                  bodyStyle={{height:'500px'}}
                >
                  <antd.Input
                    prefix={<antd.Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入真实姓名/用户邮箱/手机/部门"
                    size="default"
                    style={{ marginBottom: '15px' }}
                    onChange={this.onSearchChange}
                  />
                  <antd.Table
                    columns={staffColumns}
                    dataSource={this.state.staffList}
                    bordered
                    pagination={false}
                    rowSelection={rowSelection}
                    scroll={{ y: 350}}
                    size="small"
                    onscroll={this.onscroll}
                  />
                </antd.Modal>


                {/* 移交文件：更改文件夹管理员 */}
                <antd.Modal
                  title="更改文件夹创建人"
                  okText="确定"
                  cancelText="取消"
                  width="800px"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  className="setModal"
                  bodyStyle={{height:'500px'}}
                >
                  <antd.Table
                    columns={staffColumns}
                    dataSource={this.state.staffList}
                    bordered
                    pagination={false}
                    rowSelection={rowSelection}
                    scroll={{ y: 350}}
                    size="small"
                    onscroll={this.onscroll}
                  />
                </antd.Modal>
              </div>
            </div>
          :
            <Doc goToHome={this.props.goToHome} goToSet={this.showSection.bind(this, 'staff')} />
        }
      </div>
    );
  }
}
