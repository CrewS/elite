class Header extends React.Component {
  render() {
    const { Icon } = antd;
    return (
      <div className="header">
        <div className="header-wrap">
          <div className="header-content">
          <div className="header-logo">
            <i className="iconfont" style={{ color: '#fff', lineHeight: '20px', fontSize:'22px' }}>&#xe601;</i>
          </div>
            <span className="logo-text">企业网盘</span>
            <div className="link-menu">
              学习中心
              <i className="iconfont" style={{verticalAlign:'middle', fontSize:'14px',marginLeft: '10px' }}>&#xe62a;</i>
            </div>
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
      percent: 0.00511,
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

// ajax请求
// const HOST = 'http://weijie.ngrok.elitemc.cn:8000';
// const TOKEN = '7BdppeWIoKWKNhh7I2sDsw4hibRIVgkW';

const HOST = 'http://leseil.ngrok.elitemc.cn';
const TOKEN = '5E0P1QjdUEdVGuBBzPMie3z6Vgq5dUB0'

function ajax(options){
  $.ajax({
    xhrFields: {withCredentials: true},
    url: HOST + options.url,
    type: options.type,
    data: options.data,
    beforeSend: function(request) {
      request.setRequestHeader("X-CSRFToken", TOKEN);
    },
    success: (res) => {
      options.success(res);
    }
  })
  // contentType: "application/json; charset=utf-8",
  // dataType: "json",
}
