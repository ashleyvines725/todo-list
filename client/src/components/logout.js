import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Logout extends Component {
    constructor(props){
        super(props)
            localStorage.removeItem("token")
        }  
    render(){
        return (
            <div><h3>Vous vous êtes déconnecté!</h3>
                <Link to="/">Reconnectez vous</Link>
            </div>
        )
    }
}
export default Logout