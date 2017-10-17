import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    const post = this.props.post;
    const post_title = {__html: `${post.title.rendered} <br><small>by ${post.acf['story-author']}</small>`};

    const post_summary = {__html: post.acf.summary};

    return (
      <div className="CreepypastaListItem">
        <Link to={`/creepypasta/${post.slug}`} onClick={this.handleCurrentPostClick} dangerouslySetInnerHTML={post_title} className="CreepypastaListItem__title"></Link>
        <div className="CreepypastaListItem__summary" dangerouslySetInnerHTML={post_summary}></div>
        <Link to={`/creepypasta/${post.slug}`} onClick={this.handleCurrentPostClick} className="button">Read More</Link>
      </div>
    )
  }
}

export default CreepypastaList;