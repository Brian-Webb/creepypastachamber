import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Home extends Component {
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
      <div className="Home">
        <ul>
          {this.state.posts ? this.state.posts.map(post => <li>{post.title.rendered} by {post.acf.author}</li>) : ''}
        </ul>
      </div>
    );
  }
}

export default Home;
