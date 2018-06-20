
(function(){
  const { LocaleProvider, locales } = window.antd;
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
          <Footer />
        </div>
      );
    }
  }

  ReactDOM.render(
    <LocaleProvider locale={locales.zh_CN}><App /></LocaleProvider>, document.getElementById('message1')
  );
})()
