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
    }
	
	componentDidMount() {
		const search = this.props.location.search;
		const params = new URLSearchParams(search);
		const blockId = params.get('blockId');
		
		var appts = 'https://tempeturs-group-2.herokuapp.com/api/owner/appointment/get/' + blockId;
    	axios.get(appts)
		.then(data => {
        	this.setState({appointment: data.data});
        })
		.catch(function (error) {
		    console.log(error);
		});
    }
	
    handleSubmit(event) {
    	event.preventDefault();

		axios({
		    method: 'POST',
		    url: 'https://tempeturs-group-2.herokuapp.com/api/owner/appointment/cancel' + this.state.appointment.blockId,
		    data: {
		    }
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
						<input type="submit" value = "Cancel" /><br />
					</form>
				</div>
			</div>
		);
	}
}