import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';


export class Registration extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	firstName: '',
	    	lastName: '',
	    	email: '',
	    	username: '',
	    	password: '',
	    	repassword: '',
	    	street1: '',
	    	street2: '',
	    	po: '',
	    	zip: '',
	    	state: '',
	    	phone: '',
	    	gender: '',
	    	type: ''
	    };
	
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.validatePassword = this.validatePassword.bind(this);
    }
    
    validatePassword(){
    	var password = document.getElementById('password'),
    		confirm_password = document.getElementById('confirm_password');
	    if(password.value != confirm_password.value) {
	    	confirm_password.setCustomValidity('Passwords Don\'t Match');
	    } else {
	    	confirm_password.setCustomValidity('');
	    }
	}
    
     handleChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
	
	    this.setState({
	      [name]: value
	    });
	}
	
    handleSubmit(event) {
    	event.preventDefault();
    	if(this.state.password !== this.state.repassword) {
    			this.setState({
	      		password: '',
	    		repassword: ''   
	    	});
	    	location.reload();
	    } else {
	    	const {firstName,
		    	lastName,
		    	email,
		    	username,
		    	password,
		    	repassword,
		    	street1,
		    	street2,
		    	po,
		    	zip,
		    	state,
		    	phone,
		    	gender,
		    	type} = this.state;
		    	
		    axios.post('https://tempeturs-group-2.herokuapp.com/api/user/reg', {withCredentials:true}, {
			    firstName,
		    	lastName,
		    	email,
		    	username,
		    	password,
		    	street1,
		    	street2,
		    	po,
		    	zip,
		    	state,
		    	phone,
		    	gender,
		    	type
			  })
			  .then(function (response) {
			    console.log(response);
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
			  
	    	if (this.state.type == 'owner') {
	    		this.props.history.push('/reg/owner');
	    	}
	    	else {
	    		this.props.history.push('/reg/sitter');
	    	}
	    }
    }
    
    render() {
		return (
			<div className="container padded">
				<div>
					<h2>Registration</h2>
					<form onSubmit={this.handleSubmit}>
						First Name:<br />
						<input name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange} required /><br />
						Last name:<br />
						<input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange} required /><br />
						Email:<br />
						<input name="email" type="text" value={this.state.email} onChange={this.handleChange} required pattern=".*@.*\..*"/><br />
						Username:<br />
						<input name="username" type="text" value={this.state.username} onChange={this.handleChange} required /><br />
						Password:<br />
						<input name="password" id="password" type="password" value={this.state.password} onChange={this.handleChange} required /><br />
						Reenter Password:<br />
						<input name="repassword" id="confirm-password" type="password" value={this.state.repassword} onChange={this.validatePassword} required /><br />
						
						
						Address:<br />
						<br />
						Street Number:<br />
						<input name="street1" type="text" value={this.state.street1} onChange={this.handleChange} required/><br />
						*Street Address 2:<br />
						<input name="street2" type="text" value={this.state.street2} onChange={this.handleChange} /><br />
						*PO Box:<br />
						<input name="po" type="text" value={this.state.po} onChange={this.handleChange} /><br />
						ZIP Code:<br />
						<input name="zip" type="text" value={this.state.zip} onChange={this.handleChange} required pattern="[0-9]{5}"/><br />
						State:<br />
						<input name="state" type="text" value={this.state.state} onChange={this.handleChange} required/><br />
						Phone Number:<br />
						<input name="phone" type="text" value={this.state.phone} onChange={this.handleChange} required pattern="[0-9]{10} | [0-9]{3}-[0-9]{3}-[0-9]{4}" /><br />
						
						<br />
						Gender: <br />
						<input type="radio" name="gender" value="male" onChange={this.handleChange} required/> Male<br />
  						<input type="radio" name="gender" value="female" onChange={this.handleChange} /> Female<br />
  						<br />
						Account Type (you may have one type of each account per email): <br />
  						<input type="radio" name="type" value="owner" onChange={this.handleChange} required/> Pet Owner Account<br />
  						<input type="radio" name="type" value="sitter" onChange={this.handleChange} /> Pet Sitter Account<br />
  						<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/> 
  						<input type="submit" value="Submit" />
  					</form>
				</div>
			</div>
		);
	}
}