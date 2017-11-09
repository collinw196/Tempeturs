import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            message: 'Welcome'
        };
    }

    componentDidMount() {
        console.log('Home Component did mount');
        this.action();
    }

    action = () => {
        setTimeout(()=> { this.setState({message: 'To Tempeturs Website!'}); }, 3000);
    }

    render() {
        return (
        <div className="container padded">
            <h1>{this.state.message}</h1>
	    	<h3>HOME</h3>
	    	<h7>Links</h7>
	    		<ul>
					<li><Link to="/login">Login</Link></li>
		    	</ul>
        </div>
        );
    }
}

export class Login extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	username:'',
	    	password: '',
	    	type: ''
	    };
	
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
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
    	const {username,
    		password} = this.state;
    		
    	var url = 'https://tempeturs-group-2.herokuapp.com/api/login';
    	console.log(password);
    	console.log(username);
    	
    	axios.post(url, {withCredentials:true}, {
		    username: this.state.username.value,
		    password: this.state.password.value
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
    	
    	url = 'https://tempeturs-group-2.herokuapp.com/api/owner/' + this.state.username;
    	
    	axios.get(url)
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
    	
    	if (this.state.type == 'owner') {
    		this.props.history.push('/owner/home');
    	}
    	else {
    		this.props.history.push('/sitter/home');
    	}
    }
    	
	
	render() {
		return (
			<div className="container padded">
				<div>
					<h2>Sign in</h2>
					<form onSubmit={this.handleSubmit}>
						Username:<br />
						<input type="text" name="username" onChange={this.handleChange} required/><br />
						Password:<br />
						<input type="password" name="password" onChange={this.handleChange} required/><br />
						<input type="radio" name="type" value="owner" onChange={this.handleChange} required/> Pet Owner Account<br />
  						<input type="radio" name="type" value="sitter" onChange={this.handleChange} /> Pet Sitter Account<br />
						<input type="submit" value="Submit" /><br />
						<li><Link to="/reg">Registration</Link></li>
					</form>
				</div>
			</div>
		);
	}
}