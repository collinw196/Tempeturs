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
    
    getDateHeader(offset, id){
        var monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var today = new Date();
        var par = document.getElementById(id);
        var day = today.getDate();
        var month = today.getMonth();
        var year = today.getYear();
        for (var i = 0; i < offset; i++){
            day++;
            if(day > monthArr[month - 1]){
                day = 1;
                month++;
                if(month > 12){
                    month = 1;
                    year++;
                }
            }
        }
        par.innerHTML = (month + '/' + day + '/' + year);
    }
    
    
    render() {
        return(
            <div class="container">
                <div class="row">
                <button height="10%" type="button" align="left">Previous</button>
                <button height="10%" type="button" align="right">Next</button>
                <table width="100%">
                	<tr height="90%" valign="bottom">
                		<td width="14"></td>
                		<td width="14"><p id="date"></p>
                		    <script>
                		        var today = new Date();
                		        var par = document.getElementById("date");
                		        par.innerHTML = (today.getMonth() + '/' + today.getDate() + '/' + today.getYear());
                            </script>
                        </td>
                		<td width="14">Col3</td>
                		<td width="14">Col4</td>
                		<td width="14">Col5</td>
                		<td width="14">Col6</td>
                		<td width="14">Col7</td>
                		<td width="14">Col8</td>
                    </tr>
        		    <tr>
        		        <td width="14">12:00am</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">1:00am</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">2:00am</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">3:00am</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">4:00am</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">5:00am</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">6:00am</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">7:00am</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">8:00am</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">9:00am</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">10:00am</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">11:00am</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">12:00pm</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">1:00pm</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">2:00pm</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">3:00pm</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">4:00pm</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">5:00pm</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">6:00pm</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">7:00pm</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">8:00pm</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">9:00pm</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">10:00pm</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">11:00pm</td>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
                </table>
            </div>
        </div>
        );
    }
}