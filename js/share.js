
(function () {
  // 监测浏览器
  const detectBrowser = () => {
    var bv = function () {
      var UA = navigator.userAgent;
      return {
        ios: !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: UA.indexOf('Android') > -1 || UA.indexOf('Linux') > -1,
        wm: !!UA.match(/windows ce/i) || !!UA.match(/windows mobile/i),
        mbOther: UA.match(/Mobile|MicroMessenger/i)
      };
    }();

    if (bv.ios || bv.android || bv.wm || bv.mbOther) {
      return false;
    } else {
      return true;
    }
  }
  const { Modal, Button, Radio, Icon } = antd;
  const { LocaleProvider, locales } = window.antd;
  const RadioGroup = Radio.Group;

  // const mockData = [];
  // for (let i = 0; i < 20; i++) {
  //   mockData.push({
  //     key: i.toString(),
  //     title: `content${i + 1}`,
  //     // description: `description of content${i + 1}`,
  //     disabled: i % 3 < 1,
  //   });
  // }

  // const targetKeys = mockData
  //         .filter(item => +item.key % 3 > 1)
  //         .map(item => item.key);
  const mockData = [
    {
      key: 1,
      title: '张三',
    },
    {
      key: 2,
      title: '李四',
    },
    {
      key: 3,
      title: '王五',
    },
    {
      key: 4,
      title: '马六',
    },
    {
      key: 5,
      title: '赵云',
      disabled: true,
    },
  ]
  const targetKeys = [
    5
  ]

  class App extends React.Component {
    state = {
      targetKeys,
      selectedKeys: [],
    }

    handleChange = (nextTargetKeys, direction, moveKeys) => {
      this.setState({ targetKeys: nextTargetKeys });

      console.log('targetKeys: ', targetKeys);
      console.log('direction: ', direction);
      console.log('moveKeys: ', moveKeys);
    }

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
      this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

      console.log('sourceSelectedKeys: ', sourceSelectedKeys);
      console.log('targetSelectedKeys: ', targetSelectedKeys);
    }

    handleScroll = (direction, e) => {
      console.log('direction:', direction);
      console.log('target:', e.target);
    }

    render() {
      const state = this.state;
      return (
        <div>
          <antd.Transfer
            dataSource={mockData}
            titles={['所有文件夹管理员', '已添加']}
            targetKeys={state.targetKeys}
            selectedKeys={state.selectedKeys}
            onChange={this.handleChange}
            onSelectChange={this.handleSelectChange}
            onScroll={this.handleScroll}
            render={item => item.title}
            listStyle={{width: '240px'}}
          />
        </div>
      );
    }
  }

  // ReactDOM.render(
  //     <App />, document.getElementById('message1')
  // );

  class Share extends React.Component {
    state = {
      visible: false,
      resultVisible: false,
      type: 1,
      value: 1,
      shareInfo: {
        id: '123',
        share_url: 'shareurl',
        file_name: 'filename',
      }
    }
    showModal = () => {
      this.setState({
        visible: true,
      });
    }
    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
      const { message } = antd;
      message.config({top: 250})
      const hide = message.loading('Action in progress..', 0);
      // Dismiss manually and asynchronously
      setTimeout(hide, 2500);
      $.ajax({
        xhrFields: {withCredentials: true},
        type: "get",
        url: 'http://eliteu.ngrok.elitemc.cn/api/netdisk/groups',
        success: function() {
          console.log(123)
          this.setState({
            resultVisible: true,
          })
        },
      })
      this.setState({
        resultVisible: true,
      })
    }
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
    handleResultOk = (e) => {
      console.log(e);
      this.setState({
        resultVisible: false,
      });
      $.ajax({
        url: '/',
        success: function() {
          console.log(123)
        },
      })
    }
    handleResultCancel = (e) => {
      console.log(e);
      this.setState({
        resultVisible: false,
      });
    }
    onChangeType = (e) => {
      this.setState({
        type: e.target.value,
      })
    }
    onChangeValue = (e) => {
      this.setState({
        value: e.target.value,
      })
    }
    render() {
      const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>Open</Button>
          <Modal
            title="获取分享链接"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="创建"
            cancelText="取消"
          >
            <div>
              <span className="radio-item">分享形式</span>
              <RadioGroup onChange={this.onChangeType} value={this.state.type}>
                <Radio style={radioStyle} value={1}>加密 <span style={{ color: '#dedede' }}>需要密码才能下载</span></Radio>
                <Radio style={radioStyle} value={2}>公开 <span style={{ color: '#dedede' }}>任何人都可以下载</span></Radio>
              </RadioGroup>
            </div>
            <div style={{ marginTop: '10px' }}>
              <span className="radio-item">有效期</span>
              <RadioGroup onChange={this.onChangeValue} value={this.state.value}>
                <Radio style={radioStyle} value={1}>永久有效</Radio>
                <Radio style={radioStyle} value={2}>7天</Radio>
                <Radio style={radioStyle} value={3}>1天</Radio>
              </RadioGroup>
            </div>
          </Modal>
          <Modal
            title="获取分享链接"
            visible={this.state.resultVisible}
            onOk={this.handleResultOk}
            onCancel={this.handleResultCancel}
            footer={null}
          >
            <div className="center">
             <Icon style={{marginRight: '8px', color: '#87d068'}} type="check-circle" />
              {
                (() => {
                  switch(this.state.value) {
                    case 1:
                    return '成功创建永久有效地址';
                    case 2:
                    return '成功创建7天有效地址';
                    case 3:
                    return '成功创建1天有效地址';
                  }
                })()
              }
            </div>
            <div className="share-content-block">
              <div>{this.state.shareInfo.share_url}</div>
              <div>密码: jpoih</div>
            </div>
            <div className="center">
              <Button type="primary" style={{marginTop: '20px',cursor: 'pointer'}}>
                复制链接及密码
              </Button>
            </div>
          </Modal>
        </div>
      )
    }
  }
  // Pc页面
  class AppPc extends React.Component {
    state = {
      onerror: 0,
    }
    checkpassword = () => {
      console.log(123)
      this.setState({
        onerror: -1,
      })
    }
    render() {
      // console.log(moment())
      return (
        <div  className="share-container">
          <Header name="123" />
          <div className="share-content">
            <div className="doc-title">
              大数据分析.doc
                    </div>
            <div className="info-block">
              <span>{moment().format("YYYY-MM-DD hh:mm")}</span>
              <span className="limitTime">失效时间: 永久有效</span>
            </div>
            <div className="content">
              <div className="download-wrap">
                {
                  false ?
                    <antd.Button type="primary">
                      下载
                    </antd.Button>
                    :
                    <div>
                      <div>
                        <span>密码</span>
                        <antd.Input className={`pwdinput ${this.state.onerror === -1 ? 'on-error' : ''}`} placeholder="请输入密码" />
                        <antd.Button onClick={this.checkpassword} type="primary">
                          下载
                        </antd.Button>
                      </div>
                      {
                        this.state.onerror === -1 &&
                        <span className="error-tips">
                          密码错误
                        </span>
                      }
                    </div>
                }
              </div>
            </div>
          </div>
          <Share />
          <Uploaderbox />
          <Footer/>
        </div>
      );
    }
  }
  // 移动端页面

  class AppMobile extends React.Component {
    render() {
      const { Button, Input } = antd;
      return (
        <div>
          <div className="mobile-header">
            <img src="../images/logo.png" className="header-logo" />
            <span>企业网盘</span>
          </div>
          {
            false ?
              <div className="mobile-wrap">
                <div className="m-doc-title">
                  大数据.doc
                </div>
                <div className="m-doc-date">
                  <span>2018-09-30 19:00</span>
                  <span style={{marginLeft:'12px'}}>实效时间：永久有效</span>
                </div>
                <div className="op-container">
                  {
                    false ?
                    <div className="">
                      <span style={{color:"#2e313c"}}>密码</span> <Input style={{width: '126px',marginLeft:'8px',marginRight:'12px'}} placeholder="请输入密码" type="text" /> <Button type="primary">下载</Button>
                      <div className="m-error-tips">
                        密码错误
                      </div>
                    </div>
                    :
                    <div style={{textAlign:'center'}}>
                      <Button type="primary">下载</Button>
                    </div>
                  }
                </div>
              </div>
            :
              <div>
                empty
              </div>

          }
        </div>
      );
    }
  }

  // 判断渲染
  if (detectBrowser()) {
    ReactDOM.render(
      <LocaleProvider locale={locales.zh_CN}><AppPc /></LocaleProvider>, document.getElementById('root')
    );
  } else {
    // $('html').css({width:'100%'})
    $('body,html').css({width:'100%','min-width': '320px'})
    ReactDOM.render(
      <AppMobile />, document.getElementById('root')
    );
  }
})()
