import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import {Auth} from '../components/Auth';
import logo from '../images/logo.jpg';

function Lhb(props) {
	if(props.loggedIn) {
		return <Link to="/" onClick={() => Auth.signout()} >Logout</Link>
	}else{
		return <Link to="/login">Login</Link>
	}
	//return <h1>Hello, {props.loggedIn}</h1>;
}



class Header extends Component {

	

  render() {
    return (
    	<div id="header">
    		
	      	<ul>
		  	{/*<img className='logo-image' src={logo} /> */}
		  		<li>
			      	Sentilytics
			    </li>
			    <li>
			      	<Link to="/">Home</Link>
			    </li>
			    <li>
			      	<Link to="/about">About</Link>
			    </li>
			    <li>
			      	<Link to="/topics">Topics</Link>
			    </li>
			    <li>
			      	<Link to="/analisys">Analisys</Link>
			    </li>
			    <li className="header-float-right">
			      	<Link userId={Auth.userId} to="/projects">Projects</Link>
			    </li>
			    <li className="header-float-right" >
			    	<Lhb loggedIn={Auth.isAuthenticated} />
			    </li>
			    <li className="header-float-right">
			      	<Link to="/my-account">My Account</Link>
			    </li>
			    <li className="header-float-right">
			      	<Link to="/register">Register</Link>
			    </li>
		 	</ul>
	  	</div>
    )
  }
}

export default Header;