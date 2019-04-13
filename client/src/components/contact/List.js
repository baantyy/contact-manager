import React from 'react' 
import axios from 'axios'

class ContactList extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            contacts: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3005/contacts', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState(() => ({
                    contacts: response.data
                }))
            })
    }
    render() {
        return (
            <div>
                <h2>Listing Contacts</h2>
                { this.state.contacts.length === 0 ? (
                    <div>
                        No contacts found. Add your first contact 
                    </div>
                ) : (
                    <ul>
                        { this.state.contacts.map(contact => {
                            return (
                                <li key={contact._id}> {contact.name } </li>
                            )
                        })}
                    </ul>
                ) } 
            </div>
        )
    }
}
export default ContactList