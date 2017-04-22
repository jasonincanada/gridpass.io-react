import * as types from './actionTypes';

export function addDigit(name) {
	return {
		type: types.ADD_DIGIT, 
		digit: {
			name,
			isSet: false
		}
	};
}

export function setDigitXY(i, x, y) {
	return {
		type: types.SET_DIGIT, 
		i, 
		x, 
		y
	};
}

export function setActiveDigit(i) {
	return {
		type: types.SET_ACTIVE_DIGIT,
		i
	};
}

export function goKeypad() { return { type: types.GO_KEYPAD }; } 
export function changedSalt(salt) { return { type: types.CHANGED_SALT, salt }; }
export function changedSystem(system) { return { type: types.CHANGED_SYSTEM, system }; }

