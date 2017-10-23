import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

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
							<option value="cat" >Cat</option>
							<option value="horse" >Horse</option>
							<option value="ferret" >Ferret</option>
							<option value="rabbit" >Rabbit</option>
							<option value="fish" >Fish</option>
						</select><br />
						Pet Preference 2:<br />
						<select name="pettype2" onChange={this.handleChange} required>
							<option value="dog" selected>Dog</option>
							<option value="cat" >Cat</option>
							<option value="horse" >Horse</option>
							<option value="ferret" >Ferret</option>
							<option value="rabbit" >Rabbit</option>
							<option value="fish" >Fish</option>
						</select><br />
						Pet Preference 3:<br />
						<select name="pettype3" onChange={this.handleChange} required>
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