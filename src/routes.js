import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import AboutPage from './components/about';

export default (
	<Route path="/" component={App}>
		<Route path="about" component={AboutPage} />
	</Route>
);
