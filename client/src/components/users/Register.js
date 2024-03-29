import React from 'react'
import axios from 'axios'

class Register extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            username: '', 
            email: '',
            password: '',
            errors: {},
            submitBtn: 'Register'
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
        this.setState(() => ({
            submitBtn: ''
        }))
        axios.post('http://localhost:3005/users/register', formData)
            .then(response => {
                if(response.data.user){
                    this.props.history.push('/login')
                } else {
                    console.log(response.data)
                    if(response.data.errors){
                        this.setState(() => ({
                            errors: response.data.errors,
                            submitBtn: 'Register'
                        }))
                    }
                    
                }   
            })
    }

    componentDidMount(){
        document.title = "Register"
    }

    render(){
        return (
            <div className="container">
                <div className="loginBlock">
                    <h2>Register with us </h2>
                    <form onSubmit={this.handleSubmit}>

                        <input type="text" 
                            name="username"
                            value={this.state.username} 
                            onChange={this.handleChange} 
                            className="form-control" 
                            placeholder="Username"
                        />
                        { this.state.errors.username && <p className="text-danger">{ this.state.errors.username.message }</p> }
                       
                        <input type="text" 
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Email"
                        />
                        { this.state.errors.email && <p className="text-danger">{ this.state.errors.email.message }</p> }
                     
                        <input type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Password"
                        />
                        { this.state.errors.password && <p className="text-danger">{ this.state.errors.password.message }</p> }

                        <button type="submit" className="btn btn-primary">
                            {this.state.submitBtn === 'Register' ? 'Register' : <i className="fa fa-spin fa-spinner"></i>}
                        </button>                    

                    </form>
                </div> 
            </div>
        )
    }
}

export default Register