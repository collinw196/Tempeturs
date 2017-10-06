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
		<li><Link to="/login">Login</Link></li>
	    </ul>
            <p>{this.state.message}</p>
        </div>
        );
    }
}

export class Registration extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	firtName: '',
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
    	const {firtName,
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
	    	
	    axios.post('/api/pet/reg', {
		    firtName,
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
		  },
		  {	  	
		  	withCredentials: true,
		  	
		  	header: {'X-CSRF-TOKEN': document.querySelector('meta[name="JSESSIONID"]').getAttribute('content')}
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
						<input name="password" type="password" value={this.state.password} onChange={this.handleChange} required /><br />
						Reenter Password:<br />
						<input name="repassword" type="password" value={this.state.repassword} onChange={this.handleChange} required /><br />
						
						
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
						<input type="text" name="username" /><br />
						Password:<br />
						<input type="text" name="password" /><br />
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


export class PetInfo extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	petname: '',
	    	pettype: '',
	    	age: '',
	    	notes: ''	    	
	    };
	
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.nextPet = this.nextPet.bind(this);
	    this.pushData = this.pushData.bind(this);
    }
	
    handleChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
	
	    this.setState({
	      [name]: value
	    });
	}
	
	nextPet(event) {
    	event.preventDefault();
    	
    	this.pushData();
    	this.setState({
	      	petname: '',
	    	pettype: '',
	    	age: '',
	    	notes: ''	   
	    });
    	location.reload();
    }
	
    handleSubmit(event) {
    	event.preventDefault();
    	this.pushData();
    	this.props.history.push('https://tempeturs-group-2.herokuapp.com/reg/owner/pay');
    }
    
    pushData() {
    	const {petname,
    		pettype,
    		age,
    		notes} = this.state;
    	
    	axios.post('/api/pet/reg', {withCredentials:true}, {
		    petname,
    		pettype,
    		age,
    		notes
		  })
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
				<div>
					<h5>Pet Information</h5>
					<form onSubmit={this.handleSubmit}>
						Pet Name:<br />
						<input name="petname" type="text" value={this.state.petname} onChange={this.handleChange} required /><br />
						Pet Type:<br />
						<select name="pettype" onChange={this.handleChange} required>
							<option value="dog" selected>Dog</option>
							<option value="cat" selected>Cat</option>
							<option value="horse" selected>Horse</option>
							<option value="ferret" selected>Ferret</option>
							<option value="rabbit" selected>Rabbit</option>
							<option value="fish" selected>Fish</option>
						</select>
						<br />
						*Age:<br />
						<input name="age" type="number" value={this.state.age} onChange={this.handleChange} /><br />
						*Notes:<br />
						<input name="notes" type="text" value={this.state.notes} onChange={this.handleChange} /><br />
						
						<input type="button" value="Next Pet" onClick={this.nextPet} />
  						<input type="submit" value="Submit" />
  					</form>
  				</div>
			</div>
		);
	}
}

export class SitterInfo extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	accnumber: '',
	    	rounumber: '',
	    	pettype1: '',
	    	pettype2: '',
	    	pettype3: ''	    	
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
    	const {accnumber,
    		rounumber,
    		pettype1,
    		pettype2,
    		pettype3} = this.state;
    	
    	axios.post('https://tempeturs-group-2.herokuapp.com/api/sitter/reg', {withCredentials:true}, {
		    accnumber,
    		rounumber,
    		pettype1,
    		pettype2,
    		pettype3
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
    	this.props.history.push('/');
    }
	render() {
		return (
			<div className="container padded">
				<div>
					<h5>Pet Sitter Information</h5>
					<form onSubmit={this.handleSubmit}>
						Payment Account Number:<br />
						<input name="accnumber" type="number" value={this.state.accnumber} onChange={this.handleChange} required /><br />
						Payment Routing Number:<br />
						<input name="rounumber" type="number" value={this.state.rounumber} onChange={this.handleChange} required /><br />
						Pet Preference 1:<br />
						<select name="pettype1" onChange={this.handleChange} required>
							<option value="dog" selected>Dog</option>
							<option value="cat" selected>Cat</option>
							<option value="horse" selected>Horse</option>
							<option value="ferret" selected>Ferret</option>
							<option value="rabbit" selected>Rabbit</option>
							<option value="fish" selected>Fish</option>
						</select><br />
						Pet Preference 2:<br />
						<select name="pettype2" onChange={this.handleChange} required>
							<option value="dog" selected>Dog</option>
							<option value="cat" selected>Cat</option>
							<option value="horse" selected>Horse</option>
							<option value="ferret" selected>Ferret</option>
							<option value="rabbit" selected>Rabbit</option>
							<option value="fish" selected>Fish</option>
						</select><br />
						Pet Preference 3:<br />
						<select name="pettype3" onChange={this.handleChange} required>
							<option value="dog" selected>Dog</option>
							<option value="cat" selected>Cat</option>
							<option value="horse" selected>Horse</option>
							<option value="ferret" selected>Ferret</option>
							<option value="rabbit" selected>Rabbit</option>
							<option value="fish" selected>Fish</option>
						</select><br />
						<input type="submit" value="Submit" />
					</form>
				</div>
				
			</div>
		);
	}
}

export class OwnerPayment extends React.Component {
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
    	const {crenumber,
    		ccvnumber,
    		expdatemonth,
    		expdateyear,
    		cardname} = this.state;
    	
    	axios.post('https://tempeturs-group-2.herokuapp.com/api/owner/reg', {withCredentials:true}, {
		    crenumber,
    		ccvnumber,
    		expdatemonth,
    		expdateyear,
    		cardname
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
    	this.props.history.push('/');
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
						CCV:<br />
						<input name="cvvnumber" type="number" value={this.state.cvvnumber} onChange={this.handleChange} required /><br />
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

export class OwnerHome extends React.Component {
	constructor(props) {
	    super(props);
    }
    
	render() {
		return (
			<div className="container padded">
				<div>
					<h5>Pet Owner Home Page</h5>
				</div>
				
			</div>
		);
	}
}

export class SitterHome extends React.Component {
	constructor(props) {
	    super(props);
    }
    
	render() {
		return (
			<div className="container padded">
				<div>
					<h5>Pet Sitter Home Page</h5>
				</div>
				
			</div>
		);
	}
}
