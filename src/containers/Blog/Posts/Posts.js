import {Component} from "react";

import Post from "../../../components/Post/Post";
import axios from "../../../axios";

import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
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

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id,
        })
    }

    render() {
        let posts = <p>Something went wrong!</p>;
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post {...post} key={post.id} clicked={() => this.postSelectedHandler(post.id)}/>
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