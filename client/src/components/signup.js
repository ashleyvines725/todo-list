import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import '../styles.css';
class Signup extends Component{
    state ={
        username:'',
        password:'',
        passwordConfirmed:'',
       
        send: false,
        message:''
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        if(this.state.password===this.state.passwordConfirmed && this.state.password!=="" && this.state.username!==''){
        fetch('http://localhost:5000/enregistrer', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username:this.state.username,
              password : this.state.password
      
            })
            }).then(res=>{
                  res.json()
               .then((resp)=>console.log(resp));
               if(res.ok){
                  this.setState({send:true});
                  console.log(res)          
               }
            })
            .catch(err=>console.log("erreur"))  
            } 
           this.setState({message: "Les mots de passe ne sont pas identiques"})  
     }

    handleChange = e => {
            const value =e.currentTarget.value;
            this.setState({[e.target.name] : e.target.value})              
            console.log(this.state)
         };
      
    render(){
        if(this.state.send===true)
            return <h2>Felicitations, votre inscription est un succès, veuillez regarder dans votre boite mail pour confirmer votre inscription</h2>
        return(

    <form  className="form" onSubmit={this.handleSubmit}><p>Adresse e-mail</p>
        <input className="input" type="text" placeholder="Email" name="username" onChange={this.handleChange}></input>
        <p>Mot de passe</p>
        <input className="input" type="password" placeholder="Mot de passe" name="password" onChange={this.handleChange}></input>
        <p>Répéter le mot de passe</p>
        <input className="input" type="password" placeholder="password"  name="passwordConfirmed" onChange={this.handleChange}></input>
        <p ><button className="btn">Inscription</button></p><p>{this.state.message}</p>      
    </form>)
    }
}
export default Signup