import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CreepypastaList from './CreepypastaList';
import Creepypasta from './Creepypasta';
import './app.css';

var ReactGA = require('react-ga');
ReactGA.initialize('UA-17490881-29');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "posts": null,
      "currentPost": null
    };

    this.handleCurrentPostClick = this.handleCurrentPostClick.bind(this);

    if(! this.state.posts) {
      fetch('https://api.creepypastachamber.com/wp-json/wp/v2/creepypasta?per_page=25&sort=desc')
        .then(data => data.json())
        .then(data => this.setState({"posts": data}) );
    }
  }

  componentDidUpdate() {
    this.logPageView();
  }

  render() {
    window.scrollTo(0, 0);
    document.title = "Creepypasta Chamber";

    return (
      <div className="App">
        <section className="content">
          <Switch>
            <Route 
              exact 
              path='/'
              render={(props) => <CreepypastaList {...props} posts={this.state.posts} handleCurrentPostClick={this.handleCurrentPostClick} />} 
            />

            <Route 
              path='/creepypasta/:string'
              render={(props) => <Creepypasta {...props} currentPost={this.state.currentPost} />} 
            />
          </Switch>
        </section>
      </div>
    );
  }

  // custom functions
  handleCurrentPostClick(post) {
    this.setState({"currentPost": post});

    return true;
  }

  logPageView() {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}

export default App;