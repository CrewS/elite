class Uploaderbox extends React.Component {
  onchage = () => {

  }
  render(){
    return(
      <div className="uploader-wrap">
        <input type="file" />

        <div className="uplist-container">
          <div className="list-header">
              <span>正在上传（4/9）</span>
              <span></span>
          </div>
        </div>
      </div>
    );
  }
}
