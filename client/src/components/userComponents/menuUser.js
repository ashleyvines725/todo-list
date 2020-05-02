import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import "./style.css"
import EditionList from './editionList'
import Welcome from './accueuil'
import EditTask from './taskDetails'

class menuUser extends Component { 
    constructor(props){
        super(props)
        const token = localStorage.getItem("token");
        let loggedIn = true;
        if(token === null){
            loggedIn =false;
        }
        this.state = {loggedIn,
            currentList:'',
            editing:false,
            editingTask:false,
            autreList:'',
            listes  :[ 
                
         ],
    }}

    handleStatusTask = (idTache,idListe,tache) =>{
        const listes=[...this.state.listes];
        const indexListe=listes.findIndex(liste => liste.id ===idListe)
        const indexTache=listes[indexListe].taches.findIndex(tache=>tache.id===idTache)
        listes[indexListe].taches[indexTache].done="line";
        listes[indexListe].taches[indexTache].checked="true" //test
        this.setState({listes})
    }

    handleTask= id =>{
        this.setState({editingTask:true})
        console.log(this.state.editingTask)
    }

    handleChange = (e) =>{
        const value=e.currentTarget.value;
        this.setState({autreList:value});
    }

    handleSubmit = (event) =>{
        event.preventDefault(); 
        const listes=[...this.state.listes];
        const title=this.state.autreList;
        const id=new Date().getTime();
        const idTache=new Date().getTime();
        const autreList={id,
                         titre:title,
                         taches :[],
                         nbrTaches :''} 
        this.setState({currentList:autreList})                   
        listes.push(autreList);                  
        this.setState({listes,autreList:'',editing:true})                        
       }

    handleEdit = ()=>{    
        this.setState({editing:false})      
    }

    handleAdd = (taches,id)=>{
         const listes=[...this.state.listes]
        const index = listes.findIndex(liste=>{return liste.id ===id})
        const liste= {id,
                titre:this.state.listes[index].titre,
                taches ,
                nbrTaches :taches.length} ;
        listes.splice(index,1)
        listes.push(liste)
        this.setState({currentList:liste})
        this.setState({listes})
    }

    handleClick = (id) =>{
        console.log(id)
        const listes=[...this.state.listes]
        const index = listes.findIndex(liste=>{return liste.id ===id})
        this.setState({currentList:this.state.listes[index]})
        this.setState({editing:true})  
    }

    handleDelete = (id)=>{
        const listes=[...this.state.listes]
        const index = listes.findIndex(liste => liste.id ===id)
        listes.splice(index,1)
        this.setState({listes,editing:false})
    }
    handleDeleteTask = (idTache,idListe) => {
        const indexListe=this.state.listes.findIndex(liste => liste.id ===idListe)
        const indexTache=this.state.listes[indexListe].taches.findIndex(tache=>tache.id===idTache)
        this.state.listes[indexListe].taches.splice(indexTache,1);
        this.state.listes[indexListe].nbrTaches-- ;
    }
   
    render(){   
        if(this.state.loggedIn === false)
            return <Redirect to ="/"/>
        else if(this.state.editing===true){
            return(       
                <div  className="row container edit">
                    <div className="col-3 left-component ">
                        <div className="menu-item">
                     <div className="pb-4"><p>{this.props.location.state.user} </p> </div>           
                    <h2>{this.props.user}</h2>
                    <h2>Mes Listes</h2><hr></hr>
                 <ul className="list-group">{this.state.listes.map(liste =>(
                        <li>{liste.titre}<button className="float-right btn"  onClick={()=>this.handleClick(liste.id)}><span class="glyphicon glyphicon-pencil"></span>   </button><span class="badge badge-danger float-right">{liste.nbrTaches}</span></li>
                     ))}
                 </ul>
                 <form onSubmit={this.handleSubmit}>
                 <input className="btn" onChange={this.handleChange} value={this.state.autreList} placeholder="Nouvelle liste" type="text"/><button className="btn float-right"><span class="glyphicon glyphicon-plus"></span></button> </form>   
                    <Link className="pt-4" to="/logout"><span class="glyphicon glyphicon-off"></span></Link></div>
                 
                    
                </div> 
                <div className="taches col-9">                         
                   <EditionList className="  " user ={this.props.location.state.user} details={this.state.currentList} onEdit={this.handleEdit} 
                    onDelete={this.handleDelete} onDeleteTask={this.handleDeleteTask} onAdd={this.handleAdd} 
                    taskEdit={this.handleTask} handleCheck={this.handleStatusTask}/>                                 
                </div></div> 
            )     
       
        }else{
          return (        
            <div className="row container">
                 <div className="col-3 left-component">
            
                    <p>{this.props.location.state.user}</p>                         
                     <h2 className="pb-4">{this.props.user}</h2>
                    <h2 >Mes Listes</h2><hr></hr>
                     <ul className="list-group">{this.state.listes.map(liste =>(
                        <li>{liste.titre}<button className="float-right btn" onClick={()=>this.handleClick(liste.id)} ><span class="glyphicon glyphicon-pencil"></span></button><span className="badge badge-danger float right"></span></li>          
                 ))}
                 </ul>
                 <div className="pb-1">
                 <form  onSubmit={this.handleSubmit}>
                 <input className="btn" onChange={this.handleChange} value={this.state.autreList}  placeholder="Nouvelle liste" type="text"/><button className="btn float-right"><span class="glyphicon glyphicon-plus"></span></button> </form>   
                  </div><div></div><Link className="mt-4"  to="/logout"><span class="glyphicon glyphicon-off"></span></Link>             
               </div>          
              <div className="edit_container"> <Welcome className="col-md-6" /> </div>                   
            </div>
        )
          }
    }
}
export default menuUser
