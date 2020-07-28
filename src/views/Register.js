import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {Auth} from '../components/Auth';



class Register extends Component {

	constructor(props) {
    super(props);

    this.state = {value: ''};
    this.state = {
      email: '',
      password: '',
      validatePassword: '', 
      name: '', 
      lastName: '',
      formErrors: {email: '', password: '', validatePassword: '', name: '', lastName: ''},
      emailValid: false,
      passwordValid: false,
      validatePasswordValid: false,
      nameValid: false,
      lastNameValid: false,
      formValid: false,
      redirectToReferrer: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let validatePasswordValid = this.state.validatePasswordValid;
    let nameValid = this.state.nameValid;
    let lastNameValid = this.state.lastNameValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'email is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': 'password is too short';
        break;
      case 'validatePassword':
        validatePasswordValid = value == this.state.password;
        fieldValidationErrors.validatePassword = validatePasswordValid ? '': 'passwords do not match';
        break;
      case 'name':
        nameValid = value.length >= 3;
        fieldValidationErrors.name = nameValid ? '': 'name is too short';
        break;
      case 'lastName':
        lastNameValid = value.length >= 3;
        fieldValidationErrors.lastName = lastNameValid ? '': 'last name is too short';
        break;

      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    validatePasswordValid: validatePasswordValid,
                    nameValid: nameValid,
                    lastNameValid: lastNameValid

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

    if(this.state.emailValid 
      && this.state.passwordValid 
      && this.state.validatePasswordValid
      && this.state.nameValid
      && this.state.lastNameValid)
    {

      fetch(`${process.env.REACT_APP_API}/register`, 
      {
       method: 'post',
       headers: {'Content-Type':'application/x-www-form-urlencoded'},
       body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        lastName: this.state.lastName
      })
       })
    .then(res => res.json())
      .then(
        (result) => {

          console.log(result);
          if(result.success){
            this.isAuthenticated = true;
            return <Redirect to='/home' />
          }else{
            this.isAuthenticated = false;
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log('error');
        }
      )

    }else{
      console.log('not valid');
    }
    //console.log(this.state.emailValid);
    // fetch("http://api.sentilytics.com/api/register", 
    //   {
    //    method: 'post',
    //    headers: {'Content-Type':'application/json'},
    //    body: JSON.stringify({
    //     email: this.state.email,
    //     password: this.state.password,
    //     name: this.state.name,
    //     lastName: this.state.lastName
    //   })
    //    })
    // .then(res => res.json())
    //   .then(
    //     (result) => {
    //       if(result.success){
    //         this.isAuthenticated = true;
    //         console.log(result);
    //       }else{
    //         this.isAuthenticated = false;
    //       }
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       console.log('error');
    //     }
    //   )
    //alert('A name was submitted: ' + this.state.email + "; with pass: " + this.state.password);
    event.preventDefault();
  }

  render() {

    return (
      <div className="register-cont" >
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:<br />
            <input type="text" value={this.state.email} onChange={this.handleChange} name='email' />
            <p className="errors">{this.state.formErrors.email}</p>
          </label>
          <br />
          <label>
            Password:<br />
            <input type="password" value={this.state.password} onChange={this.handleChange} name='password' />
            <p className="errors">{this.state.formErrors.password}</p>
          </label>
          <br />
          <label>
            Verify Password:<br />
            <input type="password" value={this.state.validatePassword} onChange={this.handleChange} name='validatePassword' />
            <p className="errors">{this.state.formErrors.validatePassword}</p>
          </label>
          <label>
            Name:<br />
            <input type="text" value={this.state.name} onChange={this.handleChange} name='name' />
            <p className="errors">{this.state.formErrors.name}</p>
          </label>
          <label>
            Last Name:<br />
            <input type="text" value={this.state.lastName} onChange={this.handleChange} name='lastName' />
            <p className="errors">{this.state.formErrors.lastName}</p>
          </label>
          <br />
          <input type="submit" value="Register" />
        </form>
      </div>

    );
  }
}

export default Register;


