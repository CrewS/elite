class DropBoxFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filebox:[
                {key:1,name:"文件1",size:"5M",user:"Setcina",date:"2018-05-06 9:00"},
                {key:2,name:"文件2",size:"5M",user:"Mobee",date:"2018-05-06 9:00"},
                {key:3,name:"文件3",size:"5M",user:"Nane",date:"2018-05-06 9:00"},
                {key:4,name:"文件4",size:"5M",user:"Exiaer",date:"2018-05-06 9:00"},
                {key:5,name:"文件5",size:"5M",user:"X-avir",date:"2018-05-06 9:00"} 
            ],
            active:-1
        };
        console.log(this.state.filebox);
    }   


    onmouseenter=(keyId)=>{  
        //console.log(keyId);
        this.setState({    
            active:keyId
        })
    }

    render() {
        var action="btn-none";
        //判断文件是否存在
        let FileBoxIs = null;
        let FileBoxNo = null;

        console.log(this.state.active);

        if(this.state.filebox==""){
            FileBoxNo=(
                <div className="isnofile">
                    <img src="" />
                    <p>文件夹为空</p>
                    <antd.Button type="primary">新建文件夹</antd.Button>
                </div>
            )
            FileBoxIs = null;
        }
        else{   
            const ButtonGroup = antd.Button.Group;
            const style={   
                marginRight:'10px'
            }
            FileBoxNo = null;
            console.log(this.state.filebox.length)
            const columns = [{
                title: '文件名',
                dataIndex: 'name',
                width:600,
                render: (text,id) =>{
                    console.log(this.state.active)
                    return ( 
                        <div 
                        onMouseEnter={()=>this.onmouseenter(id.key)}
                        data-key={id.key}
                        >   
                            <span>{ text }</span>
                            <div className={`btnlist ${this.state.active == id.key ? "" : "active"}`}>
                                <antd.Button>编辑</antd.Button>
                                <antd.Button>移动到</antd.Button>
                                <antd.Button>删除</antd.Button>
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
            },{ 
                title: '创建时间',
                dataIndex: 'date',
            }];
            const data = this.state.filebox;
            this.state.filebox.map(file=>{  
                return console.log(file.name);
    
            })
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
            FileBoxIs=(
                <div className="table-box"> 
                    <div className="list-box">
                        <div className="btn-ground">
                            <antd.Button type="primary" style={ style }>上传</antd.Button>
                            <antd.Button type="primary" style={ style } icon="download">新建文件夹</antd.Button>
                            <ButtonGroup>
                                <antd.Button>编辑</antd.Button>
                                <antd.Button>移动到</antd.Button>
                                <antd.Button>删除</antd.Button>
                            </ButtonGroup>
                        </div>

                        <antd.Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />

                    </div> 
                       
                    
                    <antd.Pagination size="small" total={50} />  
               </div>
            )
        }

        return (    
            <div className="dropboxfile">

                {FileBoxNo}
            
                { FileBoxIs }
                
            </div>
        )
    }
}