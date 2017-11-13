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
        
        this.getDateHeader = this.getDateHeader.bind(this);
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
            if(day > monthArr[month]){
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
                		<td width="14">Col1</td>
                		<td width="14">Col2</td>
                		<td width="14">Col3</td>
                		<td width="14">Col4</td>
                		<td width="14">Col5</td>
                		<td width="14">Col6</td>
                		<td width="14">Col7</td>
                    </tr>
                    //Row 1
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 2
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 3
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 4
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 5
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 6
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 7
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 8
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 9
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 10
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 11
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 12
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 13
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 14
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 15
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 16
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 17
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 18
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 19
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 20
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 21
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 22
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 23
        		    <tr>
        		        <td width="14"></td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    //Row 24
        		    <tr>
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