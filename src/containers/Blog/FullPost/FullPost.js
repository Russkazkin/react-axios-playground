import React, { Component } from 'react';
import axios from "axios";

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
    };

    async componentDidMount(prevProps, prevState, snapshot) {
        this.id = this.props.match.params.id;
        try {
            if (!this.id) return;
            console.log(this.id);
            if(!this.state.loadedPost || this.state.loadedPost.id !== this.id) {
                const post = (await axios.get(`posts/${this.id}`)).data;
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
        if (this.id && loadedPost) {
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