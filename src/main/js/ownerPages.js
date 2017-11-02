import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export class OwnerHome extends React.Component {
	constructor(props) {
	    super(props);
    }
    
	render() {
		return (
			<div className="container padded">
				<div>
					<h5>Pet Owner Home Page</h5>
					<div>
						<ul>
							<li><Link to="/owner/reserve">Create Appointment</Link></li>
							<li><Link to="/owner/appoint">Current Appointments</Link></li>
							<li><Link to="/owner/pets">PetInfo</Link></li>
						</ul>
					</div>
				</div>
				
			</div>
		);
	}
}

export class OwnerReserve extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	startDate: '',
	    	startTime: '',
	    	endDate: '',
	    	endTime: '',
	    	urgency: ''	    	
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
    }
    
	render() {
		return (
			<div className="container padded">
				<div>
					<h5>Reserve an appointment</h5>
					<form>
						Start Date of Appointment (MM-DD-YYYY):<br />
						<input name="startDate" type="text" value={this.state.startDate} onChange={this.handleChange} required pattern="[0-1][0-9]-[0-3][0-9]-[0-9]{4}" /><br />
						Start Time of Appointment (HH:MM):<br />
						<input name="startTime" type="text" value={this.state.startTime} onChange={this.handleChange} required pattern="[0-1][0-9]:[0-5][0-9]" /><br />
						End Date of Appointment (MM-DD-YYYY):<br />
						<input name="endDate" type="text" value={this.state.endDate} onChange={this.handleChange} required pattern="[0-1][0-9]-[0-3][0-9]-[0-9]{4}" /><br />
						End Time of Appointment (HH:MM):<br />
						<input name="endTime" type="text" value={this.state.endTimne} onChange={this.handleChange} required pattern="[0-1][0-9]:[0-5][0-9]" /><br />
						Urgency:<br />
						<select name="urgency" onChange={this.handleChange} required>
							<option value="Casual" selected>Casual</option>
							<option value="Necessary" selected>Necessary</option>
							<option value="Emergency" selected>Emergency</option>
						</select><br />
					</form>
				</div>
				<div>
					<form>
						Options:<br />
						<select id="sitterOptions" name="sitterChoice" onChange={this.handleChange}>
						</select><br />
					</form>
				</div>
			</div>
		);
	}
}

export class OwnerAppoint extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            message: 'Welcome'
        };
    }
    
    componentDidMount() {
        axios.get('https://tempeturs-group-2.herokuapp.com/api/owner/appointment/get')
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
				<div><h4>Current Appointments</h4></div>
				<div id="currentAppoints">
				</div>
			</div>
		);
	}
}

export class OwnerPets extends React.Component {
	constructor(props) {
	    super(props);
    }
    
	render() {
		return (
			<div className="container padded">
				<div><h4>Your Pet Information</h4></div>
				<div id="petInfo">
				</div>
				<div><Link to="/owner/pets/add">Add a pet</Link></div>
			</div>
		);
	}
}


export class OwnerPetsAdd extends React.Component {
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
    	
    	axios.post('/api/owner/pet/add', {withCredentials:true}, {
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
					<h5>Add a Pet</h5>
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