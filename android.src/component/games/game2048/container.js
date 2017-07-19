'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	PanResponder
} from 'react-native';

import Config from './config';


import BlockList from './listBlock';
import ItemList from './itemList';



class container extends Component {
	moveLeft = () => {
		this.refs.itemList.moveLeft();
	}
	moveRight = () => {
		this.refs.itemList.moveRight();
	}
	moveTop = () => {
		this.refs.itemList.moveTop();
	}
	moveDown = () => {
		this.refs.itemList.moveDown();
	}
	addScore = (num) => {
		this.props.addScore(num);
	};
	getScore = () => {
		return this.props.getScore();
	}
	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderGrant: (evt, gestureState) => {
			},
			onPanResponderRelease: (evt, gestureState) => {
				let _dx = gestureState.dx,
					_dy = gestureState.dy,
					_ = this;
				if (Math.abs(_dx) > 30 || Math.abs(_dy) > 30)
					if (Math.abs(_dx) > Math.abs(_dy)) {
					if (_dx > 0) {
							_.refs.itemList.isGameOver();
							_.refs.itemList.moveRight();
						} else {
							_.refs.itemList.isGameOver();
							_.refs.itemList.moveLeft();
						}
					} else {
						if (_dy > 0) {
							_.refs.itemList.isGameOver();
							_.refs.itemList.moveDown();
						} else {
							_.refs.itemList.isGameOver();
							_.refs.itemList.moveTop();
						}
					}
			}
		});
	};
	render() {
		return (
			<View style={styles.container} {...this._panResponder.panHandlers}>
				<BlockList />
				<ItemList ref='itemList' addScore={this.addScore} getScore={this.getScore}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Config.containerBgColor,
		width: Config.containerWidth,
		height: Config.containerWidth,
		position: 'relative',
		borderRadius: Config.borderRadius
	}
});


export default container;