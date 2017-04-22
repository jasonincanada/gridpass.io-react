import React, {PropTypes} from 'react';

class System extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.mouseover = this.mouseover.bind(this);
	}

	mouseover() {
		this.props.mouseover(this.props.system);
	}

	render() {
		const system = this.props.system;

		return (
			<li className="system" onMouseOver={this.mouseover}>
					<img src={'img/icons/' + system + '.png'}  
							width={24}
							height={24}
							alt={system} />
			</li>
		);
	}
}

System.propTypes = {
	system: PropTypes.string.isRequired,
	mouseover: PropTypes.func.isRequired
};

export default System;
