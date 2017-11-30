import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';


axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export class SitterHome extends React.Component {
	constructor(props) {
	    super(props);
    }
    
	render() {
		return (
			<div className="container padded">
				<div>
					<Link to="/login"><p align="right">Login</p></Link><br />
					<h5>Pet Sitter Home Page</h5>
					<ul>
						<li><Link to="/sitter/calendar">Schedule</Link></li>
						<li><Link to="/sitter/create">Create an Unavailable block of Time</Link></li>
						<li><Link to="/sitter/notifications">Notifications</Link></li>
						<li><Link to="/sitter/ownerSwitch">Switch to Owner</Link></li>
						<li><Link to="/user/sitter/info">Sitter Info</Link></li>
					</ul>
				</div>
			</div>
		);
	}
}

export class AppointmentView extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	appointment: '',
	    	bID: ''
	    };
	    this.confirmAppt = this.confirmAppt.bind(this);
	    this.deleteAppt = this.deleteAppt.bind(this);
	    this.cancelAppt = this.cancelAppt.bind(this);
	    this.done = this.done.bind(this);
	    this.formatHour = this.formatHour.bind(this);
	    this.formatMin = this.formatMin.bind(this);
    }
	
	componentDidMount() {
		const search = this.props.location.search;
		const params = new URLSearchParams(search);
		const blockId = params.get('blockId');
		
		var appts = 'https://tempeturs-group-2.herokuapp.com/api/owner/appointment/get/' + blockId;
    	axios.get(appts)
		.then(data => {
        	this.setState({appointment: data.data, bID: blockId});
        })
		.catch(function (error) {
		    console.log(error);
		});
    }
	
    confirmAppt(event) {
    	event.preventDefault();
    	var value = 'https://tempeturs-group-2.herokuapp.com/api/owner/appointment/confirm/' + this.state.bID;
		axios({
		    method: 'POST',
		    url: value,
		   
		})
		.then(function (response) {
		    console.log(response);
		})
		.catch(function (error) {
		    console.log(error);
		});
		this.props.history.push('/sitter/home');
    }
    
    deleteAppt(event) {
    	event.preventDefault();
    	var value = 'https://tempeturs-group-2.herokuapp.com/api/owner/appointment/delete/' + this.state.bID;
		axios({
		    method: 'POST',
		    url: value,
		})
		.then(function (response) {
		    console.log(response);
		})
		.catch(function (error) {
		    console.log(error);
		});
		this.props.history.push('/sitter/home');
    }
    
    cancelAppt(event) {
    	event.preventDefault();
    	var value = 'https://tempeturs-group-2.herokuapp.com/api/owner/appointment/cancel/' + this.state.bID;
		axios({
		    method: 'POST',
		    url: value,
		   
		})
		.then(function (response) {
		    console.log(response);
		})
		.catch(function (error) {
		    console.log(error);
		});
		this.props.history.push('/sitter/home');
    }
    
	
    formatHour(hour, minute) {
    	var value;
    	var min = this.formatMin(minute);
    	if(hour > 12){
    		hour = hour - 12;
    		value = hour + ':' + min + ' ' + 'PM';
    	} else if(hour === 0){
    		hour = 12;
    		value = hour + ':' + min + ' ' + 'AM';
    	}else {
    		value = hour + ':' + min + ' ' + 'AM';
    	}
    	
    	return value;
    }
    
    formatMin(minute){
    	var value = minute;
    	if(minute === 0 || minute === 5){
    		value = '0' + minute;
    	}
    	
    	return value;
    }
    
    done(event){
    	event.preventDefault();
    	this.props.history.push('/sitter/home');
    }
    
	render() {
		const type = this.state.appointment.type;
		const status = this.state.appointment.appointmentStatus;
		var button1;
		var button2;
		var name;
		
		if(type === 'Block'){
			button1 = <Link to={'/sitter/block/edit?blockId=' + this.state.bID}>Edit</Link>;
			button2 = '';
			name = <h7>Username: {this.state.appointment.username}</h7>;
		}
		else if(status === 'ACCEPTED'){
			button1 = <button onClick={this.cancelSitter}>Cancel</button>;
			button2 = '';
			name = <h7>Owner Username: {this.state.appointment.ownerUsername}</h7>;
		}
		else if (status === 'SCHEDULED') {
			button1 = <button onClick={this.acceptAppt}>Confirm</button>;
			button2 =  <button onClick={this.denyAppt}>Delete</button>;
			name = <h7>Owner Username: {this.state.appointment.ownerUsername}</h7>;
		}
		else{
			button1 = <button onClick={this.acceptAppt}>Confirm</button>;
			button2 =  '';
			name = <h7>Owner Username: {this.state.appointment.ownerUsername}</h7>;
		}
		return (
			<div className="container padded">
				<Link to="/login"><p align="right">Login</p></Link>
				<Link to="/sitter/home"><p align="right">Home</p></Link><br />
				<div>
					{name}
					<table>
					<tr>
						<td> Start </td>
						<td> {this.state.appointment.startMonth}/{this.state.appointment.startDay} @ {this.formatHour(this.state.appointment.startHour, this.state.appointment.startMin)}</td>
					</tr>
					<tr>
						<td> End </td>
						<td> {this.state.appointment.endMonth}/{this.state.appointment.endDay} @ {this.formatHour(this.state.appointment.endHour, this.state.appointment.endMin)}</td>
					</tr>
				</table>
				</div>
				<div>
					{button1}
					{button2}
				</div>
			</div>
		);
	}
}

