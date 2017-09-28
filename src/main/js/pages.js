import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            message: 'Sweet'
        };
    }

    componentDidMount() {
        console.log('Home Component did mount');
        this.action();
    }

    action = () => {
        setTimeout(()=> { this.setState({message: 'It worked!'}); }, 3000);

		axios.get('https://tempeturs-group-2.herokuapp.com/api/owner/1')
		    .then(function (response) {
			console.log(response);
		    })
		    .catch(function (error) {
			console.log(error);
		    });
    }

    render() {
        return (
        <div className="container padded">
            <h1>This is the home page.</h1>
	    <ul>
		<li><Link to="/page-1">Page 1</Link></li>
		<li><Link to="/page-2">Page 2</Link></li>
		<li><Link to="/page-3">Page 3</Link></li>
	    </ul>
            <p>{this.state.message}</p>
        </div>
        );
    }
}

export class Page1 extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div>
					<h2>Registration</h2>
					<form>
						First Name:<br />
						<input type="text" name="firstname" /><br />
						Last name:<br />
						<input type="text" name="lastname" /><br />
						Email:<br />
						<input type="text" name="email" /><br />
						Address:<br />
						<br />
						Street Number:<br />
						<input type="text" name="street" /><br />
						*Street Address 2:<br />
						<input type="text" name="street" /><br />
						*PO Box:<br />
						<input type="text" name="PO Box" /><br />
						ZIP Code:<br />
						<input type="number" name="zip" /><br />
						State:<br />
						<input type="text" name="state" /><br />
						Phone Number:<br />
						<input type="number" name="number" /><br />
						<input type="radio" name="gender" value="male" checked /> Male<br />
  						<input type="radio" name="gender" value="female" /> Female<br />
  						<input type="radio" name="type" value="Pet Owner Account" checked /> Pet Owner Account<br />
  						<input type="radio" name="type" value="Pet Sitter Account" /> Pet Sitter Account
					</form>
				</div>
			</div>
		);
	}
}

export class Page2 extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div>
				    <h2>User Sign-in</h2>
				    <form>
				        Username: <br />
				        <input type="text" name="username" /><br />
				        Password: <br />
				        <input type="text" name="password">
				    </form>
				</div>
			</div>
		);
	}
}

export class Page3 extends React.Component {
	render() {
		return (
			<div className="container padded">
				This is page 3.
			</div>
		);
	}
}