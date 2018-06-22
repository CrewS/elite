class Uploaderbox extends React.Component {
  state = {
    list: []
  }
  onchange = (e) => {
    const { files } = e.target;
    const list = [];
    Object.keys(files).map((key) => {
      list.push({
        file: files[key],
        status: '1',
      })
    })
    console.log(e.target.files)
  }
  render(){
    const { list } = this.state;
    return(
      <div className="uploader-wrap">
        <input onChange={this.onchange} type="file" multiple="multiple" />

        <div className="uplist-container">
          <div className="list-header">
              <span>正在上传（4/9）</span>
              <span></span>
              <ul>
                {
                  list.map((data) => {
                    return(
                    <li>
                      {
                        data.file.name
                      }
                    </li>)
                  })
                }
              </ul>
          </div>
        </div>
      </div>
    );
  }
}
