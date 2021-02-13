import React, {Component, Suspense} from 'react';
import {Route, NavLink, Redirect} from 'react-router-dom';


import User from './User';
import Welcome from './Welcome';

const Posts = React.lazy(() => import('./Posts'));

class LazyLoading extends Component {
    render() {
        return (
            <React.Fragment>
                <nav>
                    <NavLink to="/lazy-loading/user">User Page</NavLink> |&nbsp;
                    <NavLink to="/lazy-loading/posts">Posts Page</NavLink>
                </nav>
                <Redirect to={this.props.match.url + '/welcome'}/>
                <Route exact path={this.props.match.url + '/welcome'} component={Welcome}/>
                <Route exact path={this.props.match.url + '/user'} component={User}/>
                <Route exact
                       path={this.props.match.url + '/posts'}
                       render={() => (
                           <Suspense fallback={<div>Loading...</div>}>
                               <Posts/>
                           </Suspense>)
                       }/>
            </React.Fragment>
        );
    }

}

export default LazyLoading;