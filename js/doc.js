class Doc extends React.Component {
  state = {
    docType: ['全部','png', 'gif', 'doc'],
    docCreator: [
      {id: 'all', name: '全部'},
      {id: '1', name:'周晓明'},
      {id: '2', name: '王小明福克斯的理论思考了付款链接都是王小明福克斯的理论思考了付款链接都是'}
    ],
    doc: [{
      key: '1',
      name: '浏览器截图_2018',
      size: '23.8KB',
      type: 'png',
      creator: '周某',
      time: '2018-09-07 12:00',
      place: '销售部/学习资料/2018/讲座'
    },{
      key: '2',
      name: '浏览器截图_2018',
      size: '23.8KB',
      type: 'png',
      creator: '周某',
      time: '2018-09-07 12:00',
      place: '销售部/学习资料/2018/讲座'
    },{
      key: '3',
      name: '浏览器截图_2018',
      size: '23.8KB',
      type: 'png',
      creator: '周某',
      time: '2018-09-07 12:00',
      place: '销售部/学习资料/2018/讲座'
    }],
    chosenKey: 'type',
    chosenTypeIndex: 0,
    chosenCreatorIndex: 0,
    pageCurrent:1,
    pageTotal: 50,
    pageSize: 10,
    selectRows: null,
  }

  // 筛选选择类型
  handleKeyMenuClick = (e) => {
    this.setState({
      chosenKey: e.key,
      chosenTypeIndex: 0,
      chosenCreatorIndex: 0,
    })
  }

  // 筛选文件类型
  handleTypeMenuClick = (e) => {
    this.setState({
      chosenTypeIndex: e.key,
    })
  }

  // 筛选创建人
  handleCreatorMenuClick = (e) => {
    this.setState({
      chosenCreatorIndex: e.key,
    })
  }

  // 页数-变更
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

  // 排序-变更
  handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination)
    console.log(filters)
    console.log(sorter)
    const order = sorter.order === 'descend' ? '-' : '';
    const ordering = order + sorter.columnKey;
  }

  // 批量下载
  onDownloadSome = () => {
    console.log(this.state.selectRows)
  }

  // 批量删除
  onDeleteSome = () => {
    console.log(this.state.selectRows)
  }

  render() {
    const keyMenu = (
      <antd.Menu onClick={this.handleKeyMenuClick}>
        <antd.Menu.Item key="type">类型</antd.Menu.Item>
        <antd.Menu.Item key="creator">创建人</antd.Menu.Item>
      </antd.Menu>
    );

    const typeMenu = (
      <antd.Menu onClick={this.handleTypeMenuClick}>
        {
          this.state.docType.map((item, index) => {
            return (
              <antd.Menu.Item key={index}>{item}</antd.Menu.Item>
            )
          })
        }
      </antd.Menu>
    );

    const creatorMenu = (
      <antd.Menu onClick={this.handleCreatorMenuClick}>
        {
          this.state.docCreator.map((item, index) => {
            return(
              <antd.Menu.Item key={index}>{item.name}</antd.Menu.Item>
            )
          })
        }
      </antd.Menu>
    )

    const valMenu = this.state.chosenKey === 'type' ? typeMenu : creatorMenu;
    const valChosen = this.state.chosenKey === 'type' ? this.state.docType[this.state.chosenTypeIndex] : this.state.docCreator[this.state.chosenCreatorIndex].name;

    const columns = [{
      title: '文件名称',
      dataIndex: 'name',
    }, {
      title: '文件大小',
      dataIndex: 'size',
    }, {
      title: '类型',
      dataIndex: 'type',
    }, {
      title: '创建人',
      dataIndex: 'creator',
    }, {
      title: '上传时间',
      dataIndex: 'time',
    }, {
      title: '文件路径',
      dataIndex: 'place',
    }, {
      title: '操作',
      dataIndex: 'op',
      render: () => (
        <span>
          <antd.Icon type="download" style={{ fontSize: '18px', color: '#0692e1', marginRight: '10px' }} />
          <antd.Icon type="delete" style={{ fontSize: '18px', color: '#f74953' }} />
        </span>
      )
    }];

    // 选中某列数据
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectRows: selectedRowKeys,
        })
      },
    };

    return (
      <div>
        <antd.Breadcrumb>
          <antd.Breadcrumb.Item onClick={this.props.goToHome}>
            <antd.Icon type="home" />
            <span>首页</span>
          </antd.Breadcrumb.Item>
          <antd.Breadcrumb.Item onClick={this.props.goToSet}>
            <antd.Icon type="user" />
            <span>网盘设置</span>
          </antd.Breadcrumb.Item>
          <antd.Breadcrumb.Item>
            <antd.Icon type="file-text" />
            <span>文件明细</span>
          </antd.Breadcrumb.Item>
        </antd.Breadcrumb>
        <div className="set">
          <div className="setHeader">
            <h1 style={{ fontSize: '16px' }}>文件明细</h1>
            <div className="setHeaderBtn">
              <Capicity />
            </div>
          </div>
            <antd.Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={this.state.doc}
              bordered
              pagination={false}
              onChange={this.handleTableChange}
              size="small"
              title={() =>
                <div>
                  <antd.Dropdown overlay={keyMenu}>
                    <antd.Button style={{ marginLeft: 8 }}>
                      <span className="dropdown">{ this.state.chosenKey === 'type' ? '类型' : '创建人' }</span>
                      <antd.Icon type="down" />
                    </antd.Button>
                  </antd.Dropdown>
                  <antd.Dropdown overlay={valMenu} width="100px">
                    <antd.Button style={{ marginLeft: 8 }}>
                      <span className="dropdown">{ valChosen }</span>
                      <antd.Icon type="down" />
                    </antd.Button>
                  </antd.Dropdown>
                  <antd.Button.Group style={{ marginLeft: '30px', verticalAlign: 'middle', position: 'relative', top: '1px' }}>
                    <antd.Button onClick={this.onDownloadSome}>下载</antd.Button>
                    <antd.Button onClick={this.onDeleteSome}>删除</antd.Button>
                  </antd.Button.Group>
                </div>
              }
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
          </div>
      </div>
    );
  }
}
