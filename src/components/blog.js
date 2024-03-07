import React from 'react';
import firebase from './firebase';
import { Link } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Dropzone from 'react-dropzone';

class BlogCreator extends React.Component {
    state = {
        title: '',
        content: EditorState.createEmpty(),
        image: null,
        imageUrl: '',
        posts: [] // Added state to store blog posts
    };

    componentDidMount() {
        // Fetch existing blog posts from Firebase
        firebase.database().ref('posts').on('value', snapshot => {
            const posts = snapshot.val();
            if (posts) {
                this.setState({ posts: Object.values(posts) });
            }
        });
    }

    onEditorStateChange = (content) => {
        this.setState({ content });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleImageUpload = (files) => {
        const image = files[0];
        this.setState({ image });

        const reader = new FileReader();
        reader.onload = () => {
            this.setState({ imageUrl: reader.result });
        };
        reader.readAsDataURL(image);
    };

    saveBlogPostToFirebase = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const { title, content, image } = this.state;

        const contentState = content.getCurrentContent();
        const contentRaw = convertToRaw(contentState);
        const contentText = contentRaw.blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');

        const blogPostData = {
            title,
            content: contentText,
            imageUrl: image ? image.name : null
        };

        const blogPostRef = firebase.database().ref('posts').push();
        const postId = blogPostRef.key;

        const imageRef = firebase.storage().ref(`images/${postId}/${image.name}`);
        imageRef.put(image)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                blogPostRef.set({
                    ...blogPostData,
                    imageUrl: url
                });
                console.log("Blog post data saved to Firebase");
            })
            .catch(error => {
                console.error("Error saving image to Firebase:", error);
            })
            .finally(() => {
                // Clear form fields after successful submission
                this.setState({
                    title: '',
                    content: EditorState.createEmpty(),
                    image: null,
                    imageUrl: ''
                });
            });
    };

    deleteBlogPost = (postId) => {
        firebase.database().ref(`posts/${postId}`).remove()
            .then(() => {
                console.log("Blog post deleted from Firebase");
            })
            .catch(error => {
                console.error("Error deleting blog post:", error);
            });
    };

    render() {
        const { content } = this.state;
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '600px', marginBottom: '40px' }}>
                    <h2>Create a Blog Post</h2>
                    <form onSubmit={this.saveBlogPostToFirebase}>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label>Content:</label>
                            <Editor
                                editorState={content}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label>Upload Image:</label>
                            <Dropzone onDrop={this.handleImageUpload}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', cursor: 'pointer' }}>
                                        <input {...getInputProps()} />
                                        <p>Drag & drop an image here, or click to select an image</p>
                                    </div>
                                )}
                            </Dropzone>
                            {this.state.imageUrl && (
                                <img src={this.state.imageUrl} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
                            )}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div style={{ width: '600px' }}>
                    <h2>Recent Blog Posts</h2>
                    {this.state.posts.map((post, index) => (
                        <div key={index}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <Link to={`/blogs/${index}`} style={{ textDecoration: 'none' }}>
                                View Post
                            </Link>
                            <button onClick={() => this.deleteBlogPost(post.id)}>Delete</button>
                        </div>
                    ))}
                </div>
                <Link to="/" style={{ textDecoration: 'none', marginTop: '20px' }}>
                    <button>Go to Home</button>
                </Link>
            </div>
        );
    }
}

export default BlogCreator;
