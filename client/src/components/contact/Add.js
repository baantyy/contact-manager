import React from 'react' 
import ContactForm from './Form'
import axios from 'axios'

class ContactAdd extends React.Component {

    handleSubmit = (formData) => {
        axios.post('http://localhost:3005/contacts', formData, {
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response.data)
            this.props.history.push('/contacts')
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-3"> 
                    <h2>Add Contact</h2>
                    <ContactForm handleSubmit={this.handleSubmit} />
                </div> 
            </div>
        )
    }
}

export default ContactAdd