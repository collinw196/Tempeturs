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
							<li><Link to="/owner/sitterSwitch">Become a Sitter</Link></li>
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
	    	startDay: '',
			startMonth: '',
			startYear: '',
			endDay: '',
			endMonth: '',
			endYear: '',
			startMin: '',
			startHour: '',
			endMin: '',
			endHour: '',
			username: '',
			repeatStrategy: 1,
			notificationMessage: 'This appointment has been scheduled',
			type: 'Appt',
			petIds: '',
			appointmentStatus: 'SCHEDULED',
			notes: '',
			urgency: '',
			paymentAmount: 50.00	    	
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
						<h7>Start Date of Appointment:</h7><br />
						Month:
						<select name="startMonth" onChange={this.handleChange} required>
							<option value="1">January</option>       
						    <option value="2">February</option>       
						    <option value="3">March</option>       
						    <option value="4">April</option>       
						    <option value="5">May</option>       
						    <option value="6">June</option>       
						    <option value="7">July</option>       
						    <option value="8">August</option>       
						    <option value="9">September</option>       
						    <option value="10">October</option>       
						    <option value="11">November</option>       
						    <option value="12">December</option> 
						</select>
						Day:
						<select name="startDay" onChange={this.handleChange} required>
							<option value="1">1</option>       
						    <option value="21">2</option>       
						    <option value="3">3</option>       
						    <option value="4">4</option>       
						    <option value="5">5</option>       
						    <option value="6">6</option>       
						    <option value="7">7</option>       
						    <option value="8">8</option>       
						    <option value="9">9</option>       
						    <option value="10">10</option>       
						    <option value="11">11</option>       
						    <option value="12">12</option>       
						    <option value="13">13</option>       
						    <option value="14">14</option>       
						    <option value="15">15</option>       
						    <option value="16">16</option>       
						    <option value="17">17</option>       
						    <option value="18">18</option>       
						    <option value="19">19</option>       
						    <option value="20">20</option>       
						    <option value="21">21</option>       
						    <option value="22">22</option>       
						    <option value="23">23</option>       
						    <option value="24">24</option>       
						    <option value="25">25</option>       
						    <option value="26">26</option>       
						    <option value="27">27</option>       
						    <option value="28">28</option>       
						    <option value="29">29</option>       
						    <option value="30">30</option>       
						    <option value="31">31</option>
						</select>
						Year:
						<input name="startYear" type="text" value={this.state.startYear} onChange={this.handleChange} required pattern="[0-9]{4}" /><br />
						
						Start Time of Appointment:<br />
						Hour:
						<select name="startHour" onChange={this.handleChange} required>
							<option value="0">12 AM</option>       
						    <option value="1">1 AM</option>       
						    <option value="2">2 AM</option>       
						    <option value="3">3 AM</option>       
						    <option value="4">4 AM</option>       
						    <option value="5">5 AM</option>       
						    <option value="6">6 AM</option>       
						    <option value="7">7 AM</option>       
						    <option value="8">8 AM</option>       
						    <option value="9">9 AM</option>       
						    <option value="10">10 AM</option>       
						    <option value="11">11 AM</option>       
						    <option value="12">12 PM</option>       
						    <option value="13">1 PM</option>       
						    <option value="14">2 PM</option>       
						    <option value="15">3 PM</option>       
						    <option value="16">4 PM</option>       
						    <option value="17">5 PM</option>       
						    <option value="18">6 PM</option>       
						    <option value="19">7 PM</option>       
						    <option value="20">8 PM</option>       
						    <option value="21">9 PM</option>       
						    <option value="22">10 PM</option>       
						    <option value="23">11 PM</option>        
						</select>
						Minute:
						<select name="startMinute" onChange={this.handleChange} required>
							<option value="00">00</option>
							<option value="5">5</option>       
						    <option value="10">10</option>       
						    <option value="15">15</option>       
						    <option value="20">20</option>       
						    <option value="25">25</option>       
						    <option value="30">30</option>       
						    <option value="35">35</option>       
						    <option value="40">40</option>       
						    <option value="45">45</option>       
						    <option value="50">50</option>       
						    <option value="55">55</option>           
						</select><br />
						
						
						
						<h7>End Date of Appointment:</h7><br />
						Month:
						<select name="endtMonth" onChange={this.handleChange} required>
							<option value="1">January</option>       
						    <option value="2">February</option>       
						    <option value="3">March</option>       
						    <option value="4">April</option>       
						    <option value="5">May</option>       
						    <option value="6">June</option>       
						    <option value="7">July</option>       
						    <option value="8">August</option>       
						    <option value="9">September</option>       
						    <option value="10">October</option>       
						    <option value="11">November</option>       
						    <option value="12">December</option> 
						</select>
						Day:
						<select name="endDay" onChange={this.handleChange} required>
							<option value="1">1</option>       
						    <option value="21">2</option>       
						    <option value="3">3</option>       
						    <option value="4">4</option>       
						    <option value="5">5</option>       
						    <option value="6">6</option>       
						    <option value="7">7</option>       
						    <option value="8">8</option>       
						    <option value="9">9</option>       
						    <option value="10">10</option>       
						    <option value="11">11</option>       
						    <option value="12">12</option>       
						    <option value="13">13</option>       
						    <option value="14">14</option>       
						    <option value="15">15</option>       
						    <option value="16">16</option>       
						    <option value="17">17</option>       
						    <option value="18">18</option>       
						    <option value="19">19</option>       
						    <option value="20">20</option>       
						    <option value="21">21</option>       
						    <option value="22">22</option>       
						    <option value="23">23</option>       
						    <option value="24">24</option>       
						    <option value="25">25</option>       
						    <option value="26">26</option>       
						    <option value="27">27</option>       
						    <option value="28">28</option>       
						    <option value="29">29</option>       
						    <option value="30">30</option>       
						    <option value="31">31</option>
						</select>
						Year:
						<input name="endYear" type="text" value={this.state.endYear} onChange={this.handleChange} required pattern="[0-9]{4}" /><br />
						
						End Time of Appointment:<br />
						Hour:
						<select name="endHour" onChange={this.handleChange} required>
							<option value="0">12 AM</option>       
						    <option value="1">1 AM</option>       
						    <option value="2">2 AM</option>       
						    <option value="3">3 AM</option>       
						    <option value="4">4 AM</option>       
						    <option value="5">5 AM</option>       
						    <option value="6">6 AM</option>       
						    <option value="7">7 AM</option>       
						    <option value="8">8 AM</option>       
						    <option value="9">9 AM</option>       
						    <option value="10">10 AM</option>       
						    <option value="11">11 AM</option>       
						    <option value="12">12 PM</option>       
						    <option value="13">1 PM</option>       
						    <option value="14">2 PM</option>       
						    <option value="15">3 PM</option>       
						    <option value="16">4 PM</option>       
						    <option value="17">5 PM</option>       
						    <option value="18">6 PM</option>       
						    <option value="19">7 PM</option>       
						    <option value="20">8 PM</option>       
						    <option value="21">9 PM</option>       
						    <option value="22">10 PM</option>       
						    <option value="23">11 PM</option>        
						</select>
						Minute:
						<select name="endMinute" onChange={this.handleChange} required>
							<option value="00">00</option>
							<option value="5">5</option>       
						    <option value="10">10</option>       
						    <option value="15">15</option>       
						    <option value="20">20</option>       
						    <option value="25">25</option>       
						    <option value="30">30</option>       
						    <option value="35">35</option>       
						    <option value="40">40</option>       
						    <option value="45">45</option>       
						    <option value="50">50</option>       
						    <option value="55">55</option>           
						</select>
						Urgency:<br />
						<select name="urgency" onChange={this.handleChange} required>
							<option value="Casual" selected>Casual</option>
							<option value="Necessary" selected>Necessary</option>
							<option value="Emergency" selected>Emergency</option>
						</select><br />
						Pets To be Watched:<br />
						<select id="petNames" name="petNames" onChange={this.handleChange} required>
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

export class OwnerSwitch extends React.Component {
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