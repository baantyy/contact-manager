import React from 'react'
import ContactForm from './Form'
import axios from 'axios';

class ContactEdit extends React.Component{
    constructor(props) {
        super(props) 
        this.state = {
            contact: {},
            isLoaded: false 
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id 
        axios.get(`http://localhost:3005/contacts/${id}`, {
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        }).then(response => this.setState(() => ({ contact: response.data, isLoaded: true })))
    }

    handleSubmit = (formData) => {
        const id = this.props.match.params.id
        axios.put(`http://localhost:3005/contacts/${id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                // console.log(response.data)
                this.props.history.push(`/contacts/${id}`)
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-3">
                    <h2>Edit Contact</h2>
                    {this.state.isLoaded && <ContactForm handleSubmit={this.handleSubmit} contact={this.state.contact} />}
                </div>
            </div>
        )
    }
}

export default ContactEdit