'use strict';

import React, {
	Component,
	PropTypes
} from 'react';

import {
	StyleSheet,
	View
} from 'react-native';

import Config from './config';

class itemBlock extends Component {
	static defaultProps = {
		x: 0,
		y: 0
	};
	static propTypes = {
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired
	}
	render() {
		let {
			x,
			y
		} = this.props;
		return (
			<View style={[styles.itemBlock,Config.returnPosition(x,y)]} />
		);
	}
}

const styles = StyleSheet.create({
	itemBlock: {
		position: 'absolute',
		width: Config.itemWidth,
		height: Config.itemWidth,
		backgroundColor: Config.blockBgColor,
		borderRadius: Config.borderRadius
	}
});


export default itemBlock;