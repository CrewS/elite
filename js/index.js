
(function(){

    class App extends React.Component {
      render() {
        return (
          <div>
<<<<<<< HEAD
            <Header name="123" />
            <DropBoxFile />
=======
            <div>
                <Header name="123" />
                <Sidebar name="123" />
                <Footer name="123" />
                <DropBoxFile />
            </div>
>>>>>>> master
            <Footer name="123" />
          </div>
        );
      }
    }

    ReactDOM.render(
      <App />, document.getElementById('message1')
    );
})()
