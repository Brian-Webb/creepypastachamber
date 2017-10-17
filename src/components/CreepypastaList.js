import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Html5Entities } from 'html-entities';

class CreepypastaList extends Component {
  constructor(props) {
    super(props);

    this.handleCurrentPostClick = this.handleCurrentPostClick.bind(this);
  }

  handleCurrentPostClick(post) {
    this.props.handleCurrentPostClick(post);
  }

  render() {

    document.title = "Creepypasta Chamber";

  	let list_items = null;

  	if(this.props.posts) {
  		list_items = this.props.posts.map(post => { return <CreepypastaListItem post={post} key={post.id} handleCurrentPostClick={this.handleCurrentPostClick} /> });
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
  constructor(props) {
    super(props);

    this.handleCurrentPostClick = this.handleCurrentPostClick.bind(this);
  }

  handleCurrentPostClick(e) {
    this.props.handleCurrentPostClick(this.props.post);
  }

  render() {
    const entities = new Html5Entities();

    const post         = this.props.post;
    const post_title   = entities.decode(post.title.rendered);
    const post_author  = entities.decode(post.acf['story-author']);
    const post_summary = {__html: post.acf.summary};

    return (
      <div className="CreepypastaListItem">
        <Link to={`/creepypasta/${post.slug}`} onClick={this.handleCurrentPostClick} className="CreepypastaListItem__title">
          {post_title} <br /><small>by {post_author}</small>
        </Link>
        <div className="CreepypastaListItem__summary" dangerouslySetInnerHTML={post_summary}></div>
        <Link to={`/creepypasta/${post.slug}`} onClick={this.handleCurrentPostClick} className="button">Read More</Link>
      </div>
    )
  }
}

export default CreepypastaList;