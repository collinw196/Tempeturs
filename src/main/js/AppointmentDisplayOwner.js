import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';


axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export class OwnerApptDisplay extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	blockId: ''
	    };
    }
	
	componentDidMount() {
		const search = this.props.location.search;
		const params = new URLSearchParams(search);
		const value = params.get('blockId');
		this.setState({
			blockId: value
		});	
		
		console.log(this.state.blockId);
    }
    
	render() {
		return (
			<div className="container padded">
				<div>
					<h5>Id: {this.state.blockId}</h5>
				</div>
			</div>
		);
	}
}