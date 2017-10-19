import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

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
    	this.props.history.push('/reg/owner/pay');
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