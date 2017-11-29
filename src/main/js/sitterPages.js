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
						<li><Link to="/sitter/create">Create an unavailable time block </Link></li>
						<li><Link to="/sitter/notifications">Notifications</Link></li>
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
		return (
			<div className="container padded">
				<div>
					<p>Sitter Username: {this.state.appointment.username}</p>
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
						Pay Sitter:<br />
						<input type="button" value = "Pay" onClick={this.paySitter}/><br />
						Cancel Appointment:<br />
						<input type="button" value = "Cancel" onClick={this.cancelAppt}/><br />
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
	    	weekOffset: 0
	    };
	    
	    console.log('I am Here');
	    
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
	    				<Link to="/sitter/appointmentInfo">Appointment Scheduled: \n this.state.appointments[i].startHour - 
	    					this.state.appointments[i].endHour</Link>
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
    	
    }
    
    nextWeek(){
    	
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
             `   		</td>
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