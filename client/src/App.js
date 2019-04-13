import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Home from './components/Home'

import Register from './components/users/Register'
import Login from './components/users/Login'

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      isAuthenticated: false 
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <a className="navbar-brand" href="/">Contact App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link">Home</Link>
                { this.state.isAuthenticated ? (
                  <React.Fragment>
                    <Link to="/contacts" className="nav-item nav-link">Contacts</Link>
                    <Link to="/users/logout" className="nav-item nav-link">Logout</Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link to ="/register" className="nav-item nav-link">Register</Link>
                    <Link to="/login" className="nav-item nav-link">Login</Link>
                  </React.Fragment>
                )}
              
              </div>
            </div>
          </nav>

          <Route path="/" component={Home} exact={true} />
          <Route path="/register" component={Register} exact={true} />
          <Route path="/login" component={Login} exact={true} />
         
        </div>
      </BrowserRouter>
    )
  }
}

export default App