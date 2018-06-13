
(function(){
    // 监测浏览器
    const detectBrowser = () => {
        var bv = function() {
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
    const { Modal, Button, Radio } = antd;
    const RadioGroup = Radio.Group;
    class Share extends React.Component {
        state = {
            visible: true,
            type: 1,
            value: 1,
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
        }
        handleCancel = (e) => {
            console.log(e);
            this.setState({
            visible: false,
            });
        }
        render() {
            const radioStyle = {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            };
            return(
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
                            <RadioGroup onChange={this.onChange} value={this.state.type}>
                                <Radio style={radioStyle} value={1}>加密 <span style={{color: '#dedede'}}>需要密码才能下载</span></Radio>
                                <Radio style={radioStyle} value={2}>公开 <span style={{color: '#dedede'}}>任何人都可以下载</span></Radio>
                            </RadioGroup>
                        </div>
                        <div style={{marginTop: '10px'}}>
                            <span className="radio-item">有效期</span>
                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                                <Radio style={radioStyle} value={1}>永久有效</Radio>
                                <Radio style={radioStyle} value={2}>7天</Radio>
                                <Radio style={radioStyle} value={3}>1天</Radio>
                            </RadioGroup>
                        </div>
                    </Modal>
                </div>
            )
        }
    }
    // Pc页面
    class AppPc extends React.Component {
        state = {
            onerror:0,
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
            <div>
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
                                            <antd.Input className={`pwdinput ${this.state.onerror === -1  ? 'on-error' : ''}`} placeholder="请输入密码" />
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
                <Footer name="123" />
            </div>
            );
        }
    }
    // 移动端页面

    class AppMobile extends React.Component {
        render() {
            return (
              <div>移动端</div>
            );
        }
    }

    // 判断渲染
    if(detectBrowser()){
        ReactDOM.render(
            <AppPc />, document.getElementById('root')
        );
    } else {
        ReactDOM.render(
            <AppMobile />, document.getElementById('root')
        );
    }
})()
