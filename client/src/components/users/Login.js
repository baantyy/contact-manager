import React from 'react' 
import axios from 'axios'

class Login extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            email: '',
            password: '',
            errors: '',
            submitBtn: 'Login'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState(() => ({
            submitBtn: ''
        }))
        axios.post('http://localhost:3005/users/login', formData)
            .then(response => {
                if (response.data.errors) {
                    this.setState(() => ({
                        errors: response.data.errors,
                        password: '',
                        submitBtn: 'Login'
                    }))
                } else {
                    localStorage.setItem('token', response.data.token)
                    this.props.history.push('/contacts')
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

    componentDidMount(){
        document.title = "Login"
    }

    render() {
        return (
            <div className="container">
                <div className="loginBlock">
                    <h2>Login </h2>
                    <form onSubmit={this.handleSubmit}>
                        { this.state.errors && <p className="alert alert-danger">{ this.state.errors }</p> }
                        
                        <input type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Username / Email"
                        />
                    
                        <input type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Password"
                        />
                            
                        <button type="submit" className="btn btn-primary">
                            {this.state.submitBtn === 'Login' ? 'Login' : <i className="fa fa-spin fa-spinner"></i>}
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login