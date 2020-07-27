import React from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";


const Post = props => (
  <div className='custom-card' >
    <div className='c-card-image' style={{ backgroundImage: 'url('+props.post.post_image +')' }}>
    </div>
    <div className='c-card-text'>
      <div className='c-card-heading'><Link to={"/post/"+props.post._id} className='cards-no-deco'>{props.post.post_title}</Link></div>
      <div className='c-card-content'>
<Link to={"/post/"+props.post._id} className='cards-no-deco'>{props.post.post_summary}</Link>
      </div>
    </div>
    <div className='c-card-details'>
      {props.post.post_date}
    </div>
  </div>
)

class feedComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { posts: [] };
    this.postCards = this.postCards.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/posts/allposts')
      .then(response => {
        this.setState({ posts: response.data.reverse() });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  postCards() {
    return this.state.posts.map(function (currentPost, i) {
      return <Post post={currentPost} key={i} />;
    })

  }

  render() {
    return (
      <div className='container'>
        <div className='c-card-deck unselectable'>
        {this.postCards()}

        </div>

      </div>
    );
  }
}

export default feedComp;