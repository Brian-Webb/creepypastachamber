import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class CreepypastaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "posts": null
    };

    fetch('https://api.creepypastachamber.com/wp-json/wp/v2/creepypasta')
      .then(data => data.json())
      .then(data => this.setState({"posts": data}) );
  }
  render() {
  	let list_items = null;

  	if(this.state.posts) {
  		list_items = this.state.posts.map(post => { return <li key={post.id}><Link to={`/creepypasta/${post.slug}`}>{post.title.rendered} by {post.acf.author}</Link></li> });
  	}

    return (
      <div className="CreepypastaList">
        <ul>
          {list_items}
        </ul>
      </div>
    );
  }
}

export default CreepypastaList;
