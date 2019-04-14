import React from 'react' 

class ContactForm extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            name: props.contact ? props.contact.name : '' ,
            email: props.contact ? props.contact.email : '',
            mobile: props.contact ? props.contact.mobile : '', 
            city: props.contact ? props.contact.city : '',
            errors: props.contact ? props.contact.errors : {}
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
                    <div className="form-row">
                        <div className="col-md-4">
                            Name
                        </div>
                        <div className="col-md-4 mb-2">
                            <input type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Name"
                                />
                        </div>
                        <div className="col-md-4">
                            {/* {this.state.errors.name && <p className="text text-danger"> {this.state.errors.name.message} </p>} */}
                        </div>
                        <div className="col-md-4">
                            Mobile
                        </div>
                        <div className="col-md-4 mb-2">
                            <input type="text"
                                    name="mobile"
                                    value={this.state.mobile}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Mobile"
                                />
                        </div>
                        <div className="col-md-4">
                            {/* {this.state.errors.mobile && <p className="text text-danger"> {this.state.errors.mobile.message} </p>} */}
                        </div>
                        <div className="col-md-4">
                            Email
                        </div>
                        <div className="col-md-4 mb-2">
                            <input type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Email"
                                />
                        </div>
                        <div className="col-md-4">
                            {/* {this.state.errors.email && <p className="text text-danger"> {this.state.errors.email.message} </p>} */}
                        </div>
                        <div className="col-md-4">
                            City
                        </div>
                        <div className="col-md-4 mb-2">
                            <input type="text"
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="City"
                                />
                        </div>
                        <div className="col-md-4">
                            {/* {this.state.errors.city && <p className="text text-danger"> {this.state.errors.city.message} </p>} */}
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary" />
                </form>
            </div>
        )
    }
}

export default ContactForm