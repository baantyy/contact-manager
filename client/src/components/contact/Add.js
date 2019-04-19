import React from 'react' 
import ContactForm from './Form'
import axios from 'axios'

class ContactAdd extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            errors: {
                name: '',
                email: '',
                mobile: '',
                city: ''
            },
            submitBtn: 'Add New'
        }
    }

    handleSubmit = (formData) => {
        const token = localStorage.getItem('token')
        if(token){
            this.setState(() => ({
                submitBtn: ''
            }))
            axios.post('http://localhost:3005/contacts', formData, {
                    headers: {
                        'x-auth' : token
                    }
                })
                .then(response => {
                    if(response.data.errors){
                        this.setState(() => ({
                            errors: response.data.errors,
                            submitBtn: 'Add New'
                        }))
                    }else{
                        this.props.history.push('/contacts')
                    }
                })
        }
    }

    componentDidMount() {
        document.title = "Add Contact"
    }

    render() {
        return (
            <div className="contactForm">
                <h2>Add Contact</h2>
                <ContactForm handleSubmit={this.handleSubmit} errors={this.state.errors} submitBtn={this.state.submitBtn} />
            </div>
        )
    }
}

export default ContactAdd