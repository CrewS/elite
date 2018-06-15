
(function(){

  class App extends React.Component {
    render() {
      return (
        <div>
          <div>
            <Header name="123" />
            <Sidebar name="123" />
            <Footer name="123" />
            <div style={{ width: '1180px', margin: '0 auto'}}>
              {/*
                <DropBoxFile />
                <DocList />
              */}
              <ManagerList />
            </div>
          </div>
          <Footer name="123" />
        </div>
      );
    }
  }

  ReactDOM.render(
    <App />, document.getElementById('message1')
  );
})()
