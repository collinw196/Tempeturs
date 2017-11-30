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
	    	bID: '',
	    	ownedPets: [],
	    	rating: ''
	    };
	    this.cancelAppt = this.cancelAppt.bind(this);
	    this.paySitter = this.paySitter.bind(this);
	    this.formatMin = this.formatMin.bind(this);
	    this.formatHour = this.formatHour.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.rateSitter = this.rateSitter.bind(this);
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
    	
    	axios({
		    method: 'POST',
		    url: 'https://tempeturs-group-2.herokuapp.com/api/owner/appointment/pets/get',
		    data: {
		    	petIds: this.state.appointment.petIds
		    }
		   
		})
    	.then(data => {
        	this.setState({ownedPets: data.data});
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
    
    paySitter(event) {
    	event.preventDefault();
    	var value = 'https://tempeturs-group-2.herokuapp.com/api/owner/appointment/pay/' + this.state.bID;
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
    
    rateSitter(){
    	var value = 'https://tempeturs-group-2.herokuapp.com/api/siiter/rate/' + this.state.appointment.username + '/' + this.state.rating;
    	axios({
		    method: 'POST',
		    url: value,
		    data: {
		    	petIds: this.state.appointment.petIds
		    }
		   
		})
    	.then(data => {
        	this.setState({ownedPets: data.data});
        })
		.catch(function (error) {
		    console.log(error);
		});
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
    	this.props.history.push('/owner/appoint');
    }
	render() {
		return (
			<div className="container padded">
				<Link to="/login"><p align="right">Login</p></Link>
				<Link to="/owner/home"><p align="right">Home</p></Link><br />
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
						Rate Sitter:<br />
						<select name="rating" onChange={this.handleChange}>
							<option value="1" selected>1</option>
							<option value="2" >2</option>
							<option value="3" >3</option>
							<option value="4" >4</option>
							<option value="5" >5</option>
						</select>
						<input type="button" value = "Rate" onClick={this.rateSitter}/><br />
						<input type="submit" value="DONE" />
					</form>
				</div>
			</div>
		);
	}
}