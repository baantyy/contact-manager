import React from 'react'
import axios from 'axios'

class Register extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            username: '', 
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        e.persist() 
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:3005/users/register', formData)
            .then(response => {
                console.log(response.data)
                if(response.data.errors) {
                    // console.log(response.data.errors) 
                    console.log(response.data.errors)
                } else {
                // programmatically change from one to another component
                    this.props.history.push('/login')
                }   
            })
    }

    render(){
        return (
            <div className="row">
                <div className="col-md-6 offset-3">
                    <h2>Register with us </h2>
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <label>
                                username 
                                <input type="text" 
                                       name="username"
                                       value={this.state.username} 
                                       onChange={this.handleChange} 
                                       className="form-control" 
                                       placeholder="your username"
                                />
                            </label>
                        </div>

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

export default Register