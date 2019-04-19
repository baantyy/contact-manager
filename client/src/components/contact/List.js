import React from 'react' 
import axios from 'axios'
import { Link } from 'react-router-dom'

class ContactList extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            contacts: []
        }
    }
    componentDidMount() {
        document.title = "Contact List"
        
        const token = localStorage.getItem('token')
        if(token){
            axios.get('http://localhost:3005/contacts', {
                    headers: {
                        'x-auth': token
                    }
                })
                .then(response => {
                    console.log(response.data)
                    this.setState(() => ({
                        contacts: response.data
                    }))
                })
        }
    }
    render() {
        return (            
            <div className="contactList">
                <div className="container">
                    <h2>Listing Contacts - { this.state.contacts.length }</h2>
                    { this.state.contacts.length === 0 ? (
                        <p className="empty">No contacts found. Add your first contact</p>
                    ) : (
                        <table className="table table-bordered table-stripped table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>City</th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.contacts.map((contact,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.mobile}</td>
                                            <td>{contact.city}</td>
                                            <td className="gender">{contact.gender}</td>
                                            <td>
                                                <Link to={`contacts/${contact._id}`} className="btn btn-info mr-1">View</Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>                        
                        </table>
                    ) } 
                    <Link to="/contacts/new" className="btn btn-primary">Add Contact</Link>
                </div>
            </div>
        )
    }
}
export default ContactList