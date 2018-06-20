class Setting extends React.Component {
  constructor(props){
    super(props);
    this.timer = null;
  }

  state = {
    managerList: [],
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
    pageTotal: 20,
    pageSize: 10,
    visible: false,
    visibleTransfer: false,
    nomoreStaff: false,
    section: 'staff'
  }

  componentDidMount() {
    this.getAdminsList(1, 10)
  }

  // 1. 文件夹管理员
  // 1.1 文件夹管理员 - 获取列表
  getAdminsList = (page, page_size) => {
    $.ajax({
      xhrFields: {withCredentials: true},
      type: "get",
      data: {
        page: page,
        page_size: page_size,
      },
      url: 'http://weijie.ngrok.elitemc.cn:8000/api/netdisk/admins/',
      success: (res) => {
        if (res.code === 20000){
          this.setState({
            managerList: res.data.results,
          })
        }
      },
    })
  }

  // 1.2 文件夹管理员 - 页码变更
  handlePageChange = (page, pageSize) => {
    this.setState({
      pageCurrent: page,
    })
  }

  handlePageSizeChange = (e) => {
    this.setState({
      pageSize: e,
    })
  }



  // 2. 添加文件夹管理员
  // 2.1 弹出弹框
  showModal = () => {
    this.setState({
      visible: true,
    })

    // 请求第一页数据
    $.ajax({
      xhrFields: {withCredentials: true},
      url: 'http://weijie.ngrok.elitemc.cn:8000/api/netdisk/admins/',
      type: "post",
      data: {
        user: 1,
        company: 'weijie'
      },
      beforeSend: function(request) {
        request.setRequestHeader("X-CSRFToken", "OhDPt9uQldp5xJVBX8j6eTCHSPZeRE8Q");
      },
      success: (res) => {
        console.log(res)
      },
    })

    this.timer = setInterval(() => {
      const parentElemBottom = $('.ant-table-body')[1].getBoundingClientRect().bottom;
      const elems = $('.ant-table-row');
      const elemBottom = elems[elems.length - 1].getBoundingClientRect().bottom;

      if (elemBottom - parentElemBottom < 50) {
        // 请求下一页数据
        console.log('请求下一页数据')
        const arr = [
          {
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
          }
        ];
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

  // 2.2 搜索人员
  onSearchChange = (e) => {
    console.log(e.target.value)
  }

  // 2.3 添加人员
  handleOk = () => {
    clearInterval(this.timer);
    $.ajax({
      xhrFields: {withCredentials: true},
      url: 'http://weijie.ngrok.elitemc.cn:8000/api/netdisk/admins/',
      type: "post",
      data: {
        user: 1,
        company: 'weijie'
      },
      beforeSend: function(request) {
        request.setRequestHeader("X-CSRFToken", "OhDPt9uQldp5xJVBX8j6eTCHSPZeRE8Q");
      },
      success: (res) => {
        console.log(res)
      },
    })
  }

  // 2.4 取消弹框
  handleCancel = () => {
    this.setState({
      visible: false,
    });
    clearInterval(this.timer);

  }



  // 3. 移交文件
  // 3.1 弹出弹框
  showTransferModal = () => {
    this.setState({
      visibleTransfer: true,
    })
  }

  // 3.2 确定移交
  handleTransferOk = () => {

  }

  // 3.3 取消弹框
  handleTransferCancel = () => {
    this.setState({
      visibleTransfer: false,
    })
  }



  // 4. 删除管理员 - 二次确认
  deleteAdmins = (id) => {
    antd.Modal.confirm({
      title: '提示',
      content: '是否确认删除此文件管理员？',
      iconType: 'exclamation-circle',
      className: 'confirm-red',
      onOk: () => {
        // 删除管理员
        if (false) {
          antd.message.success('删除成功');
        } else {
          antd.Modal.warning({
            title: '提示',
            content: '删除失败！请先把文件夹管理员的文件移交给其他人',
            okText: '确定',
          })
        }
      }
    });

  }

  // 5. 页面跳转 - 文件明细
  showSection = (section) => {
    this.setState({
      section: section
    })
  }

  render() {
    // 文件夹管理员 - 列表头
    const columns = [{
      title: '真实姓名',
      dataIndex: 'username',
      render: (text, record, index) => {
        return text || '--';
      },
    }, {
      title: '用户邮箱',
      dataIndex: 'email',
      render: (text) => {
        return text || '--';
      },
    }, {
      title: '手机',
      dataIndex: 'phone',
      render: (text) => {
        return text || '--';
      },
    }, {
      title: '部门',
      dataIndex: 'department',
      render: (text) => {
        return text || '--';
      },
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text) => (
        <span>
          <antd.Icon type="swap" style={{ fontSize: '18px', color: '#0692e1', marginRight: '10px' }} onClick={this.showTransferModal} />
          <antd.Icon type="delete" style={{ fontSize: '18px', color: '#f74953' }} onClick={this.deleteAdmins.bind(this, text)} />
        </span>
      )
    }];

    // 所有员工 - 列表头
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

    // 更改文件夹管理员 - 列表头
    const transferColumns = [{
      title: '',
      dataIndex: 'id',
      width: '60px',
      render: (text) => (
        <span style={{ textAlign: 'center' }}><antd.Radio></antd.Radio></span>
      )
    }, {
      title: '真实姓名',
      dataIndex: 'username',
      width: '115px',
    }, {
      title: '用户邮箱',
      dataIndex: 'email',
      width: '175px',
    }, {
      title: '手机',
      dataIndex: 'phone',
      width: '145px',
    }, {
      title: '部门',
      dataIndex: 'department',
      width: '260px'
    }];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };


    return (
      <div>
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
              <div>
                <antd.Table
                  columns={columns}
                  dataSource={this.state.managerList}
                  bordered
                  pagination={false}
                  size="small"
                  title={() => <antd.Button icon="plus-square" type="primary" onClick={this.showModal}>添加文件夹管理员</antd.Button>}
                />
                <div className="page">
                  <antd.Pagination
                    size="small"
                    current={this.state.pageCurrent}
                    total={this.state.pageTotal}
                    onChange={this.handlePageChange}
                    pageSize={this.state.pageSize}
                    className="page-num"
                  />
                  <span className="page-size">
                    每页显示
                    <antd.Select defaultValue="10" size="small" onChange={this.handlePageSizeChange} style={{ margin: '0 5px'}}>
                      <antd.Select.Option value="10">10</antd.Select.Option>
                      <antd.Select.Option value="20">20</antd.Select.Option>
                      <antd.Select.Option value="30">30</antd.Select.Option>
                      <antd.Select.Option value="50">50</antd.Select.Option>
                    </antd.Select>
                    条
                  </span>
                </div>


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
                    style={{ marginBottom: '15px', height: '30px' }}
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
                  title="转移文件夹给其他文件夹管理员"
                  okText="确定"
                  cancelText="取消"
                  width="800px"
                  visible={this.state.visibleTransfer}
                  onOk={this.handleTransferOk}
                  onCancel={this.handleTransferCancel}
                  className="setModal"
                  bodyStyle={{height:'500px'}}
                >
                  <antd.Table
                    columns={transferColumns}
                    dataSource={this.state.managerList}
                    bordered
                    pagination={false}
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
