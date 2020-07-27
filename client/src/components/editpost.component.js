import React from 'react';
import axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class addPostComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post_id: '',
            post_title: '',
            post_summary: '',
            post_content: '',
            initial_content:'',
            post_image:''
        }

        this.onChangePostContent = this.onChangePostContent.bind(this);
        this.onChangePostTitle = this.onChangePostTitle.bind(this);
        this.onChangePostSummary = this.onChangePostSummary.bind(this);
        this.onChangePostImage = this.onChangePostImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChangePostTitle(e) {
        this.setState({ post_title: e.target.value })
    }

    onChangePostSummary(e) {
        this.setState({ post_summary: e.target.value })
    }

    onChangePostContent(e) {
        this.setState({ post_content: e })
    }

    onChangePostImage(e) {
        this.setState({ post_image: e.target.value })
    }

    componentDidMount(){
        axios.get('http://localhost:4000/posts/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    post_title: response.data.post_title,
                    post_summary: response.data.post_summary,
                    post_content: response.data.post_content,
                    initial_content: response.data.post_content,
                    post_image:response.data.post_image
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        var updatePost={
            post_title: this.state.post_title,
            post_content: this.state.post_content,
            post_summary:this.state.post_summary,
            post_image: this.state.post_image,
        }


        axios.post('http://localhost:4000/posts/editpost/'+ this.props.match.params.id, updatePost)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (<div class='addpost-form'>
            <span className='addpost-heading mb-3'>Editing blog</span>
            <hr className='post-line'/>
            <form className='mt-4' onSubmit={this.onSubmit} enctype="multipart/form-data">
                <div class="form-group">
                    <label for="addpost-title-label">Blog Title</label>
                    <input value={this.state.post_title} onChange={this.onChangePostTitle} name='post_title' type="title" class="form-control" id="addpost-title" placeholder="Title for your blog" />
                </div>
                <div class="form-group">
                    <label for="addpost-summary-label">Blog Summary</label>
                    <input value={this.state.post_summary} onChange={this.onChangePostSummary} name='post_summary' type="summary" class="form-control" id="addpost-summary" placeholder="Summary for blog cards.." />
                    <small id="emailHelp" class="form-text text-muted">Summary only appears on blog cards on main page.</small>
                </div>
                <div class="form-group">
                    <label for="addpost-textarea-label">Content</label>
                    <CKEditor
                        className='ckeditor-class'
                        editor={ClassicEditor}
                        data={this.state.initial_content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.onChangePostContent(data);
                            console.log({ event, editor, data });
                        }}
                        
                    />
                    <small id="emailHelp" class="form-text text-muted">To add images, copy the image and paste it here.</small>
                    
                     </div>
                         
                     <div class="form-group">
                    <label for="addpost-title-label">Image Link</label>
                    <input value={this.state.post_image} onChange={this.onChangePostImage} name='post_image'class="form-control" id="addpost-image" placeholder="" />
                <small id="emailHelp" class="form-text text-muted">This image will appear on blog cards as thumbnail and as a header image on blog.</small>
                    
                </div>
              
                <button type="submit" class="btn btn-warning mt-4">Save Changes</button>
            </form>

        </div>);
    }
}

export default addPostComp;