import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Breadcrumbs extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		const crumbs = 
			this.props
				.digits
				.filter(d => d.isSet)
				.map(
					(digit, index) => <span className="crumb" key={index}>{digit.name + ' ' + digit.x + ' ' + digit.y}</span>
				);

		return (
			<div className="breadcrumbs">
				{crumbs}
			</div>
		);
	}
}

Breadcrumbs.propTypes = {
	digits: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		digits: state.password.digits
	};
}

export default connect(mapStateToProps)(Breadcrumbs);
