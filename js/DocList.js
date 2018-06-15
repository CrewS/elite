class DocList extends React.Component {
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
      sorter: true,
    }, {
      title: '文件大小',
      dataIndex: 'size',
      sorter: true,
    }, {
      title: '类型',
      dataIndex: 'type',
    }, {
      title: '创建人',
      dataIndex: 'creator',
    }, {
      title: '上传时间',
      dataIndex: 'time',
      sorter: true,
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
      <div className="set">
        <div style={{ marginBottom: '20px'}}>
          <antd.Icon type="folder-open" style={{ marginRight: '10px' }}/>管理文件
        </div>
        <div style={{ border: '1px solid #eaeaea', borderRadius: '5px' }}>
          <div style={{ margin: '10px'}}>
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
            <antd.Button icon="download" type="primary" style={{ marginLeft:'30px' }} onClick={this.onDownloadSome}>下载</antd.Button>
            <antd.Button icon="delete" type="primary" style={{ marginLeft:'10px'}} onClick={this.onDeleteSome}>删除</antd.Button>
          </div>
          <antd.Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.doc}
            bordered
            pagination={false}
            onChange={this.handleTableChange}
          />
          <antd.Pagination
            size="small"
            current={this.state.pageCurrent}
            total={this.state.pageTotal}
            onChange={this.handlePageChange}
            style={{ margin: '15px 0', textAlign: 'center'}}
          />
        </div>
      </div>
    );
  }
}
