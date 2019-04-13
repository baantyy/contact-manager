import React from 'react' 
import axios from 'axios'

class Login extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            email: '',
            password: '',
            errors: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:3005/users/login', formData)
            .then(response => {
                if (response.data.errors) {
                    this.setState(() => ({
                        errors: response.data.errors,
                        password: ''
                    }))
                } else {
                    // write this to localStorage 
                    localStorage.setItem('token', response.data.token)
                    // redirect to contacts page 
                    this.props.history.push('/contacts')
                    // change the navigation links = update the state of isAuthenticated in the parent component
                    this.props.handleAuthentication(true)
                }
            })
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    render() {
        // console.log(this.props)
        return (
            <div className="row">
                <div className="col-md-6 offset-3">
                    <h2>Login </h2>
                    <form onSubmit={this.handleSubmit}>
                        { this.state.errors && <p className="alert alert-danger">{ this.state.errors}</p> }
                        <div className="form-group">
                            <label>
                                email
                                <input type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="your email"
                                />
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                password
                                <input type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="your password"
                                />
                            </label>
                        </div>

                        <input type="submit" className="btn btn-primary" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Login