import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export class OwnerInfo extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	user: '',
        	owner: ''
        };
    }

    componentDidMount() {		
        axios.get('https://tempeturs-group-2.herokuapp.com/api/user/get')
        .then(data => {
		    this.setState({user: data.data});
		})
		.catch(function (error) {
		    console.log(error);
		});
	
		axios.get('https://tempeturs-group-2.herokuapp.com/api/owner/get')
        .then(data => {
		    this.setState({owner: data.data});
		})
		.catch(function (error) {
		    console.log(error);
		});
    }

	render() {
		return (
			<div className="container padded">
				<div>
					<h4>User Info</h4>
					First Name: {this.state.user.firstName}<br />
					Last name: {this.state.user.lastName}<br />
					Email: {this.state.user.email}<br />
					Username: {this.state.user.username}<br />
					
					Street Number: {this.state.user.street1}<br />
					Street Address 2: {this.state.user.street2}<br />
					PO Box: {this.state.user.po}<br />
					ZIP Code: {this.state.user.zip}<br />
					State: {this.state.user.state}<br />
					Phone Number: {this.state.user.phone}<br />					
					Gender: {this.state.user.gender}<br />
					<br />
				</div>
				
				<div>
					<h4>Owner Info</h4>
					Card Number: {this.state.owner.crenumber}<br />
					CVV Number: {this.state.owner.ccvnumber}<br />
					Exp Month: {this.state.owner.expdatemonth}<br />
					Exp Year: {this.state.owner.expdateyear}<br />
					Name on Card: {this.state.owner.cardname}<br />
					<br />
				</div>
				<Link to="/user/edit?type=owner">Edit</Link>
			</div>
		);
	}
}

export class UserEdit extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	switchType: '',
	    	firstName: '',
	    	lastName: '',
	    	email: '',
	    	username: '',
	    	password: '',
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
    
    componentDidMount() {
		const search = this.props.location.search;
		const params = new URLSearchParams(search);
		const type = params.get('type');
		this.setState({
	    	switchType: type
	    });
	    
	    axios.get('https://tempeturs-group-2.herokuapp.com/api/user/get')
        .then(data => {
		    this.setState({
		    	firstName: data.data.firstName,
		    	lastName: data.data.lastName,
		    	email: data.data.email,
		    	username: data.data.username,
	    		password: data.data.password,
		    	street1: data.data.street1,
		    	street2: data.data.street2,
		    	po: data.data.po,
		    	zip: data.data.zip,
		    	state: data.data.state,
		    	phone: data.data.phone,
		    	gender: data.data.gender,
		    	type: data.data.type
		    });
		})
		.catch(function (error) {
		    console.log(error);
		});
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
	    axios({
		    method: 'POST',
		    url: 'https://tempeturs-group-2.herokuapp.com/api/user/edit',
		    data: {
		    	firstName: this.state.firstName,
		    	lastName: this.state.lastName,
		    	email: this.state.email,
		    	username: this.state.username,
		    	password: this.state.password,
		    	street1: this.state.street1,
		    	street2: this.state.street2,
		    	po: this.state.po,
		    	zip: this.state.zip,
		    	state: this.state.state,
		    	phone: this.state.phone,
		    	gender: this.state.gender,
		    	type: this.state.type
		    }
		})
		.then(function (response) {
		    console.log(response);
		})
		.catch(function (error) {
		    console.log(error);
		});
		  
    	if (this.state.switchType == 'owner') {
    		this.props.history.push('/owner/edit');
    	}
    	else {
    		this.props.history.push('/sitter/edit');
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
						<input name="zip" type="text" value={this.state.zip} onChange={this.handleChange} required pattern="[0-9]{5}"/><br />
						State:<br />
						<input name="state" type="text" value={this.state.state} onChange={this.handleChange} required/><br />
						Phone Number: (###-###-####)<br />
						<input name="phone" type="text" value={this.state.phone} onChange={this.handleChange} required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" /><br />
						
						<br />
						Gender: <br />
						<input type="radio" name="gender" value="male" onChange={this.handleChange} required/> Male<br />
  						<input type="radio" name="gender" value="female" onChange={this.handleChange} /> Female<br />
  						<br />
  						<input type="submit" value="Submit" />
  					</form>
				</div>
			</div>
		);
	}
}

export class OwnerEdit extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	crenumber: '',
	    	ccvnumber: '',
	    	expdatemonth: '',
	    	expdateyear: '',
	    	cardname: ''	    	
	    };
	
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {	    
	    axios.get('https://tempeturs-group-2.herokuapp.com/api/owner/get')
        .then(data => {
		    this.setState({
			    crenumber: data.data.crenumber,
		    	ccvnumber: data.data.ccvnumber,
		    	expdatemonth: data.data.expdatemonth,
		    	expdateyear: data.data.expdateyear,
		    	cardname: data.data.cardname
		    });
		})
		.catch(function (error) {
		    console.log(error);
		});
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
    	axios({
		    method: 'POST',
		    url: 'https://tempeturs-group-2.herokuapp.com/api/owner/edit',
		    data: {
			    crenumber: this.state.crenumber,
	    		ccvnumber: this.state.ccvnumber,
	    		expdatemonth: this.state.expdatemonth,
	    		expdateyear: this.state.expdateyear,
	    		cardname: this.state.cardname
		    }
		})
		.then(function (response) {
		    console.log(response);
		})
		.catch(function (error) {
		    console.log(error);
		});
		  
    	this.props.history.push('/owner/home');
    }
    
	render() {
		return (
			<div className="container padded">
				<div>
					<h5>Pet Owner Payment Information</h5>
					<form onSubmit={this.handleSubmit}>
						Name on Card:<br />
						<input name="cardname" type="text" value={this.state.cardname} onChange={this.handleChange} required /><br />
						Card Number:<br />
						<input name="crenumber" type="number" value={this.state.crenumber} onChange={this.handleChange} required /><br />
						CVV:<br />
						<input name="ccvnumber" type="number" value={this.state.ccvnumber} onChange={this.handleChange} required /><br />
						Exp. Date Month:<br />
						<input name="expdatemonth" type="number" value={this.state.expdatemonth} onChange={this.handleChange} required /><br />
						Exp. Date Year:<br />
						<input name="expdateyear" type="number" value={this.state.expdateyear} onChange={this.handleChange} required /><br />
						
						<input type="submit" value="Submit" />
					</form>
				</div>
			</div>
		);
	}
}

