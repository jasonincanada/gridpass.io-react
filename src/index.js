/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import App from './components/app';
import initialState from './reducers/initialState';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css';
import {addDigit, setDigitXY} from './actions';

/*eslint-disable no-constant-condition */
const store = configureStore(initialState);

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,

	document.getElementById('app')
);
