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
  /**
   * rootDirectory 是否为根目录的情况
   * fileBox  存储文件的数组
   * active 判断鼠标移入移除效果
   * visible model的显示隐藏
   * btnGround  按钮的显示隐藏，根据checkoutBox的点击
   *
   */

  constructor(props) {
    super(props);
    this.state = {
      admins: true,
      rootDirectory: true,
      fileBox: "",
      active: -1,
      visible: false,
      btnGround: false,
      newFile: true,
      breadcrumbs: [],
      breadcrumbsId: []
    };
  }


  componentDidMount() {

    //根路径
    const that = this;
    $.ajax({
      xhrFields: {withCredentials: true},
      type: "get",
      url: 'http://0.0.0.0:8000/api/netdisk/files/',
      success:(res)=>{
        console.log(this)
        this.setState({
          fileBox:res.results,
          rootDirectory:true,
          breadcrumbs:[],
          breadcrumbsId:[]
        })
      }
    })

  }
  //次级文件夹
  fileNext = (id,name)=>{
    $.ajax({
      xhrFields: {withCredentials: true},
      type: "get",
      url: 'http://0.0.0.0:8000/api/netdisk/files/?parent_id='+id+'',
      success:(res)=>{

        this.setState({
          fileBox:res.results,
          rootDirectory:false,
          breadcrumbs:[...this.state.breadcrumbs,name],
          breadcrumbsId:[...this.state.breadcrumbsId,id]
        })

      }

    })
  }
  //终极！！！面包屑！！！
  backFile=(id,name)=>{
    $.ajax({
      xhrFields: {withCredentials: true},
      type: "get",
      url: 'http://0.0.0.0:8000/api/netdisk/files/?parent_id='+id+'',
      success:(res)=>{

        var list=this.state.breadcrumbsId;
        var listName = this.state.breadcrumbs;

        for(var i= 0;i<list.length;i++){

          if(list[i]==id){
            list.splice(i+1,list.length-1)
            listName.splice(i+1,listName.length-1)
          }
        }
        this.setState({
          fileBox:res.results,
          rootDirectory:false,
          breadcrumbs:listName,
          breadcrumbsId:list
        })
        console.log(this.state.breadcrumbs)
        console.log(this.state.breadcrumbsId)

      }

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


  //新建文件夹
  newFileAble=()=>{
    this.setState({
      newFile:false
    })
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
      if (this.state.fileBox == "") {
        FileBoxNo = (
          <div className="isnofile">
            <img src="./images/none.png" />
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
          render: (text, record) => {
            return (
              <div
                onMouseEnter={() => this.onmouseenter(record.id)}
                data-key={record.id}
              >
                <span className="filename-cp" onClick={this.fileNext.bind(this,record.id,record.name)}>{text}</span>
                <div className={`btnlist ${this.state.active == record.id ? "" : "active"}`}>
                  <antd.Icon type="edit" />
                  <antd.Icon type="link"
                     className={
                      record.type == 'doc' ? '' : 'displaynone'
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
          dataIndex: 'file_size',
        }, {
          title: '创建人',
          dataIndex: 'creator_name',
        }, {
          title: '创建时间',
          dataIndex: 'created_at',
        }];
        const data = this.state.fileBox;
        // rowSelection object indicates the need for row selection
        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if(selectedRows.length>0){
              this.setState({
                btnGround:true
              })
            }
            else{
              this.setState({
                btnGround:false
              })
            }

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
                {
                  this.state.rootDirectory ?
                  null
                  :
                  <antd.Button type="primary" style={style}>上传</antd.Button>
                }


                <antd.Button type="primary" style={style} icon="download" onClick={this.newFileAble}>新建文件夹</antd.Button>

                {
                  this.state.btnGround ?
                  <ButtonGroup>
                    <antd.Button>编辑</antd.Button>
                    <antd.Button>移动到</antd.Button>
                    <antd.Button>删除</antd.Button>
                  </ButtonGroup>
                  :
                  null
                }

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
      if(this.state.fileBox == ""){
        FileBoxNo = (
          <div className="isnofile">
            <img src="./images/none.png" />
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
        const data = this.state.fileBox;
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
              {
                this.state.rootDirectory ?
                  <antd.Table columns={columns} dataSource={data} pagination={false} />
                :
                  <antd.Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
              }

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
        <Capicity />
        {
          this.state.fileBox=="null" ?
          null
          :
          <antd.Breadcrumb>
            <antd.Breadcrumb.Item onClick={this.componentDidMount.bind(this)}>
              <antd.Icon type="home" />
              <span>所有文件</span>
            </antd.Breadcrumb.Item>

            {
            this.state.breadcrumbs.map((breadcrumb,index)=>{
              return(
                  <antd.Breadcrumb.Item>
                    <antd.Icon type="user" />
                    <span data-key={this.state.breadcrumbsId[index]} onClick={this.backFile.bind(this,this.state.breadcrumbsId[index],breadcrumb)}>{breadcrumb}</span>
                  </antd.Breadcrumb.Item>
                )
              }
            )
          }
          </antd.Breadcrumb>

        }

        {
          this.state.newFile ?
          <div>
            <button onClick={this.props.goToSet}>设置</button>
            <div className="dropboxfile">
              {FileBoxNo}

              {FileBoxIs}

            </div>

            <button onClick={this.changeAdmins}>切换一下非管理员账户</button>

            <button onClick={this.nullState}>切换一下文件为空的情况</button>
            <button onClick={this.hasState}>切换一下文件不为空的情况</button>

          </div>
          :
          <Newfile />

        }
      </div>
    )
  }
}

ReactDOM.render(
  <DropBoxFile />, document.getElementById('message1')
);
