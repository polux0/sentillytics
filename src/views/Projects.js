import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {Chart} from '../components/Chart';
import {Auth} from '../components/Auth';


class Projects extends Component {

	constructor(props) {

	    super(props);

      this.state = { 
        userId: Auth.userId,
        userName: Auth.name,
        userLastName: Auth.lastName,
        projects: []
      };

      this.createProject = this.createProject.bind(this);
      this.deleteProject = this.deleteProject.bind(this);
      this.getProjects = this.getProjects.bind(this);
  }
  
  getProjects(){
    fetch(`${process.env.REACT_APP_API}/projects/get`, 
      {
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: JSON.stringify({
          userId: this.state.userId
        })
       })
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result);
          this.setState({
            projects: result.data
          });
          //console.log(this.state.projects);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            // isLoaded: true,
            // error
          });
        }
      )
  }

  componentDidMount() {
    this.getProjects();
  }

  deleteProject(projectId) {
    fetch(`${process.env.REACT_APP_API}/project/delete`, 
      {
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: JSON.stringify({
          Auth,
          projectId: projectId
        })
       })
      .then(res => res.json())
      .then(
        (result) => {
          this.getProjects();
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {

        }
      )
  }

  createProject() {
    fetch(`${process.env.REACT_APP_API}/project/create`, 
      {
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: JSON.stringify({
          userId: this.state.userId,
          projectName: 'test project name',
          projectDescription: 'test project description some longer text here is traveling to Una'
        })
       })
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result);
          // this.setState({
          //   projects: result.data
          // });
          //console.log(this.state.projects);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            // isLoaded: true,
            // error
          });
        }
      )
  }

  render() {

    //const listItems = this.state.projects.map((d) => <li key={d.name}>{d.name}</li>);

    return (
      <div>
        <h1>Projects</h1>
        <p>{this.props.match.params.lang}</p>
        <p>userId: {this.state.userId}</p>
        <p>user name: {this.state.userName} {this.state.userLastName}</p>
        <button onClick={this.createProject}>
          Create New Project
        </button>
        <h2>Project list: </h2>
        {this.state.projects.map(function(item, index){
          return(
              <div className="project-container" key={index} >
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>id: {item.id}</p>
                <Link to={"/project/"+item.id}>
                     <button type="button">
                          View Project
                     </button>
                 </Link>
                 <button className="project-delete" onClick={() => this.deleteProject(item.id)}>x</button>
              </div>
            );
        },this)}
      </div>
      
    )
  }
}

export default Projects;