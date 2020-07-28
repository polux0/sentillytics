import React, { Component } from 'react';
import {Auth} from '../components/Auth';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";




class Login extends Component {

	constructor(props) {
    super(props);
    this.state = {value: ''};
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      redirectToReferrer: false,
      loggedIn: false
    }

    console.log('ff '+ Auth.isAuthenticated);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  login = () => {

    Auth.email = this.state.email;
    Auth.password = this.state.password
    Auth.authenticate(() => {
      console.log('ath');
      
      this.setState(() => ({
        redirectToReferrer: true,
        loggedIn: true  
      }))

    })
  }

  logout = () => {
    Auth.signout(() => {
      this.setState(() => ({
        redirectToReferrer: false
      }))
    })
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'email is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': 'password is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    //this.setState({[name]: value}),
    this.setState({[name]: value}, () => { this.validateField(name, value) });
    console.log(event.target.name);
    //this.setState({email: event.target.value.toUpperCase()});
  }

  handleSubmit(event) {
    if(Auth.isAuthenticated){
      this.logout();
    }else{
      this.login();
    }
    //alert('A name was submitted: ' + this.state.email + "; with pass: " + this.state.password);
    event.preventDefault();
  }

  handleFrom(a){
    if(a == '/my-account'){
      return 'You need to be logged in to view this page.'
    }
  }

  render() {

    if(this.state.loggedIn){
      console.log('auth');
      return <Redirect to='/home' />
    }

    //console.log(this.props.location.state);
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    return (
      <div className="register-cont" >
      <form onSubmit={this.handleSubmit}>
      <p>{this.handleFrom(from.pathname)}</p>
        <label>
          Email:<br />
          <input type="text" value={this.state.email} onChange={this.handleChange} name='email' />
          <p className="errors">{this.state.formErrors.email}</p>
        </label>
        <br />
        <label>
          Password:<br />
          <input type="text" value={this.state.password} onChange={this.handleChange} name='password' />
          <p className="errors">{this.state.formErrors.password}</p>
        </label>
        <br />
        <input type="submit" value="Submit" />

      </form>
      </div>
    );
  }
}

export default Login;


