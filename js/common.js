class Header extends React.Component {
  render() {
    const { Icon } = antd;
    return (
      <div className="header">
        <div className="header-content">
          <img src="../images/logo.png" className="header-logo" />
          企业网盘
          <div className="link-menu">
            学习中心
            <Icon style={{marginLeft:'10px'}} type="solution" />
          </div>
        </div>
      </div>
    );
  }
}
class Capicity extends React.Component{
  state = {
    percent: null,
    used: null,
    total: null,
  }

  componentDidMount() {
    // 请求容量
    this.setState({
      percent: 0.51,
      used: '100KB',
      total: '10GB'
    })
  }

  render() {
    const percentTage = (this.state.percent * 100).toFixed(0);
    return (
      <span>
        <span>企业网盘容量</span>
        <span style={{ display: 'inline-block', width: '300px', margin: '0 12px' }}>
          <antd.Progress percent={percentTage} showInfo={false} />
        </span>
        <span style={{ color: '#6d747f' }}>已用{this.state.used}/共{this.state.total}</span>
        {
          this.props.showButton ?
            <span>
              <antd.Button type="primary" icon="setting" style={{ margin: '0 10px 0 35px' }} onClick={this.props.switchSection.bind(this, 'managerList')}>设置</antd.Button>
              <antd.Button type="primary" icon="file-text" onClick={this.props.switchSection.bind(this, 'docList')}>文件管理</antd.Button>
            </span>
          :
            null
        }

      </span>
    )
  }
}

class Sidebar extends React.Component {
  render() {
    return <div>Sidebar</div>;
  }
}
class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="copyright">© Copyright 2018 E-ducation Copyright 粤ICP备13044168号-3</div>
      </div>);
  }
}
