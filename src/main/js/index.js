import React from 'react';
import { HashRouter, Route } from 'react-router-dom';


import { Home, Login, Registration, PetInfo, SitterInfo, OwnerPayment, OwnerHome,
		OwnerReserve, OwnerAppoint, OwnerPets, OwnerPetsAdd, SitterHome } from 'js/pages';


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
					<Route exact path="/sitter/home" component={SitterHome} />
				</div>
			</HashRouter>
		);
	}
}