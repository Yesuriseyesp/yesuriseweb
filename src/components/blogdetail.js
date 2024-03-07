import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from './firebase';
import './blogdetail.css'; // Import the CSS file for styling

function BlogDetails() {
    const { index } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const snapshot = await firebase.database().ref('posts').once('value');
                const posts = snapshot.val();
                if (posts && posts[index]) {
                    setPost(posts[index]);
                } else {
                    setError('Post not found');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [index]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!post) {
        return <div>No post found</div>;
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <img src={post.imageURL} alt={post.title} />
            <p>{post.content}</p>
        </div>
    );
}

export default BlogDetails;
