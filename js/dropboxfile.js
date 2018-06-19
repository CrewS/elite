const confirm = antd.Modal.confirm;
const ButtonGroup = antd.Button.Group;

class DropBoxFile extends React.Component {
  /**
   *{ key: 1, name: "文件1.doc", size: "5M", user: "Setcina", date: "2018-05-06 9:00",type:"doc"},
        { key: 2, name: "文件2", size: "5M", user: "Mobee", date: "2018-05-06 9:00" },
        { key: 3, name: "文件3", size: "5M", user: "Nane", date: "2018-05-06 9:00" },
        { key: 4, name: "文件4", size: "5M", user: "Exiaer", date: "2018-05-06 9:00" },
        { key: 5, name: "文件5", size: "5M", user: "X-avir", date: "2018-05-06 9:00" }
   */

  constructor(props) {
    super(props);
    this.state = {
      admins:true,
      filebox: [
        { key: 1, name: "文件1.doc", size: "5M", user: "Setcina", date: "2018-05-06 9:00",type:"doc"},
        { key: 2, name: "文件2", size: "5M", user: "Mobee", date: "2018-05-06 9:00" },
        { key: 3, name: "文件3", size: "5M", user: "Nane", date: "2018-05-06 9:00" },
        { key: 4, name: "文件4", size: "5M", user: "Exiaer", date: "2018-05-06 9:00" },
        { key: 5, name: "文件5", size: "5M", user: "X-avir", date: "2018-05-06 9:00" }
      ],
      nofile:false,
      active: -1,
      visible: false
    };
  }

  changeAdmins=()=>{
    this.setState({
      admins:!this.state.admins
    })

  }

  onmouseenter = (keyId) => {
    this.setState({
      active: keyId
    })
  }


  //model框
  showConfirm = () => {
    confirm({
      title: '提示',
      content: '被删除的文件将无法恢复，确定删除？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        console.log(2);
      },
      onCancel() {
        console.log(1);
      },
    });
  }





  render() {

    /*判断文件是否存在开始*/

    //文件存在
    let FileBoxIs = null;
    //文件不存在
    let FileBoxNo = null;

    //判断是管理员以及非管理员
    if(this.state.admins){
      //文件不存在的情况
      if (this.state.filebox == "") {
        FileBoxNo = (
          <div className="isnofile">
            <img src="" />
            <p>暂无文件</p>
            <antd.Button type="primary">新建文件夹</antd.Button>
          </div>
        )
        FileBoxIs = null;
      }
      //文件存在的情况
      else {

        const style = {
          marginRight: '10px'
        }
        FileBoxNo = null;


        const columns = [{
          title: '文件名',
          dataIndex: 'name',
          width: 600,
          render: (text, id) => {
            return (
              <div
                onMouseEnter={() => this.onmouseenter(id.key)}
                data-key={id.key}
              >
                <span>{text}</span>
                <div className={`btnlist ${this.state.active == id.key ? "" : "active"}`}>
                  <antd.Icon type="edit" />
                  <antd.Icon type="link"
                    className={
                      this.state.filebox[id.key-1].key==id.key&&this.state.filebox[id.key-1].type == 'doc' ? '' : 'displaynone'
                    }
                    />
                  <antd.Icon type="arrow-right" />
                  <antd.Icon type="delete" />
                </div>
              </div>

            )
          },
        }, {
          title: '大小',
          dataIndex: 'size',
        }, {
          title: '创建人',
          dataIndex: 'user',
        }, {
          title: '创建时间',
          dataIndex: 'date',
        }];
        const data = this.state.filebox;
        // rowSelection object indicates the need for row selection
        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          }),
        };
        FileBoxIs = (
          <div>
            <div className="table-box">

              <div className="btn-ground">
                <antd.Button type="primary" style={style}>上传</antd.Button>
                <antd.Button type="primary" style={style} icon="download">新建文件夹</antd.Button>
                <ButtonGroup>
                  <antd.Button>编辑</antd.Button>
                  <antd.Button>移动到</antd.Button>
                  <antd.Button>删除</antd.Button>
                </ButtonGroup>
              </div>

              <antd.Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
            </div>
            <div className="dropboxfile-footer">
              <antd.Pagination className="Pagination-right" size="small" total={50} showSizeChanger showQuickJumper />
            </div>
          </div>

        )
      }
    }

    //非管理员账户
    else{
      if(this.state.filebox == ""){
        FileBoxNo = (
          <div className="isnofile">
            <img src="" />
            <p>暂无文件</p>
          </div>
        )
        FileBoxIs = null;
      }
      //文件存在的情况
      else{
        const style = {
          marginRight: '10px'
        }
        FileBoxNo = null;


        const columns = [{
          title: '文件名',
          dataIndex: 'name',
          width: 600,
          render: (text, id) => {
            return (
              <div data-key={id.key}>
                <span>{text}</span>
              </div>
            )
          },
        }, {
          title: '大小',
          dataIndex: 'size',
        }, {
          title: '创建人',
          dataIndex: 'user',
        }, {
          title: '创建时间',
          dataIndex: 'date',
        }];
        const data = this.state.filebox;
        // rowSelection object indicates the need for row selection
        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          }),
        };
        FileBoxIs = (
          <div>
            <div className="table-box">

              <antd.Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
            </div>
            <div className="dropboxfile-footer">
              <antd.Button type="primary" className="btn-left">下载</antd.Button>
              <antd.Pagination className="Pagination-right" size="small" total={50} showSizeChanger/>
            </div>
          </div>

        )






      }
    }



    //return的jsx
    return (
      <div>

        {
          this.state.nofile&&this.state.filebox=="null" ?

            null
            :
            <antd.Breadcrumb className="file-breadcrumb">
              <antd.Breadcrumb.Item><antd.Icon type="home" />首页</antd.Breadcrumb.Item>
              <antd.Breadcrumb.Item><antd.Icon type="folder" /><a href="">文件夹</a></antd.Breadcrumb.Item>
            </antd.Breadcrumb>

        }

        <div className="dropboxfile">
          {FileBoxNo}

          {FileBoxIs}

        </div>





        <button onClick={this.changeAdmins}>切换一下非管理员账户</button>


      </div>
    )
  }
}

ReactDOM.render(
  <DropBoxFile />, document.getElementById('message1')
);
