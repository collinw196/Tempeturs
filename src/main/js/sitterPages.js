import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import uncontrollable from 'uncontrollable';
import cn from 'classnames';
import {
  accessor
  , elementType
  , dateFormat
  , dateRangeFormat
  , views as componentViews
} from './utils/propTypes';

import { notify } from './utils/helpers';
import { navigate, views } from './utils/constants';
import defaultFormats from './formats';
import message from './utils/messages';
import moveDate from './utils/move';
import VIEWS from './Views';
import Toolbar from './Toolbar';
import EventWrapper from './EventWrapper';
import BackgroundWrapper from './BackgroundWrapper';

import omit from 'lodash/omit';
import defaults from 'lodash/defaults';
import transform from 'lodash/transform';
import mapValues from 'lodash/mapValues';
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
				</div>
				
			</div>
		);
	}
}