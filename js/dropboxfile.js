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
   *  btndisplay 按钮显示个数
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
      btndisplay: [],
      breadcrumbs: [],
      breadcrumbsId: [],
      pageCurrent: 1,
      pageTotal: 20,
      pageSize: 10,
      shareFile: true,
      editFile: true,
      moveFile: true,
      deleteFile: true,
      allDeleteFileId:'',
      editNewFileId:''
    };
  }


  componentDidMount() {

    //根路径
    $.ajax({
      xhrFields: {withCredentials: true},
      type: "get",
      url: 'http://0.0.0.0:8000/api/netdisk/files/',
      success:(res)=>{
        this.setState({
          fileBox:res.results,
          rootDirectory:true,
          breadcrumbs:[],
          breadcrumbsId:[],
          newFile:true
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


      }

    })
  }


  onmouseenter = (keyId) => {
    this.setState({
      active: keyId
    })
  }


  //model框

  //删除当个文件开始
  showDeleteConfirm =(id)=> {
    confirm({
      title: '提示',
      content: '被删除的文件无法恢复，确定删除',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk:()=> {
        $.ajax({
          xhrFields: {withCredentials: true},
          type: "delete",
          url: 'http://0.0.0.0:8000/api/netdisk/files/'+id+'/',
          beforeSend: function(request) {
            request.setRequestHeader("X-CSRFToken", 'qOUymbjJNxi1zVI82ZsS60FVuShDFRxR');
          },
          success:(res)=>{
            const newFileBox = [...this.state.fileBox]
            //循环后splice对应的ID值
            for (var i = newFileBox.length-1; i>=0; i--){
              if (newFileBox[i].id==id)
              newFileBox.splice(i,1);
            }

            console.log(newFileBox);

            this.setState({
              fileBox:newFileBox
            })
          },
          error:()=>{
            console.log(id)
          }

        })
      },
      onCancel:()=>  {
        console.log('Cancel');
      },
    });
  }

  //批量操作
  allDeleteConfirm =(idArry)=>{
    confirm({
      title: '提示',
      content: '被删除的文件无法恢复，确定删除',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk:()=> {
        $.ajax({
          xhrFields: {withCredentials: true},
          type: "post",
          url: 'http://0.0.0.0:8000/api/netdisk/files/bulk/',
          action:'delete',
          data: {
            action:'delete',
            file_ids: JSON.stringify(idArry)
          },
          beforeSend: function(request) {
            request.setRequestHeader("X-CSRFToken", 'qOUymbjJNxi1zVI82ZsS60FVuShDFRxR');
          },
          success:(res)=>{

            const newFileBox = [...this.state.fileBox]

            for(var i=0;i<newFileBox.length;i++){
              for(var j=0;j<idArry.length;j++){
                if(newFileBox[i].id==idArry[j]){
                  newFileBox.splice(i,1);
                }
              }
            }
            alert(1)

            this.setState({
              fileBox:newFileBox
            })

            console.log(idArry);
          },
          error:()=>{
            console.log(22222222);
          }

        })
      },
      onCancel:()=>  {
        console.log('Cancel');
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
    var Btndisplay= null;

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
          filterIcon: <antd.Icon type="smile-o" style={{ color: this.state.filtered ? '#000' : '#000' }} />,
          title: '文件名',
          dataIndex: 'name',
          width: 600,
          render: (text, record) => {
            return (
              <div
                onMouseEnter={() => this.onmouseenter(record.id)}
                data-key={record.id}
              >
                <i className="iconfont" style={{color:'#40a9ff',marginRight:'18px'}}>&#xe60f;</i>
                <span className="filename-cp" onClick={this.fileNext.bind(this,record.id,record.name)}>{text}</span>
                <div className={`btnlist ${this.state.active == record.id ? "" : "active"}`}>
                  <antd.Icon type="edit" />
                  <antd.Icon type="link"
                     className={
                      record.type == 'doc' ? '' : 'displaynone'
                     }
                     />
                  <antd.Icon type="arrow-right" />
                  <antd.Icon type="delete" onClick={this.showDeleteConfirm.bind(this,record.id)}/>
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
        //const that =this
        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            // console.log(selectedRows.length);
            const fileListId = []
            selectedRows.map(selectedRow=>{
              return fileListId.push(selectedRow.id)
            })
            this.setState({
              allDeleteFileId:fileListId
            })


            if(selectedRows.length>0&&selectedRows.length<=1){
              this.setState({
                btnGround:true,
                shareFile: true,
                editFile: true,
                moveFile: true,
                deleteFile: true
              })
            }
            else if(selectedRows.length=0){
              this.setState({
                btnGround:false,
                shareFile: false,
                editFile: false,
                moveFile: false,
                deleteFile: false
              })
            }

            else if(selectedRows.length>1&&selectedRows.length<this.state.fileBox.length){
              this.setState({
                btnGround:true,
                shareFile: false,
                editFile: false,
                moveFile: false,
                deleteFile: true
              })
            }

            else{
              this.setState({
                btnGround:true,
                shareFile: false,
                editFile: false,
                moveFile: false,
                deleteFile: true
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
                  <antd.Button.Group>
                    <antd.Button className={this.state.editFile ? '' : 'displaynone'}>编辑</antd.Button>
                    <antd.Button className={this.state.shareFile ? '' : 'displaynone'}>分享</antd.Button>
                    <antd.Button className={this.state.moveFile ? '' : 'displaynone'}>移动到</antd.Button>
                    <antd.Button className={this.state.deleteFile ? '' : 'displaynone'} onClick={this.allDeleteConfirm.bind(this,this.state.allDeleteFileId)}>删除</antd.Button>
                  </antd.Button.Group>
                  :
                  null
                }


              </div>
              <antd.Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
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
                  <antd.Table rowSelection={this.rowSelection} columns={columns} dataSource={data} pagination={false} />
              }

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

              {
                this.state.admins ?
                <div className="dropboxfile-footer">

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
                :
                <div className="dropboxfile-footer">
                  <antd.Button type="primary" className="btn-left">下载</antd.Button>
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
              }


            </div>

            <button onClick={this.changeAdmins}>切换一下非管理员账户</button>

            <button onClick={this.nullState}>切换一下文件为空的情况</button>
            <button onClick={this.hasState}>切换一下文件不为空的情况</button>

          </div>
          :
          <Newfile id={this.state.editNewFileId} />

        }
      </div>
    )
  }
}

ReactDOM.render(
  <DropBoxFile />, document.getElementById('message1')
);
