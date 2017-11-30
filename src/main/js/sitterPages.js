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
						<li><Link to="/sitter/calendar">Schedule</Link></li>
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
		
		if(type === 'Block'){
			button1 = <Button onClick={this.handleEdit}>Edit</Button>;
			button2 = '';
		}
		else if(status === 'ACCEPTED'){
			button1 = <Button onClick={this.Cancel}>Cancel</Button>;
			button2 = '';
		}
		else{
			button1 = <Button onClick={this.Confirm}Confirm</Button>;
			button2 =  <Button onClick={this.Delete}Delete</Button>;
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
					<form onSubmit={this.handleSubmit}>
						Confirm Appointment:<br />
						<input type="button" value = "Confirm" onClick={this.confirmAppt}/><br />
					</form>
					<form onSubmit={this.handleSubmit}>
						Delete Appointment:<br />
						<input type="button" value = "Delete" onClick={this.deleteAppt}/><br />
					</form>
				</div>
			</div>
		);
	}
}

export class WeekView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
	    	appointments: [],
	    	week: [],	    	
	    	weekOffset: ''
	    };
	    
	    
	    var dayLength = 24;
	    var weekLength = 7;
	    
        for (var i = 0; i < dayLength; i++) {
        	var dayArray = [];
        	for(var j = 0; j < weekLength; j++) {
        		dayArray.push({'username': '', 'blockId': '', 
        			'startHour': '', 'startMin': '', 'endHour': '', 'endMin': ''});
        	}
        	this.state.week.push(dayArray);
        }
        
        console.log('I want to be here');
        
        this.getDateHeader = this.getDateHeader.bind(this);
        this.displayAppointmentData = this.displayAppointmentData.bind(this);
        this.previousWeek = this.previousWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
    }
    
    componentDidMount() {
    	const search = this.props.location.search;
		const params = new URLSearchParams(search);
		const offset = params.get('offset');
		
		this.setState({
			weekOffset: offset
		});
    	
        axios.get('https://tempeturs-group-2.herokuapp.com/api/sitter/appointment/get')
        	.then(data => {
            	this.setState({appointments: data.data});
            })
            .catch(function(error) {
                console.log(error);
            });
            console.log(this.state.appointments);
    }
    
    displayAppointmentData(hour, dayOffset) {
    	if(typeof this.state.appointments !== 'undefined') {
	        for (var i = 0; i < this.state.appointments.length; i++){
	    		if (hour === this.state.appointments[i].startHour) {
	    			this.state.week[hour][dayOffset].username = this.state.appointments[i].username;
	    			this.state.week[hour][dayOffset].blockId = this.state.appointments[i].blockId;
	    			this.state.week[hour][dayOffset].startHour = this.state.appointments[i].startHour;
	    			this.state.week[hour][dayOffset].startMin = this.state.appointments[i].startMin;
	    			this.state.week[hour][dayOffset].endHour = this.state.appointments[i].endHour;
	    			this.state.week[hour][dayOffset].endMin = this.state.appointments[i].endMin;
	    			return (
	    				<Link to={'sitter/appointmentInfo?blockId=' + this.state.appointments[i].blockId}>
	    					Appointment Scheduled:
    						{this.state.appointment.startHour} -
    						{this.state.appointment.endHour}</Link>
	    			);
	    		}
	    	}
	    }
    } 
    
    getDateHeader(offset){
        var monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        for (var i = 0; i < offset; i++){
            day++;
            if(day > monthArr[month - 1]){
                day = 1;
                month++;
                if(month > 12){
                    month = 1;
                    year++;
                }
            }
        }
        var value = month + '/' + day + '/' + year;
        return value;
    }
    
    previousWeek(){
    	var offset = this.state.weekoffset - 1;
    	var url = '/sitter/calendar?offset=' + offset;
    	this.props.history.push(url);
    }
    
    nextWeek(){
    	var offset = this.state.weekoffset + 1;
    	var url = '/sitter/calendar?offset=' + offset;
    	this.props.history.push(url);
    }
    
    render() {
        return(
            <div class="container">
                <div class="row">
                <button height="10%" type="button" align="left">Previous</button>
                <button height="10%" type="button" align="right">Next</button>
                <table width="100%">
                	<tr height="90%" valign="bottom">
                		<td width="12%"></td>
                		<td width="12%">
                			<p>{this.getDateHeader(0)}</p>
                        </td>
                		<td width="12%">
                			<p>{this.getDateHeader(1)}</p>
                		</td>
                		<td width="12%">
                			<p>{this.getDateHeader(2)}</p>
                		</td>
                		<td width="12%">
                			<p>{this.getDateHeader(3)}</p>
                		</td>
                		<td width="12%">
                			<p>{this.getDateHeader(4)}</p>
                		</td>
                		<td width="12%">
                			<p>{this.getDateHeader(5)}</p>
                		</td>
                		<td width="12%">
                			<p>{this.getDateHeader(6)}</p>
                		</td>
                    </tr>
        		    <tr>
        		        <td width="12%">12:00am</td>
        		        <td width="12%">{this.displayAppointmentData(0, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(0, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(0, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(0, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(0, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(0, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(0, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">1:00am</td>
        		        <td width="12%">{this.displayAppointmentData(1, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(1, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(1, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(1, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(1, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(1, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(1, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">2:00am</td>
        		        <td width="12%">{this.displayAppointmentData(2, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(2, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(2, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(2, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(2, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(2, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(2, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">3:00am</td>
        		        <td width="12%">{this.displayAppointmentData(3, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(3, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(3, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(3, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(3, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(3, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(3, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">4:00am</td>
        		        <td width="12%">{this.displayAppointmentData(4, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(4, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(4, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(4, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(4, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(4, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(4, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">5:00am</td>
        		        <td width="12%">{this.displayAppointmentData(5, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(5, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(5, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(5, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(5, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(5, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(5, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">6:00am</td>
        		        <td width="12%">{this.displayAppointmentData(6, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(6, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(6, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(6, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(6, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(6, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(6, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">7:00am</td>
        		        <td width="12%">{this.displayAppointmentData(7, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(7, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(7, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(7, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(7, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(7, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(7, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">8:00am</td>
        		        <td width="12%">{this.displayAppointmentData(8, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(8, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(8, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(8, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(8, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(8, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(8, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">9:00am</td>
        		        <td width="12%">{this.displayAppointmentData(9, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(9, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(9, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(9, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(9, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(9, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(9, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">10:00am</td>
        		        <td width="12%">{this.displayAppointmentData(10, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(10, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(10, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(10, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(10, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(10, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(10, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">11:00am</td>
        		        <td width="12%">{this.displayAppointmentData(11, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(11, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(11, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(11, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(11, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(11, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(11, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">12:00pm</td>
        		        <td width="12%">{this.displayAppointmentData(12, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(12, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(12, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(12, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(12, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(12, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(12, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">1:00pm</td>
        		        <td width="12%">{this.displayAppointmentData(13, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(13, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(13, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(13, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(13, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(13, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(13, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">2:00pm</td>
        		        <td width="12%">{this.displayAppointmentData(14, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(14, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(14, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(14, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(14, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(14, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(14, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">3:00pm</td>
        		        <td width="12%">{this.displayAppointmentData(15, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(15, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(15, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(15, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(15, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(15, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(15, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">4:00pm</td>
        		        <td width="12%">{this.displayAppointmentData(16, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(16, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(16, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(16, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(16, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(16, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(16, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">5:00pm</td>
        		        <td width="12%">{this.displayAppointmentData(17, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(17, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(17, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(17, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(17, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(17, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(17, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">6:00pm</td>
        		        <td width="12%">{this.displayAppointmentData(18, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(18, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(18, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(18, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(18, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(18, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(18, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">7:00pm</td>
        		        <td width="12%">{this.displayAppointmentData(19, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(19, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(19, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(19, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(19, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(19, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(19, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">8:00pm</td>
        		        <td width="12%">{this.displayAppointmentData(20, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(20, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(20, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(20, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(20, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(20, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(20, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">9:00pm</td>
        		        <td width="12%">{this.displayAppointmentData(21, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(21, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(21, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(21, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(21, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(21, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(21, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">10:00pm</td>
        		        <td width="12%">{this.displayAppointmentData(22, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(22, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(22, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(22, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(22, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(22, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(22, 6)}</td>
        		    </tr>
        		    <tr>
        		        <td width="12%">11:00pm</td>
        		        <td width="12%">{this.displayAppointmentData(23, 0)}</td>
        		        <td width="12%">{this.displayAppointmentData(23, 1)}</td>
                		<td width="12%">{this.displayAppointmentData(23, 2)}</td>
                		<td width="12%">{this.displayAppointmentData(23, 3)}</td>
                		<td width="12%">{this.displayAppointmentData(23, 4)}</td>
                		<td width="12%">{this.displayAppointmentData(23, 5)}</td>
                		<td width="12%">{this.displayAppointmentData(23, 6)}</td>
        		    </tr>
                </table>
            </div>
        </div>
        );
    }
}