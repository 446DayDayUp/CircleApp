'use strict';

import config from './config';

class util {
	returnStyles = (_num) => {
		let _baColor = 'transparent';
		let _color = '#fff';
		let _fontSize = 0.6 * config.itemWidth;
		switch (_num) {
			case 2:
				_baColor = '#eee4da';
				break;
			case 4:
				_baColor = '#ede0c8';
				break;
			case 8:
				_baColor = '#f2b179';
				break;
			case 16:
				_baColor = '#f59563';
				break;
			case 32:
				_baColor = '#f67c5f';
				break;
			case 64:
				_baColor = '#f65e3b';
				break;
			case 128:
				_baColor = '#edcf72';
				break;
			case 256:
				_baColor = '#edcc61';
				break;
			case 512:
				_baColor = '#9c0';
				break;
			case 1024:
				_baColor = '#33b5e5';
				break;
			case 2048:
				_baColor = '#09c';
				break;
			case 4096:
				_baColor = '#a6c';
				break;
			case 8192:
				_baColor = '#93c';
				break;
		}
		if (_num <= 4) {
			_color = '#776e65';
		}
		if (1000 > _num > 100) {
			_fontSize = 0.32 * config.itemWidth;
		} else if (_num > 1000) {
			_fontSize = 0.25 * config.itemWidth;
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
	};

	returnPosition = (_x, _y) => {
	
		let _position = {
			top: config.itemPadding + _y * (config.itemPadding + config.itemWidth),
			left: config.itemPadding + _x * (config.itemPadding + config.itemWidth)
		};
		return _position;
	};

	checkNull = (_arr) => {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (_arr[i][j] === 0) {
					return true;
				}
			}
		}
		return false;
	};

	randomPosition = (_arr) => {

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
	};
	randomOneNumber = () => {
		return Math.random() < 0.75 ? 2 : 4;
	};
	canRemoveLeft = () => {

	};
}

export default util;