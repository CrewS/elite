class Setting extends React.Component {
  constructor(props){
    super(props);
    this.timer = null;
  }

  state = {
    loading: true,
    section: 'staff',
    managerList: [],
    staffList: [],
    pageCurrent: 1,
    pageTotal: null,
    pageSize: 10,
    staff: {
      nomore: false,
      page: 0,
      text: '',
      chosen: [],
      visible: false,
    },
    trans: {
      id:'',
      toId: '',
      visible: false,
    },
  }

  componentDidMount() {
    this.getAdminsList()
  }

  // 1. 文件夹管理员
  // 1.1 文件夹管理员 - 获取列表
  getAdminsList = () => {
    ajax({
      type: "get",
      data: {
        page: this.state.pageCurrent,
        page_size: this.state.pageSize,
      },
      url: '/api/netdisk/admins/',
      success: (res) => {
        if (res.code === 20000){
          this.setState({
            managerList: res.data.results,
            pageTotal: res.data.count,
          })
        }
      },
    })
  }

  // 1.2 文件夹管理员 - 页码变更
  handlePageChange = (page) => {
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
      staff: {
        nomore: false,
        page: 0,
        text: '',
        chosen: [],
        visible: true,
      }
    })

    // 请求第一页数据
    this.getStaffList();
  }

  // 2.2 获取公司成员列表
  getStaffList = () => {
    ajax({
      url: '/api/netdisk/company/employee/',
      type: "get",
      data: {
        page: this.state.staff.page + 1,
        page_size: 20,
        text: this.state.staff.text,
      },
      success: (res) => {
        if (res.code === 20000){
          this.setState({
            staffList: this.state.staffList.concat(res.data.results)
          });


          if (this.state.staff.page === 0){
            this.timer = setInterval(() => {
              const parentElemBottom = $('.ant-table-body')[1].getBoundingClientRect().bottom;
              const elems = $('.ant-table-row');
              const elemBottom = elems[elems.length - 1].getBoundingClientRect().bottom;

              if (elemBottom - parentElemBottom < 50) {
                // 请求下一页数据
                console.log('请求下一页数据')

              }

              if (this.state.staff.nomore) {
                // 没有更多数据
                clearInterval(this.timer);
              }

            }, 2000)
          }
        }
      },
    })
  }

  // 2.3 搜索人员
  onSearchChange = (e) => {
    console.log(e.target.value)
  }

  // 2.4 添加人员
  handleOk = () => {
    // 批量添加文件夹管理员
    // user: JSON.stringify(this.state.trans.chosen)
    clearInterval(this.timer);
    ajax({
      xhrFields: {withCredentials: true},
      url: '/api/netdisk/admins/range/',
      type: "post",
      data: JSON.stringify({
        method: 'CREATE',
        user_ids:this.state.trans.chosen,
      }),
      success: (res) => {
        if (res.code === 20000){
          this.getAdminsList();
          this.handleCancel();
          antd.message.success('添加成功');
        }
      },
    })
  }

  // 2.5 取消弹框
  handleCancel = () => {
    this.setState({
      staff: {
        nomore: false,
        page: 0,
        text: '',
        chosen: [],
        visible: false,
      }
    });
    clearInterval(this.timer);
  }



  // 3. 移交文件
  // 3.1 弹出弹框
  showTransferModal = (text) => {
    console.log(text)
    this.setState({
      trans: {
        visible: true,
        id: text,
        toId: '',
      }
    })
  }

  // 3.2 确定移交
  handleTransferOk = () => {
    console.log(this.state.trans)
    ajax({
      url: '/api/netdisk/admins/transfer/',
      type: 'post',
      data: {
        "action": 'move',
        "old_fileadmin_id": this.state.trans.id,
        "new_fileadmin_id": this.state.trans.toId
      }
    })
  }

  // 3.3 取消弹框
  handleTransferCancel = () => {
    this.setState({
      trans: {
        visible: false,
        id: '',
        toId: '',
      }
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
        ajax({
          url: '/api/netdisk/admins/range/',
          type: 'post',
          data: JSON.stringify({
            method: "DELETE",
            admin_ids: [id]
          }),
          success: (res) => {
            if (res.code === 20000) {
              this.getAdminsList();
              antd.message.success('删除成功');
            } else {
              antd.Modal.warning({
                title: '提示',
                content: '删除失败！请先把文件夹管理员的文件移交给其他人',
                okText: '确定',
              })
            }
          }
        })

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
      render: (text) => {
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
      render: (text, record, index) => (
        <span>
          <antd.Icon type="swap" style={{ fontSize: '18px', margin: '0 15px 0 5px' }} className="icon-blue" onClick={this.showTransferModal.bind(this, text)} />
          {
            record.is_xdmin ?
              null
            :
              <antd.Icon type="delete" style={{ fontSize: '18px' }} className="icon-red" onClick={this.deleteAdmins.bind(this, text)} />
          }

        </span>
      )
    }];

    // 所有员工 - 列表头
    const staffColumns = [{
      title: '真实姓名',
      dataIndex: 'username',
      width: '115px',
      render: (text) => {
        return text || '--';
      },
    }, {
      title: '用户邮箱',
      dataIndex: 'email',
      width: '180px',
      render: (text) => {
        return text || '--';
      },
    }, {
      title: '手机',
      dataIndex: 'phone',
      width: '145px',
      render: (text) => {
        return text || '--';
      },
    }, {
      title: '部门',
      dataIndex: 'department',
      width: '260px',
      render: (text) => {
        return text || '--';
      },
    }];

    // 更改文件夹管理员 - 列表头
    const transferColumns = [{
      title: '真实姓名',
      dataIndex: 'username',
      width: '115px',
      render: (text) => {
        return text || '--';
      },
    }, {
      title: '用户邮箱',
      dataIndex: 'email',
      width: '175px',
      render: (text) => {
        return text || '--';
      },
    }, {
      title: '手机',
      dataIndex: 'phone',
      width: '145px',
      render: (text) => {
        return text || '--';
      },
    }, {
      title: '部门',
      dataIndex: 'department',
      width: '260px',
      render: (text) => {
        return text || '--';
      },
    }];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        const arr = [];
        for( let i = 0; i < selectedRows.length; i++){
          arr.push(selectedRows[i].user)
        }
        const { trans } = this.state;
        trans.chosen = arr;
        this.setState({
          trans
        });
      },
      getCheckboxProps: record => ({
        disabled: record.is_file_admin,
      }),
    };

    const transferRowSelection = {
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        const { trans } = this.state;
        trans.toId = selectedRows[0].id;
        this.setState({
          trans,
        })
      },
      getCheckboxProps: record => ({
        disabled: record.id === this.state.trans.id, // Column configuration not to be checked
      }),
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
                  visible={this.state.staff.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  className="setModal"
                  destroyOnClose={true}
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
                  />
                </antd.Modal>


                {/* 移交文件：更改文件夹管理员 */}
                <antd.Modal
                  title="转移文件夹给其他文件夹管理员"
                  okText="确定"
                  cancelText="取消"
                  width="800px"
                  visible={this.state.trans.visible}
                  onOk={this.handleTransferOk}
                  onCancel={this.handleTransferCancel}
                  className="setModal"
                  bodyStyle={{height:'500px'}}
                  destroyOnClose={true}
                >
                  <antd.Table
                    columns={transferColumns}
                    rowSelection={transferRowSelection}
                    dataSource={this.state.managerList}
                    bordered
                    pagination={false}
                    scroll={{ y: 350}}
                    size="small"
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
