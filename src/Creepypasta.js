import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Creepypasta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "post": null
    };

    fetch(`https://api.creepypastachamber.com/wp-json/wp/v2/creepypasta?slug=${props.match.params.string}`)
      .then(data => data.json())
      .then(data => this.setState({"post": data[0]}) );
  }
  render() {
  	let post_title = null;
  	let post_content = null;

  	if(this.state.post) {
  		post_title = this.state.post.title.rendered;
  		post_content = {__html: this.state.post.content.rendered};
  	}

    return (
      <div className="Creepypasta">
      	<h1>{post_title}</h1>
      	<div class="content" dangerouslySetInnerHTML={post_content}></div>

      	<Link to="/creepypasta/">Back to List</Link>
      </div>
    );
  }
}

export default Creepypasta;
