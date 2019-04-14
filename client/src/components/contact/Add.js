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
            if(response.data.err){
                console.log(response.data.err)
            }else{
                this.props.history.push('/contacts')
            }
        })
    }

    render() {
        return (
            <div>
                <h2>Add Contact</h2>
                <ContactForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default ContactAdd