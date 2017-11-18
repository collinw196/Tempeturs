import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { Home, Login } from 'js/homePages';
import { Registration } from 'js/registrationMain';
import { PetInfo, OwnerPayment } from 'js/ownerRegistration';
import { SitterInfo } from 'js/sitterRegistration';
import { OwnerHome, OwnerReserve, OwnerAppoint, OwnerPets, OwnerPetsAdd, OwnerSwitch } from 'js/ownerPages';
import { SitterHome, WeekView } from 'js/sitterPages';
import { OwnerApptDisplay } from 'js/AppointmentDisplayOwner';

export default class Index extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
					<Route exact path="/reg" component={Registration} />
					<Route exact path="/reg/owner" component={PetInfo} />
					<Route exact path="/reg/sitter" component={SitterInfo} />
					<Route exact path="/reg/owner/pay" component={OwnerPayment} />
					<Route exact path="/owner/home" component={OwnerHome} />
					<Route exact path="/owner/reserve" component={OwnerReserve} />
					<Route exact path="/owner/appoint" component={OwnerAppoint} />
					<Route exact path="/owner/pets" component={OwnerPets} />	
					<Route exact path="/owner/pets/add" component={OwnerPetsAdd} />	
					<Route exact path="/owner/sitterSwitch" component={OwnerSwitch} />
					<Route exact path="/owner/appt/display" component={OwnerApptDisplay} />			
					<Route exact path="/sitter/home" component={SitterHome} />
					<Route exact path="/sitter/calendar" component={WeekView} />
					<Route exact path="/sitter/calendar/appointmentInfo" component={AppointmentView} />
				</div>
			</HashRouter>
		);
	}
}