import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import PollBox from './PollBox';
// import additional components

const Routes = (props) => (
	<Router {...props}>
		<Route path="/" component={() => (<PollBox url="http://localhost:3001/api/polls"/>)} />
	</Router>
);

export default Routes;