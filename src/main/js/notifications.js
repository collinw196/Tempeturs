import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export class Notifications extends React.Component {
	constructor(props) {
	    super(props);
    }
    
	render() {
		return (
			<div className="container padded">
				<div>
					<h5>Notifications</h5>
					<div>
						//<ul>
						//	<li><Link to="/owner/reserve">Create Appointment</Link></li>
						//	<li><Link to="/owner/appoint">Current Appointments</Link></li>
						//	<li><Link to="/owner/pets">PetInfo</Link></li>
						//</ul>
					</div>
				</div>
			</div>
		);
	}
}
