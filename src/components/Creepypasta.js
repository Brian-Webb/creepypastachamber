import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Creepypasta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "post": null
    };
  }

  componentWillMount() {
    if(this.props.currentPost) {
      this.setState({"post": this.props.currentPost});
    } else {
      fetch(`https://api.creepypastachamber.com/wp-json/wp/v2/creepypasta?slug=${this.props.match.params.string}`)
        .then(data => data.json())
        .then(data => {
            this.setState({"post": data[0]});
        });
    }
  }

  render() {
  	let post_title = null;
  	let post_content = null;
    let narration = null;

  	if(this.state.post) {
  		post_title = this.state.post.title.rendered;
  		post_content = {__html: this.state.post.content.rendered};

      if(this.state.post.acf.narration) narration = <CreepypastaNarration narration={this.state.post.acf.narration[0]} />;

      document.title = `${post_title} | Creepypasta Chamber`;
  	}

    return (
      <div className="Creepypasta">
      	<h1>{post_title}</h1>

        {narration}

      	<div className="content" dangerouslySetInnerHTML={post_content}></div>

      	<Link to="/" className="button">Back to List</Link>
      </div>
    );
  }
}

class CreepypastaNarration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "narration": null
    }
  }

  componentWillMount() {
    if(this.props.narration) {
      fetch(`https://api.creepypastachamber.com/wp-json/wp/v2/creepypasta-narrations?slug=${this.props.narration.post_name}`)
        .then(data => data.json())
        .then(data => this.setState({"narration": data[0]}) );
    }
  }

  handleNarrationLinkClick(e) {
    document.querySelector('.CreepypastaNarration').className += ' active';
  }

  render() {
    let narration_html = {__html: ''};

    if(this.state.narration) {
      narration_html = {__html: this.state.narration.acf.youtube_link.iframe};
    }

    return (
      <div className="CreepypastaNarration">
        <a className="button" onClick={this.handleNarrationLinkClick}>Listen while you read</a>

        <div className="video-wrapper">
          <div dangerouslySetInnerHTML={narration_html}></div>
        </div>
      </div>
    )
  }
}

export default Creepypasta;