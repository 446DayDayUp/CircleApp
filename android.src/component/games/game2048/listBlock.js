'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
} from 'react-native';

import ItemBlock from './itemBlock';

class listBlock extends Component {
	getReturnValue = () => {
		let str;
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				str += '<ItemBlock x={' + i + '} y={' + j + '}></ItemBlock>';
			}
		}
		return str;
	}
	render() {
		return (
			<View>
				<ItemBlock x={0} y={0} />
				<ItemBlock x={0} y={1} />
				<ItemBlock x={0} y={2} />
				<ItemBlock x={0} y={3} />

				<ItemBlock x={1} y={0} />
				<ItemBlock x={1} y={1} />
				<ItemBlock x={1} y={2} />
				<ItemBlock x={1} y={3} />

				<ItemBlock x={2} y={0} />
				<ItemBlock x={2} y={1} />
				<ItemBlock x={2} y={2} />
				<ItemBlock x={2} y={3} />

				<ItemBlock x={3} y={0} />
				<ItemBlock x={3} y={1} />
				<ItemBlock x={3} y={2} />
				<ItemBlock x={3} y={3} />
			</View>
		);
	}
}

const styles = StyleSheet.create({

});


export default listBlock;