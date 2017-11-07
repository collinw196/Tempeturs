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
                <button height="10%" type="button" align="left">Previous</button>
                <button height="10%" type="button" align="right">Next</button>
                <table width="100%">
                	<tr height="90%" valign="bottom">
                		<td width="100">
                		    <tr>
                		        <script>
                                var now = new Date();
                                var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
                                var date = ((now.getDate() < 10) ? "0" : "") + now.getDate();
                                function fourdigits(number) {
                                    return (number < 1000) ? number + 1900 : number;
                                }
                                today =  months[now.getMonth()] + " " +
                                    date + ", " +
                                    (fourdigits(now.getYear()));
                                    document.write(today);
                                </script>
                            </tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		</td>
                		<td width="100">Col2
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		</td>
                		<td width="100">Col3
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		</td>
                		<td width="100">Col4
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		</td>
                		<td width="100">Col5
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		</td>
                		<td width="100">Col6
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		</td>
                		<td width="100">Col7
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		    <tr></tr>
                		</td>
                	</tr>
                </table>
            </div>
        </div>
        );
    }
}