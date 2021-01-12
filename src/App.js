import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import NavBar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Footer from './components/layout/Footer'
import store from './store'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>  
              <Switch>
                <PrivateRoute exact path="/posts" component={Posts} />
              </Switch>  
              <Switch>
                <PrivateRoute exact path="/post/:postId" component={Post} />
              </Switch> 
              <Switch>
                <PrivateRoute exact path="/profiles" component={Profiles} />
              </Switch>  
                <PrivateRoute exact path="/profile/:username" component={Profile} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
