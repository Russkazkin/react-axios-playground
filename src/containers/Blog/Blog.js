import React, { Component } from 'react';
import {Route, NavLink, Switch, Redirect} from "react-router-dom";

import asyncComponent from "../../hoc/asyncComponent";
import Posts from "./Posts/Posts";
//import NewPost from "./NewPost/NewPost";
import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
    return import("./NewPost/NewPost");
});

class Blog extends Component {
    state = {
        auth: true,
    };

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
                    {this.state.auth ? <Route exact path="/new-post" component={AsyncNewPost} /> : null}
                    <Route exact path="/" component={Posts} />
                    <Route path="/posts" component={Posts} />
                    <Route render={() => (<><h1>404</h1><p>Page Not Found</p></>)} />
                    {/*<Redirect from='/' to='/posts' />*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;