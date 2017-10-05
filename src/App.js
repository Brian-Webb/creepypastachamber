import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import CreepypastaList from './CreepypastaList';
import Creepypasta from './Creepypasta';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "posts": null
    };

    fetch('http://api.creepypastachamber.com/wp-json/wp/v2/posts')
      .then(data => data.json())
      .then(data => this.setState({"posts": data}) );
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/creepypasta' component={CreepypastaList}/>
          {/* both /roster and /roster/:number begin with /roster */}
          <Route path='/creepypasta/:string' component={Creepypasta}/>
        </Switch>
      </div>
    );
  }
}

export default App;
