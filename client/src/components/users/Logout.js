import React from 'react' 
import axios from 'axios'

class Logout extends React.Component {
    constructor(props) {
        super(props) 
    }

    componentWillMount(){

        axios.delete('http://localhost:3005/users/logout')
            .then(response => {
                if (response.data.errors) {
                    console.log(response.data.errors)
                } else {
                    localStorage.removeItem('token')
                    this.props.history.push('/login')
                    this.props.handleAuthentication(false)
                }
            })
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default Logout