
(function(){
    
    class App extends React.Component {
        
        render() {
    
        return (
            <div>
            <antd.Transfer
                dataSource={mockData}
                titles={['Source', 'Target']}
                targetKeys={state.targetKeys}
                selectedKeys={state.selectedKeys}
                onChange={this.handleChange}
                onSelectChange={this.handleSelectChange}
                onScroll={this.handleScroll}
                render={item => item.title}
            />
            <Header name="123" />
            <Sidebar name="123" />
            <Footer name="123" />
            <div>test</div>
            </div>
            );
        }
    }
    
    ReactDOM.render(
        <App />, document.getElementById('message1')
    );
})()