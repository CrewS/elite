
(function(){

    class App extends React.Component {
      render() {
        return (
          <div>
            <Header name="123" />
            <DropBoxFile />
            <Footer name="123" />
          </div>
        );
      }
    }

    ReactDOM.render(
      <App />, document.getElementById('message1')
    );
})()
