import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';


export class Notifications extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	        apptNotifications: [],
	        ratNotifications: []
        };
    }
    
    componentDidMount() {
        axios.get('http://tempeturs-group-2.herokuapp.com/api/sitter/notifications/appt')
            .then(data => {
            this.setState({apptNotifications: data.data});
            })
        .catch(function(error) {
            console.log(error);
        });
        
        axios.get('http://tempeturs-group-2.herokuapp.com/api/sitter/notifications/rat')
            .then(data => {
            this.setState({ratNotifications: data.data});
            })
        .catch(function(error) {
            console.log(error);
        });
    }
    
    
	render() {
		return (
			<div className="container padded">
				<div><h4>Appointment Notifications</h4></div>
				<div id="currentAppoints">
				{this.state.apptNotifications.map(e => (
					<div>
						<Link to={'/sitter/appointmentInfo?blockId=' + e.blockId}><h6>Appt ID: {e.blockId}</h6></Link>
						<table>
							<tr>
								<td> Sitter Username </td>
								<td> {e.username} </td>
							</tr>
							<tr>
								<td> {e.startMonth}/{e.startDay}</td>
								<td> {e.endMonth}/{e.endDay}</td>
							</tr>
							<tr>
								<td>Message:</td>
								<td>{e.notificationMessage}</td>								
							</tr>
						</table>
					</div>
				))}
				</div>
				<div><h4>Rating Notifications</h4></div>
				<div id="currentRatings">
    				<table>
    				{this.state.ratNotifications.map(e => (
                        <tr>
                            <td>e</td>
                        </tr>
    				))}
    				</table>
				</div>
			</div>

		);
	}
}
