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
						<ul>
							<li>Notification 1</li>
							<li>Notification 2</li>
							<li>Notification 3</li>
							<li>Notification 4</li>
							<li>Notification 5</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
