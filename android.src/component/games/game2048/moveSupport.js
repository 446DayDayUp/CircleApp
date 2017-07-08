'use strict';

let moveSupport = {
	canMoveLeft: function(arr) {
		for (var i = 0; i < 4; i++) {
			for (var j = 1; j < 4; j++) {
				if (arr[i][j] != 0) {
					if (arr[i][j - 1] == 0 || arr[i][j - 1] == arr[i][j]) {
						return true;
					}
				}
			}
		}
		return false;
	},
	canMoveRight: function(arr) {
		for (var i = 0; i < 4; i++) {
			for (var j = 2; j >= 0; j--) {
				if (arr[i][j] != 0) {
					if (arr[i][j + 1] == 0 || arr[i][j + 1] == arr[i][j]) {
						return true;
					}
				}
			}
		}
		return false;
	},
	canMoveTop: function(arr) {
		for (var j = 0; j < 4; j++) {
			for (var i = 1; i < 4; i++) {
				if (arr[i][j] != 0) {
					if (arr[i - 1][j] == 0 || arr[i - 1][j] == arr[i][j]) {
						return true;
					}
				}
			}
		}
		return false;
	},
	canMoveDown: function(arr) {
		for (var j = 0; j < 4; j++) {
			for (var i = 2; i >= 0; i--) {
				if (arr[i][j] != 0) {
					if (arr[i + 1][j] == 0 || arr[i + 1][j] == arr[i][j]) {
						return true;
					}
				}
			}
		}
		return false;
	},

	noBlockHorizontal: function(row, col1, col2, arr) {
		for (var i = col1 + 1; i < col2; i++) {
			if (arr[row][i] != 0) {
				return false;
			}
		}
		return true;
	},
	noBlockVertical: function(col, row1, row2, arr) {
		for (var i = row1 + 1; i < row2; i++) {
			if (arr[i][col] != 0) {
				return false;
			}
		}
		return true;
	},
	nospace: function(arr) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (arr[i][j] == 0) {
					return false;
				}
			}
		}
		return true;
	},
	nomove: function(arr) {
		var _ = this;
		if (_.canMoveDown(arr) || _.canMoveTop(arr) || _.canMoveRight(arr) || _.canMoveLeft(arr)) {
			return false;
		}
		return true;
	}
};

export default moveSupport;