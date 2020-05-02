import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Welcome from "./accueuil"
import './style.css' 

class EditionList extends Component{
    state = {
        taches :[],
        finis:[],
        barrer:'',
        editing:false,
        nouvelleTache: '',
        tache:'',    
    }
    handleDelete = () =>{
        this.props.onEdit()
    }

    handleClick = (id) =>{     
      this.props.taskEdit(id)
    }

    handleChange = (e) =>{
        this.setState({nouvelleTache:e.currentTarget.value})               
    }

    handleSubmit = e => {
        e.preventDefault();
        const taches=[...this.props.details.taches]
        const id=new Date().getTime();
        const tache={
            id:id,description:this.state.nouvelleTache,echéance:'',note:'',done:'',checked:'' //check test, done pour "barrer la ligne qd tache terminée"
        } 
        
        //POUR ENREGISTRER LES TACHES DANS LA DB
        // console.log(localStorage)
        
        // fetch('http://localhost:5000/taches', {
        //     method: 'POST',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json',
        //       'Authorization': 'Bearer ' + localStorage.getItem("token"),
        //     },
        //     body: JSON.stringify({
        //       id:id,
        //       name:this.state.nouvelleTache,
        //       id_Liste:this.props.details.id,
        //       liste_name:this.props.details.titre,
        //       username:this.props.user,
        //       description:''
        //     })
        //     }).then(res=>{
        //           res.json()
        //        .then((resp)=>console.log(resp));
        //        if(res.ok){
        //          console.log(res)     
        //        }
        //      })           
            
        taches.push(tache);
        this.setState({tache})
        this.props.onAdd(taches,this.props.details.id)
        this.setState({taches,nouvelleTache:''})
    }

    handleCheck = (idTache,idListe,tache) =>{
        this.props.handleCheck(idTache,idListe,tache);       
    }

    render(){ 
        
      return  (
        <div className="edit_container"> 
                <h1 className="pb-1">{this.props.details.titre}<button type="button" className="btn btn-danger btn-sm float-right" 
                onClick={()=>this.props.onDelete(this.props.details.id)} >Supprimer la liste</button></h1>
                <hr ></hr>
            <div>
            <ul className="taches pr-1">{this.props.details.taches.map(tache=>
                <li  onClick={()=>this.handleClick(tache.id)}> <input type="radio" checked={tache.checked} onChange={()=>this.handleCheck(tache.id,this.props.details.id,tache)}/>
               <label className={tache.done} > {tache.description}</label>
                <button type="button float-rigth" className="close" aria-label="Close" onClick={()=>this.props.onDeleteTask(tache.id,this.props.details.id)}>
                <span class="glyphicon glyphicon-trash"></span></button>
                <hr></hr>
                </li>)}
                
            <form onSubmit={this.handleSubmit}><button className="btn"><span class="glyphicon glyphicon-plus"></span></button>
            <input className="btn" onChange={this.handleChange} value ={this.state.nouvelleTache} 
            type ="text"placeholder="Ajouter tâche"/></form>
        
            </ul></div>

        </div>)
    }
}
export default EditionList