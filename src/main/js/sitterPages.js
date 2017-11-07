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
						<li><Link to="/sitter/notifications">Notifications</Link></li>
					</ul>
					
				</div>
				
			</div>
		);
	}
}

export class WeekView extends React.Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return(
            <div class="container">
                <div class="row">
                <table>
                	<tr>
                		<td>Col1</td>
                		<td>Col2</td>
                		<td>Col3</td>
                	</tr>
                </table>
            </div>
        </div>
        );
    }
}