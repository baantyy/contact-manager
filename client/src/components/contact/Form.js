import React from 'react' 

class ContactForm extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            name: props.contact ? props.contact.name : '' ,
            email: props.contact ? props.contact.email : '',
            mobile: props.contact ? props.contact.mobile : '', 
            city: props.contact ? props.contact.city : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            city: this.state.city
        }
        this.props.handleSubmit(formData)
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <input type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Name"
                    />
                    {this.props.errors.name && <p className="text-danger"> {this.props.errors.name.message} </p>}

                    <input type="text"
                        name="mobile"
                        value={this.state.mobile}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Mobile"
                    />
                    {this.props.errors.mobile && <p className="text-danger"> {this.props.errors.mobile.message} </p>}

                    <input type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Email"
                    />
                    {this.props.errors.email && <p className="text-danger"> {this.props.errors.email.message} </p>}

                    <input type="text"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="City"
                    />
                    {this.props.errors.city && <p className="text-danger"> {this.props.errors.city.message} </p>}
 
                    <button type="submit" className="btn btn-primary">
                        {this.props.submitBtn !== '' ? this.props.submitBtn : <i className="fa fa-spin fa-spinner"></i>}
                    </button>
                            
                </form>
            </div>
        )
    }
}

export default ContactForm