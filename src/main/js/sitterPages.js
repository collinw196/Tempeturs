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
					<h5>Pet Sitter Home Page</h5>
					<ul>
						<li><Link to="/sitter/calendar?offset=0">Schedule</Link></li>
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
	    	bID: '',
	    	ownedPets: []
	    };
	    this.confirmAppt = this.confirmAppt.bind(this);
	    this.deleteAppt = this.deleteAppt.bind(this);
	    this.cancelAppt = this.cancelAppt.bind(this);
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
    	
        axios.get('https://tempeturs-group-2.herokuapp.com/api/owner/pets/get')
    	.then(data => {
        	this.setState({ownedPets: data.data});
        })
        .catch(function(error) {
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
		this.props.history.push('/owner/home');
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
		this.props.history.push('/owner/home');
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
		this.props.history.push('/owner/home');
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
		const type = this.state.appointment.type;
		const status = this.state.appointment.appointmentStatus;
		var button1;
		var button2;
		
		if(type === 'Block'){
			button1 = <Button onClick={this.handleEdit}>Edit</Button>;
			button2 = '';
		}
		else if(status === 'ACCEPTED'){
			button1 = <Button onClick={this.cancelSitter}>Cancel</Button>;
			button2 = '';
		}
		else{
			button1 = <Button onClick={this.acceptAppt}>Confirm</Button>;
			button2 =  <Button onClick={this.denyAppt}>Delete</Button>;
		}
		return (
			<div className="container padded">
				<div>
					<p>Owner Username: {this.state.appointment.username}</p>
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
				Pets To be Watched:<br />
				{this.state.ownedPets.map(e => (
					<span>
						<h7>{e.name} ({e.type})</h7>
					</span>
                ))}
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