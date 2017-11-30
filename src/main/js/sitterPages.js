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
	    
        for (var m = 0; m < dayLength; m++) {
        	var dayArray = [];
        	for(var n = 0; n < weekLength; n++) {
        		dayArray.push({'username': '', 'blockId': '', 
        			'startHour': '', 'startMin': '', 'endHour': '', 'endMin': ''});
        	}
        	this.state.week.push(dayArray);
        }
        
        const search = this.props.location.search;
		const params = new URLSearchParams(search);
		const myOffset = params.get('offset');
		var offset= myOffset;
		
		this.setState({
			weekOffset: myOffset
		});
		console.log('offset: ' + this.state.weekOffset); 
    	
        axios.get('https://tempeturs-group-2.herokuapp.com/api/sitter/appointment/get')
        	.then(response => {
            	this.setState({appointments: response});
            	console.log(this.state.appointments);
		    	var monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		    	var today = new Date();
		        var day = today.getDate();
		        var month = today.getMonth() + 1;
		        var year = today.getFullYear();
		        var dayAdd = 1;
		        if(offset < 0){
		        	offset = offset * - 1;
		        	dayAdd = -1;
		        }
		        for(var k = 0; k < offset; k++){
		        	for(var w = 0; w < 7; w++){
		        		day = day + dayAdd;
		        		if(day > monthArr[month - 1]){
			                day = 1;
			                month++;
			                if(month > 12){
			                    month = 1;
			                    year++;
			                }
			            }
			            if(day < 0){
			                day = monthArr[month - 2];
			                month--;
			                if(month < 1){
			                    month = 12;
			                    year--;
			                }
			            }
		            }
		        }
		        
		        for(var j = 0; j < weekLength; j++) {		           
		        	for (var i = 0; i < dayLength; i++) {
		        		for(var g = 0; g < this.state.appointments.length; g++) {
		        			if(this.state.appointments[g].startDay == day && this.state.appointments[g].startMonth == month &&
		        				this.state.appointments[g].startYear == year && this.state.appointments[g].startHour == i){
					    			this.state.week[i][j].username = this.state.appointments[g].username;
					    			this.state.week[i][j].blockId = this.state.appointments[g].blockId;
					    			this.state.week[i][j].startHour = this.state.appointments[g].startHour;
					    			this.state.week[i][j].startMin = this.state.appointments[g].startMin;
					    			this.state.week[i][j].endHour = this.state.appointments[g].endHour;
					    			this.state.week[i][j].endMin = this.state.appointments[g].endMin;
				    		}
				    	}
		    		}
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
		    	console.log(this.state.week);
            })
            .catch(function(error) {
                console.log(error);
            });
            
            this.getDateHeader = this.getDateHeader.bind(this);
	        this.formatHour = this.formatHour.bind(this);
	        this.getTime = this.getTime.bind(this);
    }
    
    getDateHeader(dayOffset) {
        var monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var offset = this.state.weekOffset;
        var dayAdd = 1;
        if(offset < 0){
        	offset = offset * - 1;
        	dayAdd = -1;
        }
        for(var k = 0; k < offset; k++){
        	for(var w = 0; w < 7; w++){
        		day = day + dayAdd;
        		if(day > monthArr[month - 1]){
	                day = 1;
	                month++;
	                if(month > 12){
	                    month = 1;
	                    year++;
	                }
	            }
	            if(day < 0){
	                day = monthArr[month - 2];
	                month--;
	                if(month < 1){
	                    month = 12;
	                    year--;
	                }
	            }
            }
        }
        for (var i = 0; i < dayOffset; i++){
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
    
    formatHour(hour) {
    	if(hour > 12){
    		hour = hour - 12;
    	} else if(hour === 0){
    		hour = 12;
    	}
    	
    	return hour;
    }
    
    getTime(hour) {
    	var value;
    	if(hour > 12){
    		hour = hour - 12;
    		value = hour + ':00' + 'PM';
    	} else if(hour === 0){
    		hour = 12;
    		value = hour + ':00' + 'AM';
    	}else {
    		value = hour + ':00' + 'AM';
    	}
    	
    	return value;
    }
    
    render() {
    	var time = -1;
    	var myOffset = this.state.weekOffset;
        return(
            <div class="container">
                <div class="row">
                <Link to={'/sitter/calendar?offset=' + (myOffset - 1)}>
                	<button height="10%" type="button" align="left" >Previous</button>
                </Link>
                <Link to={'/sitter/calendar?offset=' + (myOffset + 1)}>
                	<button height="10%" type="button" align="right" >Next</button>
                </Link>
                <table width="100%">
                	<tr height="90%" align="bottom">
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
                    {this.state.week.map((row) => {
                    	time++;
                    	return (
	                    	<tr>
		                   		<td width="12%">{this.getTime(time)}</td>
		        		        {row.map(e => (
			        		         <td width="12%">
			        		        	<Link to={'sitter/appointmentInfo?blockId=' + e.blockId}>
					    					{e.blockId} <br />
					    					{e.username} <br />
				    						{this.formatHour(e.startHour)} {this.formatHour(e.endHour)}
				    					</Link>
			        		        </td>
								))}
			        		</tr>
			        	);
					})}
                </table>
            </div>
        </div>
        );
    }
}