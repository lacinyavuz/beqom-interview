import React, { Component } from 'react';
import MyHeader from './MyHeader';
import MyVideoSearch from './MyVideoSearch';

class App extends Component {
    render() {
        return (
            <div className="App">
                <MyHeader />
                <MyVideoSearch />
            </div>
        );
    }
}

export default App;
