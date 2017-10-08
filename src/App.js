import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CreepypastaList from './CreepypastaList';
import Creepypasta from './Creepypasta';

class App extends Component {
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
