import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CreepypastaList from './CreepypastaList';
import Creepypasta from './Creepypasta';
import './app.css';

class App extends Component {
  render() {
    document.title = "Creepypasta Chamber";

    return (
      <div className="App">
        <section className="content">
          <Switch>
            <Route exact path='/' component={CreepypastaList}/>
            <Route path='/creepypasta/:string' component={Creepypasta}/>
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;