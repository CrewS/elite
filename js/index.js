
(function(){
  class App extends React.Component {
    state = {
      showSection: 'home',
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

    goToNewFile = () => {
      this.setState({
        showSection: 'newfile'
      })
    }

    render() {
      return (
        <div>
          <Header />
          <div className="container">
            {
              (() => {
                switch (this.state.showSection) {
                  case 'home':
                    return <DropBoxFile goToSet={this.goToSet} />

                  case 'set':
                    return <Setting goToHome={this.goToHome} />

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
