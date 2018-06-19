const RadioGroup = antd.Radio.Group;
const ButtonGroup = antd.Button.Group;
const TreeNode = antd.Tree.TreeNode;

const treeData = [{
  title: '0-0',
  key: '0-0',
  children: [{
    title: '0-0-0',
    key: '0-0-0',
    children: [
      { title: '0-0-0-0', key: '0-0-0-0' },
      { title: '0-0-0-1', key: '0-0-0-1' },
      { title: '0-0-0-2', key: '0-0-0-2' },
    ],
  }, {
    title: '0-0-1',
    key: '0-0-1',
    children: [
      { title: '0-0-1-0', key: '0-0-1-0' },
      { title: '0-0-1-1', key: '0-0-1-1' },
      { title: '0-0-1-2', key: '0-0-1-2' },
    ],
  }, {
    title: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: '0-1',
  key: '0-1',
  children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' },
  ],
}, {
  title: '0-2',
  key: '0-2',
}];

class Newfile extends React.Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
    value: 0,
    model:{
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    }
  }

  //树形结构
  onExpand = (expandedKeys) => {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }


  onChange = (e) => {
    let btnlist = null;
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value
    });
  }

  //模态框
  showModal = () => {
    this.setState({
      model:{
        visible: true
      }
    });
  }
  handleOk = () => {
    this.setState({
      model:{
        ModalText: 'The modal will be closed after two seconds',
        confirmLoading: true
      }

    });
    setTimeout(() => {
      this.setState({
        model:{
          visible: false,
          confirmLoading: false
        }
      });
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      model:{
        visible: false
      }
    });
  }

  SelectOnChange=(checked)=> {
    console.log(`switch to ${checked}`);
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state.model;






    return (
      <div className="newfile">
        <antd.Breadcrumb>
          <antd.Breadcrumb.Item><a href="">首页</a></antd.Breadcrumb.Item>
          <antd.Breadcrumb.Item><a href="">新建文件夹</a></antd.Breadcrumb.Item>
        </antd.Breadcrumb>
        <h3>新建文件夹</h3>
        <div className="file-input-box">
          <antd.Row className="input-row">
            <antd.Col span={3}>文件夹名称*</antd.Col>
            <antd.Col span={6}><antd.Input placeholder="Basic usage" /></antd.Col>
          </antd.Row>
          <antd.Row className="input-row">
            <antd.Col span={3}>对谁可见*</antd.Col>
            <antd.Col span={21}>
              <RadioGroup onChange={this.onChange} value={this.state.value}>
                <antd.Radio value={1}>A<span>全员课可见</span><span></span></antd.Radio>
                <br/>
                <antd.Radio value={2}>B<span>指定范围可见</span></antd.Radio>
                <br/>
                <div className={`tab-btn ${this.state.value == 2 ? "cansee" : "nosee"}`}>
                  <antd.Button onClick={this.showModal}><antd.Icon type="plus" />部门</antd.Button>
                  <antd.Button onClick={this.showModal}><antd.Icon type="plus" />标签</antd.Button>
                  <antd.Button onClick={this.showModal}><antd.Icon type="plus" />成员</antd.Button>
                </div>
              </RadioGroup>
              <div className="tab-vaule"><span>{this.state.checkedKeys}</span></div>
            </antd.Col>
          </antd.Row>

          <antd.Row className="input-row">
            <antd.Col span={3}>分享文件链接</antd.Col>
            <antd.Col span={21}><antd.Switch defaultChecked onChange={this.SelectOnChange} checkedChildren="开" unCheckedChildren="关"/><span>打开后，知道链接的人可以直接下载或通过密码下载相应文件</span></antd.Col>
          </antd.Row>

          <antd.Row className="input-row">
            <antd.Col span={3}>添加文件夹管理员</antd.Col>
            <antd.Col span={21}>
              <antd.Button onClick={this.showModal}>
              <antd.Icon type="plus" />部门</antd.Button>
              <div className="tab-vaule"><span>{this.state.checkedKeys}</span></div>
            </antd.Col>
          </antd.Row>

          <antd.Row className="input-row">
            <antd.Col span={3}></antd.Col>
            <antd.Col span={21}>
              <antd.Button>取消</antd.Button>
              <antd.Button type="primary">保存</antd.Button>
            </antd.Col>
          </antd.Row>


        </div>


        <antd.Modal title="Title"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
          <antd.Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}>
            {this.renderTreeNodes(treeData)}
          </antd.Tree>
        </antd.Modal>

      </div>
    )
  }
}

