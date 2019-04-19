import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import axios from 'axios'

import Home from './components/Home'

import Register from './components/users/Register'
import Login from './components/users/Login'

import ContactList from './components/contact/List'
import ContactAdd from './components/contact/Add'
import ContactShow from './components/contact/Show'
import ContactEdit from './components/contact/Edit'

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      isAuthenticated: false 
    }
  }

  componentDidMount(){
    if(localStorage.getItem('token')){
      this.setState(() => ({
        isAuthenticated: true
      }))
    }
  }

  handleAuthentication = () => {
    this.setState(() => ({
      isAuthenticated: true
    }))
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <Link className="navbar-brand" to="/">Contact App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav ml-auto">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    { this.state.isAuthenticated ? (
                      <React.Fragment>
                        <Link to="/contacts" className="nav-item nav-link">Contacts</Link>
                        <Link to="/logout" className="nav-item nav-link">Logout</Link>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Link to="/login" className="nav-item nav-link">Login</Link>
                        <Link to ="/register" className="nav-item nav-link">Register</Link>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </header>

          <Switch>

            <Route path="/" component={Home} exact={true} />

            <Route path="/register" component={Register} exact={true} />
            <Route path="/login" render={(props) => {
              return <Login {...props} handleAuthentication={this.handleAuthentication} />
            }} />
            <Route path="/logout" render={(props) => {
              axios.delete('http://localhost:3005/users/logout', {
                headers: {
                  'x-auth': localStorage.getItem('token')
                }
              })
              .then(res => {
                props.history.push('/login')
                this.setState(() => ({
                  isAuthenticated: false
                }))
                localStorage.removeItem('token')
              })
            }} />
            
            <Route path="/contacts" component={ContactList} exact={true} />
            <Route path="/contacts/new" component={ContactAdd} exact={true} />
            <Route path="/contacts/:id" component={ContactShow} exact={true} />
            <Route path="/contacts/edit/:id" component={ContactEdit} exact={true} />

          </Switch>     
            
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App