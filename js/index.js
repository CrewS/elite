
(function(){
  class App extends React.Component {
    state = {
      showSection: 'set',
    }

    goToHome = () => {
      this.setState({
        showSection: 'home'
      })
    }

    goToSet = () => {
      this.setState({
        showSection: 'set'
      })
    }

    render() {
      return (
        <div>
          <Header />
          <div style={{ width: '1180px', margin: '20px auto' }}>
            {
              (() => {
                switch (this.state.showSection) {
                  case 'home':
                    return <DropBoxFile />

                  case 'set':
                    return <DocList />
                }
              })()

            }
          </div>
        </div>
      );
    }
  }

  ReactDOM.render(
    <App />, document.getElementById('message1')
  );
})()
