import React, { Component } from 'react';
import {Route, NavLink, Switch} from "react-router-dom";

import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";

import './Blog.css';



class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink exact to="/new-post">New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route exact path="/" component={Posts} />
                    <Route exact path="/new-post" component={NewPost} />
                    <Route exact path="/post/:id" component={FullPost} />
                </Switch>
            </div>
        );
    }
}

export default Blog;