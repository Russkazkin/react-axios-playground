import React, { Component } from 'react';
import axios from "axios";

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        try {
            if (!this.props.id) return;
            if(!this.state.loadedPost || this.state.loadedPost.id !== this.props.id) {
                const post = (await axios.get(`posts/${this.props.id}`)).data;
                this.setState({loadedPost: post});
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    deletePostHandler = async () => {
        try {
            await axios.delete(`posts/${this.props.id}`).data;
        } catch (e) {
            console.log(e.response)
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
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;