import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';


export class Notifications extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	        apptNotifications: []
	        ratNotifications: []
	    };
	    this.componentDidMount() = this.componentDidMount.bind(this);
	    this.displayNotifications() = this.displayNotifications.bind(this);
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
    
    displayNotifications() {
        for(var i = 0; i < this.state.apptNotifications.length; i++) {
            var fragment = create('<li>New appointment request from ' + 
                this.state.apptNotifications[i].getOwnerUsername() + '.</li>');
        }
        
        for(var i = 0; i < this.state.ratNotifications.length; i++) {
            var fragment = create('<li>' + this.state.ratNotifications[i] + '</li>');
        }
    }
   
    create(htmlStr) {
        var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }
    
    
	render() {
		return (
			<div className="container padded">
				<div>
					<h5>Notifications</h5>
					<div>
						<ul id="list">
							<li>Notification 1</li>
							<li>Notification 2</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
