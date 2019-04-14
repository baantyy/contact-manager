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
        axios.get('http://localhost:3005/contacts', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState(() => ({
                    contacts: response.data
                }))
                console.log(this.state.contacts)
            })
    }
    render() {
        return (
            <div>
                <h2 className="mb-3">Listing Contacts</h2>
                { this.state.contacts.length === 0 ? (
                    <div>
                        No contacts found. Add your first contact 
                    </div>
                ) : (
                    <table className="table table-bordered table-stripped table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
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
                                        <td>
                                            <Link to={`contacts/${contact._id}/edit`} className="btn btn-info">Edit</Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>                        
                    </table>
                ) } 
                <Link to="/contacts/new" className="btn btn-primary">Add Contact</Link>
            </div>
        )
    }
}
export default ContactList