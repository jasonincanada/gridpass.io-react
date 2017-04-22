import React, {PropTypes} from 'react';

class Thumbnail extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.click = this.click.bind(this);
	}

	click() {
		this.props.click(this.props.i);
	}

	render() {
		const digit = this.props.digit;

		if (digit.isSet) {
			const z = 0;
			const offsetX = -Math.floor(digit.x / 10) * 100;
			const offsetY = -Math.floor(digit.y / 10) * 100;
			const crossX = Math.floor(digit.x / 4) * 40 + offsetX;
			const crossY = Math.floor(digit.y / 4) * 40 + offsetY;
			const squareX = (digit.x % 10) * 10;
			const squareY = (digit.y % 10) * 10;
			const background = 'url(img/keypad-backgrounds/'+digit.name+'.jpg) ' + offsetX+'px ' + offsetY+'px';

			return (
				<div className="thumbnail" onClick={this.click}>

					<div style={{ position: 'absolute', zIndex: z+0, top: '0px', left: '0px', width: '100px', height: '100px', background }} >
					</div>

					<img style={{ position: 'absolute', top: '0px', left: '0px', opacity: 0.6, zIndex: z+1 }} src={'img/white-panel-100.png'} />
					<img style={{ position: 'absolute', top: crossY+'px', left: crossX+'px', opacity: 0.6, zIndex: z+2 }} src={'img/crosshairs-40.png'} />
					<img style={{ position: 'absolute', top: squareY+'px', left: squareX+'px', opacity: 1, zIndex: z+3 }} src={'img/white-10.png'} />
				</div>
			);
		} else {
			return <div className="unset" onClick={this.click}>---</div>;
		}
	}
}

Thumbnail.propTypes = {
	digit: PropTypes.object.isRequired,
	click: PropTypes.func.isRequired,
	i: PropTypes.number.isRequired
};

export default Thumbnail;
