'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';

import Config from './config';
import Container from './container';
import Header from './header';

class main extends Component {
  constructor(props) {
    super(props);
  }
	addScore = (num) => {
		this.refs.header.addScore(num);
	};
	getScore = () => {
		return this.refs.header.getScore();
	}
	render() {
		//console.warn(this.props.text)
		return (
			<View style={styles.main}>
				<Header ref='header'></Header>
				<Container ref='item' addScore={this.addScore} getScore={this.getScore}></Container>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column'
	},
	header: {
		height: 200,
		width: Config.containerWidth,
		position: 'relative'
	}
});


export default main;