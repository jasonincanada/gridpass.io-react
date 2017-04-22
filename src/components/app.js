import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {images} from '../api/data';
import Logo from './logo';
import Breadcrumbs from './breadcrumbs';
import Thumbnail from './thumbnail';
import Keypad from './keypad';
import Passwords from './passwords';

class App extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.clickLogo = this.clickLogo.bind(this);
		this.clickedKeypadAt = this.clickedKeypadAt.bind(this);
		this.clickThumb = this.clickThumb.bind(this);
		this.getNextUnsetDigitThatIsnt = this.getNextUnsetDigitThatIsnt.bind(this);
	}

	componentWillMount() {
		this.setState({
			inPasswordView: false
		});
	}

	// Reset everything and enter keypad mode when the logo is clicked
	clickLogo() {
		this.props.goKeypad();
		this.setPasswordView(false);
	}

	// Return the index of the first present but unset digit, or -1 if none
	getNextUnsetDigitThatIsnt(x) {
		for (let i = 0; i < this.props.digits.length; i++) {
			if (i !== x && this.props.digits[i].isSet === false) {
				return i;
			}
		}

		return undefined;
	}

	setPasswordView(b) {
		this.setState({
			inPasswordView: b
		});

		if (b) {
			// TODO: better way to do this
			window.setTimeout(function() {
				document.getElementById('system').focus();
			}, 100);
		}
	}

	clickedKeypadAt(x, y) {
		const digits = this.props.digits;
		const i = this.props.activeDigit;

		this.props.setDigitXY(i, x, y);

		switch (this.props.mode) {
			case 'keypad': {
				const unsetIndex = this.getNextUnsetDigitThatIsnt(i);

				if (unsetIndex !== undefined) {
					this.props.setActiveDigit(unsetIndex);
				} 
				else {
					if (digits.length < images.length) {
						const nextId = digits.length;

						this.props.addDigit(images[nextId].name);
						this.props.setActiveDigit(nextId);
					}
					else {
						this.setPasswordView(true);
					}
				}

				break;
			}
				
			default:
		}
	}

	clickThumb(i) {
		this.props.setActiveDigit(i);
		this.setPasswordView(false);
	}

  render() {
		const digits = this.props.digits;
		const image = images[this.props.activeDigit];
		const thumbnails = digits.map(
			(digit, index) => <Thumbnail key={index} digit={digit} i={index} click={this.clickThumb} />
		);

		return (
			<div>
				<div className="header">
					<Logo onClick={this.clickLogo} />
					<Breadcrumbs />
				</div>

				<div className="content">
					
					<div className="thumbnails">
						{thumbnails}
					</div>

					<Keypad 
						show={!this.state.inPasswordView}
						clickedAt={this.clickedKeypadAt}
						image={image}
						zIndex={1} />

					<Passwords 
						show={this.state.inPasswordView} />

				</div>
			</div>
    );
  }
}

App.propTypes = {
	mode: PropTypes.string.isRequired,
	digits: PropTypes.array.isRequired,
	activeDigit: PropTypes.number.isRequired,
	setDigitXY: PropTypes.func.isRequired,
	addDigit: PropTypes.func.isRequired,
	goKeypad: PropTypes.func.isRequired,
	setActiveDigit: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		digits: state.password.digits,
		activeDigit: state.activeDigit,
		mode: state.mode
	};
}

import {addDigit, setDigitXY, setActiveDigit, goKeypad} from '../actions';

function mapDispatchToProps(dispatch) {
	return {
		addDigit: (name) => {
			dispatch(addDigit(name));
		},
		setDigitXY: (i, x, y) => {
			dispatch(setDigitXY(i, x, y));
		},
		setActiveDigit: (i) => {
			dispatch(setActiveDigit(i));
		},
		goKeypad: () => {
			dispatch(goKeypad());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
