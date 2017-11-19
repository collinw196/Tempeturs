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
    	axios({
		    method: 'POST',
		    url: 'https://tempeturs-group-2.herokuapp.com/api/pet/reg',
		    data: {
			    petname: this.state.petname,
	    		pettype: this.state.pettype,
	    		age: this.state.age,
	    		notes: this.state.notes
		    }
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
							<option value="cat" >Cat</option>
							<option value="horse" >Horse</option>
							<option value="ferret" >Ferret</option>
							<option value="rabbit" >Rabbit</option>
							<option value="fish" >Fish</option>
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
    	axios({
		    method: 'POST',
		    url: 'https://tempeturs-group-2.herokuapp.com/api/owner/reg',
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