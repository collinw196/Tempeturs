import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { Home, Login } from 'js/homePages';
import { Registration } from 'js/registrationMain';
import { PetInfo, OwnerPayment } from 'js/ownerRegistration';
import { SitterInfo } from 'js/sitterRegistration';
import { OwnerHome, OwnerReserve, OwnerAppoint, OwnerPets, OwnerPetsAdd, OwnerSwitch, OwnerNot, OwnerPetsEdit } from 'js/ownerPages';
import { SitterHome, WeekView, AppointmentView, SitterCreate, SitterSwitchPet, OwnerSwitchPay } from 'js/sitterPages';
import { OwnerApptDisplay } from 'js/appointmentDisplayOwner';
import { OwnerInfo, UserEdit, OwnerEdit } from 'js/userInfo';
import { Notifications } from 'js/notifications';

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
					<Route exact path="/owner/not" component={OwnerNot} />	
					<Route exact path="/owner/pet/edit" component={OwnerPetsEdit} />
					<Route exact path="/owner/edit" component={OwnerEdit} />
					<Route exact path="/user/owner/info" component={OwnerInfo} />	
					<Route exact path="/user/edit" component={UserEdit} />		
					<Route exact path="/sitter/home" component={SitterHome} />
					<Route exact path="/sitter/calendar" component={WeekView} />
					<Route exact path="/sitter/notifications" component={Notifications} />
					<Route exact path="/sitter/appointmentInfo" component={AppointmentView} />
					<Route exact path="/sitter/create" component={SitterCreate} />
					<Route exact path="/sitter/ownerSwitch" component={SitterSwitchPet} />
					<Route exact path="/sitter/ownerSwitch/pay" component={SitterSwitchPay} />
				</div>
			</HashRouter>
		);
	}
}