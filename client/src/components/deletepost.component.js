import React from 'react';
import axios from 'axios';

class deletePostComp extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            post_title: '',
            post_content: '',
            post_image:''
        }

        this.deletePost=this.deletePost.bind(this);
    }

    deletePost(){
            axios.delete('http://localhost:4000/posts/deletepost/' + this.props.match.params.id)
            .then(response => {
                console.log('Post deleted');
                this.props.history.push('/');
            })
            .catch(err => {
                console.log('Could not delete post')
            })
    }
    
    componentDidMount() {
        axios.get('http://localhost:4000/posts/' + this.props.match.params.id)
            .then(response => {
                this.setState({ 
                    post_title: response.data.post_title,
                    post_content: response.data.post_content,
                    post_image: response.data.post_image
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {

        return (
            <div className='container'>
                <div className='post-expand'>
                    <div className='post-image' style={{ backgroundImage: 'url('+'http://localhost:4000/uploads/'+ this.state.post_image }}></div>
                    <div className='post-heading'>{this.state.post_title}</div>
                    <div className='post-content' dangerouslySetInnerHTML={{ __html: this.state.post_content.substring(0,500) + '......' }}></div>
                    <button className='btn btn-danger mt-4' onClick={this.deletePost}>Click here to delete this post</button>
                </div>
            </div>
        );
    }
}

export default deletePostComp;