import React, {PropTypes} from 'react';
import getXY from '../common/getXY';
import floorN from '../common/floorN';

const hoversurface = 'hoversurface';

class Keypad extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			hover: {
				x: 0,
				y: 0
			}
		};

		this.mousemove = this.mousemove.bind(this);
		this.click = this.click.bind(this);
	}

	click(ev) {
		const at = getXY(ev, hoversurface);
		this.props.clickedAt(Math.floor(at.x / 10), Math.floor(at.y / 10));

		ev.preventDefault();
	}

	mousemove(ev) {
		const at = getXY(ev, hoversurface);
		this.setState({
			hover: {
				x: at.x,
				y: at.y
			}
		});
	}

	render() {
		const z = this.props.zIndex;

		const image = this.props.image;
		const imageWidth = image.width;
		const imageHeight = image.height;
		const imageUrl = 'url(img/keypad-backgrounds/' + image.src + ')';

		const { x, y } = this.state.hover;
		const hoverLeft = floorN(x, 100);
		const hoverTop = floorN(y, 100);
		const crossLeft = floorN(x, 40);
		const crossTop = floorN(y, 40);
		const squareLeft = floorN(x, 10);
		const squareTop = floorN(y, 10);

		return (
			<div className="keypad" style={{ display: this.props.show ? '' : 'none' }}>
				<div style={{position: 'relative', margin: 0}}>
					<div 
						style={{
							position: 'absolute',
							left: 0,
							top: 0,
							width: imageWidth+'px',
							height: imageHeight+'px',
							background: imageUrl,
							zIndex: z+0
						}}>
					</div>
					
					<img src={'img/black-120.png'} style={{position: 'absolute', zIndex: z+4, opacity: 0.4, left: (hoverLeft-10)+'px', top: (hoverTop-10)+'px'}} />
					<img src={'img/white-panel-100.png'} style={{position: 'absolute', zIndex: z+5, opacity: 0.7, left: hoverLeft+'px', top: hoverTop+'px'}} />
					<img src={'img/crosshairs-40.png'} style={{position: 'absolute', zIndex: z+6, opacity: 0.6, left: crossLeft+'px', top: crossTop+'px'}} />
					<img src={'img/white-10.png'} style={{position: 'absolute', zIndex: z+7, opacity: 0.8, left: squareLeft+'px', top: squareTop+'px'}} />

					<div 
						id={hoversurface}
						onMouseMove={this.mousemove}
						onClick={this.click}
						style={{
							position: 'absolute',
							left: 0,
							top: 0,
							zIndex: z+10,
							width: (floorN(imageWidth, 100) + 100)+'px',
							height: (floorN(imageHeight, 100) + 100)+'px'
						}}>
					</div>
				</div>
			</div>
		);
	}
}

Keypad.propTypes = {
	zIndex: PropTypes.number.isRequired,
	clickedAt: PropTypes.func.isRequired,
	image: PropTypes.object.isRequired,
	show: PropTypes.bool.isRequired
};

export default Keypad;
