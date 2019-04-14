import React from 'react' 

class Logout extends React.Component {
    constructor(props) {
        super(props) 
    }

    componentDidMount(){
        localStorage.removeItem('token')
        this.props.history.push('/login')
        this.props.handleAuthentication(false)
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default Logout