export class WeekView extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	apptList: []
        };
        
        this.formatHour = this.formatHour.bind(this);
        this.formatMin = this.formatMin.bind(this);
    }

    componentDidMount() {
        axios.get('https://tempeturs-group-2.herokuapp.com/api/sitter/appointment/get')
        .then(data => {
		    	this.setState({apptList: data.data});
		})
		.catch(function (error) {
		    console.log(error);
		});
    }
    
    formatHour(hour, minute) {
    	var value;
    	var min = this.formatMin(minute);
    	if(hour > 12){
    		hour = hour - 12;
    		value = hour + ':' + min + ' ' + 'PM';
    	} else if(hour === 0){
    		hour = 12;
    		value = hour + ':' + min + ' ' + 'AM';
    	}else {
    		value = hour + ':' + min + ' ' + 'AM';
    	}
    	
    	return value;
    }
    
    formatMin(minute){
    	var value = minute;
    	if(minute === 0 || minute === 5){
    		value = '0' + minute;
    	}
    	
    	return value;
    }

	render() {
		return (
			<div className="container padded">
				<Link to="/login"><p align="right">Login</p></Link>
				<Link to="/sitter/home"><p align="right">Home</p></Link><br />
				<div><h4>Current Appointments</h4></div>
				<div id="currentAppoints">
				{this.state.apptList.map(e => (
					<div>
						<Link to={'/sitter/appointmentInfo?blockId=' + e.blockId}><h6>Appt ID: {e.blockId}</h6></Link>
						<table>
							<tr>
								<td> Sitter Username </td>
								<td> {e.username} </td>
							</tr>
							<tr>
								<td> Appointment Type: </td>
								<td> {e.type}</td>
							</tr>
							<tr>
								<td> Start </td>
								<td> {e.startMonth}/{e.startDay} @ {this.formatHour(e.startHour, e.startMin)}</td>
							</tr>
							<tr>
								<td> End </td>
								<td> {e.endMonth}/{e.endDay} @ {this.formatHour(e.endHour, e.endMin)}</td>
							</tr>
							
						</table>
					</div>
				))}
				</div>
			</div>
		);
	}
}

