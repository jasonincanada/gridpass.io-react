import React, {PropTypes} from 'react';

class Logo extends React.Component {
	render() {
		return (
			<div 
				className="logo"
				onClick={this.props.onClick}>
					gridpass.io
			</div>
		);
	}
}

Logo.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default Logo;

