import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';


axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export class OwnerApptDisplay extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	appointment: '',
	    	bID: ''
	    };
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
	
	render() {
		return (
			<div className="container padded">
				<div>
					<h5>Id: {this.state.appointment.blockId}</h5>
					<p>Sitter Username: {this.state.appointment.username}</p>
					<p>Pets: </p> //getting pets is actually complicated
				</div>
				<div>
					<form onSubmit={this.handleSubmit}>
						Cancel Appointment:<br />
						<input type="button" value = "Cancel" onClick={this.cancelAppt}/><br />
					</form>
				</div>
			</div>
		);
	}
}