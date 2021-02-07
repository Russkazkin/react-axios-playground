import {Component} from "react";
import {Link} from "react-router-dom";

import Post from "../../../components/Post/Post";
import axios from "../../../axios";

import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        error: false,
    }

    async componentDidMount() {
        try {
            const posts = (await axios.get('posts')).data.slice(0, 9);
            const updatedPosts = posts.map((post) => {
                    return {
                        ...post, author: 'Skazkin',
                    }
                }
            );
            this.setState({posts: updatedPosts});
        } catch (error) {
            this.setState({error: true});
            console.log(error.response);
        }
    }

    render() {
        let posts = <p>Something went wrong!</p>;
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Link  key={post.id} to={'/post/' + post.id}>
                        <Post {...post} />
                    </Link>
                );
            });
        }
        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;