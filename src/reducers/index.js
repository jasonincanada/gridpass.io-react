import * as types from '../actions/actionTypes';
import {combineReducers} from 'redux';
import initialState from './initialState';
import {passwordFor} from '../services/crypto';

function digits(state = initialState.password.digits, action) {
	switch (action.type) {
		case types.ADD_DIGIT:
			return [...state, action.digit];

		case types.SET_DIGIT:
			return state.map((digit, index) => {
					return index === action.i ? {
							name: digit.name,
							isSet: true,
							x: action.x,
							y: action.y
						} 
						: digit;
			});

		default:
			return state;
	}
}

function activeDigit(state = initialState.activeDigit, action) {
	switch (action.type) {
		case types.GO_KEYPAD:
			return initialState.activeDigit;

		case types.SET_ACTIVE_DIGIT:
			return action.i;

		default:
			return state;
	}
}

function mode(state = initialState.mode, action) {
	switch (action.type) {
		case types.GO_KEYPAD:
			return 'keypad';

		default:
			return state;
	}
}

function password(state = initialState.password, action) {
	switch (action.type) {
		case types.GO_KEYPAD:
			return initialState.password;

		default: {
			const nextSystem = system(state.system, action);
			const nextSalt = salt(state.salt, action);
			const nextDigits = digits(state.digits, action);

			return {
				system:	nextSystem,
				salt: nextSalt,
				digits:	nextDigits,

				systemPassword: passwordFor(nextSystem, nextSalt, nextDigits)
			};
		}
	}
}

function salt(state = initialState.password.salt, action) {
	switch (action.type) {
		case types.CHANGED_SALT: return action.salt;
		default: return state;
	}
}

function system(state = initialState.password.system, action) {
	switch (action.type) {
		case types.CHANGED_SYSTEM: return action.system;
		default: return state;
	}
}

export default combineReducers({
	mode,
	activeDigit,
	password
});

