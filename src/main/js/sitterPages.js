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

export class WeekView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
	    	appointments: [],
	    };
        
        this.getDateHeader = this.getDateHeader.bind(this);
        this.getAppointmentData = this.getAppointmentData.bind(this);
    }
    
    getAppointmentData() {
        axios.get('https://tempeturs-group-2.herokuapp.com/api/sitter/appointment/get')
        	.then(data => {
            	this.setState({appointments: data.data});
            })
            .catch(function(error) {
                console.log(error);
            });
            console.log(this.state.appointments);
    }
    
    displayAppointmentData(hour) {
    	console.log(this.state.appointments.size);
        for (var i = 0; i < this.state.appointments.size; i++){
        console.log(this.state.appointments[i].startYear);
        	var yearRange = this.state.appointments[i].startYear;
    		if (hour === this.state.appointments[i].startHour) {
    			return ('Appointment Scheduled: \n' + this.state.appointments[i].startHour + '-' + this.state.appointments[i].endHour);
    		}
    	}
    	
    	return ('Appt Not Scheduled');
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
        		        <td width="12%">{this.displayAppointmentData(0)}</td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">1:00am</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">2:00am</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">3:00am</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">4:00am</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">5:00am</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">6:00am</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">7:00am</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">8:00am</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">9:00am</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">10:00am</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">11:00am</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">12:00pm</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">1:00pm</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">2:00pm</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">3:00pm</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">4:00pm</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">5:00pm</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">6:00pm</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">7:00pm</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">8:00pm</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">9:00pm</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">10:00pm</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
        		    <tr>
        		        <td width="12%">11:00pm</td>
        		        <td width="12%"></td>
        		        <td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
                		<td width="12%"></td>
        		    </tr>
                </table>
            </div>
        </div>
        );
    }
}