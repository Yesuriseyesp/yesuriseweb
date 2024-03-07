// BlogView.js

import React from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebase';
import "./blogview.css"

class BlogCreator extends React.Component {
    state = {
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

    render() {
        return (
            <div className="blog-container">
                <h2 className="blog-heading">Recent Blog Posts</h2>
                {this.state.posts.map((post, index) => (
                    <div className="blog-post" key={index}>
                        <div className="post-image">
                            <img src={post.imageURL} alt={post.title} />
                        </div>
                        <div className="post-content">
                            <h3 className="post-title">{post.title}</h3>
                            <p>{post.content.substring(0, 200)}...</p>
                            <Link to={`/blogs/${index}`} className="read-more-link">
                                Read More
                            </Link>
                        </div>
                        <hr className="post-divider" />
                    </div>
                ))}
            </div>
        );
    }
}

export default BlogCreator;
