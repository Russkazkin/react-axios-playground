import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Ruslan',
        submitted: false,
    }

    postDataHandler = async () => {
        try {
            const post = {
                title: this.state.title,
                body: this.state.content,
                author: this.state.author,
            }
            const response = await axios.post('posts', post);
            console.log(response);
            this.setState({submitted: true});
        } catch (e) {
            console.log(e.response);
        }
    };

    render () {
        let redirect = this.state.submitted ? <Redirect to='/posts' /> : null;
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Ruslan">Ruslan</option>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;