'use strict';

var _nodePnglib = require('node-pnglib');

var _nodePnglib2 = _interopRequireDefault(_nodePnglib);

var _font = require('./font');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function captchapng(width, height, dispNumber) {
  _classCallCheck(this, captchapng);

  this.width = width;
  this.height = height;
  this.depth = 8;
  this.dispNumber = '' + dispNumber.toString();
  this.widthAvg = parseInt(this.width / this.dispNumber.length);

  var png = new _nodePnglib2.default(this.width, this.height, this.depth);

  for (var section = 0; section < this.dispNumber.length; section++) {
    var curNum = this.dispNumber[section].valueOf();
    var n = parseInt(Math.random() * _font.numMask.length);
    n = n >= _font.numMask.length ? 0 : n;

    var mask = _font.numMask[n];
    var curMask = _font.numMask[n][curNum];

    var random_x_offs = parseInt(Math.random() * (this.widthAvg - curMask[0].length));
    var random_y_offs = parseInt(Math.random() * (this.height - curMask.length));

    random_x_offs = random_x_offs < 0 ? 0 : random_x_offs;
    random_y_offs = random_y_offs < 0 ? 0 : random_y_offs;

    for (var i = 0; i < curMask.length && i + random_y_offs < this.height; i++) {
      var lineIndex = png.index(this.widthAvg * section + random_x_offs, i + random_y_offs);
      for (var j = 0; j < curMask[i].length; j++) {
        if (curMask[i][j] == '1' && this.widthAvg * section + random_x_offs + j < this.width) {
          png.buffer[lineIndex + j] = 1;
        }
      }
    }
  }
  return png;
};