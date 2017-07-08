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
				// 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
				// 在这里不做操作
			},
			onPanResponderRelease: (evt, gestureState) => {
				// 用户放开了所有的触摸点，且此时视图已经成为了响应者。
				// 一般来说这意味着一个手势操作已经成功完成。
				// 获取移动的距离，判断向那移动了
				//alert('x:' + gestureState.dx + '---y:' + gestureState.dy);
				let _dx = gestureState.dx,
					_dy = gestureState.dy,
					_ = this;
				if (Math.abs(_dx) > 30 || Math.abs(_dy) > 30)
					if (Math.abs(_dx) > Math.abs(_dy)) {
						//横向移动
						if (_dx > 0) {
							_.refs.itemList.isGameOver();
							_.refs.itemList.moveRight();
						} else {
							_.refs.itemList.isGameOver();
							_.refs.itemList.moveLeft();
						}
					} else {
						//纵向移动
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