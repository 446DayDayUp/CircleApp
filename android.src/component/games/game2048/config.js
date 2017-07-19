'use strict';

import {
	Dimensions
} from 'react-native';

let _win_width = Dimensions.get('window').width;
let config = {
	containerWidth: 0.92 * _win_width, 
	itemWidth: 0.18 * _win_width, 
	itemPadding: 0.04 * _win_width, 
	borderRadius: 0.02 * _win_width, 
	blockBgColor: '#55c8cd',
	containerBgColor: '#68ced3',
	
	returnStyles: function(_num) {
		let _ = this;
		let _baColor = 'transparent';
		let _color = '#fff';
		let _fontSize = 0.6 * _.itemWidth;
    switch (_num) {
      case 2:
        _baColor = '#a3e4c8';
        break;
      case 4:
        _baColor = '#8fdfbc';
        break;
      case 8:
        _baColor = '#7cd9b0';
        break;
      case 16:
        _baColor = '#68d3a4';
        break;
      case 32:
        _baColor = '#41c78c';
        break;
      case 64:
        _baColor = '#36b97f';
        break;
      case 128:
        _baColor = '#30a571';
        break;
      case 256:
        _baColor = '#2a9264';
        break;
      case 512:
        _baColor = '#257e56';
        break;
      case 1024:
        _baColor = '#1f6a49';
        break;
      case 2048:
        _baColor = '#19573b';
        break;
      case 4096:
        _baColor = '#14432e';
				break;
			case 8192:
				_baColor = '#93c';
				break;
		}
		if (_num <= 4) {
			_color = '#776e65';
		}
		if (_num > 100 && _num < 1000) {
			_fontSize = 0.4 * _.itemWidth;
		} else if (_num > 1000) {
			_fontSize = 0.32 * _.itemWidth;
		}
		let _returnVal = {
			backgroundColor: _baColor,
			color: _color,
			fontSize: _fontSize
		};
		if (_num === 0) {
			_returnVal.width = 0;
			_returnVal.height = 0;
		}
		return _returnVal;
	},

	returnPosition: function(_x, _y) {
		let _ = this;
		
		let _position = {
			top: _.itemPadding + _x * (_.itemPadding + _.itemWidth),
			left: _.itemPadding + _y * (_.itemPadding + _.itemWidth)
		};
		return _position;
	},
	checkNull: function(_arr) {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (_arr[i][j] === 0) {
					return true;
				}
			}
		}
		return false;
	},
	randomPosition: function(_arr) {
		let _x = parseInt(Math.floor(Math.random() * 4)),
			_y = parseInt(Math.floor(Math.random() * 4));
		let times = 0;
		while (times < 30) { 
			if (_arr[_x][_y] === 0) {
				break; 
			}
			_x = parseInt(Math.floor(Math.random() * 4));
			_y = parseInt(Math.floor(Math.random() * 4));
			times++;
		}
		if (times === 30) {
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 4; j++) {
					if (_arr[i][j] === 0) {
						_x = i;
						_y = j;
					}
				}
			}
		}
		return [_x, _y];
	},

	randomOneNumber: function() {
		return Math.random() < 0.75 ? 2 : 4;
	},
	canRemoveLeft: function() {}
}


export default config;