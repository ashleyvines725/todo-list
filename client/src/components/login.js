import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import '../styles.css';

class LoginForm extends Component {
  constructor(props){
    super(props)
    const token=localStorage.getItem("token")
    let loggedIn = true
    if(token === null ) {
          loggedIn=false;
        }         
          this.state = {
              username: "",
              password: "",
              loggedIn,
              message:'',
              is_valide:"false",
        };
      }

  render() {
    if(this.state.loggedIn===true && this.state.is_valide)
       return <Redirect to ={{pathname:"/menuUser", state : {user: this.state.username}}} />
     return (
      <form onSubmit={this.handleSubmit} className="form" >
        <p >Adresse e-mail</p>
          <input className="input" value={this.state.username} onChange={this.handleChange} placeholder="Email"/>
        <p >Mot de passe</p>
          <input className="input" type="password" value={this.state.password} onChange={this.handleChange} placeholder="password"/>
        <p><button>Connexion</button></p>
        <Link to="/signup">Pas encore de compte? Inscrivez vous!</Link>{this.state.message}
      </form>)
  }

  handleChange = e => {
    e.currentTarget.placeholder==="Email"? 
    this.setState({username:e.currentTarget.value,message:''}):this.setState({password:e.currentTarget.value,message
    :''});  
  };

  handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username:this.state.username,
        password : this.state.password
      })
      }).then(res=>res.json())
        .then(resp=>(console.log(resp.is_valide),
          localStorage.setItem("token",resp.token),          
          this.setState({loggedIn:true,is_valide:resp.is_valide}),
          console.log(resp.token)
          ))
        
      .catch(err=>console.log("erreur")) 
      
    }
} 
  
export default LoginForm
