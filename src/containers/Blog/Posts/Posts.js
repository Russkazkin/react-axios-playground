import React, {Component} from "react";
import {Link, Route} from "react-router-dom";
import axios from "../../../axios";

import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";


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
                    <Link  key={post.id} to={'/posts/' + post.id}>
                        <Post {...post} />
                    </Link>
                );
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route exact path={this.props.match.url + '/:id'} component={FullPost} />
            </div>
        );
    }
}

export default Posts;