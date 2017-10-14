import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Creepypasta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "narration": null
    };

    fetch(`https://api.creepypastachamber.com/wp-json/wp/v2/creepypasta?slug=${props.match.params.string}`)
      .then(data => data.json())
      .then(data => {
          this.setState({"post": data[0]}) 

          if(this.state.post.acf.narration) {
            fetch(`https://api.creepypastachamber.com/wp-json/wp/v2/creepypasta-narrations?slug=${this.state.post.acf.narration[0].post_name}`)
            .then(data => data.json())
            .then(data => this.setState({"narration": data[0]}) );
          }
      });
  }

  render() {
  	let post_title = null;
  	let post_content = null;

  	if(this.state.post) {
  		post_title = this.state.post.title.rendered;
  		post_content = {__html: this.state.post.content.rendered};

      document.title = `${post_title} | Creepypasta Chamber`;
  	}

    return (
      <div className="Creepypasta">
      	<h1>{post_title}</h1>
      	<div className="content" dangerouslySetInnerHTML={post_content}></div>

      	<Link to="/" className="button">Back to List</Link>

        <CreepypastaNarration narration={this.state.narration} />
      </div>
    );
  }
}

class CreepypastaNarration extends Component {
  render() {
    let narration_html = {__html: ''};

    if(this.props.narration) {
      narration_html = {__html: this.props.narration.acf.youtube_link.iframe};
    }

    return (
      <div className="CreepypastaNarration">
        <div className="video-wrapper">
          <div dangerouslySetInnerHTML={narration_html}></div>
        </div>
      </div>
    )
  }
}

export default Creepypasta;