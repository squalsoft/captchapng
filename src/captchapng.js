import pnglib from 'node-pnglib';
import {numMask} from './font';

module.exports = class captchapng {
  constructor(width, height, dispNumber) {
    this.width = width;
    this.height = height;
    this.depth = 8;
    this.dispNumber = '' + dispNumber.toString();
    this.widthAvg = parseInt(this.width / this.dispNumber.length);

    let png = new pnglib(this.width, this.height, this.depth);

    for (let section = 0; section < this.dispNumber.length; section++) {
      let curNum = this.dispNumber[section].valueOf();
      let n = parseInt(Math.random() * numMask.length);
      n = (n >= numMask.length ? 0 : n);

      let mask = numMask[n];
      let curMask = numMask[n][curNum];

      let random_x_offs = parseInt(Math.random() * (this.widthAvg - curMask[0].length));
      let random_y_offs = parseInt(Math.random() * (this.height - curMask.length));

      random_x_offs = (random_x_offs < 0 ? 0 : random_x_offs);
      random_y_offs = (random_y_offs < 0 ? 0 : random_y_offs);

      for (let i = 0; (i < curMask.length) && ((i + random_y_offs) < this.height); i++) {
        let lineIndex = png.index(this.widthAvg * section + random_x_offs, i + random_y_offs);
        for (let j = 0; j < curMask[i].length; j++) {
          if ((curMask[i][j] == '1') && (this.widthAvg * section + random_x_offs + j) < this.width) {
            png.buffer[lineIndex + j] = 1;
          }
        }
      }
    }
    return png;
  }
};
