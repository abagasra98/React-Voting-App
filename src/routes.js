import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import PollBox from './PollBox';
import Poll from './Poll';
// import additional components

const Routes = (props) => (
	<Router>
		<div>
			<Route exact path="/" component={() => (<PollBox url="http://localhost:3001/api/polls"/>)} />
			<Route path="/polls/:id" component={({match}) => (<Poll url={"http://localhost:3001/api/polls/" + match.params.id} />)} />
		</div>
	</Router>
);

export default Routes;
