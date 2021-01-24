import React, { Component } from 'react';
import axios from "axios";

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
    }

    async componentDidMount() {
        try {
            const posts = (await axios.get('https://jsonplaceholder.typicode.com/posts')).data.slice(0, 9);
            const updatedPosts = posts.map((post) => {
                return {
                    ...post, author: 'Skazkin',
                }
            }
            );
            this.setState({posts: updatedPosts});
        } catch (error) {
            console.log(error.response.config);
        }
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post {...post} key={post.id} />
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;