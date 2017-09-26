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
	constructor(props) {
	    super(props);
	    this.state = {
	    	firtName: '',
	    	lastName: '',
	    	email: '',
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
    }
	
    handleChange(event) {
	    const target = event.target;
	    const value = target.type === 'radio' ? target.checked : target.value;
	    const name = target.name;
	
	    this.setState({
	      [name]: value
	    });
	}
	
    handleSubmit(event) {
    	event.preventDefault();
    	if (this.state.type == 'owner') {
    		this.props.history.push('/page-2');
    	}
    	else {
    		this.props.history.push('/page-3');
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
						
						
						Address:<br />
						<br />
						Street Number:<br />
						<input name="street1" type="text" value={this.state.street1} onChange={this.handleChange} required/><br />
						*Street Address 2:<br />
						<input name="street2" type="text" value={this.state.street2} onChange={this.handleChange} /><br />
						*PO Box:<br />
						<input name="po" type="text" value={this.state.po} onChange={this.handleChange} /><br />
						ZIP Code:<br />
						<input name="zip" type="number" value={this.state.zip} onChange={this.handleChange} required/><br />
						State:<br />
						<input name="state" type="text" value={this.state.state} onChange={this.handleChange} required/><br />
						Phone Number:<br />
						<input name="phone" type="number" value={this.state.phone} onChange={this.handleChange} required/><br />
						
						
						<input type="radio" name="gender" value="male" onChange={this.handleChange} required/> Male<br />
  						<input type="radio" name="gender" value="female" onChange={this.handleChange} /> Female<br />
  						<input type="radio" name="type" value="owner" onChange={this.handleChange} required/> Pet Owner Account<br />
  						<input type="radio" name="type" value="sitter" onChange={this.handleChange} /> Pet Sitter Account<br />
  						<input type="submit" value="Submit" />
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
				This is page 2.
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