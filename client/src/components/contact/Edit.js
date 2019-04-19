import React from 'react'
import ContactForm from './Form'
import axios from 'axios';

class ContactEdit extends React.Component{
    constructor(props) {
        super(props) 
        this.state = {
            contact: {},
            errors: {
                name: '',
                email: '',
                mobile: '',
                city: ''
            },
            isLoaded: false,
            submitBtn: 'Update'
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id 
        axios.get(`http://localhost:3005/contacts/${id}`, {
                headers: {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            .then(response => {
                this.setState(() => ({
                    contact: response.data, 
                    isLoaded: true 
                }))
                document.title = this.state.contact.name
            })
    }

    handleSubmit = (formData) => {
        const id = this.props.match.params.id
        this.setState(() => ({
            submitBtn: ''
        }))
        axios.put(`http://localhost:3005/contacts/${id}`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.errors){
                    this.setState(() => ({
                        errors: response.data.errors,
                        submitBtn: 'Update'
                    }))
                }else{
                    this.props.history.push(`/contacts/${id}`)
                }
            })
    }

    render() {
        return (
            <div className="contactForm">
                <h2>Edit Contact</h2>
                {this.state.isLoaded && <ContactForm handleSubmit={this.handleSubmit} contact={this.state.contact} errors={this.state.errors} submitBtn={this.state.submitBtn} />}
            </div>
        )
    }
}

export default ContactEdit