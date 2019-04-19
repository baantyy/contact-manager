import React from 'react' 

class Home extends React.Component{
    componentDidMount(){
        document.title = 'Contact App'
    }

    render(){
        return(
            <div className="jumbotron jumbotron-fluid mt-2">
                <div className="container">
                    <h1 className="display-4">Contact + Note App</h1>
                    <p className="lead">Built using Node + Express + React + Mongo</p>
                </div>
            </div>
        )
    }
}

export default Home