import React from 'react' 
import axios from 'axios'
import { Link } from 'react-router-dom'

class ContactShow extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            contact: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id 
        axios.get(`http://localhost:3005/contacts/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then(response => {
                this.setState(() => ({ 
                    contact: response.data 
                }))
                document.title = this.state.contact.name
            })
    }

    handleRemove = () => {
        const confirm = window.confirm("Are you sure?")
        if(confirm) {
            const id = this.props.match.params.id 
            axios.delete(`http://localhost:3005/contacts/${id}`, {
                headers: {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            .then(response => {
                this.props.history.push('/contacts')
            })
        }
    }

    render(){
        return (
            <div className="contactShow">
                <div className="container">
                    <h2> { this.state.contact.name } </h2>

                    <ul>
                        <li><b>Mobile</b> : { this.state.contact.mobile }</li>
                        <li><b>Email</b> : { this.state.contact.email }</li>
                        <li><b>Gender</b> : { this.state.contact.gender }</li>
                        <li><b>City</b> : { this.state.contact.city }</li>
                    </ul>

                    <Link className="btn btn-primary" to="/contacts"> back </Link>
                    <Link className="btn btn-warning" to={`/contacts/edit/${this.state.contact._id}`}> edit </Link>

                    <button className="btn btn-danger" onClick={() => {
                        this.handleRemove()
                    }}>remove</button>
                </div>
            </div> 
        )
    }
}

export default ContactShow