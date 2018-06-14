
(function(){
    
    class App extends React.Component {   
      render() {
        return (
          <div>
            <Header name="123" />
            <Sidebar name="123" />
            <div style={{ width: '1180px', margin: '0 auto'}}>
              <SetList />
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