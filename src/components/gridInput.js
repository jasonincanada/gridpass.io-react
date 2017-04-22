import React, {PropTypes} from 'react';

class GridInput extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.change = this.change.bind(this);
	}

	change(e) {
		if (this.props.onChange) {
			this.props.onChange(e.target.value);
		}
	}

	render() {
		return (
			<div className="gridInput" style={{width: (this.props.width+40)+'px'}} >

				<input
					id={this.props.id}
					onChange={this.change}
					style={{ width: this.props.width+'px', textAlign: this.props.align }}
					value={this.props.value}
					type="text" />

				<div className="gridInputPanel" style={{textAlign: this.props.align}}>{this.props.panel}</div>
			</div>
		);
	}
}

GridInput.propTypes = {
	width: PropTypes.number.isRequired,
	panel: PropTypes.string.isRequired,
	align: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,

	// optional
	onChange: PropTypes.func,
	id: PropTypes.string
};

export default GridInput;
