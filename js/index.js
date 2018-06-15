
(function(){
  class App extends React.Component {
    state = {
      showSection: 'managerList',
    }

    goToHome = () => {
      this.setState({
        showSection: 'dropboxfile'
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
                    return <DropBoxFile switchSection={this.switchSection.bind(this)} />

                  case 'set':
                    return <DocList switchSection={this.switchSection.bind(this)} />
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
