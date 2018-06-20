class Header extends React.Component {
  render() {
    const { Icon } = antd;
    return (
      <div className="header">
        <div className="header-wrap">
          <div className="header-content">
            <img src="../images/logo.png" className="header-logo" />
            <span className="logo-text">企业网盘</span>
            <div className="link-menu">
              学习中心
              <Icon style={{marginLeft:'10px'}} type="solution" />
            </div>
          </div>
        </div>
      </div>
    );
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