export class SitterBlockEdit extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	blockId: '',
	    	startDay: 1,
			startMonth: 1,
			startYear: '',
			endDay: 1,
			endMonth: 1,
			endYear: '',
			startMin: 0,
			startHour: 0,
			endMin: 0,
			endHour: 1,
			username: '',
			repeatStrategy: 0,
			notificationMessage: 'This block has been edited',
			type: 'Block',
	    };

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.formatRepeat = this.formatRepeat.bind(this);
    }
    
    componentDidMount() {
		const search = this.props.location.search;
		const params = new URLSearchParams(search);
		const id = params.get('blockId');
	    
	    var url = 'https://tempeturs-group-2.herokuapp.com/api/owner/appointment/get/' + id;
	    axios.get(url)
        	.then(data => {
            	this.setState({
	            	blockId: data.data.blockId,
			    	startDay: data.data.startDay,
					startMonth: data.data.startMonth,
					startYear: data.data.startYear,
					endDay: data.data.endDay,
					endMonth: data.data.endMonth,
					endYear: data.data.endYear,
					startMin: data.data.startMin,
					startHour: data.data.startHour,
					endMin: data.data.endMin,
					endHour: data.data.endHour,
					username: data.data.username,
					repeatStrategy: data.data.repeatStrategy,
					type: data.data.type,
            	});
            })
            .catch(function(error) {
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
		    url: 'https://tempeturs-group-2.herokuapp.com/api/sitter/block/edit',
		    data: {
		    	blockId: this.state.blockId,
		    	startDay: this.state.startDay,
				startMonth: this.state.startMonth,
				startYear: this.state.startYear,
				endDay: this.state.endDay,
				endMonth: this.state.endMonth,
				endYear: this.state.endYear,
				startMin: this.state.startMin,
				startHour: this.state.startHour,
				endMin: this.state.endMin,
				endHour: this.state.endHour,
				username: this.state.username,
				repeatStrategy: this.state.repeatStrategy,
				notificationMessage: this.state.notificationMessage,
				type: this.state.type,
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

    formatRepeat(value){
    	var newValue;
    	switch(value) {
    		case 0:
	    		newValue = 'Never';
	    		break;
	    	case 1:
	    		newValue = 'Weekly';
	    		break;
	    	case 2:
	    		newValue = 'Bi-Weekly';
	    		break;
	    	case 3:
	    		newValue = 'Every 3 weeks';
	    		break;
	    	case 4:
	    		newValue = 'Every 4 weeks';
	    		break;
	    	case 8:
	    		newValue = 'Every 8 weeks';
	    		break;
	    	case 12:
	    		newValue = 'Every 12 weeks';
	    		break;
	    	case 26:
	    		newValue = 'Every 26 weeks';
	    		break;
	    	case 52:
	    		newValue = 'Yearly';
	    		break;
	    }
	    
	    return newValue;
	}

	render() {
		return (
			<div className="container padded">
				<Link to="/login"><p align="right">Login</p></Link>
				<Link to="/sitter/home"><p align="right">Home</p></Link><br />
				<div>
					<h5>Create an Unavailable Block</h5>
					<form onSubmit={this.handleSubmit}>
						<h7>Start Date of Appointment:</h7><br />
						Month: (Chosen: {this.state.startMonth})
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
						Day: (Chosen: {this.state.startDay})
						<select name="startDay" onChange={this.handleChange} required>
							<option value="1">1</option>
						    <option value="2">2</option>
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
						Hour: (Chosen: {this.state.startHour})
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
						Minute: (Chosen: {this.state.startMin})
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
						Month: (Chosen: {this.state.endMonth})
						<select name="endMonth" onChange={this.handleChange} required>
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
						Day: (Chosen: {this.state.endDay})
						<select name="endDay" onChange={this.handleChange} required>
							<option value="1">1</option>
						    <option value="2">2</option>
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
						Hour: (Chosen: {this.state.endHour})
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
						Minute: (Chosen: {this.state.endMin})
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
						</select><br />
						How often do you want the block to repeat: (Chosen: {this.formatRepeat(this.state.repeatStrategy)})
						<select name="repeatStrategy" onChange={this.handleChange} required>
							<option value="0">Never</option>
							<option value="1">Weekly</option>
						    <option value="2">Bi-Weekly</option>
						    <option value="3">Every 3 weeks</option>
						    <option value="4">Every 4 weeks</option>
						    <option value="8">Every 8 weeks</option>
						    <option value="12">Every 12 weeks</option>
						    <option value="26">Every 26 weeks</option>
						    <option value="52">Yearly</option>
						</select><br />
						<input type="submit" value="Submit" />
					</form>
				</div>
			</div>
		);
	}
}


export class SitterCreate extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	startDay: 1,
			startMonth: 1,
			startYear: '',
			endDay: 1,
			endMonth: 1,
			endYear: '',
			startMin: 0,
			startHour: 0,
			endMin: 0,
			endHour: 1,
			repeatStrategy: 0,
			notificationMessage: 'This block has been created',
			type: 'Block',
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
		    url: 'https://tempeturs-group-2.herokuapp.com/api/sitter/block/create',
		    data: {
		    	startDay: this.state.startDay,
				startMonth: this.state.startMonth,
				startYear: this.state.startYear,
				endDay: this.state.endDay,
				endMonth: this.state.endMonth,
				endYear: this.state.endYear,
				startMin: this.state.startMin,
				startHour: this.state.startHour,
				endMin: this.state.endMin,
				endHour: this.state.endHour,
				repeatStrategy: this.state.repeatStrategy,
				notificationMessage: this.state.notificationMessage,
				type: this.state.type,
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
				<Link to="/login"><p align="right">Login</p></Link>
				<Link to="/sitter/home"><p align="right">Home</p></Link><br />
				<div>
					<h5>Create an Unavailable Block</h5>
					<form onSubmit={this.handleSubmit}>
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
						    <option value="2">2</option>
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
						<select name="endMonth" onChange={this.handleChange} required>
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
						    <option value="2">2</option>
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
						</select><br />
						How often do you want the block to repeat:
						<select name="repeatStrategy" onChange={this.handleChange} required>
							<option value="0">Never</option>
							<option value="1">Weekly</option>
						    <option value="2">Bi-Weekly</option>
						    <option value="3">Every 3 weeks</option>
						    <option value="4">Every 4 weeks</option>
						    <option value="8">Every 8 weeks</option>
						    <option value="12">Every 12 weeks</option>
						    <option value="26">Every 26 weeks</option>
						    <option value="52">Yearly</option>
						</select><br />
						<input type="submit" value="Submit" />
					</form>
				</div>
			</div>
		);
	}
}

export class SitterSwitchPet extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	name: '',
	    	type: '',
	    	age: '',
	    	notes: ''	    	
	    };
	
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.nextPet = this.nextPet.bind(this);
	    this.pushData = this.pushData.bind(this);
    }
    
    componentDidMount() {
		axios.get('https://tempeturs-group-2.herokuapp.com/api/user/type')
        	.then(response => {
            	if(response.data === 'both'){
	            	axios.get('https://tempeturs-group-2.herokuapp.com/api/owner/update')
			        	.then(response => {
			            	console.log(response);
			            })
			            .catch(function(error) {
			                console.log(error);
			            });
            		this.props.history.push('/owner/home');
            	}
            })
            .catch(function(error) {
                console.log(error);
            });
            
        axios({
		    method: 'POST',
		    url: 'https://tempeturs-group-2.herokuapp.com/api/pet/switch',
		})
		.then(function (response) {
		    console.log(response);
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
	
	nextPet(event) {
    	event.preventDefault();
    	
    	this.pushData();
    	this.setState({
	      	name: '',
	    	type: '',
	    	age: '',
	    	notes: ''	   
	    });
    	location.reload();
    }
	
    handleSubmit(event) {
    	event.preventDefault();
    	this.pushData();
    	this.props.history.push('/sitter/ownerSwitch/pay');
    }
    
    pushData() {
    	axios({
		    method: 'POST',
		    url: 'https://tempeturs-group-2.herokuapp.com/api/pet/reg',
		    data: {
			    name: this.state.name,
	    		type: this.state.type,
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
				<Link to="/login"><p align="right">Login</p></Link>
				<Link to="/sitter/home"><p align="right">Home</p></Link><br />
				<div>
					<h5>Pet Information</h5>
					<form onSubmit={this.handleSubmit}>
						Pet Name:<br />
						<input name="name" type="text" value={this.state.name} onChange={this.handleChange} required /><br />
						Pet Type:<br />
						<select name="type" onChange={this.handleChange} required>
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

export class SitterSwitchPay extends React.Component {
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
		
		axios({
		    method: 'POST',
		    url: 'https://tempeturs-group-2.herokuapp.com/api/pet/reg/finish',
		})
		.then(function (response) {
		    console.log(response);
		})
		.catch(function (error) {
		    console.log(error);
		});
		
		axios({
		    method: 'POST',
		    url: 'https://tempeturs-group-2.herokuapp.com/api/owner/reg/finish/switch',
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
				<Link to="/login"><p align="right">Login</p></Link>
				<Link to="/sitter/home"><p align="right">Home</p></Link><br />
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