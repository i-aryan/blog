import React from 'react';
import axios from 'axios';

class postExpandComp extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            post_title: '',
            post_content: '',
            post_image:'',
            post_date: ''
        }
    }

    
    componentDidMount() {
        axios.get('http://localhost:4000/posts/' + this.props.match.params.id)
            .then(response => {
                this.setState({ 
                    post_title: response.data.post_title,
                    post_content: response.data.post_content,
                    post_image: response.data.post_image,
                    post_date: response.data.post_date
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
                    <div className='post-image' style={{ backgroundImage: 'url('+this.state.post_image }}></div>
                    <div className='post-date'>{this.state.post_date}</div>
                    <div className='post-heading'>{this.state.post_title} <hr className='post-line'/></div>
                    <div className='post-content' dangerouslySetInnerHTML={{ __html: this.state.post_content }}></div>
                    <div class="sharethis-inline-share-buttons"></div>
                </div>
            </div>
        );
    }
}

export default postExpandComp;