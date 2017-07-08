'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View
} from 'react-native';

import Config from './config';
import MoveSupport from './moveSupport';

import Item from './item';



let hasConflicted = new Array();
let REFS = new Array();
class itemList extends Component {
	constructor(props) {
		super(props);
		let _ = this;
		let _arr = new Array();
		for (let i = 0; i < 4; i++) {
			_arr[i] = new Array();
			hasConflicted[i] = new Array();
			for (let j = 0; j < 4; j++) {
				_arr[i][j] = 0;
				hasConflicted[i][j] = false;
			}
		}

		for (let i = 0; i < 4; i++) {
			REFS[i] = new Array();
			for (let j = 0; j < 4; j++) {
				REFS[i][j] = {};
			}
		}
		// _arr[0][0] = 128;
		// _arr[0][1] = 1024;
		for (let i = 0; i < 2; i++) {
			let _pos = Config.randomPosition(_arr);
			_arr[_pos[0]][_pos[1]] = Config.randomOneNumber();
		}

		this.state = {
			arrList: _arr
		};
	};

	componentDidMount() {
		REFS[0][0] = this.refs.item_0_0;
		REFS[0][1] = this.refs.item_0_1;
		REFS[0][2] = this.refs.item_0_2;
		REFS[0][3] = this.refs.item_0_3;

		REFS[1][0] = this.refs.item_1_0;
		REFS[1][1] = this.refs.item_1_1;
		REFS[1][2] = this.refs.item_1_2;
		REFS[1][3] = this.refs.item_1_3;

		REFS[2][0] = this.refs.item_2_0;
		REFS[2][1] = this.refs.item_2_1;
		REFS[2][2] = this.refs.item_2_2;
		REFS[2][3] = this.refs.item_2_3;

		REFS[3][0] = this.refs.item_3_0;
		REFS[3][1] = this.refs.item_3_1;
		REFS[3][2] = this.refs.item_3_2;
		REFS[3][3] = this.refs.item_3_3;

	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
	addScore = (num) => {
		this.props.addScore(num);
	};
	updateView = (data, times) => {
		let _ = this;
		//alert(times);
		this.timer = setTimeout(function() {
			_.setState({
				arrList: data
			});
			_.addOneItem();
			_.timer && clearTimeout(_.timer);
			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < 4; j++) {
					hasConflicted[i][j] = false;
				}
			}
		}, 30);
	};
	addOneItem = () => {
		let {
			arrList
		} = this.state;
		let _arr = arrList;

		if (!Config.checkNull(_arr)) {
			return false;
		}

		let _pos = Config.randomPosition(_arr);
		_arr[_pos[0]][_pos[1]] = Config.randomOneNumber();
		this.setState({
			arrList: _arr
		});
	};
	isGameOver = () => {
		let _ = this;
		if (MoveSupport.nospace(this.state.arrList) && MoveSupport.nomove(this.state.arrList)) {
			_.gameOver();
		}
	}
	gameOver = () => {

		let score = this.props.getScore();
    //console.log('Game Over！Your Score :' + score);
	}
	moveLeft = () => {

		let {
			arrList
		} = this.state;

		let _data = arrList,
			_ = this;

		if (MoveSupport.canMoveLeft(_data)) {
			//moveLeft
			let _times = 0;
			for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
          if (_data[i][j] != 0) {
            for (var k = 0; k < j; k++) {
              if (_data[i][k] == 0 && MoveSupport.noBlockHorizontal(i, k, j, _data)) {
                //move
                REFS[i][j].animate(i, k, 0);
                _times++;
                _data[i][k] = _data[i][j];
                _data[i][j] = 0;
                continue;
              } else if (_data[i][k] == _data[i][j] && MoveSupport.noBlockHorizontal(i, k, j, _data) && !hasConflicted[i][k]) {
                //move
                REFS[i][j].animate(i, k, 0);
                _times++;
                //add
                _data[i][k] *= 2;
                _data[i][j] = 0;
                //add score
                _.addScore(_data[i][k]);
                hasConflicted[i][k] = true;
                continue;
              }
            }
          }
        }
      }
			_.updateView(_data, _times);
			//_.props.callback(this.state.add);
		} else {
			return false;
		}
	};
	moveRight = () => {
		  
		let {
			arrList
		} = this.state;
		    
		let _data = arrList,
			_ = this;

		if (MoveSupport.canMoveRight(_data)) {
			//moveRight
			let _times = 0;
			for (var i = 0; i < 4; i++) {
				for (var j = 2; j >= 0; j--) {
					if (_data[i][j] != 0) {
						for (var k = 3; k > j; k--) {
							if (_data[i][k] == 0 && MoveSupport.noBlockHorizontal(i, j, k, _data)) {
								REFS[i][j].animate(i, k, 0);
								_times++;
								_data[i][k] = _data[i][j];
								_data[i][j] = 0;
								continue;
							} else if (_data[i][k] == _data[i][j] && MoveSupport.noBlockHorizontal(i, j, k, _data) && !hasConflicted[i][k]) {
								REFS[i][j].animate(i, k, 0);
								_data[i][k] *= 2;
								_data[i][j] = 0;
								//add score
								_.addScore(_data[i][k]);
								_times++;
								hasConflicted[i][k] = true;
								continue;
							}
						}
					}
				}
			}
			_.updateView(_data, _times);
		} else {
			return false;
		}

	};
	moveTop = () => {
		  
		let {
			arrList
		} = this.state;

		let _data = arrList,
			_ = this;
	   
		if (MoveSupport.canMoveTop(_data)) {
			//moveUp
			let _times = 0;
			for (var j = 0; j < 4; j++) {
				for (var i = 1; i < 4; i++) {
					if (_data[i][j] != 0) {
						for (var k = 0; k < i; k++) {
							if (_data[k][j] == 0 && MoveSupport.noBlockVertical(j, k, i, _data)) {
								//showMoveAnimation(i, j, k, j);
								REFS[i][j].animate(k, j, 1);

								_times++;
								_data[k][j] = _data[i][j];
								_data[i][j] = 0;
								continue;
							} else if (_data[k][j] == _data[i][j] && MoveSupport.noBlockVertical(j, k, i, _data) && !hasConflicted[k][j]) {
								REFS[i][j].animate(k, j, 1);
								_times++;
								_data[k][j] *= 2;
								_data[i][j] = 0;
								//add score
								_.addScore(_data[k][j]);
								hasConflicted[k][j] = true;
								continue;
							}
						}
					}
				}
			}
			_.updateView(_data, _times);
		} else {
			return false;
		}
	};
	moveDown = () => {
		  
		let {
			arrList
		} = this.state;
		    
		let _data = arrList,
			_ = this;
		if (MoveSupport.canMoveDown(_data)) {
			//moveDown
			let _times = 0;
			for (var j = 0; j < 4; j++) {
				for (var i = 2; i >= 0; i--) {
					if (_data[i][j] != 0) {
						for (var k = 3; k > i; k--) {
							if (_data[k][j] == 0 && MoveSupport.noBlockVertical(j, i, k, _data)) {
								REFS[i][j].animate(k, j, 1);
								_times++;
								_data[k][j] = _data[i][j];
								_data[i][j] = 0;
								continue;
							} else if (_data[k][j] == _data[i][j] && MoveSupport.noBlockVertical(j, i, k, _data) && !hasConflicted[k][j]) {
								REFS[i][j].animate(k, j, 1);
								_times++;
								_data[k][j] *= 2;
								_data[i][j] = 0;
								//add score
								_.addScore(_data[k][j]);
								hasConflicted[k][j] = true;
								continue;
							}
						}
					}
				}
			}
			//更新数据
			_.updateView(_data, _times);
		} else {
			return false;
		}
	};

	render() {
		let {
			arrList
		} = this.state;
		return (
			<View>
				<Item ref='item_0_0' x={0} y={0} number={arrList[0][0]}/>
				<Item ref='item_0_1' x={0} y={1} number={arrList[0][1]}/>
				<Item ref='item_0_2' x={0} y={2} number={arrList[0][2]}/>
				<Item ref='item_0_3' x={0} y={3} number={arrList[0][3]}/>

				<Item ref='item_1_0' x={1} y={0} number={arrList[1][0]}/>
				<Item ref='item_1_1' x={1} y={1} number={arrList[1][1]}/>
				<Item ref='item_1_2' x={1} y={2} number={arrList[1][2]}/>
				<Item ref='item_1_3' x={1} y={3} number={arrList[1][3]}/>

				<Item ref='item_2_0' x={2} y={0} number={arrList[2][0]}/>
				<Item ref='item_2_1' x={2} y={1} number={arrList[2][1]}/>
				<Item ref='item_2_2' x={2} y={2} number={arrList[2][2]}/>
				<Item ref='item_2_3' x={2} y={3} number={arrList[2][3]}/>

				<Item ref='item_3_0' x={3} y={0} number={arrList[3][0]}/>
				<Item ref='item_3_1' x={3} y={1} number={arrList[3][1]}/>
				<Item ref='item_3_2' x={3} y={2} number={arrList[3][2]}/>
				<Item ref='item_3_3' x={3} y={3} number={arrList[3][3]}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({

});


export default itemList;