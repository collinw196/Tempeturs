import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { Home, Registration, PetInfo, SitterInfo, OwnerPayment } from 'js/pages';

export default class Index extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/" component={Home} />
					<Route exact path="/reg" component={Registration} />
					<Route exact path="/reg/owner" component={PetInfo} />
					<Route exact path="/reg/sitter" component={SitterInfo} />
					<Route exact path="/reg/owner/pay" component={OwnerPayment} />
				</div>
			</HashRouter>
		);
	}
}