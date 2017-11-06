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
    }
    
    render() {
        return(
            <div class="container">
                <div class="row">
                <table width="100%">
                    <!--<tr height="10%">
                       <button type="button" style="float:left;">Previous</button>
                       <button type="button" style="float:right;">Next</button>
                    </tr>-->
                	<tr height="90%" valign="bottom">
                		<td width="100">Col1</td>
                		<td width="100">Col2</td>
                		<td width="100">Col3</td>
                		<td width="100">Col4</td>
                		<td width="100">Col5</td>
                		<td width="100">Col6</td>
                		<td width="100">Col7</td>
                	</tr>
                </table>
            </div>
        </div>
        );
    }
}