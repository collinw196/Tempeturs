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
        		    <tr>
        		        <td width="14">Row1</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row2</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row3</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row4</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row5</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row6</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row7</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row8</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row9</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row10</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row11</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row12</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row13</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row14</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row15</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row16</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row17</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row18</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row19</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row20</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row21</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row22</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row23</td>
        		        <td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
                		<td width="14"></td>
        		    </tr>
        		    <tr>
        		        <td width="14">Row24</td>
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