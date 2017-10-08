import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
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
          <Route exact path='/' component={CreepypastaList}/>
          <Route path='/creepypasta/:string' component={Creepypasta}/>
        </Switch>
      </div>
    );
  }
}

export default App;
