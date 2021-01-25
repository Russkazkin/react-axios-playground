import React, { Component } from 'react';
import axios from "axios";

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevState);
        try {
            if (!this.props.id) return;
            if(!this.state.loadedPost || this.state.loadedPost.id !== this.props.id) {
                const post = (await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)).data;
                this.setState({loadedPost: post});
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    render () {
        const {loadedPost} = this.state;
        let post = <p>Please select a Post!</p>;
        if (this.props.id && loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{loadedPost.title}</h1>
                    <p>{loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;