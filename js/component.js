class Tables extends React.Component {
  render() {
    return <div>{this.props.name}tables</div>;
  }
}

class ListDown extends React.Component{
  render(){
    return(
      <div className="listdown">
          <antd.Button type="primary" className="download-btn">下载</antd.Button>
          <antd.Pagination size="small" total={50} />
      </div>
    )
  }
}
