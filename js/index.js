
(function(){
    
    class App extends React.Component {
        
        render() {
    
        return (
            <div>
                <Header name="123" />
                <Sidebar name="123" />
                <Footer name="123" />
                <DropBoxFile />
            </div>
            );
        }
    }
    
    ReactDOM.render(
        <App />, document.getElementById('message1')
    );
})()