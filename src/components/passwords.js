import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {systems} from '../api/data';
import System from './system';
import GridInput from './gridInput';

class Passwords extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.changedSalt = this.changedSalt.bind(this);
		this.changedSystem = this.changedSystem.bind(this);
		this.mouseoverSystem = this.mouseoverSystem.bind(this);
	}

	changedSalt(salt) { this.props.changedSalt(salt); }
	changedSystem(system) { this.props.changedSystem(system); }
	mouseoverSystem(system) { this.props.changedSystem(system); }

	render() {
		return (
			<div className="passwords" style={{ display: this.props.show ? '' : 'none' }}>
				<div className="title">Passwords Unlocked</div>

				<ul>
					{systems.map((system, index) => <System key={index} system={system} mouseover={this.mouseoverSystem} />)}
				</ul>

				<div style={{marginTop: '40px'}}>
					<GridInput width={150} panel={'SALT'} align={'right'} value={this.props.salt} onChange={this.changedSalt} />
					<GridInput width={150} panel={'SYSTEM'} id="system" align={'left'} value={this.props.system} onChange={this.changedSystem}/>
					<GridInput width={250} panel={'PASSWORD - COPY/PASTE'} align={'center'} value={this.props.systemPassword} />
				</div>

				<br style={{clear: 'both'}} />
			</div>
		);
	}
}

Passwords.propTypes = {
	salt: PropTypes.string.isRequired,
	system: PropTypes.string.isRequired,
	systemPassword: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired,
	changedSalt: PropTypes.func.isRequired,
	changedSystem: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		salt: state.password.salt,
		system: state.password.system,
		systemPassword: state.password.systemPassword
	};
};

import {changedSalt, changedSystem} from '../actions';

const mapDispatchToProps = (dispatch) => {
	return {
		changedSalt: (salt) => { dispatch(changedSalt(salt)); },
		changedSystem: (system) => { dispatch(changedSystem(system)); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Passwords);
