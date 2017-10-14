import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    document.title = "Creepypasta Chamber";

  	let list_items = null;

  	if(this.state.posts) {
  		list_items = this.state.posts.map(post => { return <CreepypastaListItem post={post} key={post.id} /> });
  	}

    return (
      <div className="CreepypastaList">
        <h1>Creepypasta Chamber</h1>
        
        {list_items}
      </div>
    );
  }
}

class CreepypastaListItem extends Component {
  render() {
    const post = this.props.post;

    const post_summary = {__html: post.acf.summary};

    return (
      <div className="CreepypastaListItem">
        <Link to={`/creepypasta/${post.slug}`} params={{ post = post }} className="CreepypastaListItem__title">{post.title.rendered} <small>by {post.acf['story-author']}</small></Link>
        <div className="CreepypastaListItem__summary" dangerouslySetInnerHTML={post_summary}></div>
        <Link to={`/creepypasta/${post.slug}`} params={{ post = post }} className="button">Read More</Link>
      </div>
    )
  }
}

export default CreepypastaList;