export class SitterInfoDisplay extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	user: '',
        	sitter: ''
        };
    }

    componentDidMount() {		
        axios.get('https://tempeturs-group-2.herokuapp.com/api/user/get')
        .then(data => {
		    this.setState({user: data.data});
		})
		.catch(function (error) {
		    console.log(error);
		});
	
		axios.get('https://tempeturs-group-2.herokuapp.com/api/sitter/get')
        .then(data => {
		    this.setState({owner: data.data});
		})
		.catch(function (error) {
		    console.log(error);
		});
    }

	render() {
		return (
			<div className="container padded">
				<div>
					<h4>User Info</h4>
					First Name: {this.state.user.firstName}<br />
					Last name: {this.state.user.lastName}<br />
					Email: {this.state.user.email}<br />
					Username: {this.state.user.username}<br />
					
					Street Number: {this.state.user.street1}<br />
					Street Address 2: {this.state.user.street2}<br />
					PO Box: {this.state.user.po}<br />
					ZIP Code: {this.state.user.zip}<br />
					State: {this.state.user.state}<br />
					Phone Number: {this.state.user.phone}<br />					
					Gender: {this.state.user.gender}<br />
					<br />
				</div>
				
				<div>
					<h4>Sitter Info</h4>
					Account Number: {this.state.owner.accountNumber}<br />
					Routing Number: {this.state.owner.routingNumber}<br />
					Preference 1: {this.state.owner.preference1}<br />
					Preference 2: {this.state.owner.preference2}<br />
					Preference 3: {this.state.owner.preference3}<br />
					Rating: {this.state.owner.rating}<br />
					<br />
				</div>
				<Link to="/user/edit?type=sitter">Edit</Link>
			</div>
		);
	}
}

export class SitterEdit extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	accountNumber: '',
	    	routingNumber: '',
	    	preference1: 'dog',
	    	preference2: 'dog',
	    	preference3: 'dog'    	
	    };
	
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {	    
	    axios.get('https://tempeturs-group-2.herokuapp.com/api/sitter/get')
        .then(data => {
		    this.setState({
			    accountNumber: data.data.accountNumber,
		    	routingNumber: data.data.routingNumber,
		    	preference1: data.data.preference1,
		    	preference2: data.data.preference2,
		    	preference3: data.data.preference3 
		    });
		})
		.catch(function (error) {
		    console.log(error);
		});
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
    	axios({
		    method: 'POST',
		    url: 'https://tempeturs-group-2.herokuapp.com/api/sitter/edit',
		    data: {
			    accountNumber: this.state.accountNumber,
		    	routingNumber: this.state.routingNumber,
		    	preference1: this.state.preference1,
		    	preference2: this.state.preference2,
		    	preference3: this.state.preference3
		    }
		})
		.then(function (response) {
		    console.log(response);
		})
		.catch(function (error) {
		    console.log(error);
		});
		
    	this.props.history.push('/sitter/home');
    }
	render() {
		return (
			<div className="container padded">
				<div>
					<h5>Pet Sitter Information</h5>
					<form onSubmit={this.handleSubmit}>
						Payment Account Number:<br />
						<input name="accountNumber" type="number" value={this.state.accountNumber} onChange={this.handleChange} required /><br />
						Payment Routing Number:<br />
						<input name="routingNumber" type="number" value={this.state.routingNumber} onChange={this.handleChange} required /><br />
						Pet Preference 1:<br />
						<select name="preference1" onChange={this.handleChange} required>
							<option value="dog" selected>Dog</option>
							<option value="cat" >Cat</option>
							<option value="horse" >Horse</option>
							<option value="ferret" >Ferret</option>
							<option value="rabbit" >Rabbit</option>
							<option value="fish" >Fish</option>
						</select><br />
						Pet Preference 2:<br />
						<select name="preference2" onChange={this.handleChange} required>
							<option value="dog" selected>Dog</option>
							<option value="cat" >Cat</option>
							<option value="horse" >Horse</option>
							<option value="ferret" >Ferret</option>
							<option value="rabbit" >Rabbit</option>
							<option value="fish" >Fish</option>
						</select><br />
						Pet Preference 3:<br />
						<select name="preference3" onChange={this.handleChange} required>
							<option value="dog" selected>Dog</option>
							<option value="cat" >Cat</option>
							<option value="horse" >Horse</option>
							<option value="ferret" >Ferret</option>
							<option value="rabbit" >Rabbit</option>
							<option value="fish" >Fish</option>
						</select><br />
						<input type="submit" value="Submit" />
					</form>
				</div>
				
			</div>
		);
	}
}